import { useState } from "react";
import { api_promotion_GetPromotionListV2 } from "../../../service/api/promotion";

export default ({ userInfo, isMountedRef, errorPopBox }) => {
	const [promoList, setPromoList] = useState([]);

	const getPromotionListV2 = async () => {
		await api_promotion_GetPromotionListV2({
			langId: userInfo.langId
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;
				if (success) {
					let result = data.sort((a, b) => {
						return a.periodFrom > b.periodFrom ? -1 : 1;
					});

					setPromoList(result);
				} else errorPopBox(message || "error", errorCode);
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	return {
		promoList,
		setPromoList,
		getPromotionListV2
	};
};
