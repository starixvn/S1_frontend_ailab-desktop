import { IAxiosResponse } from "../axiosBaseQuery";
import { rootApi } from "../rootApi/api";

export const authApiUrl = {
	checkSignIn: "Site/CheckSignIn",
	getMaintenance: "Site/GetTpMaintainList"
};

export interface ITpMaintainData {
	siteId: number;
	tpId: number;
	tpGameType: number;
	tpCategoryId: number;
	beginDate: null | string;
	endDate: null | string;
	maintainType: number;
	typeValue: number;
	beginTime: null | string;
	endTime: null | string;
}

export const authApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// test and demo only
		checkSignIn: builder.query<IAxiosResponse<void>, null>({
			query: data => ({
				url: authApiUrl.checkSignIn,
				method: "POST",
				data
			})
		}),
		getMaintenance: builder.query<IAxiosResponse<ITpMaintainData[]>, null>({
			query: data => ({
				url: authApiUrl.getMaintenance,
				method: "POST",
				data
			})
		})
	})
});

export const { useCheckSignInQuery, useGetMaintenanceQuery } = authApi;
