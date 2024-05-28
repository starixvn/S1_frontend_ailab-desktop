import React, { useState } from "react";
import { products } from "@ailab-desktop/common";
import useClickItem from "./hooks/useClickItem";

const VgamingLink = () => {
	const [displayVgaming, setDisplayVgaming] = useState(true);

	const { onclickHomeProduct } = useClickItem();

	if (!displayVgaming) {
		return null;
	}

	return (
		<div className="eventLink vgaming" style={{ cursor: "pointer" }}>
			<button
				className="icon icon-close"
				onClick={() => setDisplayVgaming(false)}
			/>
			<img
				onClick={() => onclickHomeProduct(products.Vgaming)}
				alt="vgaming-link"
				src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/vgaming.gif`}
			/>
		</div>
	);
};

export default VgamingLink;
