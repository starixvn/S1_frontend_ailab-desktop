import React, {
	useEffect,
	useState,
	useContext,
	useRef,
	Fragment
} from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import usePopBox from "../hook/usePopBox";
import { api_worldCupPrediction_GetWorldCupPredictionSetting } from "../../service/api/worldCupPrediction";
import SectionAB from "./fixture.sectionAB";
import SectionCD from "./fixture.sectionCD";
import SectionEF from "./fixture.sectionEF";
import SectionGH from "./fixture.sectionGH";
import { defPreliminary } from "./fixture.def";

const Fixture = () => {
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

	const getTeamList = ({ panel, place, group, event }) => {
		let teams = [];
		let arrLength = 0;
		let sortedTeams = [];

		if (event === "final" || event === "3rdPlace") {
			const data =
				event === "final"
					? prediction?.final
					: prediction?.["3rdPlace"];
			sortedTeams = data?.sort((a, b) => a.sort - b.sort);
			sortedTeams =
				place === "left" ? [sortedTeams?.[0]] : [sortedTeams?.[1]];

			arrLength = 1;
		} else {
			const sectionTeams = defPreliminary[panel];

			const defSort = sectionTeams[event].find(el => el.group === group);
			sortedTeams = prediction?.[event]
				?.filter(team => {
					if (defSort?.sort) {
						return team.sort === defSort?.sort;
					}
					return (
						team.sort >= defSort?.startSort &&
						team.sort <= defSort?.endSort
					);
				})
				.sort((a, b) => a.sort - b.sort);

			arrLength = defSort?.sort
				? 1
				: defSort?.endSort - defSort?.startSort + 1;
		}

		if (sortedTeams?.length === arrLength) {
			teams = sortedTeams?.map(team => (
				<Fragment key={`${event}-${team?.countryName}`}>
					<div className="team" key={`${event}-${team?.countryName}`}>
						{place === "left" && (
							<img
								src={`${bannerImgUrl}/img/flag/${
									team?.imageName ?? "ic-paly-off.jpg"
								}`}
								alt={`${event}-${team?.countryName}`}
							/>
						)}
						{team?.countryName}
						{place === "right" && (
							<img
								src={`${bannerImgUrl}/img/flag/${
									team?.imageName ?? "ic-paly-off.jpg"
								}`}
								alt={`${event}-${team?.countryName}`}
							/>
						)}
					</div>
					{(event === "roundOf16" ||
						event === "quarterFinals" ||
						event === "semiFinals") && <div className="border" />}
				</Fragment>
			));
		} else {
			for (let i = 0; i < arrLength; i++) {
				teams.push(
					<Fragment key={`${event}-${group}-${i}`}>
						<div className="team">
							<img
								src={`${bannerImgUrl}/img/flag/ic-paly-off.jpg`}
								alt={`${event}-${group}-${i}`}
							/>
						</div>
						{(event === "roundOf16" ||
							event === "quarterFinals" ||
							event === "semiFinals") && (
							<div className="border" />
						)}
					</Fragment>
				);
			}
		}
		return teams;
	};

	return (
		<div className="fixture">
			<img
				className="bg"
				src={`${bannerImgUrl}/img/worldcup/fixturebg.jpg`}
				alt="fixture list"
			/>
			<Prize />
			<SectionAB getTeamList={getTeamList} />
			<SectionCD getTeamList={getTeamList} />
			<SectionEF getTeamList={getTeamList} />
			<SectionGH getTeamList={getTeamList} />
		</div>
	);
};

const Prize = () => {
	const { t } = useTranslation();

	return (
		<div className="stage">
			<div className="winner">
				<div className="prizeModule">
					<div className="title">{t("worldCup.groupStage1st")}</div>
					<div className="prize">
						<span>VND</span>168,000,000
					</div>
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.groupStage2nd")}</div>
					<div className="prize">
						<span>VND</span>80,000,000
					</div>
				</div>
			</div>
			<img src={`${bannerImgUrl}/img/worldcup/logo-qat.png`} alt="" />
			<div className="winner">
				<div className="prizeModule">
					<div className="title">{t("worldCup.groupStage1st")}</div>
					<div className="prize">
						<span>VND</span>168,000,000
					</div>
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.groupStage2nd")}</div>
					<div className="prize">
						<span>VND</span>80,000,000
					</div>
				</div>
			</div>
		</div>
	);
};

export default Fixture;
