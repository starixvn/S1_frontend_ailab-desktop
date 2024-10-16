import { IAxiosResponse } from "..";
import { rootApi } from "../rootApi/api";

export const siteApiUrl = {
	getRecaptchaInfo: "Site/GetRecaptchaInfo"
};

const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getRecaptchaInfo: builder.query<
			IAxiosResponse<{
				siteKey: string;
				country: string;
			}>,
			void
		>({
			query: () => ({
				url: siteApiUrl.getRecaptchaInfo,
				method: "POST"
			})
		})
	})
});

export const { useGetRecaptchaInfoQuery } = siteApi;
