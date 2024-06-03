import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { defTpGameType } from "@ailab-desktop/common";
import { bannerImgUrl } from "../../config";
import { HOT_GAME_LIST } from "./def";

const HotGames = ({ maintainList, handleClickHomeProduct }) => {
	const { t } = useTranslation();

	const hotGameList = HOT_GAME_LIST.map(hotGameItem => {
		const { tpId, tpGameType } = hotGameItem || {};
		const isInMaintain = maintainList?.some(
			m =>
				m.tpId === tpId &&
				(m.tpGameType === tpGameType ||
					m.tpGameType === defTpGameType.All)
		);

		return { ...hotGameItem, isInMaintain };
	});

	return (
		<div className="col-12">
			<div className="home-title">
				<i className="icon-games" />
				{t("lbl_HOT_GAMES")}
			</div>
			<div className="home-hotgame mb-6">
				<a
					className="home-hotgame-left"
					onClick={() => handleClickHomeProduct(HOT_GAME_LIST[0])}>
					<img
						src={`${bannerImgUrl}/desktop/img/4.0/hotgames/${hotGameList[0].image}.png`}
						alt=""
					/>
					<div className="subtitle">
						{t(hotGameList[0].displayKey)}
					</div>
				</a>
				<div className="home-hotgame-right">
					{hotGameList
						.slice(1)
						.map(({ displayKey, image, icon, ...rest }) => (
							<button
								className="home-hotgame-item"
								key={displayKey}
								onClick={() => handleClickHomeProduct(rest)}>
								{icon && <i className={icon} />}
								<img
									src={`${bannerImgUrl}/desktop/img/4.0/hotgames/${image}.png`}
									alt={`hotGames-${displayKey}`}
								/>
								<div className="subtitle">{t(displayKey)}</div>
							</button>
						))}
				</div>
			</div>
		</div>
	);
};

HotGames.defaultProps = {
	maintainList: []
};

HotGames.propTypes = {
	maintainList: PropTypes.arrayOf(PropTypes.any),
	handleClickHomeProduct: PropTypes.func.isRequired
};

export default HotGames;
