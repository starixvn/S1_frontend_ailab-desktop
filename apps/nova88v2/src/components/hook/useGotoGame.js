import React, { useContext, useEffect, useState, createRef } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { api_tp_GotoGame } from "../../service/api/tp";

export const useGotoGame = ({ isLogin, langId, tpId }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const [data, setData] = useState({ account: "", password: "" });

	const ClickClose = () => {
		setPopBox(() => ({
			isOpen: false
		}));
	};

	useEffect(() => {
		let mounted = true;
		if (isLogin) {
			api_tp_GotoGame({
				TpId: tpId,
				LangId: langId
			}).then(res => {
				if (mounted) {
					if (res.data.errorCode === 0 && res.data.message) {
						setData(() => JSON.parse(res.data.message));
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: res.data.message,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			});
		}

		return () => {
			mounted = false;
		};
	}, [isLogin, langId, tpId]);
	return { data };
};
