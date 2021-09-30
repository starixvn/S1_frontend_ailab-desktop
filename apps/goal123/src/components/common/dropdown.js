import React, { Component, createRef } from "react";

class Dropdown extends Component {
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

	selectItem = (props, e) => {
		e.stopPropagation();
		const { idx, item } = props;
		this.setState({ isOpen: false });
		this.props.onSelectItem(idx, item);
	};

	render() {
		const arr = this.props.options
			.map((item, i) => {
				return (
					<Item
						key={`${this.props.mainKey}_${item.id}`}
						displayKey={item.displayKey}
						i18n={this.props.i18n}
						onClick={this.selectItem.bind(this, { idx: i, item })}
						displayText={item.displayText}
						imgUrl={this.props.imgUrl + item.image}
						className={this.props.className}
						active={this.props.selectedIdx === i}
					/>
				);
			})
			.filter(
				(_, idx) =>
					(this.props.isHideSelfItem &&
						idx !== this.props.selectedIdx) ||
					!this.props.isHideSelfItem
			);

		let selected = null;
		if (
			this.props.options?.length > 0 &&
			this.props.options[this.props.selectedIdx]
		) {
			const _s = this.props.options[this.props.selectedIdx];

			if (_s.displayText) {
				selected = _s.displayText;
			} else {
				selected = this.props.i18n(_s.displayKey);
			}
		} else {
			selected = this.props.placeholder;
		}

		return (
			<div
				className="dropdown"
				ref={this.wrapper}
				onClick={this.clickDropdown}
				data-testid={`dropdown_${this.props.mainKey}`}>
				{this.props.title ? <span>{this.props.title}</span> : null}
				{this.props.icon ? (
					<i className={`icon ${this.props.icon}`} />
				) : null}
				<button className="btn">{selected}</button>
				{arr.length < 1 ? null : (
					<div
						className={`dropdown-container${
							this.state.isOpen ? " active" : ""
						}`}
						data-testid={`dropdown_container_${this.props.mainKey}`}>
						{arr}
					</div>
				)}
			</div>
		);
	}
}

const Item = props => {
	return (
		<div
			className={`dropdown-item ${props.active ? "active" : ""}`}
			onClick={props.onClick}
			data-testid={`dropdown-item-${props.displayKey}`}>
			{props.imgUrl ? (
				<>
					<div className={props.className}>
						<img src={props.imgUrl} alt={props.displayText} />
					</div>
					<div>{props.displayText}</div>
				</>
			) : props.displayText ? (
				props.displayText
			) : (
				props.i18n(props.displayKey)
			)}
		</div>
	);
};

export default Dropdown;
