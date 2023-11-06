import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

export const hotGameApiUrl = {
	getHotGameList: "HotGame/GetDataList"
};

export const hotGameApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getHotGameList: builder.query<
			IAxiosResponse<{
				HotGame: {
					gameId: string;
					gameLogo: string;
					gameName: string;
					sort: number;
					tpCategory: number;
					tpGameType: number;
					tpId: number;
					tpLogo: string;
					tpName: string;
				}[];
			}>,
			{
				currencyId: number;
				deviceType: number;
				langId: string;
			}
		>({
			query: ({ langId, ...data }) => ({
				url: `${hotGameApiUrl.getHotGameList}/${langId}`,
				method: "POST",
				data
			})
		})
	})
});

export const { useGetHotGameListQuery } = hotGameApi;
