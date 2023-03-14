import { logout } from "../services/userServices.js";

export function logoutUser(ctx) {
    logout();
    ctx.redirect('/');
    localStorage.clear();
}
