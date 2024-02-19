import React, { useContext } from "react";
import { navigate, useLocation } from "@reach/router";
import { popUpMsgContext, userInfoContext } from "../common/context";
import path from "../../router";
import useGetPopUpMsg from "../hook/useGetPopUpMsg";

export default function Component() {
	const { userInfo } = useContext(userInfoContext);
	const { setPopUp, popUp } = useContext(popUpMsgContext);
	const location = useLocation();

	useGetPopUpMsg({ setPopUp });
	// 進入 message 頁面不顯示 popUp
	return popUp.id !== "" &&
		location.pathname.split("/")[2] !== path.message.root ? (
		<div
			className="info"
			onClick={e => {
				e.preventDefault();
				e.stopPropagation();
			}}>
			<div
				onClick={() => {
					navigate(`/${userInfo.langId}/${path.message.root}`, {
						state: {
							id: popUp.id,
							pageNumber: popUp.pageNumber,
							popupShowed: false
						}
					});
				}}>
				{popUp.popupMessage}
			</div>
			<div
				className="icon icon-close"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					// 清空 id 則會隱藏提示框
					setPopUp({
						popupMessage: "",
						id: "",
						pageNumber: ""
					});
				}}
			/>
		</div>
	) : null;
}
