import React from "react";

const WinnerBoard = ({ t, number_format }) => {
	const winnerList = [
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 1,
			userName: "tot3",
			wTurnover: 342433.0
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 613,
			userName: "0333",
			wTurnover: 44858.02
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 221,
			userName: "ma00",
			wTurnover: 22457.0
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 1016,
			userName: "tost",
			wTurnover: 21020.0
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 196,
			userName: "BY****ER",
			wTurnover: 10034.2567
		}
	];
	const winnerRows = winnerList.map((item, idx) => {
		const _rank = idx + 1;
		return (
			<div key={`winnerList-${item.custId}-${item.userName}`}>
				<div className="cap">
					<img
						src={require(`../../styles/img/top10/no${_rank}.png`)}
						alt="ranking"
					/>
					<p>{item.userName}</p>
				</div>
				<div className="money">
					<img
						src={require(`../../styles/img/top10/money.png`)}
						alt="money"
					/>
					<p>{number_format(item.wTurnover)}</p>
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
