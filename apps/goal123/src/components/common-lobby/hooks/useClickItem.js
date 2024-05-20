import { useContext } from "react";
import { SET_ENTER_PAGE } from "../../../service/enterPage";
import { userInfoContext, popBoxContext } from "../../common/context";
import { defPopBoxType } from "../../common/popBox";

const useClickLobbyGamesItem = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const clickLobbyGame = ({ tpId, gameId, tpGameType, isInMaintain }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (!isInMaintain) {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
			});
		}
	};

	return clickLobbyGame;
};

export default useClickLobbyGamesItem;
