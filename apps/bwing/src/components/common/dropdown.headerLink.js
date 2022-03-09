import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { defPageClubImg } from "../vip/vip.def";
import path from "../../router";

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
		if (this.props.clickDropdown) {
			this.props.clickDropdown();
		}
	};

	selectItem = (i, e) => {
		e.stopPropagation();
		this.setState({ isOpen: false });
		this.props.onSelectItem(i);
	};

	render() {
		const arr = this.props.options.map((item, idx) => {
			const key = `${this.props.mainKey}_${idx}`;

			let _iconClassName = "";
			if (item.eventIcons) {
				let iconStrings = "";
				for (let i = 0; i < item.eventIcons.length; i++) {
					iconStrings += `${item.eventIcons[i]} `;
				}
				_iconClassName = `icon ${iconStrings}`;
			}

			return item.elemType === defElemType.btn ? (
				<button key={key} onClick={item.href.bind(this, item.value)}>
					{item.displayKey ? this.props.i18n(item.displayKey) : null}
				</button>
			) : (
				<Link key={key} to={`/${this.props.langId}/${item.href}`}>
					{item.displayKey ? this.props.i18n(item.displayKey) : null}
					<i className={_iconClassName} />
				</Link>
			);
		});

		let selected = null;
		if (this.props.placeholder?.elemType === defElemType.btn) {
			selected = <button className={this.props.placeholder.icon} />;
		} else {
			selected = <button>{this.props.placeholder}</button>;
		}

		const userLevelImgInfo = this.props?.userLevel
			? defPageClubImg[this.props.userLevel - 1]
			: null;

		return (
			<>
				{userLevelImgInfo ? (
					<Link
						className="imgvip"
						to={`/${this.props.langId}/${path.profile.root}`}>
						<div className="icon-coinicon" />

						<img
							src={userLevelImgInfo.img}
							alt={userLevelImgInfo.alt}
						/>
					</Link>
				) : null}
				<div
					className={`${this.props.className}${
						this.state.isOpen ? " active" : ""
					}`}
					ref={this.wrapper}
					onClick={this.clickDropdown}>
					{selected}
					<i className="icon icon-arrow_drop_down" />
					<div className={this.props.subClassName}>{arr}</div>
				</div>
			</>
		);
	}
}

Dropdown.defaultProps = {
	placeholder: ""
};

Dropdown.propTypes = {
	className: PropTypes.string.isRequired,
	subClassName: PropTypes.string.isRequired,
	i18n: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.any).isRequired,
	mainKey: PropTypes.string.isRequired,
	placeholder: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
		PropTypes.object
	])
};

export const defElemType = {
	btn: "btn"
};

export default Dropdown;
