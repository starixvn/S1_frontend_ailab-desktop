import { useContext } from "react";
import { defTpGameType } from "../../../datas/productList.js";
import { SET_ENTER_PAGE } from "../../../service/enterPage.js"
import { defPopBoxType } from "../../common/popBox";
import { popBoxContext , userInfoContext , maintainListContext} from "../../common/context";

const useClickItem = () => {
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);

	const clickHomeItem = ({ tpId, gameId, tpGameType }) => {
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === tpId &&
				(mt.tpGameType === tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: () => setPopBox({ isOpen: false })
			});
		} else {
			// 注意: SET_ENTER_PAGE 需要被定义或从外部导入
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				openInBlank: true,
				tpGameType
			});
		}
	};

	return { clickHomeItem };
};

export default useClickItem;
