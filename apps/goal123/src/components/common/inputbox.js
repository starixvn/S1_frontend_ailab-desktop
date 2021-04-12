import React from "react";

export default props => {
	const showCheckIcon = () => {
		if (props.checked === null && props.clickInfo) {
			return (
				<i
					className="icon icon-information-solid"
					onClick={props.clickInfo}
				/>
			);
		}
		if (props.checked === true) {
			return <i className="icon icon-checkmark" />;
		}
		if (props.checked === false) {
			return <i className="icon icon-cross" />;
		}
		if (props.checked === "loading") {
			return <i className="icon icon-spinner11" />;
		}
	};

	return (
		<>
			<div className={props.className ?? "inputBox"}>
				{props.icon ? <i className={`icon ${props.icon}`} /> : null}
				{props.title ? (
					<i className="txt-blue12">{props.title}</i>
				) : null}
				{props.areaCode ? <div>{props.areaCode}</div> : null}
				<input
					type={props.inputType ?? "text"}
					className={props._isConvert ? "text-right" : ""}
					placeholder={props.placeholder}
					onBlur={props.onBlur}
					onChange={props.onChange}
					value={
						props.value === null || props.value === undefined
							? ""
							: props.value
					}
					max={props.max ? props.max : null}
					readOnly={props.readOnly}
					data-testid="input"
				/>

				<div className="iconModule">
					{props._isConvert ? "('000)" : null}
					{props.checked !== undefined ? showCheckIcon() : null}
				</div>
			</div>
			{props.inputType !== "date" ? (
				<div className={`tip${props.tip ? " active" : ""}`}>
					{props.tip}
				</div>
			) : null}
		</>
	);
};
