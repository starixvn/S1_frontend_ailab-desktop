import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classNames from "classnames";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import { defSlotTpGameType } from "../../datas/productList";

const TopQuickLink = ({ lobbyImgList, activeProvider, onChange }) => {
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const [isActiveDropdown, setIsActiveDropdown] = useState(false);

	return (
		<div
			className={`provider ${classNames({
				active: isActiveDropdown
			})}`}
		>
			<div className="provider-list">
				{lobbyImgList.map(
					({
						imgName,
						tpName,
						displayText,
						openPath,
						tpId,
						...rest
					}) => {
						return openPath ? (
							<Link
								className={`${classNames("provider-list-item", {
									active: activeProvider.tpId === tpId
								})}`}
								to={`/${langId}/${openPath}`}
							>
								<div>
									<img
										src={`${bannerImgUrl}/desktop/img/4.0/lobby-slots/provider-logo/${imgName}.png`}
										alt={tpName}
									/>
								</div>
								<div>{displayText}</div>
							</Link>
						) : (
							<Link
								to={`/${langId}/slots?tpId=${tpId}&tpGameType=${defSlotTpGameType[tpName]?.tpGameType}`}
								className={`${classNames("provider-list-item", {
									active: activeProvider.tpId === tpId
								})}`}
								onClick={() =>
									onChange(
										tpId === activeProvider.tpId
											? {}
											: {
													imgName,
													tpName,
													displayText,
													openPath,
													tpId,
													...rest
											  }
									)
								}
							>
								<div>
									<img
										src={`${bannerImgUrl}/desktop/img/4.0/lobby-slots/provider-logo/${imgName}.png`}
										alt={tpName}
									/>
								</div>
								<div>{displayText}</div>
							</Link>
						);
					}
				)}
			</div>
			<button onClick={() => setIsActiveDropdown(prev => !prev)}>
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-slots/down.png`}
					alt=""
				/>
			</button>
		</div>
	);
};

TopQuickLink.propTypes = {
	lobbyImgList: PropTypes.arrayOf(PropTypes.any).isRequired,
	activeProvider: PropTypes.objectOf(PropTypes.any).isRequired,
	onChange: PropTypes.func.isRequired
};

export default TopQuickLink;
