import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const InputBox = props => {
	const [isShowPasteText, setIsShowPasteText] = useState(false);
	const { t } = useTranslation();
	const showCheckIcon = () => {
		if (props.checked === null && props.clickInfo) {
			return (
				<i
					className="icon icon-information-solid"
					onClick={props.clickInfo}
				/>
			);
		}
		if (props.checked === true) {
			return <i className="icon icon-checkmark" />;
		}
		if (props.checked === false) {
			return <i className="icon icon-cross" />;
		}
		if (props.checked === "loading") {
			return <i className="icon icon-spinner11" />;
		}
		return null;
	};

	const inputBoxClass = () => {
		const classNameList = ["inputBox"];

		if (props.className) {
			classNameList.push(props.className);
		}

		if (props.checked === false) {
			classNameList.push("error");
		}

		return classNameList.join(" ");
	};

	const handlePaste = () => {
		navigator.clipboard
			.readText()
			.then(result => props.handlePaste(result, props.pasteCol));
	};

	return (
		<>
			<div className={inputBoxClass()}>
				{props.prefix}

				{props.icon ? <i className={`icon ${props.icon}`} /> : null}
				{props.title ? (
					<i className="txt-blue12">{props.title}</i>
				) : null}
				{props.areaCode ? (
					<div className="countryCode">{props.areaCode}</div>
				) : null}
				<input
					type={props.inputType ?? "text"}
					className={props._isConvert ? "text-right" : ""}
					placeholder={props.placeholder}
					onBlur={props.onBlur}
					onChange={props.onChange}
					value={
						props.value === null || props.value === undefined
							? ""
							: props.value
					}
					max={props.max ? props.max : null}
					readOnly={props.readOnly}
					data-testid="input"
				/>

				<div className="iconModule">
					{props._isConvert ? "('000)" : null}
					{props.checked !== undefined ? showCheckIcon() : null}
				</div>
			</div>
			{props.isShowPaste && (
				<div
					onMouseEnter={() => {
						setIsShowPasteText(true);
					}}
					onMouseLeave={() => {
						setIsShowPasteText(false);
					}}
				>
					{isShowPasteText ? (
						<span onClick={handlePaste}>{t("lbl_Paste")}</span>
					) : (
						<button className="icon icon-files-empty copyBtn" />
					)}
				</div>
			)}
			{props.inputType !== "date" ? (
				<div className={`tip${props.tip ? " active" : ""}`}>
					{props.tip}
				</div>
			) : null}
		</>
	);
};

InputBox.defaultProps = {
	prefix: null,
	checked: null,
	className: null,
	clickInfo: () => null,
	handlePaste: () => null,
	pasteCol: null,
	icon: null,
	title: null,
	areaCode: null,
	inputType: null,
	_isConvert: null,
	placeholder: null,
	onBlur: () => null,
	value: null,
	max: null,
	readOnly: null,
	tip: null,
	isShowPaste: null
};
InputBox.propTypes = {
	prefix: PropTypes.node,
	checked: PropTypes.bool,
	className: PropTypes.string,
	clickInfo: PropTypes.func,
	handlePaste: PropTypes.func,
	pasteCol: PropTypes.string,
	icon: PropTypes.string,
	title: PropTypes.string,
	areaCode: PropTypes.string,
	inputType: PropTypes.string,
	_isConvert: PropTypes.bool,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.number,
	readOnly: PropTypes.bool,
	tip: PropTypes.string,
	isShowPaste: PropTypes.bool
};

export default InputBox;
