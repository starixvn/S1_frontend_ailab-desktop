import React, { useState, useRef, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
	api_account_GetMsgContent,
	api_account_GetMsgCount
} from "../../service/api/account";
import { popBoxContext, msgCountContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";

const MessageList = props => {
	const { t } = useTranslation();
	const [showContent, setShowContent] = useState(false);
	const [msgContentData, setMsgContentData] = useState("");

	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { setMsgCount } = useContext(msgCountContext);
	const location = useLocation();
	const compareDay = moment().diff(
		moment(props.createTime, "YYYY-MM-DD"),
		"day"
	);
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

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const dateTimeFormat = () => {
		if (showContent) {
			return moment(props.createTime).format("YYYY-MM-DD HH:mm:ss");
		}
		return compareDay < 1
			? moment(props.createTime).format("HH:mm:ss")
			: moment(props.createTime).format("YYYY-MM-DD");
	};

	const updateMsgList = () => {
		props.getMsgList();
	};

	const updateMsgCount = () => {
		api_account_GetMsgCount().then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setMsgCount(res.data.data);
				}
			}
		});
	};

	const getMsgContent = getMsg => {
		if (getMsg) {
			api_account_GetMsgContent(props.id, props.isBatch ? 1 : 0).then(
				res => {
					if (isMountedRef.current) {
						const success = res.data.errorCode === 0;
						if (success) {
							setShowContent(true);
							setMsgContentData(res.data?.data?.content);

							updateMsgList();
							updateMsgCount();
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `[${res.data.errorCode}] ${res.data.message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={clickClose}
										>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
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
										className="btn-check"
										onClick={clickClose}
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
				<div onClick={() => getMsgContent(!showContent)}>
					{props.title}
				</div>
				<div
					className="txt-blue"
					onClick={() => getMsgContent(!showContent)}
				>
					{dateTimeFormat()}

					<button className="icon icon-keyboard_arrow_down" />
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
