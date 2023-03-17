import { getUsersTeams } from '../services/teamsServices.js';
import { getUserId } from '../services/userServices.js';
import { showTeams } from './teamsView.js';


export async function myTeamsPage(ctx) {
    let userId = getUserId();

    let teams = await getUsersTeams(userId);
    let userTeams = teams.map(t => t.team);

    showTeams(userTeams, ctx)

}
