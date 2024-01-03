import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { navigate } from "gatsby";
import { bannerImgUrl } from "../../config";
import { popBoxContext, userInfoContext } from "../common/context";
import { api_liveStreaming_GetDataList } from "../../service/api/liveStreaming";
import { defCurrencyToClass, langAndCurrMapping } from "../common/common";
import usePopBox from "../hook/usePopBox";
import defPopBoxType from "../common/defPopBoxType";
import { SetPathParameter } from "../common/swipperBanner";
import path from "../../router";

const LiveStreamingLink = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId, currencyId, isLogin }
	} = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [isShowLiveStreaming, setIsShowLiveStreaming] = useState(false);
	const [liveStreamingList, setLiveStreamingList] = useState([]);
	const getLiveStreamingList = async () => {
		try {
			const {
				data: { data: resultList }
			} = await api_liveStreaming_GetDataList({
				langId,
				currencyId
			});
			if (resultList.length > 0) {
				setIsShowLiveStreaming(true);
				// 根據開始時間+2hr判斷是否過期,並取前3項
				const filterList = resultList
					.filter(({ battleTime }) =>
						moment(battleTime).add(2, "hours").isAfter(moment())
					)
					.slice(0, 3);

				setLiveStreamingList(filterList);
			}
		} catch (error) {
			errorPopBox(error);
		}
	};

	const isWithinTwoHours = startTime =>
		moment().isBetween(
			moment(startTime),
			moment(startTime).add(2, "hours"),
			null,
			"[]"
		);

	const getClassNameByCurrencyId = () => {
		const currencyClassNames = {
			[langAndCurrMapping.vn]: _langId =>
				_langId === "en" ? "vn-en" : "vn",
			[langAndCurrMapping.th]: _langId =>
				_langId === "en" ? "th-en" : "th"
		};
		const getClassName = currencyClassNames[currencyId];
		if (getClassName) {
			return getClassName(langId);
		}
		return "";
	};

	const handleBetting = ({ tpId, gameId, matchId }) => {
		const parameters = SetPathParameter({
			urlRouter: path.sports.root,
			tpId,
			gameId,
			matchId
		});
		navigate(`/${langId}/${path.sports.root}${parameters}`);
	};

	const handleLiveSteamingModalOpen = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Modal,
			content: (
				<div
					className={`livesportspop active ${getClassNameByCurrencyId()}`}
				>
					<div className="livesports-content">
						<div>
							{liveStreamingList.map(
								({
									sportLeaguesTitle,
									homeTeamPic,
									homeTeamName,
									battleTime,
									awayTeamPic,
									awayTeamName,
									tpId,
									gameId,
									matchId
								}) => (
									<div
										className={`livesports-item ${
											isWithinTwoHours(battleTime)
												? ""
												: "next"
										}`}
										onClick={() =>
											handleBetting({
												tpId,
												gameId,
												matchId
											})
										}
									>
										<div className="top">
											<div>{sportLeaguesTitle}</div>
											<div>
												{isWithinTwoHours(battleTime)
													? // LIVE字樣不翻譯
													  "LIVE"
													: t("lbl_Next")}
											</div>
										</div>
										<div className="bottom">
											<div className="bottom-team">
												<div>
													<img
														src={homeTeamPic}
														alt={homeTeamName}
													/>
												</div>
												<div>{homeTeamName}</div>
											</div>
											<div className="bottom-time">
												<img
													src={`${bannerImgUrl}/desktop/img/4.0/vs.png`}
													alt=""
												/>
												<div>
													<div>
														{moment(
															battleTime
														).format("DD MMM")}
													</div>
													<div>
														{moment(
															battleTime
														).format("hh:mm A")}
													</div>
												</div>
											</div>
											<div className="bottom-team">
												<div>
													<img
														src={awayTeamPic}
														alt={awayTeamName}
													/>
												</div>
												<div>{awayTeamName}</div>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
					<img
						onClick={() => setPopBox({ isOpen: false })}
						src={`${bannerImgUrl}/desktop/img/promosBackPopup/delet.png`}
						alt=""
						className="closepop"
					/>
				</div>
			)
		});
	};

	useEffect(() => {
		// 當currencyId為vn或th時顯示直播icon
		if (
			currencyId === langAndCurrMapping.vn ||
			currencyId === langAndCurrMapping.th
		) {
			getLiveStreamingList();
		}
	}, [langId, isLogin]);

	return isShowLiveStreaming ? (
		<div className="livesports">
			<button
				className="icon icon-close"
				onClick={() => setIsShowLiveStreaming(false)}
			/>
			<button onClick={handleLiveSteamingModalOpen}>
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/livesports-${defCurrencyToClass[currencyId]}.png`}
					alt="livesports"
				/>
			</button>
		</div>
	) : null;
};

export default LiveStreamingLink;
