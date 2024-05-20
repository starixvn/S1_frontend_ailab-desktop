import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useLazyGetPopUpPromotionQuery } from "@ailab-desktop/service";
import { navigate } from "gatsby";
import path from "../../../router";
import { setCookie, readCookie, deleteCookie } from "../../common/common";
import { userInfoContext, popBoxContext } from "../../common/context";
import { api_account_GetWalletInfo } from "../../../service/api/account";
import usePopBox from "../../hook/usePopBox";
import { defPopBoxType } from "../../common/popBox";
import { defDeviceType } from "../../../service/api/base";

const usePopupHandler = () => {
	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();
	const { t } = useTranslation();
	const { errorPopBox, closePopBox } = usePopBox();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	useEffect(() => {
		const popBoxMsg = readCookie("popBoxMsg");
		if (popBoxMsg) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: popBoxMsg,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								deleteCookie("popBoxMsg");
								setPopBox({ isOpen: false });
							}}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

	useEffect(() => {
		const displayAnnouncePopup = () => {
			const cookieOfficialAnnounce = `OfficialAnnounce_cookie`;
			const isShowOfficialAnnouncePopBox =
				readCookie(cookieOfficialAnnounce) !== "1";

			if (userInfo.isLogin === false && isShowOfficialAnnouncePopBox) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.OfficialAnnounce,
					onClickClose: openNextPopUp
				});
				setCookie(cookieOfficialAnnounce, "1", 1);
			} else {
				openNextPopUp();
			}
		};

		const displayDepositPopup = () => {
			const cookieName = `balanceHint${userInfo.userName}`;
			if (
				userInfo.isLogin &&
				userInfo.userName &&
				readCookie(cookieName) !== "1"
			) {
				setCookie(cookieName, "1", 1);
				api_account_GetWalletInfo().then(
					res => {
						if (res.data.errorCode === 0) {
							const tpWallets = res.data.data.tpWallets?.map(
								tp => ({
									tpId: tp.tpId,
									balance: tp.balance
								})
							);

							const hasBalance =
								res.data.data?.balance ||
								tpWallets?.filter(tp => tp.balance > 0)
									.length >= 1;

							if (!hasBalance) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.DepositHint
								});
							}
						} else if (res.data.errorCode !== 0) {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode,
								openNextPopUp
							);
						}
					},
					() => {
						errorPopBox(null, null, openNextPopUp);
					}
				);
			} else {
				openNextPopUp();
			}
		};

		const displayPromotionPopup = () => {
			const cookieName = `popUpPromotion${userInfo.userName}`;

			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				!userInfo.isLogin ||
				!userInfo.accountName ||
				readCookie(cookieName) === "1"
			) {
				openNextPopUp();
				return;
			}

			// * 如果 bonusCode 不為 null ，打開並記錄 cookie，效期為一日
			getPopUpPromotion({
				deviceType: defDeviceType.Desktop,
				langId: userInfo.langId
			}).then(({ data: { data: { bonusCode } = {} } = {} }) => {
				if (bonusCode) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Modal,
						content: (
							<div className="pop promosbackpopup">
								<div className="promosback active">
									<div className="promosback-pop">
										<img
											src={`${
												process.env.REACT_APP_BANNER_URL
											}/desktop/img/promosBackPopup/promosPopup-${
												userInfo?.langId || "en"
											}.png`}
											alt="img-promosPopup"
										/>

										<button
											className="popgo"
											onClick={() => {
												navigate(
													`/${path.promotion.root}?bonusCode=${bonusCode}`
												);
											}}>
											{t("lbl_Promotion_ClaimNow")}
										</button>

										<img
											src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/promosBackPopup/delet.png`}
											alt="img-delet"
											className="closepop"
											onClick={() => {
												closePopBox();
												openNextPopUp();
											}}
										/>
									</div>
								</div>
							</div>
						)
					});
					setCookie(cookieName, "1", 1);
				} else {
					openNextPopUp();
				}
			});
		};

		const popUpStack = [
			displayDepositPopup,
			displayAnnouncePopup,
			displayPromotionPopup
		];

		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};
		!userInfo.isResetPwd && openNextPopUp();
	}, [userInfo.isLogin, setPopBox, userInfo.langId, userInfo.accountName]);
};

export default usePopupHandler;
