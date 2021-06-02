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
			wTurnover: 10034.5
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 1196,
			userName: "BY****ER",
			wTurnover: 9855.5
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 1956,
			userName: "BY****ER",
			wTurnover: 8824.5
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 511,
			userName: "BY****ER",
			wTurnover: 7751.5
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 521,
			userName: "BY****ER",
			wTurnover: 6588.5
		},
		{
			date: "2020-12-03T00:00:00",
			lbCategoryId: 1,
			lbCategoryName: "Sports",
			custId: 517,
			userName: "BY****ER",
			wTurnover: 5146.5
		}
	];

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
					<img
						src={require(`../../styles/img/top/money.png`)}
						alt="money"
					/>
					<div>{number_format(item.wTurnover)}</div>
				</div>
			</li>
		);
	});

	return (
		<div className="topWinner">
			<div className="title">
				<img
					src={require(`../../styles/img/top/winicon.png`)}
					alt="wini-con"
				/>
				{t(`lbl_Ranking_TopNum`, { topNum: "10" })}
			</div>
			<ul>{winnerRows}</ul>
		</div>
	);
};

export default WinnerBoard;
