import React, { useContext, useState, useEffect } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import moment from "moment";
import classNames from "classnames";
import { isDateRange } from "@ailab-desktop/common";
import { bannerImgUrl } from "../../config";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import path from "../../router";
import { SetPathParameter } from "../common/customSwipper";
import { eventPeriods } from "../../datas/eventDef";
import { api_liveStreaming_GetDataList } from "../../service/api/liveStreaming";
import usePopBox from "../hook/usePopBox";

const LiveStreamingLink = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const {
		userInfo,
		userInfo: { langId }
	} = useContext(userInfoContext);

	const [displayLiveStreaming, setDisplayLiveStreaming] = useState(false);
	const [liveStreamingList, setLiveStreamingList] = useState([]);

	useEffect(() => {
		const getLiveStreamingList = async () => {
			try {
				const {
					data: { data: resultList }
				} = await api_liveStreaming_GetDataList({
					langId: userInfo.langId,
					currencyId: 51
				});
				if (resultList.length > 0) {
					setDisplayLiveStreaming(true);
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
		getLiveStreamingList();
	}, [userInfo.isLogin]);

	const isWithinTwoHours = startTime =>
		moment().isBetween(
			moment(startTime),
			moment(startTime).add(2, "hours"),
			null,
			"[]"
		);

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
			className: `livesportspop active ${langId}`,
			content: (
				<>
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
										}>
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
													src={`${bannerImgUrl}/desktop/img/vs.png`}
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
				</>
			)
		});
	};

	if (!displayLiveStreaming) {
		return null;
	}

	return (
		<div
			className={classNames("eventLink livesports", {
				eurocup: isDateRange(eventPeriods.euroCup)
			})}>
			<button
				className="icon icon-close"
				onClick={() => setDisplayLiveStreaming(false)}
			/>
			<button onClick={handleLiveSteamingModalOpen}>
				<img
					src={`${bannerImgUrl}/desktop/img/livesports.png`}
					alt="livesports"
				/>
			</button>
		</div>
	);
};

export default LiveStreamingLink;
