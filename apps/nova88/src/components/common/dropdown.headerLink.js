import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

export class Dropdown extends Component {
	constructor(props) {
		super(props);
		if (typeof document !== `undefined`) {
			document.addEventListener("mousedown", this.handleClickOutside);
		}
		this.state = { isOpen: false };
		this.wrapper = createRef(null);
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
			return item.elemType === defElemType.btn ? (
				<button
					key={key}
					className={item.icon}
					onClick={item.href.bind(this, item.value)}>
					{item.displayKey ? this.props.i18n(item.displayKey) : null}
				</button>
			) : (
				<Link
					className={item.icon}
					key={key}
					to={`/${this.props.langId}/${item.href}`}>
					{item.displayKey ? this.props.i18n(item.displayKey) : null}
				</Link>
			);
		});

		let selected = null;
		if (this.props.placeholder?.elemType === defElemType.btn) {
			selected = <button className={this.props.placeholder.icon} />;
		} else {
			selected = <button>{this.props.placeholder}</button>;
		}

		return (
			<div
				className={`${this.props.className}${
					this.state.isOpen ? " active" : ""
				}`}
				ref={this.wrapper}
				onClick={this.clickDropdown}>
				{selected}
				<div className={this.props.subClassName}>{arr}</div>
			</div>
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
