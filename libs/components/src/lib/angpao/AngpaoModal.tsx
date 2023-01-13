import React from "react";
import { Modal, IModalProps } from "@ailab-desktop/components";
import { useTranslation } from "react-i18next";
import { IAxiosError, IAxiosResponse } from "@ailab-desktop/service";
import { DrawPrizeData } from "@ailab-desktop/wrapper";
import { DrawPrizeResultEnum } from "./type";

interface IAngpaoModalProps extends IModalProps {
	message: string;
	drawPrizeResult: IAxiosResponse<DrawPrizeData> | undefined | IAxiosError;
	closeModal: () => void;
}

const AngpaoModal = ({
	message = "",
	drawPrizeResult,
	closeModal,
	...props
}: IAngpaoModalProps) => {
	const { t } = useTranslation();
	// 取 errorCode 當作 結果判斷，message 為中獎訊息
	const { errorCode: result, message: drawPrizeMessage } =
		drawPrizeResult ?? {};
	return (
		<Modal {...props}>
			<div className="pop angpaoPop">
				<div className="active">
					<button className="icon icon-close" onClick={closeModal} />
					{result === DrawPrizeResultEnum.Win ? (
						<>
							<div className="title">
								{t("Label_Congratulations")}
							</div>

							<div className="content">{drawPrizeMessage}</div>
							<div className="info">{message}</div>
						</>
					) : (
						<div className="content">{drawPrizeMessage}</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default AngpaoModal;
