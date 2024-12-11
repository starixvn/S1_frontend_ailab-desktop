import { IAxiosResponse } from "..";
import { rootApi } from "../rootApi/api";
import {
	IGetNumberCaptchaArgs,
	IGetNumberCaptchaData,
	IRecaptchaInfoData,
	ISignUpArgs
} from "./type";

export const siteApiUrl = {
	signup: "Site/Signup",
	getRecaptchaInfo: "Site/GetRecaptchaInfo",
	getNumberCaptcha: "Site/GetNumberCaptcha"
};

const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		signup: builder.mutation<IAxiosResponse<void>, ISignUpArgs>({
			query: ({ langId, ...data }) => ({
				url: `${siteApiUrl.signup}/${langId}`,
				method: "POST",
				data
			})
		}),
		getRecaptchaInfo: builder.query<
			IAxiosResponse<IRecaptchaInfoData>,
			void
		>({
			query: () => ({
				url: siteApiUrl.getRecaptchaInfo,
				method: "POST"
			})
		}),
		getNumberCaptcha: builder.query<
			IAxiosResponse<IGetNumberCaptchaData>,
			IGetNumberCaptchaArgs
		>({
			query: data => ({
				url: siteApiUrl.getNumberCaptcha,
				method: "POST",
				data
			})
		})
	})
});

export const {
	useSignupMutation,
	useGetRecaptchaInfoQuery,
	useLazyGetNumberCaptchaQuery
} = siteApi;
