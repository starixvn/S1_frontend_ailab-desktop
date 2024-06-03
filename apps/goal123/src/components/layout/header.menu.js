import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import HeaderMainMenu from "./header.menu.main";
import HeaderSubMenu from "./header.menu.sub";

const HeaderNewMenu = ({ menuList = [], onClickProductItem }) => {
	const [menuKey, setMenuKey] = useState("");
	const subMenuRef = useRef(null);

	const handleMoveToOutside = event => {
		if (
			event.relatedTarget instanceof Node &&
			!subMenuRef?.current?.contains(event.relatedTarget) &&
			menuKey !== ""
		) {
			setMenuKey("");
		}
	};

	useEffect(() => {
		document.addEventListener("mouseover", handleMoveToOutside, true);

		return () => {
			document.removeEventListener(
				"mouseover",
				handleMoveToOutside,
				false
			);
		};
	}, []);

	return (
		<div
			className="menu"
			onMouseLeave={() => {
				setMenuKey("");
			}}>
			<HeaderMainMenu
				setMenuKey={setMenuKey}
				currentMenuKey={menuKey}
				menuList={menuList}
				onClickProductItem={onClickProductItem}
			/>
			<div
				className={classNames("submenu-wrapper", {
					active: true
				})}
				onMouseLeave={handleMoveToOutside}
				ref={subMenuRef}
				onClick={() => setMenuKey("")}>
				<HeaderSubMenu
					currentMenuKey={menuKey}
					menuList={menuList}
					onClickProductItem={onClickProductItem}
				/>
			</div>
		</div>
	);
};

HeaderNewMenu.propTypes = {
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onClickProductItem: PropTypes.func.isRequired
};

export default HeaderNewMenu;
