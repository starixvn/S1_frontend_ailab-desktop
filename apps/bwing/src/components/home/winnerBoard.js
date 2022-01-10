import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const WinnerBoard = ({ t, number_format, winnerList }) => {
	const winnerRows = winnerList.map((item, idx) => {
		const _rank = idx + 1;
		return (
			<div key={`winnerList-${item.custId}-${item.userName}`}>
				<div className="cap">
					<img
						src={`${bannerImgUrl}/desktop/img/top10/no${_rank}.png`}
						alt="ranking"
					/>
					<p>{item.userName}</p>
				</div>
				<div className="money">
					<img
						src={`${bannerImgUrl}/desktop/img/top10/money.png`}
						alt="money"
					/>
					<p>{number_format({ number: item.wTurnover })}</p>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className="top10Aear">
				<div className="topImg"> </div>
				<div className="title">
					{t(`lbl_Ranking_TopNum`, { topNum: "10" })}
				</div>
				<div className="top10Box">
					<div>{winnerRows}</div>
				</div>
			</div>
		</div>
	);
};

export default WinnerBoard;

WinnerBoard.propTypes = {
	t: PropTypes.func.isRequired,
	number_format: PropTypes.func.isRequired,
	winnerList: PropTypes.arrayOf(PropTypes.any).isRequired
};
