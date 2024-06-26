import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import useClickOutside from "../hook/useClickOutSide";

const InputBox = props => {
	const ref = useClickOutside(() => {
		props.setActiveInfo("");
	});
	const { t } = useTranslation();
	const checkfailed = !props.checked && props.checked !== null;
	let checkIcon = null;
	if (props.checked === null) {
		checkIcon = (
			<i
				className={`icon ${
					props.border ? "icon-information-solid" : "icon-info"
				}`}
				onClick={props.clickInfo}
			/>
		);
	}
	if (props.checked) {
		checkIcon = (
			<i
				className={`icon ${
					props.border ? "icon-checkmark" : "icon-check"
				}`}
			/>
		);
	} else if (checkfailed) {
		checkIcon = (
			<i
				className={`icon ${props.border ? "icon-cross" : "icon-error"}`}
			/>
		);
	}

	return (
		<>
			{props.border ? (
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
									!props.showPsw
										? "icon-eye-blocked"
										: "icon-eye"
								}`}
								onClick={props.showPswHandler}
							/>
						) : null}

						{props.checked !== undefined ? checkIcon : null}
					</div>
				</div>
			) : (
				<div className="inputbox-group">
					<div className="inputbox-item">
						<i className="icon-password" />
						<input
							type={props.inputType ?? "text"}
							placeholder={props.placeholder}
							onFocus={props.onFocus}
							onBlur={props.onBlur}
							onChange={props.onChange}
							value={
								props.value === null ||
								props.value === undefined
									? ""
									: props.value
							}
							max={props.max ? props.max : null}
						/>
						<i
							className={`icon ${
								!props.showPsw
									? "icon-unvisible"
									: "icon-visible"
							}`}
							onClick={props.showPswHandler}
						/>
						{props.checked !== undefined ? checkIcon : null}
						{props.hint && props.activeInfo === props.hint && (
							<div className="inputbox-tip-popup" ref={ref}>
								{t(props.hint)}
							</div>
						)}
					</div>
				</div>
			)}
			{props.tip && props.border ? (
				<div className="tip active">{props.tip}</div>
			) : null}
			{props.tip && !props.border ? (
				<div className="inputbox-tip">{props.tip}</div>
			) : null}
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
	clickInfo: null,
	placeholder: "",
	onChange: () => null,
	onFocus: () => null,
	showPsw: null,
	showPswHandler: () => null,
	border: true,
	hint: "",
	activeInfo: "",
	setActiveInfo: null
};

InputBox.propTypes = {
	clickInfo: PropTypes.func,
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
	showPswHandler: PropTypes.func,
	border: PropTypes.bool,
	hint: PropTypes.string,
	activeInfo: PropTypes.string,
	setActiveInfo: PropTypes.func
};

export default InputBox;
