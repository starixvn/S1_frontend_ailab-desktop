import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { defNav } from "./casino.def";
import { userInfoContext } from "../common/context";

const Nav = ({ categoryList, activeCategory, onChange, isProcessing }) => {
	const {
		userInfo: { memberType }
	} = useContext(userInfoContext);
	const { t } = useTranslation();
	return (
		<div className="select-bar">
			{categoryList.map(item => {
				let _key = Object.keys(item)[0];
				_key = _key.charAt(0).toUpperCase() + _key.slice(1);
				const _nav = defNav[_key];

				const LiveStreamingMemberType = 3;
				if (
					memberType === LiveStreamingMemberType &&
					_nav.key === defNav.Random.key
				) {
					return null;
				}

				return (
					<div
						key={`casino-nav-${Object.keys(item)[0]}`}
						className={classNames({
							active: activeCategory === Object.keys(item)[0]
						})}
						onClick={() => {
							!isProcessing && onChange(Object.keys(item)[0]);
						}}
					>
						{t(_nav?.displayKey)}
					</div>
				);
			})}
		</div>
	);
};
export default Nav;

Nav.defaultProps = {
	activeCategory: null
};

Nav.propTypes = {
	categoryList: PropTypes.arrayOf(PropTypes.any).isRequired,
	activeCategory: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	isProcessing: PropTypes.bool.isRequired
};
