/*
    simple paging and limit resources
    http:localhost:3000/your-products-api?page=1&limit=10&order_by=created_at&order_direction=asc
  */

const paginate = async (model, pageSize, pageLimit, search = {}, order = [], transform, include = [], meta = {}) => {
  try {
    const rawAttrs = Object.keys(model.rawAttributes) || []

    const limit = parseInt(pageLimit, 10) || 10
    const page = parseInt(pageSize, 10) || 1
    const offset = getOffset(page, limit)

    // create an options object
    let options = {
      include: include,
      offset: offset,
      limit: limit,
      rawAttributes: rawAttrs
    }

    // check if the search object is empty
    if (Object.keys(search).length) {
      options = { options, ...search }
    }

    // check if the order array is empty
    if (order && order.length) {
      options.order = order
    }

    // take in the model, take in the options
    let { count, rows } = await model.findAndCountAll(options)

    // check if the transform is a function and is not null
    if (transform && typeof transform === 'function') {
      rows = transform(rows)
    }

    return {
      metas: meta,
      previousPage: getPreviousPage(page),
      currentPage: page,
      nextPage: getNextPage(page, limit, count),
      total: parseInt(count),
      limit: limit,
      data: rows
    }
  } catch (error) {
    console.error(error)
  }
}

const getOffset = (page, limit) => {
  return (page * limit) - limit
}

const getNextPage = (page, limit, total) => {
  if ((total / limit) > page) {
    return page + 1
  }

  return null
}

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null
  }
  return page - 1
}

module.exports = paginate
