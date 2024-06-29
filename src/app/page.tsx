'use client'

import Image from 'next/image';
import { useData } from "@/controllers/context";
import { useRouter } from "next/navigation";
import React from "react";
import { InitData, retrieveLaunchParams, useInitData, useMiniApp, User, useViewport } from '@tma.js/sdk-react';
import { Tables } from '../../types/supabase';

import { REWARD_COMMON_REFERRER, REWARD_PREMIUM_REFERRER } from '@/constants';
import { useTelegramMock } from '@/hooks/useTelegramMock';
import { 
	getUsersByReferral,
	//getUserTelegramId,
	getRanks,
	getUserQuests,
	//getUsers,
	getTopPlayers,
	getSessionPlayer,
	//addUser, 
	//addJoinUsersQuests,
	updateUserBonus,
} from '@/services/network/AxiosService';
import AuthSerive from '@/services/AuthService';

export default function Home() {

	const router = useRouter();
	const miniApp = useMiniApp(true);
	const initData = useInitData(true);
	const viewport = useViewport(true);

	const {
		supabase,
		isNew,
		user,
		setStateUser,
		setStateRanks,
		setStateUserRank,
		setStateIsNew,
		setStateIsPhone,
		setStateJustReferred,
		setStateLeaders,
		setStateFriends,
		setStateQuests
	} = useData()!;

	const [isLoadError, setIsLoadError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	useTelegramMock();
	const handleTelegramMiniAppEvents = React.useCallback(async () => {
		if (!viewport) return;

		viewport.expand();
		if (typeof window !== 'undefined') {
			const launchParams = retrieveLaunchParams();
			setStateIsPhone(
			launchParams.platform === 'android' ||
			launchParams.platform === 'android_x' ||
			launchParams.platform === 'ios'
			);
		}


	}, [setStateIsPhone, viewport]);

	const handleSessionPlayerLoaded = React.useCallback(async () => {
		if (user) {
			router.push(isNew ? '/intro' : '/play');
		}
	}, [isNew, router, user]);

	const fetchRanksData = React.useCallback(async (_user: Tables<'users'>) => {
		const ranks = await getRanks();
		if (!ranks) return;

		const currentRank = ranks.find(rank => rank.id === _user.rank_id) || ranks[0];
		setStateRanks(ranks);
		setStateUserRank(currentRank);
	}, [setStateRanks, setStateUserRank]);

	const fetchUserInteraction = React.useCallback(async (user: Tables<'users'>) => {
		const [responseLeaders, responseReferrers, responseQuests] = await Promise.all([
			//getUsers(0, 1000), // getTopPlayers -> 
			getTopPlayers(),
			getUsersByReferral(user.id),
			getUserQuests(user.id)
		]);

		if (!responseLeaders || !responseReferrers || !responseQuests) return console.log("ERROR");

		setStateLeaders(responseLeaders);
		setStateFriends(responseReferrers);
		setStateQuests(responseQuests);
	}, [setStateFriends, setStateLeaders, setStateQuests]);

	// const handleBonusForReferral = React.useCallback(async (referral: Tables<'users'>) => {
	// 	const playerReferrals = await getUsersByReferral(supabase, referral.id);
	// 	if (!playerReferrals) return false;

	// 	const refCount = playerReferrals.length + 1;
	// 	const basicReward = 50000;
	// 	let multiplierIncrease = 0;
	// 	let totalReward = 0;

	// 	for (let idx = 0; idx < refCount; idx++) {
	// 		if (!playerReferrals[idx]) continue;

	// 		const referralReward = playerReferrals[idx].premium ? REWARD_PREMIUM_REFERRER : REWARD_COMMON_REFERRER;

	// 		if (idx < 50) multiplierIncrease += 0.006;
	// 		else if (idx < 100) multiplierIncrease += 0.004;
	// 		else if (idx < 200) multiplierIncrease += 0.002;
	// 		else if (idx < 300) multiplierIncrease += 0.001;
	// 		else if (idx < 500) multiplierIncrease += 0.0005;
	// 		else if (idx < 1000) multiplierIncrease += 0.0002;
	// 		else if (idx < 5000) multiplierIncrease += 0.000125;
	// 		else if (idx < 10000) multiplierIncrease += 0.0001;
	// 		else if (idx < 30000) multiplierIncrease += 0.00005;
	// 		else if (idx < 50000) multiplierIncrease += 0.000025;
	// 		else if (idx < 100000) multiplierIncrease += 0.00001;
	// 		else if (idx < 1000000) multiplierIncrease += 0.000004444444444;
	// 		else if (idx < 10000000) multiplierIncrease += 0.0000008888888889;
	// 		else multiplierIncrease += 0.0000001777777778;

	// 		totalReward += referralReward * (1 + multiplierIncrease);
	// 	}

	// 	const rewards = { balance: Math.floor(totalReward) + basicReward };

	// 	return await updateUserBonus(supabase, referral.id, rewards.balance);
	// }, [supabase]);

	// const addUserData = React.useCallback(async (miniAppData: InitData, tgUser: User) => {
	// 	const reward = tgUser.isPremium ? REWARD_PREMIUM_REFERRER : REWARD_COMMON_REFERRER;
	// 	const userData: { id_tg: number; username: string | null; premium: boolean; balance?: number, referrer_id?: number} = {
	// 		id_tg: tgUser.id,
	// 		username: tgUser.username || null,
	// 		premium: tgUser.isPremium || false,
	// 	};
	// 	let sessionUser;

	// 	if (miniAppData.startParam) {
	// 		const [_, referralId] = miniAppData.startParam.split('-');
			
	// 		//const referralUser = await getUserTelegramId(supabase, +referralId);
	// 		const referralUser = await getUserTelegramId(+referralId);
	// 		// 

	// 		if (referralUser) {
	// 			userData.referrer_id = referralUser.id;
	// 			userData.balance = reward;

	// 			if (await updateUserBonus(referralUser, reward)) {
	// 				console.log("REWARDS FOR REFERRAL");

	// 				setStateJustReferred({
	// 					isNew: true,
	// 					referralUsername: referralUser.username || "friend",
	// 					reward: tgUser.isPremium ? 25000 : 5000
	// 				});
	// 			}
	// 		}

	// 		//sessionUser = await addUser(userData);
	// 	}
	// 	if (!sessionUser) return null;

	// 	//const responseUserQuests = await addJoinUsersQuests(sessionUser.id);
	// 	//if (!responseUserQuests) return null;

	// 	//await updateUserBonus(sessionUser, reward);

	// 	//setStateIsNew(true);

	// 	return sessionUser;
	// }, [setStateJustReferred]);

	const fetchPlayerData = React.useCallback(async (miniAppData: InitData) => {
		handleTelegramMiniAppEvents();

		const tgUser = miniAppData.user;
		if (!tgUser) return;

		const authResponse = await AuthSerive.login(`${tgUser.id}`, tgUser.isPremium || false, tgUser.username || "");
		if (!authResponse) {
			console.log("LOGIN ERROR");
			return;
		}
		console.log(authResponse.data)
		const accessToken = authResponse.data.accessToken;
		if (!accessToken) {
			console.log("Access Token Unknown");
			return;
		}
		localStorage.setItem('token', accessToken);

		//let sessionPlayer = getUserTelegramId(tgUser.id);
		const player = authResponse.data.player//await getSessionPlayer()//
		let sessionPlayer = {
			balance: player.balance,
			id: Number(player.id),
			referrer_id: Number(player.referredById),
			rank_id: Number(player.rankId),
			id_tg: Number(player.tgId),
			premium: player.isPremium,
			username: player.userName,
			created_at: player.createdAt,
		}
		//console.log(sessionPlayer)
		if (!sessionPlayer) return;

		await Promise.all([
			fetchRanksData(sessionPlayer),
			//fetchUserInteraction(sessionPlayer)
		]);

		setStateUser(sessionPlayer);
		setIsLoading(false);

		handleSessionPlayerLoaded();
	}, [handleTelegramMiniAppEvents, fetchRanksData, fetchUserInteraction, setStateUser, handleSessionPlayerLoaded]);

	React.useEffect(() => {
		const splashTimeout = setTimeout(() => {
			if (!initData) {
				setIsLoadError(true);
				return;
			}

			fetchPlayerData(initData);
		}, 1000);

		return () => clearTimeout(splashTimeout);
	}, [fetchPlayerData, initData, user]);

	if (isLoadError) {
		return <div>Error loading data</div>;
	}

	return (
		<main className="w-full h-full z-20 relative overflow-hidden px-2 py-6">
			<div className='w-full h-full absolute inline-flex items-center justify-center left-0 top-0'>
				<Image
				src={'/splash.png'}
				alt={'splash-img'}
				width={1024}
				height={1024}
				priority
				className='w-full h-full object-cover object-center'
				/>
			</div>
			<div className="grow w-full h-full bg-gradient-to-t from-black from-15% to-transparent to-100% absolute left-0 bottom-0 z-30"></div>
			<div className="w-full flex flex-col gap-1 items-center justify-center absolute left-0 bottom-[176px] z-40">
				{
					isLoadError ? (
						<>
							<h1 className="text-foreground text-center text-7xl font-extrabold">ERROR</h1>
							<h2 className="text-[#FFB800] text-xl text-center font-semibold">Can&#39;t get any Telegram data</h2>
						</>
					) : (
						<>
							<h1 className="text-foreground text-center text-5xl font-extrabold">BeeVerse</h1>
							<h2 className="text-[#FFB800] text-xl text-center font-semibold">Join our adventure!</h2>
						</>
					)
				}
			</div>
			<div className="w-full flex flex-col gap-1 items-center justify-center absolute left-0 bottom-4 z-40">
				<h1 className="text-foreground font-exo-2 text-base font-semibold">Stay tuned</h1>
				<h2 className="text-foreground font-exo-2 text-base font-semibold">More info in official channels</h2>
				<div className="w-full inline-flex gap-6 items-center justify-center mt-2">
					<SocialImage url='/icons/x.png' alt='x-icon' />
					<SocialImage url='/icons/tg.png' alt='tg-icon' />
					<SocialImage url='/icons/logo.webp' alt='logo' />
				</div>
			</div>
		</main>
	);
}

function SocialImage(
	props: {
		url: string,
		alt: string
	}
) {
	return(
		<Image
		src={props.url}
		alt={props.alt}
		width={32}
		height={32}
		property=''
		/>
	)
}
