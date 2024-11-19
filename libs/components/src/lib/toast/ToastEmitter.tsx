import React, { useEffect } from "react";
import { toast, Zoom, ToastOptions } from "react-toastify";
import { ToastBGColorEnum, PositionEnum } from "./constants";
import "react-toastify/dist/ReactToastify.css";

/** 自定義吐司訊息內容，包括 icon／訊息內容／訊息文字顏色。 */
const CustomToast = ({
	message,
	iconClassName,
	messageStyle,
	isNotification
}: {
	message: string;
	iconClassName: string | undefined;
	messageStyle: React.CSSProperties;
	isNotification: boolean;
}) => {
	// 財務訊息需要固定寬度，如果是其他訊息， 設定 fit-content，讓文字撐滿容器。
	useEffect(() => {
		const toastWidth = isNotification ? "350px" : "fit-content";
		const toastElements = document.querySelectorAll(".Toastify__toast");

		// 遍歷所有吐司訊息
		toastElements.forEach(element => {
			element.setAttribute("style", `width: ${toastWidth};`);
		});
	}, []);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center"
			}}
		>
			{iconClassName && (
				<i
					className={`icon ${iconClassName}`}
					style={{
						color: "white",
						marginRight: 10
					}}
				/>
			)}
			<span style={messageStyle}>{message}</span>
		</div>
	);
};

interface IToastOptions {
	message: string;
	customBGColor?: ToastBGColorEnum | undefined;
	customIconClassName?: string | undefined;
	isWrapText?: boolean;
	isNotification?: boolean;
}

export const ToastEmitter = ({
	message,
	customBGColor = ToastBGColorEnum.Green,
	customIconClassName,
	isWrapText = true,
	isNotification = false
}: IToastOptions) => {
	/** ====== 常數 ====== */

	/**
	 *  吐司訊息文字 Style 設定
	 *  @color 如果是 Default (白背景)，則顯示灰色文字，其餘訊息類型皆為滿色背景色，則顯示白色文字
	 *  @whiteSpace  訊息是否換行，預設過長會換行。 */
	const messageStyle: React.CSSProperties = {
		color: customBGColor === ToastBGColorEnum.Default ? "gray" : "white",
		whiteSpace: isWrapText ? "normal" : "nowrap"
	};

	/** 吐司訊息的其他設定，如果未來有需求可以自行增加參數，從外部傳入。 */
	const toastOptions: ToastOptions = {
		position: PositionEnum.TopCenter,
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		draggable: false,
		closeButton: false,
		transition: Zoom
	};

	/** 自定義吐司訊息內容 */
	const content = (
		<CustomToast
			message={message}
			iconClassName={customIconClassName}
			messageStyle={messageStyle}
			isNotification={isNotification}
		/>
	);

	// 根據訊息種類，顯示通知
	switch (customBGColor) {
		case ToastBGColorEnum.Green:
			toast.success(content, toastOptions);
			break;
		case ToastBGColorEnum.Red:
			toast.error(content, toastOptions);
			break;
		case ToastBGColorEnum.Blue:
			toast.info(content, toastOptions);
			break;
		case ToastBGColorEnum.Yellow:
			toast.warning(content, toastOptions);
			break;
		default:
			toast(content, toastOptions);
			break;
	}
};
