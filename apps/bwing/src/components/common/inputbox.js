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
	onKeyPress,
	placeholder,
	onChange,
	_isConvert,
	textRight,
	readOnly
}) => {
	const showCheckIcon = () => {
		if (checked === null && clickInfo) {
			return (
				<i
					className="icon icon-information-solid"
					onClick={clickInfo}
				/>
			);
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

	return (
		<>
			<div className={className ?? "inputBox-blue"}>
				{!!icon && <i className={`icon ${icon}`} />}

				{!!title && <i className="txt-blue12">{title}</i>}

				{areaCode && <>{areaCode} &nbsp;</>}

				<input
					data-testid="input"
					type={inputType}
					value={value ?? ""}
					className={_isConvert || textRight ? "text-right" : ""}
					placeholder={placeholder}
					onBlur={onBlur}
					onChange={onChange}
					max={max}
					readOnly={readOnly}
					onKeyPress={onKeyPress}
				/>

				<div className="iconModule">
					{_isConvert ? "('000)" : null}
					{checked !== undefined ? showCheckIcon() : null}
				</div>
			</div>
			{inputType !== "date" && (
				<div className={tip ?? "tip active"}>{tip}</div>
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
	className: "inputBox-blue",
	max: null,
	onBlur: null,
	clickInfo: null,
	onKeyPress: null,
	placeholder: "",
	onChange: null,
	_isConvert: null,
	readOnly: false,
	textRight: ""
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
	checked: PropTypes.bool,
	onKeyPress: PropTypes.func,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	_isConvert: PropTypes.bool,
	textRight: PropTypes.string
};

export default InputBox;
