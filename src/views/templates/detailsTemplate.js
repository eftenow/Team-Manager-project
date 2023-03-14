import { html } from '../../../node_modules/lit-html/lit-html.js';

export const detailsTemplate = (data, members, userView) => html`
<section id="team-home">
    <article class="layout">
        <img src="${data.logoUrl}" class="team-logo left-col" onerror="this.onerror=null;this.src='../../../assets/base-grp.png';">
        <div class="tm-preview">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <span class="details">${members.length} Members</span>
            <div>

            </div>
        </div>
        ${userView}
    </article>
</section>`