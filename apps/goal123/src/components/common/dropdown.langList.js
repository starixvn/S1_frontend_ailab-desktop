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

const defLangList = () =>
	Object.keys(defLangDisplayText).map(k => {
		return { icon: `flag ${k}`, value: k };
	});

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
		const arr = defLangList().map((item, idx) => {
			const key = `${this.props.mainKey}_${idx}`;

			return (
				<button
					key={key}
					// to={newPathArr}
					className={item.icon}
					onClick={this.selectItem.bind(
						this,
						item.value,
						getNewLanguagePath(item.value)
					)}>
					{defLangDisplayText[item.value]}
				</button>
			);
		});

		const selected = (
			<button className={`flag ${this.props.selectedValue}`} />
		);

		return (
			<div
				className={`${this.props.className}${
					this.state.isOpen ? " active" : ""
				}`}
				ref={this.wrapper}
				onClick={this.clickDropdown}>
				{selected}
				<i className="icon icon-keyboard_arrow_right" />
				<div className={this.props.subClassName}>{arr}</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	className: PropTypes.string.isRequired,
	subClassName: PropTypes.string.isRequired,
	mainKey: PropTypes.string.isRequired,
	selectedValue: PropTypes.string.isRequired
};

export default Dropdown;
