import React, { createRef, Component } from "react";
import SubMenu from "./header.menu.sub";
import { defMenuLinks, defSubListClassName } from "./header.menu.def";
import MainMenu from "./header.menu.main";

export default class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = { menuKey: "" };
		this.wrapper = createRef(null);
	}

	UNSAFE_componentWillMount() {
		if (typeof document !== `undefined`) {
			document.removeEventListener(
				"mouseover",
				this.handleMoveToOutside,
				false
			);
		}
	}

	componentDidMount() {
		if (typeof document !== `undefined`) {
			document.addEventListener(
				"mouseover",
				this.handleMoveToOutside,
				true
			);
		}
	}

	handleMouseLeave = e => {
		if (
			this.wrapper.current &&
			e.relatedTarget &&
			!this.wrapper.current.contains(e.relatedTarget) &&
			this.state.menuKey !== ""
		) {
			this.setState({ menuKey: "" });
		}
	};

	showSubMenu = col => {
		this.setState({ menuKey: col });
	};

	closeSubMenu = () => {
		this.setState({ menuKey: "" });
	};

	render() {
		let subItems = null;
		let mainUrl = "";
		if (typeof defMenuLinks()[this.state.menuKey]?.subMenu !== undefined) {
			subItems = defMenuLinks()[this.state.menuKey]?.subMenu;
			mainUrl = defMenuLinks()[this.state.menuKey]?.path;
			if (
				// this.state.menuKey === "casino" &&
				subItems &&
				this.props.productTpIds?.length > 0
			) {
				subItems = subItems.filter(s =>
					this.props.productTpIds.includes(s.tpId)
				);
			}
		}

		return (
			<div className="menu">
				<MainMenu
					showSubMenu={this.showSubMenu}
					productTpIds={this.props.productTpIds}
				/>
				<div
					className={`submenu-wrapper ${subItems ? " active" : ""}`}
					ref={this.wrapper}
					onClick={this.closeSubMenu}
					onMouseLeave={this.handleMouseLeave}>
					{subItems ? (
						<SubMenu
							menuKey={this.state.menuKey}
							listClassName={
								defSubListClassName[this.state.menuKey]
							}
							mainUrl={mainUrl}
							subItems={subItems}
							productTpIds={this.props.productTpIds}
							allMaintainList={this.props.allMaintainList}
						/>
					) : null}
				</div>
			</div>
		);
	}
}
