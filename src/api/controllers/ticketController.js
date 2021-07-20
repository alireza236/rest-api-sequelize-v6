/* eslint-disable camelcase */
const { Op } = require('sequelize')
const _ = require('lodash')

const db = require('../../models')
const orderBuilder = require('../../lib/query')
const { responseRedactor } = require('../../utils/lib')

const getListTicket = async (req, res, next) => {
  const { q, id, sort, offset, limit, inc_attrs, exc_attrs, embeds } = req.query

  // get all attributes on model.
  const rawAttrs = Object.keys(await db.Ticket.rawAttributes) || []

  let collection
  let offsetSize = 0
  let limitSize = 10
  let order = []
  const include = []
  const where = {}
  let attributes = inc_attrs ? _.split(inc_attrs, ',') : rawAttrs

  function subInclude (embed) {
    include.push(embed)
  };

  // include relationship model entities..
  function embed (embeds) {
    switch (embeds) {
      case 'customers':
        return {
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          model: db.Customer,
          through: {
            attributes: []
          },
          required: true
        }
      case 'category':
        return {
          model: db.CategoryTicket
        }
      case 'assign':
        return {
          model: db.User,
          as: 'assign'
        }
      case 'user':
        return {
          model: db.User
        }
      default:
        return null
    };
  };

  // override limit && offset
  if (offset && limit) {
    offsetSize = Number(offset)
    limitSize = Number(limit)
  };

  if (id) {
    where.id = id
  };

  if (q) {
    where.code_ticket = {
      [Op.like]: `%${q}%`
    }
  };

  if (exc_attrs) {
    attributes = {
      exclude: _.split(exc_attrs, ',')
    }
  };

  // sorting orderBy attributes ASC or DESC
  if (sort) {
    order = sort ? orderBuilder(sort) : order
  };

  if (embeds) {
    const includes = !_.isArray(_.split(embeds, ',')) ? [].push(embeds) : _.split(embeds, ',')
    _.forEach(_.split(includes, ','), include => {
      if (embed(include)) {
        const merge = embed(include)
        subInclude(merge)
      }
    })
  };

  let options = {
    include,
    order,
    attributes,
    where,
    limit: limitSize,
    offset: offsetSize
  }

  console.log('options', options)

  // remove object limit & offset, unlimited query
  if (limit && limit === 0) {
    options = _.omit(options, ['offset', 'limit'])
  };

  try {
    collection = await db.Ticket.findAndCountAll(options)
  } catch (error) {
    return next(error)
  };

  const response = responseRedactor(collection, {
    limit: limitSize,
    offset: offsetSize
  })

  res.status(200).json(response)
}

const createTicket = async (req, res, next) => {
  const { userId, assignId, categoryticketId, code_ticket, subject, description } = req.body

  let ticket
  let customer_ticket

  try {
    ticket = await db.Ticket.build({ userId, assignId, categoryticketId, code_ticket, subject, description })
  } catch (error) {
    return next(error)
  };

  try {
    customer_ticket = await db.CustomerTicket.build({
      customerId: 'ba5af8af-7bff-449d-9056-6cb2094c0344',
      ticketId: ticket.id
    })
  } catch (error) {
    return next(error)
  }

  console.log(JSON.stringify(customer_ticket, null, 2))
  console.log(JSON.stringify(ticket.id, null, 2))

  try {
    await ticket.save()
    await customer_ticket.save()
  } catch (error) {
    return next(error)
  }

  res.status(201).json(ticket)
}

exports.getListTicket = getListTicket
exports.createTicket = createTicket
