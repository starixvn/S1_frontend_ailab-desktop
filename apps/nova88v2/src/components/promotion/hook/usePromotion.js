import { useState, useEffect, useCallback } from "react";
import { api_promotion_GetPromotionListV2 } from "../../../service/api/promotion";
import { isExpiry } from "../promotion.common";

export default ({
	userInfo,
	isMountedRef,
	errorPopBox,
	filterExpiry = false,
	autoGetData = false
}) => {
	const [promoDatas, setPromoList] = useState([]);

	const getPromotionListV2 = useCallback(async () => {
		await api_promotion_GetPromotionListV2({
			langId: userInfo.langId
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;
				if (success) {
					const result = data.sort((a, b) => {
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
	}, [userInfo.langId]);

	useEffect(() => {
		if (autoGetData) {
			getPromotionListV2();
		}
	}, [getPromotionListV2, autoGetData]);

	const promoList = filterExpiry
		? promoDatas.filter(
				p =>
					!isExpiry({
						...p,
						isLogin: userInfo.isLogin
					})
		  )
		: promoDatas;

	return {
		promoList,
		setPromoList,
		getPromotionListV2
	};
};
