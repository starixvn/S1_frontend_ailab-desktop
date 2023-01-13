import React, { useState } from "react";
import { navigate } from "gatsby";
import i18next from "i18next";

const AngpaoFloatLink = () => {
	const [open, setOpen] = useState<boolean>(true);

	const close = () => setOpen(false);

	if (!open) return null;

	return (
		<div className="eventLink">
			<button className="icon icon-close" onClick={close} />

			<div className="angpaoLink">
				<img
					onClick={() => navigate("/angpao")}
					alt="event-link-img"
					className="eventlinkimg"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/event/angpao/eventlink-${i18next.language}.png`}
				/>
			</div>
		</div>
	);
};

export { AngpaoFloatLink };
