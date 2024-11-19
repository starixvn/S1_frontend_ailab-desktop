/* eslint-disable react/self-closing-comp */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { filter, find, uniqueId } from "lodash";
import classNames from "classnames";

export type SelectOptionType = {
	className?: string;
	value: string | number | undefined;
	label: string | number | null | ReactNode;
	disabled?: boolean;
	prefixOptionIcon?: ReactNode;
};

export interface ISelectProps {
	value?: string | number;
	defaultValue?: string | number;
	options: SelectOptionType[];
	prefixIcon?: ReactNode;
	placeholder?: string;
	showSearch?: boolean;
	isTranslation?: boolean;
	prefixText?: string;
	onChange?: (value: SelectOptionType["value"]) => void;
	errorMessage?: string;
	showValue?: boolean;
}

/**
 * Select 組件 - 可自訂的下拉選單組件，支援搜尋及翻譯等功能
 *
 * @param {string | number} value 當前選中的值 (受控組件)
 * @param {string | number} defaultValue 預設選中的值 (非受控組件)
 * @param {SelectOptionType[]} options 下拉選單中的選項列表
 * @param {ReactNode} prefixIcon 下拉按鈕前顯示的圖示
 * @param {string} placeholder 當無選項被選中時顯示的提示文字
 * @param {boolean} showSearch 是否顯示搜尋框來篩選選項
 * @param {boolean} isTranslation 是否啟用 i18n 翻譯選項標籤
 * @param {string} prefixText 在下拉按鈕前顯示的前置文字
 * @param {(value: string | number) => void} onChange 當選中選項時觸發的回調函數
 * @param {string} errorMessage 當有錯誤時顯示的錯誤訊息
 * @param {boolean} showValue 是否顯示選中的值而非標籤
 *
 * @example
 * 使用範例：
 * <Select
 *    value={selectedValue}
 *    options={options}
 *    onChange={handleChange}
 *    placeholder="請選擇"
 *    showSearch
 * /> */
export const Select = (props: ISelectProps) => {
	const { t } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);
	const {
		value,
		defaultValue,
		options,
		prefixIcon,
		placeholder = t("lbl_General_None"),
		showSearch,
		isTranslation,
		prefixText,
		errorMessage,
		showValue,
		onChange
	} = props;

	// ====== useState ======

	// 狀態管理 isActive (是否顯示下拉選單)
	const [isActive, setIsActive] = useState(false);

	// 控制當前選中的選項
	const [currentOption, setCurrentOption] = useState<
		SelectOptionType | undefined
	>();

	// 搜尋框的輸入值
	const [filterValue, setFilterValue] = useState("");

	// ====== 函數 ======

	const handleOptionClick = (newOption: SelectOptionType) => {
		setCurrentOption(newOption);
		if (onChange) {
			onChange(newOption.value);
		}
		setIsActive(false); // 點擊後關閉下拉選單
	};

	// ====== useEffect ======

	// * 當傳入 value 將元件轉變為控制型元件

	useEffect(() => {
		if (value === undefined && defaultValue !== undefined) {
			setCurrentOption(find(options, { value: defaultValue }));
		}
	}, [defaultValue, value, options]);

	useEffect(() => {
		if (value !== undefined) {
			setCurrentOption(find(options, { value }));
		}
	}, [value, options]);

	// 點擊外部時關閉下拉選單
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsActive(false); // 點擊外部時關閉選單
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// ====== 變數 ======

	/** 使用搜尋的 Options ，可以絕對搜尋 與 模糊搜尋 */
	const filterOptions = filter(
		options,
		item =>
			String(item.value)
				.toLowerCase()
				.includes(filterValue.toLowerCase()) ||
			String(item.label).toLowerCase().includes(filterValue.toLowerCase())
	);

	/** 顯示的文字 */
	let label = `${currentOption?.label ?? placeholder}`;
	if (isTranslation) {
		label = `${t(currentOption?.label as string) || t(placeholder || "")}`;
	} else if (showValue) {
		label = `${currentOption?.value as string}`;
	}

	return (
		<div className={classNames("inputBox-blue", { error: errorMessage })}>
			{prefixText && <i className="txt-blue">{prefixText}</i>}
			<div
				ref={ref}
				className="dropdown"
				onClick={e => {
					if (
						!(e?.target as HTMLInputElement)?.className.includes(
							"search"
						)
					) {
						setIsActive(!isActive);
					}
				}}
			>
				{prefixIcon}

				<button type="button" className="btn">
					{currentOption?.prefixOptionIcon}
					{label}
				</button>
				<i className="icon icon-arrow_drop_down" />
				<div
					className={classNames("dropdown-container", {
						active: isActive
					})}
				>
					{showSearch && (
						<div className="inputBox-blue">
							<input
								type="text"
								className="search"
								placeholder="Search"
								onChange={e =>
									setFilterValue(e.target.value.toLowerCase())
								}
							/>
						</div>
					)}

					{(showSearch ? filterOptions : options).map(option => (
						<div
							key={uniqueId()}
							className="dropdown-item"
							style={{
								pointerEvents: option.disabled ? "none" : "auto"
							}}
							onClick={() => handleOptionClick(option)}
						>
							{option.prefixOptionIcon}
							{isTranslation
								? t(option.label as string)
								: option.label || " "}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

Select.defaultProps = {
	value: undefined,
	defaultValue: undefined,
	prefixIcon: null,
	placeholder: "lbl_General_None",
	showSearch: false,
	isTranslation: false,
	prefixText: "",
	errorMessage: "",
	showValue: false,
	onChange: undefined
};
