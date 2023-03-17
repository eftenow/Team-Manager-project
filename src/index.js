import page from '../node_modules/page/page.mjs';
import { setUpMiddleware } from './middlewares/renderMiddleware.js';
import { homePage } from './views/homeView.js';
import { teamsPage } from './views/teamsView.js';
import { loginPage } from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { myTeamsPage } from './views/myTeamsView.js';
import { logoutUser } from './views/logoutView.js';
import { createPage } from './views/createView.js';
import { detailsPage } from './views/detailsView.js';
import { searchedTeamsPage } from './services/guildBtnHandlers.js';

page(setUpMiddleware);

page('/', homePage);
page('/index.html', homePage);
page('/teams', teamsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/myTeams/:id', myTeamsPage);
page('/logout', logoutUser);
page('/createView', createPage);
page('/teamDetails/:id', detailsPage);
page('/teams/search', searchedTeamsPage);
  
page.start();