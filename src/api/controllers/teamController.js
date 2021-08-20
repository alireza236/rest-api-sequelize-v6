
const db = require('../../models')

const getTeamList = async (req, res, next) => {
  let teams
  try {
    teams = await db.Team.findAll({
      include: [{
        model: db.Game,
        as: 'game'
      }]
    })
  } catch (error) {
    return next(error)
  }

  res.json(teams)
}

const createTeam = async (req, res, next) => {
  const { data } = req.body

  try {
    console.log('DATA', data)
  } catch (error) {
    return next(error)
  };

  res.status(200).json(data)
}

exports.getTeamList = getTeamList
exports.createTeam = createTeam
