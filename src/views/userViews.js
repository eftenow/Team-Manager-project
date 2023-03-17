import { html } from '../../node_modules/lit-html/lit-html.js';
import { editHandler, removeHandler, declineHandler, approveHandler, cancelRemoval, confirmRemoval } from '../services/guildBtnHandlers.js';
import { hideMsg } from './navigationView.js';

export const ownerViewTemplate = (ctx, members, candidates, ownerId, removed) => html`
<a href="#" @click="${(e) => editHandler(e, ctx)}" class="action">Edit Team</a>
<div class="pad-large">
    <h3>Members</h3>
    
    
    <ul class="tm-members">
        ${members.map(member => html`
        <li> <span class='memberName'>${member.user.username}</span>
            ${ownerId !== member.user._id ? html`<a href="#" class="tm-control action"
                @click="${(e) => removeHandler(e, ctx)}">Remove from team</a>` : ''} </li>`)}
    </ul>
</div>

<section @click="${hideMsg}" id="remove-message" class="remove">
    <p>You have removed ${removed} from the team!</p>
</section>

<div class="pad-large">
    <h3>Membership Requests</h3>
    <ul class="tm-members">

        ${candidates.map(candidate => html`
        <li><span class='candidateName'>${candidate.user.username}</span>
            <a href="#" @click="${(e) => approveHandler(e, ctx)}" class="tm-control action">Approve</a>
            <a @click="${(e) => declineHandler(e, ctx)}" href="#" class="tm-control action">Decline</a></li>`)}
    </ul>
</div>
`;

export const nonAppliedTemplate = (ctx, members, joinHandler, isGuest) => html`
${isGuest === true
        ? ''
        : html`<a href="#" @click="${(e) => joinHandler(e, ctx)}" class="action">Join team</a>`}
<div class="pad-large">
    <h3>Members</h3>
    <ul class="tm-members">
        ${members.map(member => html`
        <li id="${member._id}"> ${member.user.username} </li>`)}
    </ul>
</div>
`

export const appliedTemplate = (ctx, members, candidates, leaveTeamHandler, reqId, isMember) => html`
${isMember
? html`<a id="${reqId}" @click="${(e) => leaveTeamHandler(e, ctx)}" href="#" class="action invert">Leave team</a>`
: html`<span>Membership pending.</span> <a id="${reqId}" @click="${(e) => leaveTeamHandler(e, ctx)}" href="#">Cancel
    request</a>`}

<div class="pad-large">
    <h3>Members</h3>
    <ul class="tm-members">
        ${members.map(member => html`
        <li id="${member._id}"> ${member.user.username}</li>`)}
    </ul>
</div>
<div class="pad-large">
    <h3>Membership Requests</h3>
    <ul class="tm-members">

        ${candidates.map(candidate => html`
        <li>${candidate.user.username}</li>`)}
    </ul>
</div>
`


