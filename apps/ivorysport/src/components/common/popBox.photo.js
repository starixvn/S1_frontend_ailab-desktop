import React from "react";

export default ({ photo }) => {
	return (
		<div className="pop photo" onClick={e => e.stopPropagation()}>
			{photo}
		</div>
	);
};
