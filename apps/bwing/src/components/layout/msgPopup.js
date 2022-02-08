import React, { useContext } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { popUpMsgContext } from "../common/context";
import path from "../../router";
import useGetPopUpMsg from "../hook/useGetPopUpMsg";

export default function Component({ userInfo }) {
	const { setPopUp, popUp } = useContext(popUpMsgContext);
	const { ReadPopupMsg } = useGetPopUpMsg({ setPopUp });

	return popUp.id !== "" ? (
		<div
			className="mailtipPop"
			onClick={e => {
				e.preventDefault();
				e.stopPropagation();
			}}>
			<button
				className="icon icon-close"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					ReadPopupMsg();
				}}
			/>
			<span
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
			</span>
		</div>
	) : null;
}

Component.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
