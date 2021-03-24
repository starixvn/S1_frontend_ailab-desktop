import { useContext } from "react";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";

const useHandleLogin = () => {
	const { setPopBox } = useContext(popBoxContext);

	const loginCallback = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	return { loginCallback };
};

export default useHandleLogin;
