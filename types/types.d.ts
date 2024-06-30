type IntroItem = {
    title: string;
    subtitle?: string;
    imageURL: string;
}

type ReferredPlayer = {
	isNew: boolean;
	referralUsername: string;
	reward: number;
}

export type User = {
    balance: number
    created_at: string
    id: number
    id_tg: number
    premium: boolean
    rank_id: number
    referrer_id: number | null
    username: string | null
}

export type Referral = {
    created_at?: string
    id?: number
}

export type Rank = {
    bonus_amount: number;
    description: string;
    id: number;
    name: string;
    required_amount: number;
}

export type Quest = {
    id: number;
    link: string; 
    reward: number; 
    terms: string;
}

export type SessionPlayer = {
    balance: number,
	id: number,
    referrer_id: number,
	rank_id: number,
	id_tg: number,
	premium: boolean,
	username: string | null,
	created_at: string,
}

