const { Router } = require('express');
const { mainController } = require('../controllers');

const mainRouter = Router();

mainRouter.get('/', mainController.renderMainPage);

module.exports = mainRouter;
