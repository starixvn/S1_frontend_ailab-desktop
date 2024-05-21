import { useContext } from "react";
import { defTpGameType } from "@ailab-desktop/common";
import { defPopBoxType } from "../../common/popBox";
import { popBoxContext, maintainListContext } from "../../common/context";
import useMenu from "../../hook/useMenu";

const useClickItem = () => {
	const { setPopBox } = useContext(popBoxContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { onClickProductItem } = useMenu();

	const onclickStaticProduct = product => {
		// * 為靜態遊戲檢查的 isInMaintain (雖然有些串接 lobby api 的遊戲也有 isInMaintain 參數)
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === product?.tpId &&
				(mt.tpGameType === product?.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		if (isInMaintain || product?.isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: () => setPopBox({ isOpen: false })
			});
		} else {
			onClickProductItem(product);
		}
	};

	return { onclickStaticProduct };
};

export default useClickItem;
