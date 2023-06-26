import React from "react";
import PropTypes from "prop-types";

const InputBox = props => {
	const checkfailed = !props.checked && props.checked !== null;
	let checkIcon = null;
	// if (props.checked === null) {
	// 	checkIcon = (
	// 		<i
	// 			className="icon icon-information-solid"
	// 			onClick={props.clickInfo}
	// 		/>
	// 	);
	// }
	if (props.checked) {
		checkIcon = <i className="icon icon-checkmark" />;
	} else if (checkfailed) {
		checkIcon = <i className="icon icon-cross" />;
	}

	return (
		<>
			<div className={`inputBox-blue${checkfailed ? " error" : ""}`}>
				{props.icon ? <i className={`icon ${props.icon}`} /> : null}
				{props.title ? (
					<i className="txt-blue12">{props.title}</i>
				) : null}
				<input
					type={props.inputType ?? "text"}
					placeholder={props.placeholder}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
					onChange={props.onChange}
					value={
						props.value === null || props.value === undefined
							? ""
							: props.value
					}
					max={props.max ? props.max : null}
				/>
				<div className="iconModule">
					{props.showPsw || props.inputType === "password" ? (
						<i
							className={`icon ${
								!props.showPsw ? "icon-eye-blocked" : "icon-eye"
							}`}
							onClick={props.showPswHandler}
						/>
					) : null}
					{props.checked !== undefined ? (
						<div className="iconModule">{checkIcon}</div>
					) : null}
				</div>
			</div>
			{props.tip ? <div className="tip active">{props.tip}</div> : null}
		</>
	);
};

InputBox.defaultProps = {
	value: null,
	title: "",
	icon: "",
	tip: "",
	checked: null,
	inputType: "text",
	max: null,
	onBlur: null,
	// clickInfo: null,
	placeholder: "",
	onChange: () => null,
	onFocus: () => null,
	showPsw: null,
	showPswHandler: () => null
};

InputBox.propTypes = {
	// clickInfo: PropTypes.func,
	tip: PropTypes.string,
	max: PropTypes.number,
	value: PropTypes.string,
	onBlur: PropTypes.func,
	inputType: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.string,
	checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	showPsw: PropTypes.bool,
	showPswHandler: PropTypes.func
};

export default InputBox;
