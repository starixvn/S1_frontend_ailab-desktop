import React from "react";
import PropTypes from "prop-types";
import PredictItem from "./PredictItem";

const PredictLIst = ({ ticketSummary }) => {
	return (
		<div className="prediction-right">
			{[0, 4].map(start => (
				<div className="prediction-right-item" key={start}>
					{ticketSummary
						.slice(start, start + 4)
						.map((item, childIndex) => (
							<PredictItem
								rank={start + childIndex + 1}
								key={item.countryId}
								{...item}
							/>
						))}
				</div>
			))}
		</div>
	);
};

PredictLIst.propTypes = {
	ticketSummary: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default PredictLIst;
