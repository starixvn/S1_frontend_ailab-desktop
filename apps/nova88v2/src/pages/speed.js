import React, { useEffect, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import Wrapper from "../components/common/wrapper";
import { userInfoContext } from "../components/common/context";
import { api_site_GetSupportDomainList } from "../service/api/site";
import path from "../router";

import crossIcon from "../styles/img/check_speed/n.png";
import checkIcon from "../styles/img/check_speed/y.png";
import checkSpeedStartImg from "../styles/img/check_speed/start.png";

const RESPOND_ERROR = 9999;

export default () => (
	<Wrapper>
		<SpeedPage />
	</Wrapper>
);

const SpeedPage = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);

	const [domainList, setDomainList] = useState([]);
	const [ipaddress, setIpaddress] = useState("");

	const reloadPage = () => window.location.reload(false);

	const hardReloadPage = () => {
		window.location.href = window.location.href;
	};

	const getRespondingTime = async domainName => {
		let respondingTime = null;
		const startTime = new Date().getTime();

		try {
			await axios.head(
				`${domainName}${
					domainName.slice(-1) === "/" ? "" : "/"
				}api/speed`
			);

			const millis = Date.now() - startTime;

			respondingTime = millis / 1000;
		} catch (e) {
			respondingTime = RESPOND_ERROR;
		}

		return respondingTime;
	};

	const getSupportDomainList = async () => {
		await api_site_GetSupportDomainList({ langId: userInfo.langId }).then(
			async res => {
				if (!isMountedRef.current) return;

				const { data, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					const newData = data;

					await Promise.all(
						data.map(async (item, index) => {
							const respondingTime = await getRespondingTime(
								item.domainName
							);

							newData[index].respondingTime = respondingTime;
						})
					);

					newData.sort((a, b) => a.respondingTime - b.respondingTime);
					setDomainList(newData);
				}
			}
		);
	};

	const setHomeAlert = url =>
		// eslint-disable-next-line no-alert
		alert(t("speed.lbl_AddFavoriteTip", { url }), t("speed.lbl_ClickOk"));

	// eslint-disable-next-line no-alert
	const addFavoriteAlert = () => alert(t("speed.lbl_AddFavoriteFail"));

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const getIp = async () => {
			const { data } = await axios.get(
				"https://api.ipify.org?format=json"
			);
			setIpaddress(data.ip);
		};

		getSupportDomainList();
		getIp();
	}, []);

	return (
		<SpeedContent
			t={t}
			setDomainList={setDomainList}
			domainList={domainList}
			ipaddress={ipaddress}
			reloadPage={reloadPage}
			getSupportDomainList={getSupportDomainList}
			hardReloadPage={hardReloadPage}
			setHomeAlert={setHomeAlert}
			addFavoriteAlert={addFavoriteAlert}
		/>
	);
};

const SpeedContent = ({
	t,
	setDomainList,
	domainList,
	ipaddress,
	getSupportDomainList,
	hardReloadPage,
	setHomeAlert,
	addFavoriteAlert
}) => {
	return (
		<div className="checkspeed ">
			<div className="wallpaper">
				<nav>
					<ul>
						<li>
							<Link to={path.home.root} className="logo">
								<img
									src="https://image.0814media.net/SiteSkin/img/logo_en.png"
									alt="logo"
								/>
							</Link>
						</li>
						<li>
							<button onClick={() => addFavoriteAlert()}>
								{t("speed.lbl_AddToFavorite")}
							</button>
						</li>
						<li>
							<button
								onClick={() =>
									setHomeAlert(window.location.href)
								}>
								{t("speed.lbl_SetHomePage")}
							</button>
						</li>
					</ul>
				</nav>

				<div className="module">
					<div className="moduleBg " />
					<div className="top">
						<div>
							<div>{t("speed.lbl_CurrentIp")}</div>
							<div>{ipaddress}</div>
						</div>

						<button
							onClick={() => {
								setDomainList([]);
								getSupportDomainList();
							}}>
							<img
								src={checkSpeedStartImg}
								alt="check-speed-startImg"
							/>
							<div>{t("speed.lbl_Refresh")}</div>
						</button>
					</div>
					<div className="bottom">
						<div className="left">
							<div>{t("speed.lbl_DomainListTip")}</div>
							<div>
								{domainList.map(item => (
									<SpeedItem
										t={t}
										key={item.domainName}
										domainName={item.domainName}
										respondingTime={item.respondingTime}
									/>
								))}
							</div>
						</div>
						<div className="right">
							<div>{t("speed.lbl_TipTitle")}</div>
							<div>
								<div>{t("speed.lbl_StepTitle")}</div>
								<ul>
									<li>
										<div>{t("speed.lbl_OpenIE")}：</div>
										<div>{t("speed.lbl_OpenIESteps")}</div>
									</li>
									<li>
										<div>{t("speed.lbl_Tip1")}</div>
										<div>{t("speed.lbl_Tip2")}</div>
									</li>
									<li>
										<div>{t("speed.lbl_Tip3")}</div>
										<div>{t("speed.lbl_Tip4")}</div>
									</li>
								</ul>

								<button onClick={() => hardReloadPage()}>
									{t("speed.lbl_ClearCache")}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SpeedContent.propTypes = {
	t: PropTypes.func.isRequired,
	setDomainList: PropTypes.func.isRequired,
	domainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	ipaddress: PropTypes.string.isRequired,
	getSupportDomainList: PropTypes.func.isRequired,
	hardReloadPage: PropTypes.func.isRequired,
	setHomeAlert: PropTypes.func.isRequired,
	addFavoriteAlert: PropTypes.func.isRequired
};

const SpeedItem = ({ t, domainName, respondingTime }) => {
	return (
		<>
			<div key={`${domainName}-content`}>
				<img
					src={
						respondingTime === RESPOND_ERROR ? crossIcon : checkIcon
					}
					alt="icon-img"
				/>
				<div>{domainName}</div>

				<a href={domainName}>{t("speed.lbl_EnterWebsite")}</a>
			</div>

			{respondingTime !== RESPOND_ERROR && (
				<div key={`${domainName}-time`} className="time">
					{t("speed.lbl_ResponseTime")}
					<span>{respondingTime * 1000}</span>
				</div>
			)}
		</>
	);
};

SpeedItem.propTypes = {
	t: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	respondingTime: PropTypes.number.isRequired
};
