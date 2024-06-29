import { Tables } from "../../../types/supabase";
import { User, Rank, Referral, Quest } from "../../../types/types";

import axios, { AxiosError } from 'axios'
const HOST = '2118-2a02-4780-c-dee4-00-1.ngrok-free.app'
const PORT = 80
// Get users data
// export async function getUsers(
// 	//client: SupabaseClient<Database, "public">,
// 	from: number,
// 	to: number
// ) :Promise<User[] | null>  {
//     const data = { from, to }
//     const route = 'telegram/user'

//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization':`Bearer ${localStorage.getItem('token')}`
//     }
//     const withCredentials = true

//     const options = {
//         headers,
//         withCredentials,
//         data
//     }

//    const protocol = 'https'
//    const url = `${protocol}://${HOST}:${PORT}/api/${route}`
//    const { responseData, error } = await axios
//         .get(url, options)
//         .then((response) => response.data)
//         .catch((error) => error)

//    return responseData
// }

export async function getTopPlayers(
	//client: SupabaseClient<Database, "public">,
) :Promise<User[] | null>  {
    const data = {}
    const route = 'player/top'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
        data
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .get(url, options)
        .then((response) => response.data)
        .catch((error) => error)

   return responseData
}

// Get user data by telegram ID
export async function getUserTelegramId(
	tgId: number
) : Promise<User | null> {
    
    const data = {}
    const route = `player/${tgId}`

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
        data
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .get(url, options)
        .then((response) => response.data)
        .catch((error) => error)

   return responseData
}

export async function getSessionPlayer() : Promise<User | null> {
    
    const data = {}
    const route = `player/me`

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
        data
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .get(url, options)
        .then((response) => response.data)
        .catch((error) => error)

   return responseData
}

// Get users data filtered by referral ID
export async function getUsersByReferral(
	referralId: number,
) : Promise<User[] | null> {
    const data = { referralId }
    const route = 'referrals/quest'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
        data
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .get(url, options)
        .then((response) => response.data)
        .catch((error) => error)

   return responseData
}

// Get users data filtered by referral ID
export async function getReferralByUserId(
	userId: number,
) : Promise<Referral | null> {
    const data = { userId }
    const route = 'referrals/quest'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
        data
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .get(url, options)
        .then((response) => response.data)
        .catch((error) => error)

    return responseData
}

// Get ranks data
export async function getRanks() : Promise<Rank[] | null> {
	const data = {}
    const route = 'ranks'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
        data
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .get(url, options)
        .then((response) => response.data)
        .catch((error) => error)

    return responseData
}

// Get quests data based on player ID
export async function getUserQuests(
	userId: number
) : Promise<Quest[] | null> {
    const data = { userId }
    const route = 'quests'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
        data
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .get(url, options)
        .then((response) => response.data)
        .catch((error) => error)

    return responseData
}

// Insert user row
export async function addUser(
    user: { id_tg: number; username: string | null; premium: boolean; balance?: number, referrer_id?: number}
) : Promise<User | null> {
    const data = { user }
    const route = 'user'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .post(url, data, options)
        .then((response) => response.data)
        .catch((error) => error)

    return responseData

}

// Insert join users_quests row
export async function addJoinUsersQuests(
    userId: number
) :Promise<Quest[] | null> {
    const data = { userId }
    const route = 'quest'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .post(url, data, options)
        .then((response) => response.data)
        .catch((error) => error)

    return responseData
}

// Update user data by ID
export async function updateUserBonus(
	user: Tables<'users'>,
    balance: number
) {
    const data = { user, balance }
    const route = 'user/balance'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .put(url, data, options)
        .then((response) => response.data)
        .catch((error) => error)

    return responseData
}

// Update user data by ID
export async function updateUserStats(
	user: Tables<'users'>,
) {
    const data = { user }
    const route = 'user/stats'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }
    const withCredentials = true

    const options = {
        headers,
        withCredentials,
    }

   const protocol = 'https'
   const url = `${protocol}://${HOST}:${PORT}/api/${route}`
   const { responseData, error } = await axios
        .put(url, data, options)
        .then((response) => response.data)
        .catch((error) => error)

    return responseData
}


