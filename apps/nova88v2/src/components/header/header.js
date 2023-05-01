import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { cambodiaSeaGameEventPeriod, isDateRange } from "@ailab-desktop/common";
import classNames from "classnames";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext,
	isRootContext
} from "../common/context";
import Menu from "./header.menu";
import config, { bannerImgUrl } from "../../config";
import Functions from "./header.functions";
import LanguageDropDown from "./header.langDropdown";
import { LOGOUT } from "../../service/auth";
import path from "../../router";
import defPopBoxType from "../common/defPopBoxType";
import { langAndCurrMapping } from "../common/common";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import { angPaoEventPeriod } from "../../pages/angpao";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";

export default () => {
	const { t } = useTranslation();
	const { productTpIds } = useContext(productTpIdsContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { setPopBox } = useContext(popBoxContext);
	const { isRoot } = useContext(isRootContext);

	const currencyId =
		userInfo.currencyId ?? langAndCurrMapping[userInfo.langId];

	const handleLogout = () => {
		LOGOUT(() => {
			const clickClose = () => {
				if (
					window.location.pathname.includes(
						`/${userInfo.langId}/${path.resetPassword.root}`
					)
				) {
					navigate(`/${userInfo.langId}`);
				}

				setPopBox({ isOpen: false });
				setUserInfo(prevState => ({
					isLogin: false,
					langId: prevState.langId,
					kickout: true,
					willLogout: true,
					defaultLang: prevState.defaultLang
				}));
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.LogoutHint,
				content: t("msg_loggedout"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-check" onClick={clickClose}>
							OK
						</button>
					</div>
				)
			});
		});
	};

	const reload = () => {
		if (isRoot) {
			window.location.reload();
		}
	};

	const LogoutButton = () => {
		if (!userInfo.isLogin) return null;

		return <button className="icon icon-exit" onClick={handleLogout} />;
	};

	return (
		<header id="header">
			<div className="header">
				<div
					className={classNames("logo", {
						cambodia: isDateRange(cambodiaSeaGameEventPeriod)
					})}
				>
					<Link to={`/${userInfo.langId}`} onClick={reload}>
						{isDateRange(cambodiaSeaGameEventPeriod) ? (
							<img
								src={`${bannerImgUrl}/desktop/img/logo-cambodia2023${
									userInfo.langId === "cs" ? "_cs" : ""
								}.png`}
								alt={config.siteName}
							/>
						) : (
							<img
								src={`${bannerImgUrl}/desktop/img/${
									userInfo.langId === "cs"
										? "logo_cs"
										: "logo_en"
								}.png`}
								alt={config.siteName}
							/>
						)}
					</Link>
					{isDateRange(cambodiaSeaGameEventPeriod) && (
						<img
							className="cambodia"
							src={`${bannerImgUrl}/desktop/img/cambodia.png`}
							alt={config.siteName}
						/>
					)}

					{allowedCurrencyList.rewards.includes(currencyId) ? (
						<a
							className="rewardsLogo"
							target="_blank"
							href={`${config.openURL}/rewards/`}
							rel="noreferrer"
						>
							<img
								src={`${bannerImgUrl}/desktop/img/88rewards.png`}
								alt="Rewards"
							/>
						</a>
					) : (
						<a
							className="rewardsLogo"
							target="_blank"
							href={`${config.openURL}/rewards/`}
							style={{ visibility: "hidden" }}
							rel="noreferrer"
						>
							<img
								src={`${bannerImgUrl}/desktop/img/88rewards.png`}
								alt="Rewards"
							/>
						</a>
					)}

					{/* 僅限過年期間顯示 */}
					{isDateRange(angPaoEventPeriod) && (
						<LuckyWheelLink
							langId={userInfo.langId}
							currencyId={userInfo.currencyId}
							type="header"
						/>
					)}
				</div>
				<div className="function">
					<Functions />
					<LanguageDropDown />
					{userInfo.isLogin ? null : (
						<Link
							to={`/${userInfo.langId}/${path.forgetPassword.root}`}
							className="forgot"
						>
							{t("lbl_ForgetPassword")}
						</Link>
					)}
					<LogoutButton />
				</div>
				<Menu
					productTpIds={productTpIds}
					maintainList={allMaintainList}
				/>
			</div>
		</header>
	);
};
