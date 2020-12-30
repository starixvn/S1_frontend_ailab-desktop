import { useState } from "react";
import {
	api_promotion_GetSpecialPromotionList,
	api_promotion_SetSpecialCode
} from "../../../service/api/promotion";

export default ({ userInfo, setLoading, isMountedRef, errorPopBox }) => {
	const [specialCode, setSpecialCode] = useState("");
	const [specialPromotionList, setSpecialPromotionList] = useState([]);

	const onSetSpecialCode = async () => {
		setLoading(true);
		await api_promotion_SetSpecialCode({
			langId: userInfo.langId,
			SpecialCode: specialCode
		}).then(
			({ data: { message, errorCode } }) => {
				setLoading(false);
				if (!isMountedRef.current) return;

				if (errorCode !== 0)
					return errorPopBox(message || "error", errorCode);
			},
			() => {
				setLoading(false);
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	const onSetSpecialCodeSubmit = async () => {
		if (!specialCode) return;

		await onSetSpecialCode();
		await getSpecialPromotionList();
		setSpecialCode("");
	};

	const getSpecialPromotionList = async () => {
		setLoading(true);
		await api_promotion_GetSpecialPromotionList({
			langId: userInfo.langId
		}).then(
			({ data: { data, message, errorCode } }) => {
				setLoading(false);
				if (!isMountedRef.current) return;

				const success = errorCode === 0;
				if (success) {
					setSpecialPromotionList(data);
				} else errorPopBox(message || "error", errorCode);
			},
			() => {
				setLoading(false);
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	return {
		specialCode,
		setSpecialCode,
		specialPromotionList,
		setSpecialPromotionList,
		onSetSpecialCode,
		onSetSpecialCodeSubmit,
		getSpecialPromotionList
	};
};
