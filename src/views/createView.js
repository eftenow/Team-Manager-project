import { html } from '../../node_modules/lit-html/lit-html.js';
import { getTeamCandidates } from '../services/guildBtnHandlers.js';
import { approveMemberReq, createNewTeam, joinTeamRequst } from '../services/teamsServices.js';
import { teamCreateEditValidator, validateTeamDescription, validateTeamLogoUrl, validateTeamName } from '../services/validators.js';

export const createTemplate = (createTeam) => html`

    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form @submit="${createTeam}" id="create-form" class="main-form pad-large">
                <div class="error"></div>
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
    </section>
`

export function createPage(ctx) {
    let create = createTemplate(createTeam);
    ctx.render(create);

    async function createTeam(ev) {
        ev.preventDefault();
        const form = new FormData(ev.target);
        const name = form.get('name');
        const logoUrl = form.get('logoUrl');
        const description = form.get('description');
        const newTeam = { name, logoUrl, description };

        const errorField = document.querySelector('.error');

        teamCreateEditValidator(name, logoUrl, description, errorField);

        let createdTeam = await createNewTeam(newTeam);
        let teamId = createdTeam._id;

        initializeNewTeam(teamId, ctx);

    }
}

async function initializeNewTeam(teamId, ctx) {
    let ownerRequest = await joinTeamRequst(teamId);
    let candidates = await getTeamCandidates(teamId);
    const owner = candidates[0];

    owner.status = 'member';

    approveMemberReq(ownerRequest._id, owner);
    ctx.redirect(`/teamDetails/${teamId}`);

}