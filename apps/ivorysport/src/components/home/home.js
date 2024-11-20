import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	isRootContext
} from "../common/context";
import {
	readCookie,
	setCookie,
	deleteCookie,
	getUrlParameter
} from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import { api_account_GetWalletInfo } from "../../service/api/account";
import Marquee from "./marquee";
import usePopBox from "../hook/usePopBox";
import { bannerImgUrl, SiteInfo } from "../../config";
import { HomeEntry } from "./homeEntry,js";

const IndexPage = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setIsRoot } = useContext(isRootContext);
	const { errorPopBox, closePopBox } = usePopBox();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		setIsRoot(true);
		return () => {
			isMountedRef.current = false;
			setIsRoot(false);
		};
	});

	useEffect(() => {
		if (!userInfo.isLogin) {
			if (getUrlParameter("AffId")) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Join
				});
			}
		}
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		if (userInfo.isLogin && userInfo.userName) {
			const showDepositPopBox = () => {
				const cookieName = `balanceHint${userInfo.userName}`;
				let showDepositHint = false;
				if (readCookie(cookieName) !== "1") {
					setCookie(cookieName, "1", 1);
					showDepositHint = true;
				}

				if (showDepositHint) {
					api_account_GetWalletInfo().then(
						res => {
							if (
								res.data.errorCode === 0 &&
								isMountedRef.current
							) {
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

								if (!hasBalance && showDepositHint) {
									setPopBox({
										isOpen: true,
										popBoxType: defPopBoxType.DepositHint
									});
								}
							} else if (res.data.errorCode !== 0) {
								errorPopBox(
									res.data.message || "error",
									res.data.errorCode
								);
							}
						},
						() => {
							if (isMountedRef.current) {
								errorPopBox();
							}
						}
					);
				}
			};

			const refeCookieName = `referral_${userInfo.userName}`;
			if (readCookie(refeCookieName) === "1") {
				showDepositPopBox();
			}
		}
		// * 如果未登入狀態及尚未勾選已年滿21歲的cookie即彈出此彈窗讓使用者驗證
		else if (!readCookie(SiteInfo.ageVerificationCookie)) {
			// const onOK = () => {
			// 	setCookie(SiteInfo.ageVerificationCookie, 1, 1);
			// 	closePopBox();
			// };
			const onClose = () => {
				closePopBox();
			};
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				closePopBox,
				content: (
					<>
						<div className="icon icon-icon32px_notification" />
						<div className="title">
							{/* {t("Label_General_AgeVerification")} */}
							{t("Label_General_Important_Notice_Close_Title")}
						</div>
						<div>
							{/* <p>{t("Label_General_Verify21Years")}</p> */}
							<p>
								{t(
									"Label_General_Important_Notice_Close_Content1"
								)}
							</p>
							<br />
							<p>
								{t(
									"Label_General_Important_Notice_Close_Content2"
								)}
							</p>
							<br />
							<p>
								{t(
									"Label_General_Important_Notice_Close_Content3"
								)}
							</p>
							<br />
							<p>{t("Label_General_Thank_You")}</p>
							<br />

							{/* <p>
								<Trans
									i18nKey="Label_General_AgreeTermsCondition"
									components={{
										Link: (
											<a
												href={`${bannerImgUrl}/Static/en/TermsConditions.html`}
												rel="noreferrer"
												target="_blank">
												{t("Label_General_Exit")}
											</a>
										)
									}}
								/>
							</p> */}
						</div>

						<div className="btnGroup" style={{ marginTop: 10 }}>
							<button
								className="btn-cancel"
								href="/"
								rel="noreferrer"
								onClick={onClose}
							>
								{t("lbl_Close")}
							</button>
							{/* <button className="btn-check" onClick={onOK}>
								{t("Label_General_Already21Years")}
							</button>

							<a
								className="btn-cancel"
								href={`${bannerImgUrl}/Static/en/TermsConditions.html`}
								rel="noreferrer">
								{t("Label_General_Exit")}
							</a> */}
						</div>

						<div style={{ display: "flex" }}>
							<img
								style={{ height: "64px" }}
								src="../../styles/img/homepage/pagcor.png"
								alt="img-pagcor"
							/>
							<img
								style={{ height: "64px" }}
								src="../../styles/img/homepage/21age.png"
								alt="img-pagcor"
							/>
						</div>
					</>
				)
			});
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

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
								closePopBox();
							}}
						>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

	return (
		<main>
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<div className="swiper-slide">
						<img
							src={`${bannerImgUrl}/desktop/img/slide01.jpg`}
							alt="slide"
						/>
					</div>
				</div>
			</div>
			<Marquee />
			<HomeEntry />
		</main>
	);
};

export default IndexPage;
