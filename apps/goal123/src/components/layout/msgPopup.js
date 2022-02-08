import React, { useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { popUpMsgContext } from "../common/context";
import path from "../../router";
import useGetPopUpMsg from "../hook/useGetPopUpMsg";

export default function Component({ userInfo }) {
	const { setPopUp, popUp } = useContext(popUpMsgContext);
	const { ReadPopupMsg } = useGetPopUpMsg({ setPopUp });

	return popUp.id !== "" ? (
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
					ReadPopupMsg();
				}}
			/>
		</div>
	) : null;
}

Component.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
