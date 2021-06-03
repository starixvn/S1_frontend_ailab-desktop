import React from "react";
import PropTypes from "prop-types";
import img_money from "../../styles/img/top/money.png";
import img_winicon from "../../styles/img/top/winicon.png";

const WinnerBoard = ({ t, number_format, winnerList }) => {
	const rankString = {
		1: "first",
		2: "second",
		3: "third",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "nine",
		10: "ten"
	};

	const winnerRows = winnerList.map((item, idx) => {
		const _rank = idx + 1;
		return (
			<li key={`winnerList-${item.custId}-${item.userName}`}>
				<div className="rankOrder">
					<img
						src={require(`../../styles/img/top/${rankString[_rank]}.png`)}
						alt="ranking"
					/>
					<div>{item.userName}</div>
				</div>
				<div className="rankMoney">
					<img src={img_money} alt="money" />
					<div>{number_format(item.wTurnover)}</div>
				</div>
			</li>
		);
	});

	return (
		<div className="topWinner">
			<div className="title">
				<img src={img_winicon} alt="wini-con" />
				{t(`lbl_Ranking_TopNum`, { topNum: "10" })}
			</div>
			<ul>{winnerRows}</ul>
		</div>
	);
};

export default WinnerBoard;

WinnerBoard.propTypes = {
	t: PropTypes.func.isRequired,
	number_format: PropTypes.func.isRequired,
	winnerList: PropTypes.arrayOf(PropTypes.any).isRequired
};
