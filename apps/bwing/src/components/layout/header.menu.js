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

	handleMoveToOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
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
		let subDivClass1 = "";
		let subDivClass2 = "";
		if (typeof defMenuLinks[this.state.menuKey]?.subMenu !== undefined) {
			subItems = defMenuLinks[this.state.menuKey]?.subMenu;
			mainUrl = defMenuLinks[this.state.menuKey]?.path;
			if (
				// this.state.menuKey === "casino" &&
				subItems &&
				this.props.productTpIds?.length > 0
			) {
				subItems = subItems.filter(s =>
					this.props.productTpIds.includes(s.tpId)
				);
			}

			if (defMenuLinks[this.state.menuKey]?.subDivClass1) {
				subDivClass1 = defMenuLinks[this.state.menuKey]?.subDivClass1;
			}
			if (defMenuLinks[this.state.menuKey]?.subDivClass2) {
				subDivClass2 = defMenuLinks[this.state.menuKey]?.subDivClass2;
			}
		}

		return (
			<div className="menu">
				<MainMenu
					showSubMenu={this.showSubMenu}
					productTpIds={this.props.productTpIds}
				/>
				<div
					className={`nweSubMenu-Wrapper${subItems ? " active" : ""}`}
					ref={this.wrapper}
					onClick={this.closeSubMenu}>
					{subItems ? (
						<SubMenu
							menuKey={this.state.menuKey}
							listClassName={
								defSubListClassName[this.state.menuKey]
							}
							subDivClass1={subDivClass1}
							subDivClass2={subDivClass2}
							mainUrl={mainUrl}
							subItems={subItems}
							productTpIds={this.props.productTpIds}
							maintainList={this.props.maintainList}
						/>
					) : null}
				</div>
			</div>
		);
	}
}
