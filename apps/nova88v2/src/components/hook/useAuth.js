import { useContext } from "react";
import { userInfoContext } from "../common/context";

const useAuth = () => {
	return useContext(userInfoContext);
};

export { useAuth };
