import React, { createRef, Component } from "react";
import SubMenu from "./header.menu.sub";
import MainMenu from "./header.menu.main";

export default class Panel extends Component {
	showSubMenu = col => {
		this.setState({ menuKey: col });
	};

	closeSubMenu = () => {
		this.setState({ menuKey: "" });
	};

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

	render() {
		return (
			<div
				className="menu"
				onMouseLeave={() => {
					this.setState({ menuKey: "" });
				}}>
				<div>
					<MainMenu
						showSubMenu={this.showSubMenu}
						currentMenuKey={this.state.menuKey}
						productTpIds={this.props.productTpIds}
					/>

					<div
						className="subMenu-Wrapper-new"
						onClick={this.closeSubMenu}
						ref={this.wrapper}>
						<SubMenu
							showSubMenu={this.showSubMenu}
							maintainList={this.props.maintainList}
							currentMenuKey={this.state.menuKey}
							productTpIds={this.props.productTpIds}
						/>
					</div>
				</div>
			</div>
		);
	}
}
