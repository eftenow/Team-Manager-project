import { getAccessToken } from "./userServices.js";

const baseUrl = 'http://localhost:3030/data';


export async function getAllExistingTeams(page) {
    let pageSize = 3;
    let querystring = `/teams?offset=${(page - 1) * pageSize}&pageSize=3`;
    let response = await fetch(baseUrl + querystring);
    return response.json()
}

export async function createNewTeam(newTeam) {
    let accessToken = getAccessToken();
    console.log(newTeam);
    let response = await fetch(`${baseUrl}/teams`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(newTeam)
    })
    return response.json()
}

export async function editTeamReq(teamId, editedTeam) {
    const accessToken = getAccessToken();
    let response = await fetch(`${baseUrl}/teams/${teamId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(editedTeam)
    });
}

export async function getMembersCountOfTeam(teamId) {
    const search = new encodeURIComponent()
    let response = await fetch(baseUrl + '')
};

export async function getTeamDetails(id) {
    const response = await fetch(`${baseUrl}/teams/${id}`);
    return response.json();
};

export async function getMembersAndCandidates(id) {
    const response = await fetch(`${baseUrl}/members?where=teamId%3D%22${id}%22&load=user%3D_ownerId%3Ausers`);
    return response.json();
};

export async function getAllMembers() {
    const response = await fetch(`${baseUrl}/members?where=status%3D%22member%22`);

    return response.json();
};

export async function getAllTeamsIncludingTheMember(id) {
    const response = await fetch(`${baseUrl}/members?where=_ownerId%3D%22${id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);

    return response.json();
}


export async function joinTeamRequst(teamId) {
    const accessToken = getAccessToken();
    let res = await fetch(`${baseUrl}/members`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify({ teamId })
    });
    let data = await res.json();
    return data;

};

export async function declineCancelLeaveReq(id) {
    let options = {
        'method': 'DELETE',
        'headers': {}
    }
    const accessToken = getAccessToken();
    if (accessToken !== null) {
        options.headers['X-Authorization'] = accessToken;
    }

    await fetch(`${baseUrl}/members/${id}`, options)

}

export async function approveMemberReq(id, member) {
    const accessToken = getAccessToken();
    let res = await fetch(`${baseUrl}/members/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(member)
    });
    let data = await res.json();
    const requestId = data._id;

}

export async function getUsersTeams(userId) {
    console.log(userId);
    let response = await fetch(`${baseUrl}/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
    return response.json();
}


export async function getSpecificTeam(searchTeam) {
    let queryStr = '?where=' + encodeURIComponent(`name LIKE "${searchTeam}"`);
    let url = 'http://localhost:3030/data/teams';
    console.log(url + queryStr);

    let res = await fetch(url + queryStr);
    return await res.json();
}

export async function getAllTeamsCount() {
    let res = await fetch(baseUrl + '/teams?count');
    return res.json();
}