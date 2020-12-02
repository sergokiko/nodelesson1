const { Router } = require('express');
const { errorController } = require('../controllers');

const errorRouter = Router();

errorRouter.get('/', errorController.getError);

module.exports = errorRouter;
