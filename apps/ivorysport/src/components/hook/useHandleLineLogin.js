import { api_lineLogin_LineLoginDirect } from "../../service/api/lineLogin";
import usePopBox from "./usePopBox";

export const defType = {
	register: 1,
	login: 2,
	binding: 3
};

const useHandleLineLogin = () => {
	const { errorPopBox } = usePopBox();

	const lineLogin = async ({ type }) => {
		const res = await api_lineLogin_LineLoginDirect(type);

		const { errorCode, message, data } = res.data;
		if (errorCode === 0) {
			window.location = `${data}`;
		} else {
			errorPopBox(message || `error`, errorCode);
		}
	};

	return { lineLogin };
};

export default useHandleLineLogin;
