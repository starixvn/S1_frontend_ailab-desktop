import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import config, { bannerImgUrl } from "../../config";
import path from "../../router";
import productList from "../../datas/productList";
import usePopBox from "../hook/usePopBox";

export const StreamingModule = ({
	t,
	langId,
	league,
	nowPlaying,
	home,
	homeScore,
	awayScore,
	timeStart,
	away,
	channel,
	matchID,
	tpId,
	gameId,
	isLogin,
	isStreamingPage,
	actStatus
}) => {
	const { errorPopBox } = usePopBox();

	const clickLiveTv = (clickBtn, e) => {
		e.stopPropagation();
		if (isStreamingPage) {
			if (!isLogin) return navigate(`/${langId}/${path.join.root}`);

			if (actStatus === 1)
				return errorPopBox(t("streaming.lbl_please_make_deposit"));

			if (clickBtn) {
				const gameName = Object.values(productList).find(item => {
					return item.tpId === tpId && item.gameId === gameId;
				}).name;

				navigate(
					`/${langId}/${path.sports.root}?game=${
						gameName || "soccer"
					}&matchId=${matchID}`
				);
			} else {
				window.open(
					`${config.openURL}/${langId}/liveStreamingEntPage?ch=${channel}`,
					`streaming`,
					"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no,top=0,left=0,width=640,height=640"
				);
			}
		} else {
			navigate(`/${langId}/${path.streaming.root}`);
		}
	};
	return (
		<div className="liveBox" onClick={e => clickLiveTv(false, e)}>
			<div>
				<div className="gametitle">{league}</div>

				<button className={`youtube ${nowPlaying ? "" : "close"}`} />

				{isStreamingPage && (
					<>
						<span className="started">
							{nowPlaying
								? t("lbl_Started")
								: t("lbl_Not_Started")}
						</span>

						<button
							className="sportsbook"
							onClick={e => clickLiveTv(true, e)}>
							{t("lbl_Streaming_SPORTSBOOK")}
						</button>
					</>
				)}
			</div>
			<div className="teamName">
				<div>
					<h1>HOME</h1>
					<p>{home}</p>
				</div>

				<div
					className={`fraction ${
						homeScore && awayScore ? "active" : ""
					}`}>
					<div className="point">{homeScore}</div>
					<div className="vs">
						<img
							src={`${bannerImgUrl}/desktop/img/vsIcon.png`}
							alt="img-vsIcon"
						/>
						{nowPlaying ? (
							<p>LIVE</p>
						) : (
							moment(timeStart).format("MM/DD HH:mm")
						)}
					</div>

					<div className="point">{awayScore}</div>
				</div>

				<div>
					<h1>AWAY</h1>
					<p>{away}</p>
				</div>
			</div>
		</div>
	);
};

StreamingModule.defaultProps = {
	isStreamingPage: false,
	homeScore: null,
	awayScore: null,
	matchID: null,
	tpId: null,
	gameId: null,
	isLogin: false,
	actStatus: 1
};

StreamingModule.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	isStreamingPage: PropTypes.bool,
	league: PropTypes.string.isRequired,
	home: PropTypes.string.isRequired,
	away: PropTypes.string.isRequired,
	nowPlaying: PropTypes.bool.isRequired,
	homeScore: PropTypes.number,
	awayScore: PropTypes.number,
	timeStart: PropTypes.string.isRequired,
	matchID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	channel: PropTypes.number.isRequired,
	tpId: PropTypes.number,
	gameId: PropTypes.number,
	isLogin: PropTypes.bool,
	actStatus: PropTypes.number
};
