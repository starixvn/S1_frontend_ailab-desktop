import React, { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import usePopBox from "../hook/usePopBox";
import { api_worldCupPrediction_GetWorldCupPredictionSetting } from "../../service/api/worldCupPrediction";
import Preliminary from "./fixture.preliminary";
import Final from "./fixture.final";

const Fixture = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [prediction, setPrediction] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_worldCupPrediction_GetWorldCupPredictionSetting({
			langId: userInfo.langId
		}).then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						setPrediction(data);
					} else {
						errorPopBox(message || "error", errorCode);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	}, []);

	return (
		<>
			<div className="title">{t("worldCup.fixture")}</div>
			<div className="fixture">
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/fixturebg.jpg`}
					alt="fixture list"
				/>
				<div className="group-wrapper">
					<Preliminary panel="left" prediction={prediction} />
					<Final
						final={prediction?.final}
						thirdPlace={prediction?.["3rdPlace"]}
					/>
					<Preliminary panel="right" prediction={prediction} />
				</div>
			</div>
		</>
	);
};

export default Fixture;