// Fetch player data from 'Players' table
export async function getPlayer(
    tgId: number
) {
    /*
    const { data, error } = await client
    .from('Players')
    .select()
    .eq('tg_id', tgId);

	if (error || data.length === 0) return;

    return data[0];
    */
}

// Fetch player data from 'Players' table
export async function getPlayerById(
    playerId: number
) {
    /*
    const { data, error } = await client
    .from('Players')
    .select()
    .eq('id', playerId);

	if (error || data.length === 0) return;

    return data[0];
    */
}

// Insert player and referral data into 'Players' and 'Referrals' tables
export async function addPlayerAndReferral(
    playerData: Tables<'Players'>,
	referralData: Tables<'Referrals'>
) {
    /*
    const { data, error: errorPlayers } = await client
    .from('Players')
    .insert(playerData)
    .select();
    if (errorPlayers || data.length === 0) return;

	const { error: errorReferrals } = await client
    .from('Referrals')
    .insert({
		referral_id: data[0].id,
		code: referralData.code
	});

	if (errorReferrals) return;

    return data[0];
    */
}

// Fetch all referred players from 'Players' and 'Referrals' tables
export async function getPlayerReferrals(
    playerId: number
) {
	/*
    const { data: dataReferrals, error: errorReferrals } = await client
    .from('Referrals')
    .select()
    .eq('referral_id', playerId);

	if (errorReferrals || dataReferrals.length === 0) return;

    const { data: dataPlayers, error: errorPlayers } = await client
    .from('Players')
    .select()
    .eq('referred_by_id', dataReferrals[0].id);

    if (errorPlayers || dataPlayers.length === 0) return;

    return dataPlayers;
    */
}

// Fetch referral by code from 'Referrals' table
export async function getReferral(
    code: string
) {
    // const { data, error } = await client
    // .from('Referrals')
    // .select()
    // .eq('code', code);

    // if (error) return;

    // return data[0];
}

// Fetch early referral bonuses by code from 'Referrals' table
export async function getReferralEarlyBonuses(
    playerId: number
) {
    // const { data, error } = await client
    // .from('Referrals_Early_Bonuses')
    // .select()
    // .eq('player_id', playerId);

    // if (error) return;

    // return data[0];
}

// Insert early referral bonuses by code from 'Referrals' table
export async function addReferralEarlyBonus(
    referralEarlyBonus: Tables<'Referrals_Early_Bonuses'>
) {
    // const { data, error } = await client
    // .from('Referrals_Early_Bonuses')
    // .insert(referralEarlyBonus)
	// .select();

    // if (error) return;

    // return data[0];
}

// Update early referral bonuses by code from 'Referrals' table
export async function updateReferralEarlyBonus(
    referralEarlyBonus: Tables<'Referrals_Early_Bonuses'>
) {
    // const { data, error } = await client
    // .from('Referrals_Early_Bonuses')
    // .update({
	// 	honey: referralEarlyBonus.honey,
	// 	multiplier: referralEarlyBonus.multiplier
	// })
	// .eq('player_id', referralEarlyBonus.player_id!);

    // if (error) return;

    // return true;
}

// Fetch player levels data 'Levels_Player' table
export async function getLevelsPlayer() {
    // const { data, error } = await client
    // .from('Levels_Player')
    // .select();

    // if (error || data.length === 0) return;

    // return data;
}

// Fetch mines data from 'Mines' table
export async function getMines() {
    // const { data, error } = await client
    // .from('Mines')
    // .select();

	// if (error || data.length === 0) return;

    // return data;
}

// Fetch mine levels data from 'Levels_Mine' table
export async function getLevelsMine() {
    // const { data, error } = await client
    // .from('Levels_Mine')
    // .select();

	// if (error || data.length === 0) return;

    // return data;
}

// Update latest player info/stats into 'Players' table
export async function updatePlayer(
    data: Tables<'Players'>
) {
    // const { error } = await client
    // .from('Players')
    // .update({
	// 	honey_latest: data.honey_latest,
	// 	honey_max: data.honey_max,
	// 	level_id: data.level_id,
	// })
    // .eq('tg_id', data.tg_id!);

    // if (error) return;

    // return true;
}
