import { render } from '../../node_modules/lit-html/lit-html.js';
import { renderNavigation } from '../views/navigationView.js';
import  page  from '../../node_modules/page/page.mjs';

const mainRootElement = document.querySelector('main');

export function setUpMiddleware(ctx, next) {
    renderNavigation(ctx);
    
    ctx.render = (content) => render(content, mainRootElement);
    ctx.redirect = (location) => page.redirect(location);
    
    next();
}