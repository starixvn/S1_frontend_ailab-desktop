import React from "react";

const HomeTopList = () => {
	return (
		<div className="home-leaderboard">
			<div className="win-total">
				<div className="home-title">Total top 10</div>
				<div className="user-ranking">
					{/* Top 3, add "top" class for style distinction */}
					<div className="user-list top">
						<div className="left">
							{/* Display as "image" for top 3 */}
							<div className="order">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/leaderboard/winner-1st.png"
									alt=""
								/>
							</div>
							{/* Display account with first 2 and last 2 characters, middle as *** */}
							<div className="user-id">Lo******98</div>
						</div>
						<div className="right">
							<i className="icon-cash" />
							<span>$999,999,999.66</span>
						</div>
					</div>
					<div className="user-list top">
						<div className="left">
							<div className="order">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/leaderboard/winner-2st.png"
									alt=""
								/>
							</div>
							<div className="user-id">Lo******98</div>
						</div>
						<div className="right">
							<i className="icon-cash" />
							<span>$999,999,999.66</span>
						</div>
					</div>
					<div className="user-list top">
						<div className="left">
							<div className="order">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/leaderboard/winner-3st.png"
									alt=""
								/>
							</div>
							<div className="user-id">Lo******98</div>
						</div>
						<div className="right">
							<i className="icon-cash" />
							<span>$999,999,999.66</span>
						</div>
					</div>

					{/* For fourth place and onwards (including fourth place), without "top" class */}
					<div className="user-list">
						<div className="left">
							{/* Display order as text for fourth place onwards */}
							<div className="order">4</div>
							{/* Display account with first 2 and last 2 characters, middle as *** */}
							<div className="user-id">Lo**********98</div>
						</div>
						<div className="right">
							<i className="icon-cash" />
							<span>$999,999,999.66</span>
						</div>
					</div>
					{/* Additional user-lists follow the same structure as above */}
					{/* Repeat structure for other rankings as needed */}
				</div>
			</div>
		</div>
	);
};

export default HomeTopList;
