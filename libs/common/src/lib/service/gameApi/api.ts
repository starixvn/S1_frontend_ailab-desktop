import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

export enum SlotGameCategoryEnum {
	Jackpot = 2
}

export const gameApiUrl = {
	getSlotGamePage: "Game/GetSlotGamePage",
	getLobbyHeader: "Game/GetLobbyHeader",
	getRecentlyViewed: "Game/GetRecentlyViewed"
};

interface ISlotGameData {
	slotGameId: string;
	tpId: number;
	gameId: string;
	appId: string;
	launchDate: string;
	reels: string;
	rtp: string;
	paylines: string;
	playFree: false;
	gameName: {
		cs: string;
		en: string;
	};
	slotGameCategoryList: number[];
	imgName: {
		cs: string;
		en: string;
	};
	sort: number;
	top: number;
}

type ILangType = "en" | "cs" | "my" | "th" | "id" | "hi" | "bd" | "kh" | "vn";

interface ISubMenuData {
	lobbyCategory: string;
	tpId: number;
	tpName: string;
	productName: string;
	tpGameIdNo: number;
	gameId: string;
	tpGameType: number;
	currencyGameName: Record<ILangType, string> | null;
	pcHeaderPicUrl: string;
	pcLobbyPicUrl: string;
	mobileHeaderPicUrl: string;
	mobileLobbyPicUrl: string;
	sort: number;
	iconEndTime: string;
	iconStartTime: string;
	iconType: number;
}

interface ILobbyHeaderData {
	lobbyCategoryId: number;
	data: ISubMenuData[];
}

interface IRecentlyViewData {
	bannerUrl: string;
	imgUrl: string;
	recentlyViewedList: {
		tpId: number;
		tpGameType: number;
		categoryId: number;
		gameId: string | number;
		betType: string;
		tpName: string;
		gameName: Record<ILangType, string> | null;
		gameLogo: Record<ILangType, string> | null;
		tpLogo: string;
		tpGameIdNo: number;
		isMaintain: boolean;
	}[];
}

export const gameApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getSlotGamePage: builder.query<
			IAxiosResponse<{
				imgUrl: string;
				jackpot: ISlotGameData[];
				providerList: {
					tpId: number;
					tpName: string;
					playFree: boolean;
					displayText: string;
					imgName: string;
					openPath: null | string;
					gameImgDisplayText: string;
					sort: number;
				}[];
			}>,
			{
				currencyId: number;
				deviceType: number;
				slotGameCategoryList: SlotGameCategoryEnum[];
			}
		>({
			query: data => ({
				url: gameApiUrl.getSlotGamePage,
				method: "POST",
				data
			})
		}),
		getLobbyHeader: builder.query<
			IAxiosResponse<ILobbyHeaderData[]>,
			{
				siteId: number;
				currencyId: number;
			}
		>({
			query: data => ({
				url: gameApiUrl.getLobbyHeader,
				method: "POST",
				data
			})
		}),
		getRecentlyViewed: builder.query<
			IAxiosResponse<IRecentlyViewData[]>,
			{
				deviceType: number;
				currencyId: number;
			}
		>({
			query: data => ({
				url: gameApiUrl.getRecentlyViewed,
				method: "POST",
				data
			})
		})
	})
});

export const {
	useGetSlotGamePageQuery,
	useGetLobbyHeaderQuery,
	useGetRecentlyViewedQuery
} = gameApi;
