import React, { useState } from "react";
import { products, isDateRange } from "@ailab-desktop/common";
import classNames from "classnames";
import { eventPeriods } from "../../datas/eventDef";
import useClickItem from "./hooks/useClickItem";

const VgamingLink = () => {
	const [displayVgaming, setDisplayVgaming] = useState(true);

	const { onclickStaticProduct } = useClickItem();

	if (!displayVgaming) {
		return null;
	}
	return (
		<div
			className={classNames("eventLink vgaming", {
				eurocup: isDateRange(eventPeriods.euroCup)
			})}
			style={{ cursor: "pointer" }}
		>
			<button
				className="icon icon-close"
				onClick={() => setDisplayVgaming(false)}
			/>
			<img
				onClick={() => onclickStaticProduct(products.Vgaming)}
				alt="vgaming-link"
				src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/vgaming.gif`}
			/>
		</div>
	);
};

export default VgamingLink;
