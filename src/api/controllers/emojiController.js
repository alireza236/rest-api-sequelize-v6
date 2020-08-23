const getEmoji = async (req, res, next) =>{
        res.json(['😀', '😳', '🙄']);
};

exports.getEmoji= getEmoji;