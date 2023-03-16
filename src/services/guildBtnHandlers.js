import { editTemplate } from "../views/editView.js";
import page from "../../node_modules/page/page.mjs";
import { approveMemberReq, declineCancelLeaveReq, editTeamReq, getAllMembers, getMembersAndCandidates, getSpecificTeam, getTeamDetails, joinTeamRequst } from "./teamsServices.js";
import { teamCreateEditValidator, validateTeamDescription, validateTeamLogoUrl, validateTeamName } from "./validators.js";
import { showTeams } from "../views/teamsView.js";
import { getLastRemovedMember } from "./userServices.js";

function getMemberByName(name, members) {
    return members.find(m => m.user.username === name);
};

function getCandidateByName(name, candidates) {
    return candidates.find(c => c.user.username === name);
};

export async function getTeamMembers(teamId) {
    let membersAndCandidates = await getMembersAndCandidates(teamId);
    return membersAndCandidates.filter(m => m.status == 'member');

}

export async function getTeamCandidates(teamId) {
    let membersAndCandidates = await getMembersAndCandidates(teamId);
    return membersAndCandidates.filter(m => m.status == 'pending');
}

export async function joinHanlder(ev, ctx) {
    ev.preventDefault();
    const joinBtn = ev.target;
    const teamId = ctx.params.id;

    await joinTeamRequst(teamId);

    ctx.redirect(`/teamDetails/${teamId}`);

};


export async function leaveTeamHandler(ev, ctx) {
    ev.preventDefault();
    const cancelBtn = ev.target;
    const requestId = cancelBtn.id;
    const teamId = ctx.params.id;

    await declineCancelLeaveReq(requestId);
    ctx.redirect(`/teamDetails/${teamId}`);
};

export async function editHandler(ev, ctx) {
    ev.preventDefault();
    const teamId = ctx.params.id;
    const teamData = await getTeamDetails(teamId);
    const editTeam = editTemplate(teamData, saveChangesHandler, ctx);
    ctx.render(editTeam);
}

async function saveChangesHandler(ev, ctx) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const teamId = ctx.params.id;

    const name = form.get('name');
    const logoUrl = form.get('logoUrl');
    const description = form.get('description');
    const editTeam = { name, logoUrl, description };

    const errorField = document.querySelector('.error');

    teamCreateEditValidator(name, logoUrl, description, errorField);

    editTeamReq(teamId, editTeam);


    ctx.redirect(`/teamDetails/${teamId}`);


}

export async function confirmRemoval(ev, ctx) {
    document.getElementById('modal').style.display = 'none';
    const memberName =  getLastRemovedMember();
    const teamId = ctx.params.id;
    const teamMembers = await getTeamMembers(teamId);

    const memberObj = getMemberByName(memberName, teamMembers);
    const memberId = memberObj._id;

    await declineCancelLeaveReq(memberId);

    ctx.redirect(`/teamDetails/${teamId}`);

    let removeMsg = document.getElementById('remove-message');

    removeMsg.style.display = "flex";
    setTimeout(function () {
        removeMsg.style.display = "none";
    }, 2000);
}

export function cancelRemoval(ev) {
    document.getElementById('modal').style.display = 'none';
    return;
}


export async function removeHandler(ev, ctx) {
    ev.preventDefault();
    document.getElementById('modal').style.display = 'block';
    const memberName = ev.target.parentNode.children[0].textContent;
    localStorage.setItem('removedMember', memberName);
    ctx.redirect(`/teamDetails/${ctx.params.id}`);

    
}


export async function approveHandler(ev, ctx) {
    ev.preventDefault();
    const teamId = ctx.params.id;
    const candidates = await getTeamCandidates(teamId);
    const candidateName = ev.target.parentNode.children[0].textContent;
    const candidateObj = getCandidateByName(candidateName, candidates);
    const candidateId = candidateObj._id;
    candidateObj.status = 'member';
    approveMemberReq(candidateId, candidateObj);
    ctx.redirect(`/teamDetails/${teamId}`);

}

export async function declineHandler(ev, ctx) {
    ev.preventDefault();
    const teamId = ctx.params.id;
    const candidates = await getTeamCandidates(teamId);
    const candidateName = ev.target.parentNode.children[0].textContent;

    const candidateObj = getCandidateByName(candidateName, candidates);
    const candidateId = candidateObj._id;

    declineCancelLeaveReq(candidateId);
    ctx.redirect(`/teamDetails/${teamId}`);
}

export async function searchHandler(ev) {
    ev.preventDefault();
    const searchText = ev.target.previousElementSibling;
    
    page.redirect(`/teams/search?match=${encodeURIComponent(searchText.value)}`);
    searchText.value = '';

}
export async function searchedTeamsPage(ctx) {

    console.log(ctx.querystring);
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchText = searchParams.get('match');
    const teamsThatMeetCriteria = await getSpecificTeam(searchText);
    showTeams(teamsThatMeetCriteria, ctx);


}