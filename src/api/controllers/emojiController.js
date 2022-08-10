const getEmoji = async (req, res, next) => {
  // res.json(['😀', '😳', '🙄']);

  res.status(200).json(req.user)
}

const createEmoji = async (req, res, next) => {
  const { count, pic, data } = req.body

  try {
    console.log('DATA', data)
    console.log('COUNT', count)
    console.log('PIC', pic)
  } catch (error) {
    return next(error)
  };

  res.status(200).json({ count, pic, data })
}

exports.createEmoji = createEmoji
exports.getEmoji = getEmoji
