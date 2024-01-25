import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { bannerImgUrl } from "../../config";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import path from "../../router";
import { SetPathParameter } from "../common/customSwipper";

const LiveStreamingLink = ({
	liveStreamingList,
	displayLiveStreaming,
	setDisplayLiveStreaming
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);

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

	return displayLiveStreaming ? (
		<div className="eventLink livesports">
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
	) : null;
};
LiveStreamingLink.defaultProps = {
	liveStreamingList: []
};

LiveStreamingLink.propTypes = {
	liveStreamingList: PropTypes.arrayOf(PropTypes.any),
	displayLiveStreaming: PropTypes.bool.isRequired,
	setDisplayLiveStreaming: PropTypes.func.isRequired
};

export default LiveStreamingLink;
