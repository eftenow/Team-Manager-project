import { html } from '../../node_modules/lit-html/lit-html.js';


export const editTemplate = (team, saveChangesHandler, ctx) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit="${(e)=> saveChangesHandler(e, ctx)}" id="edit-form" class="main-form pad-large">
            <div class="error"></div>
            <label>Team name:<input value="${team.name}" type="text" name="name"></label>
            <label>Logo URL:<input value="${team.logoUrl}" type="text" name="logoUrl"></label>
            <label>Description:<textarea name="description">${team.description}</textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
    
</section>`