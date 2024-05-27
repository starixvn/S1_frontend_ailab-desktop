import React, { useState } from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import { defPartnerProduct } from "./defHorablePartner";

const Platform = ({ menuList, onclickHomeProduct }) => {
	const [hoverName, setHoverName] = useState(null);
	const platformProducts = menuList.flatMap(mainMenuItem => {
		const { data } = mainMenuItem || {};

		// * 並非所有的產品都有在 platform
		const productLists = data?.flatMap(subMenuItem => {
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

		return productLists;
	});

	return (
		<div className="platform">
			<div>
				{platformProducts.map(productItem => {
					const { imgName } = productItem || {};

					return (
						imgName && (
							<button key={imgName}>
								<img
									alt="logo"
									src={`${bannerImgUrl}/desktop/img/footer/${imgName}${
										hoverName === imgName ? "a" : ""
									}.png`}
									onClick={() =>
										onclickHomeProduct(productItem)
									}
									onMouseOver={() => setHoverName(imgName)}
									onMouseOut={() => setHoverName(null)}
									onBlur={() => 0}
									onFocus={() => 0}
								/>
							</button>
						)
					);
				})}
			</div>
		</div>
	);
};

Platform.propTypes = {
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onclickHomeProduct: PropTypes.func.isRequired
};

export default Platform;
