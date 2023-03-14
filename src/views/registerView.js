import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userServices from "../services/userServices.js";
import { onFocusEmail, onFocusPassword, onFocusRePass, onFocusUsername, registrationValidator, validateEmail, validatePassword, validateRepeatPass, validateUsername } from '../services/validators.js';


const registerTemplate = (onRegisterHandler) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form  @submit="${onRegisterHandler}" id="register-form" class="main-form pad-large">
            <div class="error"></div>
            <label >E-mail: <input id = "email" @focus = "${onFocusEmail}" @blur="${validateEmail}" type="text" name="email"></label>
            <label>Username: <input id = "username" @focus = "${onFocusUsername}" @blur="${validateUsername}" type="text" name="username"></label>
            <label>Password: <input id = "pass" @focus = "${onFocusPassword}" type="password" @blur="${validatePassword}" name="password"></label>
            <label>Repeat: <input id = "rePass" type="password" @focus = "${onFocusRePass}" @blur="${validateRepeatPass}" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`

export function registerPage(ctx) {
    let register = registerTemplate(onRegisterHandler);
    ctx.render(register);

    async function onRegisterHandler(ev) {
        ev.preventDefault();
        const form = new FormData(ev.target);
        const email = form.get('email');
        const username = form.get('username');
        const password = form.get('password');
        const repassword = form.get('repass');

        const errorField = document.querySelector('.error');

        registrationValidator(email, username, password, repassword, errorField);
        let regErrorMsg = await userServices.register(username, email, password);
        let errorMsg = document.createElement('p');
        if (regErrorMsg) {
            errorMsg.textContent = regErrorMsg;
            errorField.replaceChildren(errorMsg);
            throw new Error();
        }
        ctx.redirect('/');
    }

}

encodeURIComponent("=Storm Troopers")

