import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getUser, getUserId } from '../services/userServices.js';


const navTemplate = (userId, username) => html`
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

    <section @click="${hideMsg}" id="login-message" class="action">
        <p>Welcome, ${username}!</p>
    </section>
    <section @click="${hideMsg}" id="logout-message" class="action">
        <p>You have successfully logged out!</p>
    </section>
    <section @click="${hideMsg}" id="remove-message" class="action">
        <p>You have removed ${username} from the team!</p>
    </section>

`
const mainRootElement = document.getElementById('content');

export function renderNavigation(ctx) {
    let userId = getUserId();
    let username = getUser();
    let navigation = navTemplate(userId, username);

    //ctx.render(navigation);

    render(navigation, document.querySelector('header'));

}

function hideMsg() {
    let loginMsg = document.getElementById('login-message');
    let logoutMsg = document.getElementById('logout-message');

    logoutMsg.style.display = 'none'
    loginMsg.style.display = 'none'
}