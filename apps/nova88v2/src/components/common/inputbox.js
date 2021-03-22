import React from "react";

export default props => {
	const showCheckIcon = () => {
		if (props.checked === null) {
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

		return null;
	};

	return (
		<>
			<div className={props.className ?? "inputBox"}>
				{props.icon ? <i className={`icon ${props.icon}`} /> : null}
				{props.title ? <i className="txt-blue">{props.title}</i> : null}
				{props.areaCode ? (
					<div className="txt-lightgray">{props.areaCode}</div>
				) : null}
				<input
					type={props.inputType ?? "text"}
					className={props.isAmount ? "text-right" : ""}
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
				{props.tooltip ? (
					<div className="description">{props.tooltip}</div>
				) : null}

				{props.checked !== undefined ? (
					<div className="iconModule">
						{props._isConvert ? <i>('000)</i> : null}
						{showCheckIcon()}
					</div>
				) : null}
				{props.checkIcon ? (
					<div className="iconModule">
						<i className={`icon ${props.checkIcon}`} />
					</div>
				) : null}
			</div>
			{props.inputType !== "date" ? (
				<div className={`tip${props.tip ? " active" : ""}`}>
					{props.tip}
				</div>
			) : null}
		</>
	);
};
