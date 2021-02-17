import React, { createRef, Component } from "react";
import SubMenu from "./header.menu.sub";
import MainMenu from "./header.menu.main";

export default class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = { menuKey: "", timerId: null };
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

	componentWillUnmount() {
		this.clearTimer();
	}

	handleMoveToOutside = e => {
		this.clearTimer();
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ menuKey: "", timerId: null });
		}
	};

	showSubMenu = col => {
		const timerId = setTimeout(() => {
			this.setState({ menuKey: col });
		}, 350);

		this.setState({ timerId });
	};

	closeSubMenu = () => {
		this.setState({ menuKey: "" });
	};

	clearTimer = () => {
		clearTimeout(this.state.timerId);
	};

	render() {
		return (
			<div className="menu">
				<div>
					<MainMenu
						showSubMenu={this.showSubMenu}
						currentMenuKey={this.state.menuKey}
					/>

					<div
						className="subMenu-Wrapper-new"
						ref={this.wrapper}
						onClick={this.closeSubMenu}>
						<SubMenu
							currentMenuKey={this.state.menuKey}
							casinoTpIds={this.props.casinoTpIds}
						/>
					</div>
				</div>
			</div>
		);
	}
}
