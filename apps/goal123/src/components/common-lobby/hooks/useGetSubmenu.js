import { useContext } from "react";
import { productTpIdsContext } from "../../common/context";
import { defMenuLinks } from "../../layout/header.menu.def";

const useGetSubMenu = category => {
	const { productTpIds } = useContext(productTpIdsContext);

	const getSubMenu = () => {
		let { subMenu } = defMenuLinks()[category];
		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}
		return subMenu;
	};
	return getSubMenu();
};

export default useGetSubMenu;
