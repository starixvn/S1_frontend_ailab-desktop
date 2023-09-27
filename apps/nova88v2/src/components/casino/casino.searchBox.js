import React, { useRef, useState } from "react";

export default ({ editSearchField, searchInfo, t }) => {
	const [isActive, setIsActive] = useState(false);
	const ref = useRef();

	const onActive = () => {
		setIsActive(true);

		ref.current.focus();
	};

	const onBlur = () => {
		ref.current.blur();
	};

	return (
		<div className="search-container">
			<input
				ref={ref}
				className="search expandright"
				type="text"
				placeholder={t("lbl_SearchGames")}
				onChange={e => editSearchField("searchText", e.target.value)}
				value={searchInfo.searchText}
				onBlur={() => setIsActive(false)}
			/>
			{/* <!-- 打文字時會出現 closebutton -- */}
			<label className="button searchbutton closebutton">
				{isActive ? (
					<div onClick={onBlur}>
						<img
							src="https://banner.0814media.net/desktop/img/close.png"
							alt=""
						/>
					</div>
				) : (
					<div onClick={onActive}>
						<span className="mglass">&#9906;</span>
					</div>
				)}
			</label>
		</div>
	);
};
