import { useState } from "react";
import {
	api_promotion_GetPromotionListV2,
	api_promotion_GetPromotionUploadCustList
} from "../../../service/api/promotion";

export default ({ userInfo, isMountedRef, errorPopBox, promotionInfo }) => {
	const [promoList, setPromoList] = useState([]);

	const getPromotionListV2 = async () => {
		const {
			data: { data: promoCustListData }
		} = await api_promotion_GetPromotionUploadCustList({
			langId: userInfo.langId
		});
		await api_promotion_GetPromotionListV2({
			langId: userInfo.langId
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;

				if (success) {
					setPromoList([...data, ...promoCustListData]);
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
