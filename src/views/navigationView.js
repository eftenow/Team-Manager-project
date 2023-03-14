import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getUser, getUserId } from '../services/userServices.js';


const navTemplate = (userId) => html`
    <a href="/" class="site-logo">Team Manager</a>
    <nav>
        <a href="/teams" class="action">Browse Teams</a>

        ${userId === null
        ? html`<a href="/login" class="action">Login</a>
        <a href="/register" class="action">Register</a>`
        : html`
        <a href="/myTeams/${userId}" class="action">My Teams</a>
        <a href="/logout" class="action">Logout</a>`}

    </nav>

`
const mainRootElement = document.getElementById('content');

export function renderNavigation(ctx) {
    let userId = getUserId();
    let navigation = navTemplate(userId);

    //ctx.render(navigation);

    render(navigation, document.querySelector('header'));

}