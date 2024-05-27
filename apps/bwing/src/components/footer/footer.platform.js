import React, { useState } from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import { defPartnerProduct } from "./defHorablePartner";

const ImageWithHover = ({ imgName }) => {
	const [isHovered, setIsHovered] = useState(false);
	const imgUrl = `${bannerImgUrl}/desktop/img/partherNew/${imgName}${
		isHovered ? "-a" : ""
	}.png`;
	return (
		<img
			src={imgUrl}
			alt={imgName}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		/>
	);
};
ImageWithHover.defaultProps = {
	imgName: ""
};

ImageWithHover.propTypes = {
	imgName: PropTypes.string
};

const Platform = ({ menuList, onClickFooterProduct }) => {
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
		<div>
			{platformProducts.map(productItem => {
				const { imgName } = productItem || {};

				return (
					imgName && (
						<button
							key={imgName}
							onClick={() => onClickFooterProduct(productItem)}>
							<ImageWithHover imgName={imgName} />
						</button>
					)
				);
			})}
		</div>
	);
};

Platform.propTypes = {
	menuList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onClickFooterProduct: PropTypes.func.isRequired
};

export default Platform;
