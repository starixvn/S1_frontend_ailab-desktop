/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";

const InputBox = ({
	value,
	title,
	icon,
	tip,
	tooltip,
	checked,
	areaCode,
	inputType,
	className,
	max,
	onBlur,
	clickInfo,
	onKeyDown,
	placeholder,
	onChange,
	_isConvert,
	readOnly,
	isTipHide
}) => {
	const showCheckIcon = () => {
		if (checked === null && clickInfo) {
			return <i className="icon icon-information" onClick={clickInfo} />;
		}
		if (checked === true) {
			return <i className="icon icon-checkmark" />;
		}
		if (checked === false) {
			return <i className="icon icon-cross" />;
		}
		if (checked === "loading") {
			return <i className="icon icon-spinner11" />;
		}

		return null;
	};

	const inputBoxClass = () => {
		const classNameList = [];

		if (className) {
			classNameList.push(className);
		}

		if (checked === false) {
			classNameList.push("error");
		}

		return classNameList.join(" ");
	};

	return (
		<>
			<div className={inputBoxClass()}>
				{!!icon && <i className={`icon ${icon}`} />}

				{!!title && <i className="txt-blue">{title}</i>}

				{!!areaCode && <div className="txt-lightgray">{areaCode}</div>}

				<input
					data-testid="input"
					type={inputType ?? "text"}
					value={value ?? ""}
					placeholder={placeholder}
					max={max}
					onBlur={onBlur}
					onChange={onChange}
					readOnly={readOnly}
					onKeyDown={onKeyDown}
				/>

				{!!tooltip && <div className="description">{tooltip}</div>}

				{checked !== undefined && (
					<div className="iconModule">
						{!!_isConvert && <i>('000)</i>}
						{showCheckIcon()}
					</div>
				)}
			</div>

			{inputType !== "date" && !isTipHide && (
				<div className={`tip${tip ? " active" : ""}`}>{tip}</div>
			)}
		</>
	);
};

InputBox.defaultProps = {
	value: null,
	title: "",
	icon: "",
	tip: "",
	tooltip: "",
	checked: "",
	areaCode: "",
	inputType: "text",
	className: "inputBox",
	max: null,
	onBlur: null,
	clickInfo: null,
	onKeyDown: null,
	placeholder: "",
	onChange: null,
	_isConvert: null,
	readOnly: false
};

InputBox.propTypes = {
	// eslint-disable-next-line react/no-unused-prop-types
	clickInfo: PropTypes.func,
	tip: PropTypes.string,
	tooltip: PropTypes.string,
	readOnly: PropTypes.bool,
	max: PropTypes.number,
	value: PropTypes.string,
	onBlur: PropTypes.func,
	inputType: PropTypes.string,
	areaCode: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.string,
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	onKeyDown: PropTypes.func,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	_isConvert: PropTypes.bool
};

export default InputBox;
