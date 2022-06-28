import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useLocation } from "@reach/router";
import moment from "moment";
import {
	api_account_GetMsgContent,
	api_account_GetMsgCount
} from "../../service/api/account";
import { popBoxContext, msgCountContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";

const MessageList = props => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { setMsgCount } = useContext(msgCountContext);
	const isMountedRef = useRef(null);
	const [msgContentData, setMsgContentData] = useState("");
	const [showContent, setShowContent] = useState(false);
	const { errorPopBox } = usePopBox();
	const location = useLocation();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (props.isPopUp && !location.state.popupShowed) {
			getMsgContent(true);
			location.state.popupShowed = true;
		}
	}, [props]);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getMsgContent = getMsg => {
		if (getMsg) {
			api_account_GetMsgContent(props.id, props.isBatch ? 1 : 0).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setShowContent(true);
							setMsgContentData(res.data?.data?.content);
							props.getMsgList();

							api_account_GetMsgCount().then(
								resMsg => {
									if (isMountedRef.current) {
										if (resMsg.data.errorCode === 0) {
											setMsgCount(resMsg.data.data);
										} else {
											errorPopBox(
												resMsg.data.message || "error",
												resMsg.data.errorCode
											);
										}
									}
								},
								() => {
									errorPopBox();
								}
							);
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			);
		} else {
			setShowContent(false);
		}
	};

	const compareDay = moment().diff(
		moment(props.createTime, "YYYY-MM-DD"),
		"day"
	);

	const dateTimeFormat = () => {
		if (showContent) {
			return moment(props.createTime).format("YYYY-MM-DD HH:mm:ss");
		}
		return compareDay < 1
			? moment(props.createTime).format("HH:mm:ss")
			: moment(props.createTime).format("YYYY-MM-DD");
	};

	return (
		<div className={props.flag ? "haveRead" : ""}>
			<div className="listHeader">
				<div className="checkbox">
					<input
						type="checkbox"
						id={`msgList-checkBox-${props.id}`}
						onChange={props.onChangeCheck}
						checked={props.selectItems.includes(props.id)}
					/>
					<label
						aria-label="msgList-checkBox"
						htmlFor={`msgList-checkBox-${props.id}`}
						className="icon icon-checkbox-checked"
					/>
				</div>
				<div
					tabIndex={0}
					onClick={getMsgContent.bind(this, !showContent)}
					role="button"
					onKeyDown={getMsgContent.bind(this, !showContent)}
				>
					{props.title}
				</div>
				<div onClick={getMsgContent.bind(this, !showContent)}>
					{dateTimeFormat()}
					<button
						aria-label="getMsgContent"
						className="icon icon-keyboard_arrow_down"
					/>
				</div>
			</div>
			<div
				className={`listBody backstage ${showContent ? "active" : ""}`}
				// eslint-disable-next-line
				dangerouslySetInnerHTML={{ __html: msgContentData }}
			/>
		</div>
	);
};
MessageList.propTypes = {
	isPopUp: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired,
	isBatch: PropTypes.bool.isRequired,
	getMsgList: PropTypes.func.isRequired,
	createTime: PropTypes.string.isRequired,
	flag: PropTypes.bool.isRequired,
	onChangeCheck: PropTypes.func.isRequired,
	selectItems: PropTypes.arrayOf(PropTypes.object).isRequired,
	title: PropTypes.string.isRequired
};
export default MessageList;
