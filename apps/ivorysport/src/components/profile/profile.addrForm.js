import React from "react";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox";

const ProfileAddrForm = ({
	t,
	userInfo,
	userValue,
	status,
	editField,
	valueCheck,
	addrList,
	disableSubmit,
	clickInfo,
	clickSubmit
}) => {
	const isEditAddr =
		!userInfo?.addressLineFirst ||
		!userInfo?.addressCity ||
		!userInfo?.addressPostCode ||
		!userInfo?.addressState ||
		!userInfo?.addressCountry;
	return (
		<div className="address-container">
			<div className="inside-title">
				<span>
					{t("lbl_Shipping_Address")}({t("lbl_Option2")})
				</span>
				{/* <div>{t("lbl_Shipping_Hint")}</div> */}
			</div>
			<div className="sub-title">{t("lbl_Address")}</div>
			<div className="address-list">
				{isEditAddr ? (
					addrList?.map(obj => (
						<div key={obj.code}>
							<div>{t(obj.displayKey)}</div>
							<div>
								<Inputbox
									className="inputBox-blue"
									onChange={editField.bind(this, obj.code)}
									onBlur={e =>
										valueCheck(e.target.value, obj.code)
									}
									value={userValue[obj.code]}
									checked={status[obj.code]?.checked}
									clickInfo={clickInfo.bind(this, obj.code)}
								/>
								{status[obj.code]?.tip ? (
									<div className="tip active txt-red">
										{status[obj.code]?.tip}
									</div>
								) : null}
							</div>
						</div>
					))
				) : (
					<>
						<div>{userInfo.addressLineFirst}</div>
						{userInfo.addressLineSecond !== "" && (
							<div>{userInfo.addressLineSecond}</div>
						)}
						<div>
							{userInfo.addressCity}, {userInfo.addressPostCode}
						</div>
						<div>
							{userInfo.addressState}, {userInfo.addressCountry}
						</div>
					</>
				)}
			</div>
			{isEditAddr ? (
				<div className="btnGroup">
					<button
						className={disableSubmit ? "btn-cancel" : "btn-check"}
						onClick={clickSubmit}>
						{t("lbl_Submit")}
					</button>
				</div>
			) : null}
		</div>
	);
};

ProfileAddrForm.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	status: PropTypes.objectOf(PropTypes.any).isRequired,
	editField: PropTypes.func.isRequired,
	valueCheck: PropTypes.func.isRequired,
	addrList: PropTypes.arrayOf(PropTypes.any).isRequired,
	disableSubmit: PropTypes.bool.isRequired,
	clickInfo: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired
};

export default ProfileAddrForm;
