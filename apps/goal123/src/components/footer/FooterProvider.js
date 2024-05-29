import React, { useState } from "react";
import { bannerImgUrl } from "../../config";
import { defPartnerProduct } from "./defHorablePartner";
import useClickItem from "../home/hooks/useClickItem";

const FooterProvider = () => {
	const [hoverName, setHoverName] = useState(null);
	const { onclickStaticProduct } = useClickItem();

	// Goal 的遊戲跟 PM 討論後為顯示固定的遊戲，不會因為 api 變動
	return (
		<div className="provider">
			<div>
				{defPartnerProduct.map(productItem => {
					const { imgName } = productItem || {};
					return (
						<a
							key={imgName}
							onClick={() => onclickStaticProduct(productItem)}
							style={{ cursor: "default" }}
						>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/provider/${imgName}${
									hoverName === imgName ? "-a" : ""
								}.png`}
								alt="provider"
								onMouseEnter={() => setHoverName(imgName)}
								onMouseLeave={() => setHoverName(null)}
								onBlur={() => 0}
								onFocus={() => 0}
							/>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default FooterProvider;
