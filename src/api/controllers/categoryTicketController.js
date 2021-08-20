const db = require('../../models')

const getCategoryTicket = async (req, res, next) => {
  let category
  try {
    category = await db.CategoryTicket.findAll({

      include: [{
        model: db.Ticket,
        required: false
      }]

    })
  } catch (error) {
    return next(error)
  }

  res.status(200).json(category)
}

const createCategoryTicket = async (req, res, next) => {
  const { sla_level, sla_name, category, response_time, resolution_time, sla_warning_time } = req.body

  let categoryticket
  try {
    categoryticket = await db.CategoryTicket.build({
      sla_level,
      sla_name,
      category,
      response_time,
      resolution_time,
      sla_warning_time
    })
  } catch (error) {
    return next(error)
  };

  try {
    await categoryticket.save()
  } catch (error) {
    return next(error)
  }

  res.status(201).json(categoryticket)
}

exports.createCategoryTicket = createCategoryTicket
exports.getCategoryTicket = getCategoryTicket
