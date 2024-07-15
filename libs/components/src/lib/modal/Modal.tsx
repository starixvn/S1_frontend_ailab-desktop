/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";
import useModal from "./useModal";

export interface IModalProps {
	children?: ReactNode;
	open: boolean;
}

const Modal = ({ children, open }: IModalProps) => {
	return (
		<div id="popup" className={open ? "active" : ""}>
			{children}
		</div>
	);
};

Modal.useModal = useModal;

export default Modal;
