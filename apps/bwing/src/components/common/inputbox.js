import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

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
	readOnly,
	prefix,
	isShowPaste,
	toHandlePaste,
	pasteCol,
	ShowTipImgAction
}) => {
	const [isShowPasteText, setIsShowPasteText] = useState(false);
	const { t } = useTranslation();
	const showCheckIcon = () => {
		if (checked === null && clickInfo) {
			return (
				<i
					className="icon icon-information-solid"
					onClick={
						ShowTipImgAction !== null ? ShowTipImgAction : clickInfo
					}
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

	const inputBoxClass = () => {
		const classNameList = ["inputBox-blue"];

		if (className) {
			classNameList.push(className);
		}

		if (checked === false) {
			classNameList.push("error");
		}

		return classNameList.join(" ");
	};

	const handlePaste = () => {
		navigator.clipboard
			.readText()
			.then(result => toHandlePaste(result, pasteCol));
	};

	return (
		<>
			<div className={inputBoxClass()}>
				{prefix}

				{!!icon && <i className={`icon ${icon}`} />}

				{!!title && <i className="txt-blue12">{title}</i>}

				{areaCode && <>{areaCode} &nbsp;</>}

				<input
					data-testid="input"
					type={inputType}
					value={value ?? ""}
					className={`${
						_isConvert || textRight ? "text-right" : ""
					} input`}
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
			{isShowPaste && (
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
			{inputType !== "date" && (
				<div className={tip ? "tip active" : ""}>{tip}</div>
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
	className: "",
	toHandlePaste: () => null,
	pasteCol: null,
	max: null,
	onBlur: null,
	clickInfo: null,
	onKeyPress: null,
	placeholder: "",
	onChange: null,
	_isConvert: null,
	readOnly: false,
	textRight: "",
	prefix: null,
	isShowPaste: false,
	ShowTipImgAction: null
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
	textRight: PropTypes.string,
	prefix: PropTypes.node,
	isShowPaste: PropTypes.bool,
	toHandlePaste: PropTypes.func,
	pasteCol: PropTypes.string,
	ShowTipImgAction: PropTypes.func
};

export default InputBox;
