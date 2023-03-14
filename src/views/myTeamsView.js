import { html } from '../../node_modules/lit-html/lit-html.js';
import { getTeamMembers } from '../services/guildBtnHandlers.js';
import { getUsersTeams } from '../services/teamsServices.js';
import { getUser, getUserId } from '../services/userServices.js';
import { showTeams, teamsTemplate } from './teamsView.js';

const myTeams = () => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    <article class="layout narrow">
        <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
    </article>

    <article class="layout">
        <img src="./assets/atat.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Storm Troopers</h2>
            <p>These ARE the droids we're looking for</p>
            <span class="details">5000 Members</span>
            <div><a href="#" class="action">See details</a></div>
        </div>
    </article>

    <article class="layout">
        <img src="./assets/rocket.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Team Rocket</h2>
            <p>Gotta catch 'em all!</p>
            <span class="details">3 Members</span>
            <div><a href="#" class="action">See details</a></div>
        </div>
    </article>

    <article class="layout">
        <img src="./assets/hydrant.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Minions</h2>
            <p>Friendly neighbourhood jelly beans, helping evil-doers succeed.</p>
            <span class="details">150 Members</span>
            <div><a href="/createTeam" class="action">See details</a></div>
        </div>
    </article>

</section>`



export async function myTeamsPage(ctx) {
    let userId = getUserId();

    let teams = await getUsersTeams(userId);
    let userTeams = teams.map(t => t.team);

    showTeams(userTeams, ctx)

}
