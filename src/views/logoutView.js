import { logout } from "../services/userServices.js";

export async function logoutUser(ctx) {
    await logout();
    ctx.redirect('/');
    localStorage.clear();

    let logoutMsg = document.getElementById('logout-message');
    let loginMsg = document.getElementById('login-message');
    loginMsg.style.display = 'none';
    logoutMsg.style.display = "flex";
    
    setTimeout(function () {
        logoutMsg.style.display = "none";
    }, 2000);
}
