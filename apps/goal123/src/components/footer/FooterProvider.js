import PropTypes from "prop-types";
import React, { useState } from "react";
import { bannerImgUrl } from "../../config";
import { defPartnerProduct } from "./defHorablePartner";

const FooterProvider = ({ menuList }) => {
	const [hoverName, setHoverName] = useState(null);
	const platformProducts = menuList.flatMap(mainMenuItem => {
		const { data } = mainMenuItem || {};

		// * 並非所有的產品都有在 platform
		return data?.flatMap(subMenuItem => {
			const defProduct = defPartnerProduct.find(
				product => product.tpGameIdNo === subMenuItem.tpGameIdNo
			);
			if (defProduct) {
				return {
					...subMenuItem,
					...defProduct
				};
			}

			return [];
		});
	});

	return (
		<div className="provider">
			<div>
				{platformProducts.map(productItem => {
					const { imgName } = productItem || {};
					return (
						<a
							key={imgName}
							onClick={e => e.preventDefault}
							style={{ cursor: "default" }}>
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

FooterProvider.propTypes = {
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default FooterProvider;
