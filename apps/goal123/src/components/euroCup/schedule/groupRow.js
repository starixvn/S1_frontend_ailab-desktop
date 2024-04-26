import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { bannerImgUrl, sportsImgUrl } from "../../../config";

const GroupRow = ({
	roundOf16Groups,
	quarterFinalsGroups,
	semiFinalsGroups
}) => {
	return (
		<div className="group-row">
			<div>
				{roundOf16Groups?.map((group, index) => (
					<div
						className={classNames("group-two", {
							"after-top": index === 0,
							"after-bottom": index === 1
						})}>
						{group.map(({ countryName, imageName, sort }) => (
							<div className="group-item" key={sort}>
								<img
									src={
										imageName
											? `${sportsImgUrl}/Country%20Team/${imageName}`
											: `${bannerImgUrl}/desktop/img/event/eurocup/empty.svg`
									}
									alt={imageName || "empty"}
								/>
								<div>{countryName}</div>
							</div>
						))}
					</div>
				))}
			</div>
			<div>
				<div className="group-two before">
					{quarterFinalsGroups?.map(group =>
						group.map(({ countryName, imageName, sort }) => (
							<div className="group-item" key={sort}>
								<img
									src={
										imageName
											? `${sportsImgUrl}/Country%20Team/${imageName}`
											: `${bannerImgUrl}/desktop/img/event/eurocup/empty.svg`
									}
									alt={imageName || "empty"}
								/>
								<div>{countryName}</div>
							</div>
						))
					)}
				</div>
			</div>
			<div>
				{semiFinalsGroups?.map(group => (
					<div className="group-one" key={group.sort}>
						<div className="group-item">
							<img
								src={
									group.imageName
										? `${sportsImgUrl}/Country%20Team/${group.imageName}`
										: `${bannerImgUrl}/desktop/img/event/eurocup/empty.svg`
								}
								alt={group.imageName || "empty"}
							/>
							<div>{group.countryName}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

GroupRow.propTypes = {
	roundOf16Groups: PropTypes.arrayOf(PropTypes.any).isRequired,
	quarterFinalsGroups: PropTypes.arrayOf(PropTypes.any).isRequired,
	semiFinalsGroups: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default GroupRow;
