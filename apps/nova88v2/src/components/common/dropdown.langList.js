import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { api_account_SetLanguage } from "../../service/api/account";
import { setCookie } from "./common";
import { SiteInfo } from "../../config";
import { getNewLanguagePath } from "../../service/language";

export class Dropdown extends Component {
	constructor(props) {
		super(props);

		this.state = { isOpen: false };
		this.wrapper = createRef(null);
	}

	UNSAFE_componentWillMount() {
		if (typeof document !== `undefined`) {
			document.removeEventListener("mousedown", this.handleClickOutside);
		}
	}

	componentDidMount() {
		if (typeof document !== `undefined`) {
			document.addEventListener("mousedown", this.handleClickOutside);
		}
	}

	handleClickOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};

	clickDropdown = e => {
		e.preventDefault();
		this.setState(prev => ({ isOpen: !prev.isOpen }));
	};

	selectItem = (value, newPath, e) => {
		e.stopPropagation();
		this.setState({ isOpen: false });
		if (value !== this.props.selectedValue) {
			if (this.props.isLogin) {
				try {
					api_account_SetLanguage(value);
				} catch (error) {}
			}

			navigate(newPath);
			setCookie(SiteInfo.langCookie, value);
		}
	};

	render() {
		const rows = Object.keys(this.props.defLangGroup).map(_group => {
			return (
				<div
					key={`${this.props.mainKey}_${_group}`}
					className={`flag ${_group}`}>
					{this.props.defLangGroup[_group].map(item => {
						return (
							<button
								key={`${this.props.mainKey}_${item.value}`}
								onClick={this.selectItem.bind(
									this,
									item.value,
									getNewLanguagePath(item.value)
								)}>
								{item.displayText}
							</button>
						);
					})}
				</div>
			);
		});

		const selected = (
			<button className={`flag ${this.props.mainLangClass}`}>
				{/* {defLangDisplayText[this.props.selectedValue]} */}
			</button>
		);

		return (
			<div
				className={`${this.props.className}${
					this.state.isOpen ? " active" : ""
				}`}
				ref={this.wrapper}
				onClick={this.clickDropdown}>
				{selected}
				<div className={this.props.subClassName}>{rows}</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	className: PropTypes.string.isRequired,
	subClassName: PropTypes.string.isRequired,
	mainKey: PropTypes.string.isRequired,
	selectedValue: PropTypes.string.isRequired,
	isLogin: PropTypes.bool.isRequired
};

export default Dropdown;
