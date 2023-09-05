import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

export enum SlotGameCategoryEnum {
	Jackpot = 2
}

export const gameApiUrl = {
	getSlotGamePage: "Game/GetSlotGamePage"
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
		})
	})
});

export const { useGetSlotGamePageQuery } = gameApi;
