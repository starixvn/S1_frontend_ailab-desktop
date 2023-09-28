import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

export const playerApiUrl = {
	getAppLinks: "player/GetAppLink"
};

export enum AppTypeEnum {
	Andriod = 1,
	IOS
}

export const playerApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getAppLinks: builder.query<
			IAxiosResponse<
				{
					appType: AppTypeEnum;
					appTypeName: string;
					downloadLink: string;
				}[]
			>,
			null
		>({
			query: () => ({
				url: playerApiUrl.getAppLinks,
				method: "POST"
			})
		})
	})
});

export const { useGetAppLinksQuery } = playerApi;
