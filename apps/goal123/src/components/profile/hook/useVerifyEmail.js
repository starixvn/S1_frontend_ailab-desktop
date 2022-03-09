import React, { useEffect, useState } from "react";
import {
	api_accountStrict_VerifyEmail,
	api_accountStrict_GetCustProfile
} from "../../../service/api/accountStrict";
import { LOGOUT } from "../../../service/auth";
import { getUrlParameter, setCookie } from "../../common/common";
import { defPopBoxType } from "../../common/popBox";
import path from "../../../router";

const useVerifyEmail = ({
	langId,
	t,
	setPopBox,
	setUserInfo,
	openErrorMessagePopBox
}) => {
	const [tokenPassed, setTokenPassed] = useState(false);

	useEffect(() => {
		const key = getUrlParameter("key");
		const code = getUrlParameter("code");

		const RedirectToHome = popBoxMsg => {
			LOGOUT(() => {
				setUserInfo(prevState => ({
					isLogin: false,
					langId: prevState.langId
				}));

				if (popBoxMsg) {
					setCookie("popBoxMsg", popBoxMsg);
				}

				window.location.replace(`${window.location.origin}/${langId}`);
			});
		};

		if (key && code) {
			api_accountStrict_VerifyEmail({ langId, key, code }).then(
				res => {
					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setTokenPassed(true);

						api_accountStrict_GetCustProfile().then(
							res_custInfo => {
								if (res_custInfo.data.errorCode === 0) {
									const { data } = res_custInfo.data;
									setUserInfo(prevState => ({
										...prevState,
										...data
									}));

									const closePopBox = () => {
										window.location.replace(
											`${window.location.origin}/${langId}/${path.profile.root}`
										);
										setPopBox({ isOpen: false });
									};

									setPopBox({
										isOpen: true,
										popBoxType: defPopBoxType.Success,
										description: (
											<div>
												{t("lbl_EmailVerifiedMsg")}
											</div>
										),
										btnBar: (
											<div className="btnGroup">
												<button
													className="btn-check"
													onClick={closePopBox}>
													OK
												</button>
											</div>
										)
									});
								} else {
									openErrorMessagePopBox(
										res_custInfo.data.message || "error",
										res_custInfo.data.errorCode
									);
								}
							},
							() => {
								openErrorMessagePopBox();
							}
						);
					} else if (errorCode === 1 || errorCode === 403) {
						RedirectToHome();
					} else if (errorCode === 1000) {
						RedirectToHome(t("msg_OTP_Invalid"));
					} else {
						RedirectToHome(`[${errorCode}] ${message}`);
					}
				},
				() => {
					openErrorMessagePopBox();
				}
			);
		} else {
			setTokenPassed(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { tokenPassed };
};

export default useVerifyEmail;
