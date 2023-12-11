import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import {
	dragonBoatFestivalEventPeriod,
	isDateRange
} from "@ailab-desktop/common";
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
import { angPaoEventPeriod } from "../../pages/angpao";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";

export const christmasPeriod = {
	endDate: "2023-12-26 23:59:59"
};

export default () => {
	const { t } = useTranslation();
	const { productTpIds } = useContext(productTpIdsContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { setPopBox } = useContext(popBoxContext);
	const { isRoot } = useContext(isRootContext);

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
						dragon: isDateRange(dragonBoatFestivalEventPeriod)
					})}
				>
					<Link
						to={`/${userInfo.langId}`}
						onClick={reload}
						className={classNames({
							dragonlogo: isDateRange(
								dragonBoatFestivalEventPeriod
							)
						})}
					>
						<img
							src={`${bannerImgUrl}/desktop/img/4.0/${
								isDateRange(christmasPeriod)
									? "christmas-logo"
									: "logo_w"
							}.png`}
							alt={config.siteName}
						/>
					</Link>
					<a className="splogo" />
					{isDateRange(dragonBoatFestivalEventPeriod) && (
						<>
							<img
								className="dragon"
								src={`${bannerImgUrl}/desktop/img/dragon.png`}
								alt={config.siteName}
							/>
							<img
								className="dragon-light"
								src={`${bannerImgUrl}/desktop/img/dragon-light.png`}
								alt={config.siteName}
							/>
						</>
					)}

					<a className="splogo" />

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
					{!userInfo.isLogin && <LanguageDropDown />}

					{!userInfo.isLogin && <LogoutButton />}
				</div>
				<Menu
					productTpIds={productTpIds}
					maintainList={allMaintainList}
				/>
			</div>
		</header>
	);
};
