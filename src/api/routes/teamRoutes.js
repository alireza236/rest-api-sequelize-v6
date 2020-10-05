const express = require('express');

const router = express.Router();

const team = require("../controllers/teamController");

router.get('/', team.getTeamList );
router.post('/', team.createTeam  );

module.exports = router;
