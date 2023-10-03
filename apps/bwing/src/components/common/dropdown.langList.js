import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { api_account_SetLanguage } from "../../service/api/account";
import { setCookie } from "./common";
import { getNewLanguagePath } from "../../service/language";
import { langCookie } from "../../config";

const defLangDisplayText = {
	vn: "Tiếng Việt",
	en: "English"
};

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
					api_account_SetLanguage(value).then(res => {
						const { errorCode, message } = res.data;
						if (errorCode !== 0) {
							this.props.errorPopBox(
								message || "error",
								errorCode
							);
						}
					});
				} catch (error) {
					this.props.errorPopBox();
				}
			}

			navigate(newPath);
			setCookie(langCookie, value);
		}
	};

	render() {
		const selected = (
			<button className={`flag ${this.props.selectedValue}`}>
				{defLangDisplayText[this.props.selectedValue]}
			</button>
		);

		const targetItem = this.props.selectedValue === "en" ? "vn" : "en";

		return (
			<div
				className={`${this.props.className}${
					this.state.isOpen ? " active" : ""
				}`}
				ref={this.wrapper}
				onClick={this.selectItem.bind(
					this,
					targetItem,
					getNewLanguagePath(targetItem)
				)}>
				{selected}
				<i className="icon-dropdown-arrow-primary" />
			</div>
		);
	}
}

Dropdown.defaultProps = {
	isLogin: null
};

Dropdown.propTypes = {
	className: PropTypes.string.isRequired,
	selectedValue: PropTypes.string.isRequired,
	isLogin: PropTypes.bool,
	errorPopBox: PropTypes.func.isRequired
};

export default Dropdown;
