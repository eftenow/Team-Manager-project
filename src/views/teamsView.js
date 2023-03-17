import { html } from '../../node_modules/lit-html/lit-html.js';
import { getTeamMembers, searchHandler } from '../services/guildBtnHandlers.js';
import { getAllExistingTeams, getAllTeamsCount, PAGE_SIZE } from '../services/teamsServices.js';
import { getUser } from '../services/userServices.js';

export const teamTemplate = (data) => html`
<article class="layout">
    <img src="${data.logoUrl}" class="team-logo left-col"
        onerror="this.onerror=null;this.src='../../assets/base-grp.png';">
    <div class="tm-preview">
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <span class="details">${data.membersCount} Members</span>
        <div><a href="/teamDetails/${data._id}" class="action">See details</a></div>
        <p></p>
    </div>
</article>`

export const teamsTemplate = (teams, isAuthorized, currentPage, pagesCount) => html`
<section id="browse">

    <article class="pad-med browse-section">
        <h1>Team Browser</h1>

        <div>
            <input id="searchInput" type="text" name="search" placeholder="Search teams...">
            <a href="#" @click="${searchHandler}" id='searchBtn' class='action searchBtn'>Search</a>
        </div>

    </article>

    ${isAuthorized !== null
    ? html`<article class="layout narrow">
        <div class="pad-small"><a href="/createView" class="action cta">Create Team</a></div>
    </article>`
    : ''}

    ${teams.map(team => teamTemplate(team))}

    <ul class="pagination">
        ${currentPage > 1
        ? html`<li class="page-item action"><a href="?page=${currentPage - 1}" class="page-link">Previous</a></li>`
            : ''}
        ${displayPages(currentPage, pagesCount).map(pageNumber => html`
        <li class="page-item action"><a href="?page=${pageNumber}" class="page-link">${pageNumber}</a></li>`)}

        ${currentPage < pagesCount
        ? html`<li class="page-item action"><a href="?page=${currentPage + 1}" class="page-link">Next</a></li>`
            : ''}
        
    </ul>
</section>

</section>`

export async function teamsPage(ctx) {
    let searchParams = new URLSearchParams(ctx.querystring);
    let currentPage = Number(searchParams.get('page') || 1);
    let promises = Promise.all([
        getAllTeamsCount(currentPage),
        getAllExistingTeams(currentPage)
    ])

    let [totalTeamsCount, existingTeams] = await promises;
    let pagesCount = Math.ceil(Number(totalTeamsCount) / PAGE_SIZE);

    showTeams(existingTeams, ctx, currentPage, pagesCount);
};

export async function showTeams(teams, ctx, currentPage, pagesCount) {
    let authorized = getUser();
    for (const team of teams) {
        let teamMembers = await getTeamMembers(team._id);
        team.membersCount = teamMembers.length;
    }
    let renderTeams = teamsTemplate(teams, authorized, currentPage, pagesCount);
    ctx.render(renderTeams);
}


function displayPages(currentPage, totalPages) {
    let first = Math.max(currentPage - 1, 1);
    let second = first + 1;
    let third = first + 2;
    
    let pages = [first];
    if (second <= totalPages){
        pages.push(second);
    };
    if (third <= totalPages){
        pages.push(third);
    } else if(third > totalPages && first - 1 > 0){
        pages.unshift(first-1);
    }
    return pages;
}