import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { api_account_SetLanguage } from "../../service/api/account";
import { setCookie } from "./common";
import { SiteInfo } from "../../config";
import { getNewLanguagePath } from "../../service/language";
import defPopBoxType from "./defPopBoxType";

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

	selectItem = (value, currencyId, newPath, e) => {
		e.stopPropagation();
		this.setState({ isOpen: false });
		if (
			value !== this.props.selectedValue ||
			currencyId !== this.props.selectedCurrencyId
		) {
			if (this.props.isLogin) {
				try {
					api_account_SetLanguage(value).then(res => {
						if (
							this.props.isMountedRef.current &&
							res.data.errorCode !== 0
						) {
							this.props.setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `[${res.data.errorCode}] ${res.data.message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={this.props.clickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
					});
				} catch (error) {
					if (thris.props.isMountedRef.current) {
						this.props.setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={this.props.clickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			} else {
				this.props.setUserInfo(prev => ({ ...prev, currencyId }));
			}

			navigate(newPath);
			setCookie(SiteInfo.langCookie, value);
			setCookie(SiteInfo.currencyCookie, currencyId);
		}
	};

	render() {
		let icon =
			Object.keys(this.props.defLangGroup).length === 1
				? Object.keys(this.props.defLangGroup)[0]
				: null;

		const rows = Object.keys(this.props.defLangGroup).map(_group => (
			<span key={`${this.props.mainKey}_${_group}`}>
				<div className="countryName">
					{this.props.defLangGroupCountry[_group]}
				</div>
				<div className={`flag ${_group}`}>
					{this.props.defLangGroup[_group].map(item => {
						if (
							item.value === this.props.selectedValue &&
							item.currencyId === this.props.selectedCurrencyId
						) {
							icon = _group;
						}
						return (
							<button
								key={`${this.props.mainKey}_${item.value}`}
								onClick={this.selectItem.bind(
									this,
									item.value,
									item.currencyId,
									getNewLanguagePath(item.value)
								)}>
								{item.displayText}
							</button>
						);
					})}
				</div>
			</span>
		));

		const selected = (
			<button className={`flag ${icon}`}>
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

Dropdown.defaultProps = {
	isMountedRef: null,
	setPopBox: () => null,
	clickClose: () => null,
	setUserInfo: () => null
};

Dropdown.propTypes = {
	className: PropTypes.string.isRequired,
	subClassName: PropTypes.string.isRequired,
	mainKey: PropTypes.string.isRequired,
	selectedValue: PropTypes.string.isRequired,
	isLogin: PropTypes.bool.isRequired,
	defLangGroupCountry: PropTypes.objectOf(PropTypes.any).isRequired,
	defLangGroup: PropTypes.objectOf(PropTypes.array).isRequired,
	isMountedRef: PropTypes.objectOf(PropTypes.any),
	setPopBox: PropTypes.func,
	clickClose: PropTypes.func,
	selectedCurrencyId: PropTypes.number.isRequired,
	setUserInfo: PropTypes.func
};

export default Dropdown;
