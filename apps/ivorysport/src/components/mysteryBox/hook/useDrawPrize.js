import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	api_events_CheckDrawPrize,
	api_events_DrawPrize,
	api_events_GetCustDrawPrizeList
} from "../../../service/api/events";
import { defDrawPrizeStatus, defEventId } from "../mysteryBox.def";
import defPopBoxType from "../../common/defPopBoxType";
import usePopBox from "../../hook/usePopBox";
import {
	userInfoContext,
	loadingContext,
	popBoxContext
} from "../../common/context";

const useDrawPrize = ({ isMountedRef }) => {
	const [drawPrizeList, setDrawPrizeList] = useState([]);
	const [drawPrize, setDrawPrize] = useState({
		data: {},
		errorCode: null
	});
	const { userInfo } = useContext(userInfoContext);
	const { setLoading } = useContext(loadingContext);
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const checkDrawPrize = () => {
		if (!userInfo.isLogin) return;
		api_events_CheckDrawPrize({ eventId: defEventId }).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, data, message } = res.data;

				if (
					errorCode === defDrawPrizeStatus.canJoin ||
					errorCode === defDrawPrizeStatus.drawOut ||
					errorCode === defDrawPrizeStatus.isJoin
				) {
					setDrawPrize({ data, errorCode });
				} else {
					errorPopBox(message || `error`, errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	const postDrawPrize = async () => {
		if (drawPrize.errorCode !== defDrawPrizeStatus.isJoin)
			await api_events_DrawPrize({ eventId: defEventId }).then(
				res => {
					if (!isMountedRef.current) return;
					const { errorCode, data, message } = res.data;
					if (errorCode === 0) {
						setDrawPrize({
							data,
							errorCode: defDrawPrizeStatus.isJoin
						});

						setPopBox({
							isOpen: true,
							t,
							drawPrizeDatas: data,
							popBoxType: defPopBoxType.SuccessMySteryBox,
							closePopBox
						});
						getCustDrawPrizeList();
					} else if (errorCode === defDrawPrizeStatus.isJoin) {
						setDrawPrize({
							data,
							errorCode: defDrawPrizeStatus.isJoin
						});
						const hint = t("lbl_MysteryBox_AlreadyDrawn")?.replace(
							"{0}",
							data.prizeName
						);

						errorPopBox(hint, errorCode);

						getCustDrawPrizeList();
					} else if (errorCode === defDrawPrizeStatus.notEligible) {
						errorPopBox(message || `error`, errorCode);
					} else {
						errorPopBox(message || `error`, errorCode);
					}
				},
				() => {
					if (!isMountedRef.current) return;
					errorPopBox();
				}
			);
	};

	const getCustDrawPrizeList = async () => {
		setLoading(true);
		if (!userInfo.isLogin) {
			setDrawPrizeList([]);
			setLoading(false);
			return;
		}
		await api_events_GetCustDrawPrizeList({ eventId: defEventId }).then(
			res => {
				setLoading(false);
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setDrawPrizeList(res.data.data);
				} else {
					errorPopBox(res.data.message || "error", errorCode);
				}
			},
			() => {
				setLoading(false);
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	return {
		drawPrize,
		drawPrizeList,
		checkDrawPrize,
		postDrawPrize,
		getCustDrawPrizeList
	};
};

export default useDrawPrize;
