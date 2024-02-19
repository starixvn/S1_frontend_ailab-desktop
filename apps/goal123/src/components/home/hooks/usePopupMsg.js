import { useEffect } from "react";
import { readCookie, deleteCookie } from "../common/common";

function usePopBoxMessage() {
	const setPopBox = useContext(popBoxContext);
	const t = useContext(i18nContext);

	useEffect(() => {
		const popBoxMsg = readCookie("popBoxMsg");
		if (popBoxMsg) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: popBoxMsg,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								deleteCookie("popBoxMsg");
								setPopBox({ isOpen: false });
							}}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);
}

export default usePopBoxMessage;
