import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userServices from "../services/userServices.js";
import { onFocusClearLoginForm } from '../services/validators.js';

const loginTemplate = (onLoginHandler, ctx) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit="${(e) => onLoginHandler(e, ctx)}" id="login-form" class="main-form pad-large">
            <div class="error"></div>
            <label>E-mail: <input @focus="${onFocusClearLoginForm}" type="text" name="email"></label>
            <label>Password: <input @focus="${onFocusClearLoginForm}" type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
    
</section>`



export function loginPage(ctx) {
    let login = loginTemplate(onLoginHandler, ctx);
    ctx.render(login);


}

async function onLoginHandler(ev, ctx) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const email = form.get('email');
    const password = form.get('password');

    const errorField = document.querySelector('.error');

    let loginErrorMsg = await userServices.login(email, password);
    if (loginErrorMsg) {
        let errorMsg = document.createElement('p');
        errorMsg.textContent = loginErrorMsg;
        errorMsg.id = 'wrong-login';
        errorField.replaceChildren(errorMsg);
        throw new Error()
    }
    ctx.redirect('/');
    let loginMsg = document.getElementById('login-message');
    let logoutMsg = document.getElementById('logout-message');

    logoutMsg.style.display = 'none';

    loginMsg.style.display = "flex";
    setTimeout(function () {
        loginMsg.style.display = "none";
    }, 2000);
};


