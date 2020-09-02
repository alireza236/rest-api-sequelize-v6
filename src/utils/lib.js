const wait =  (timeout, fn)=>{
  return new Promise.resolve(resolve =>{
      setTimeout(()=>{
        resolve(fn())
      },timeout)
  });
};

const resInternalError =  (res) => {
  res.status(500).json({
    status: 500,
    message: 'Internal Error'
  });
}

const uid =  (len) => {
  let buf = []
  , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  , charlen = chars.length;

  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function responseRedactor (collection, options = { limit: 0 ,offset: 0}, metas = {}) {
  return {
    metas,
    totalCount: collection.count || 0,
    totalPages: (collection.count > options.limit) ? Math.ceil(collection.count/options.limit) : 1,
    cursor: {
      offset: (collection.rows.length == options.limit) ? options.offset + options.limit : 0,
      limit: options.limit
    },
    data: collection.rows || []
  };
}

module.exports = {
  responseRedactor,
  resInternalError,
  uid,
  wait
}