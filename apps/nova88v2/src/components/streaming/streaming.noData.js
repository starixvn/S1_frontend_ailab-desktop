import React from "react";

export const StreamingNoData = ({ t }) => (
	<div className="liveTvModule icon icon-nolive">
		<div>
			<p>{t("lbl_Streaming_NoData1")}</p>
			<p>{t("lbl_Streaming_NoData2")}</p>
		</div>
	</div>
);
