import React from "react";

export default props => {
	return (
		<>
			<div className="inputBox-blue">
				{props.icon ? <i className={`icon ${props.icon}`} /> : null}
				{props.title ? (
					<i className="txt-blue12">{props.title}</i>
				) : null}
				<input
					type={props.inputType ?? "text"}
					placeholder={props.placeholder}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
					onChange={props.onChange}
					value={
						props.value === null || props.value === undefined
							? ""
							: props.value
					}
					max={props.max ? props.max : null}
				/>
				<div className="iconModule">
					{props.showPsw || props.inputType === "password" ? (
						<i
							className={`icon ${
								!props.showPsw ? "icon-eye-blocked" : "icon-eye"
							}`}
							onClick={props.showPswHandler}
						/>
					) : null}

					{props.checked !== undefined ? (
						<div className="iconModule">
							{props.checked === null ? (
								<i
									className="icon icon-information-solid"
									onClick={props.clickInfo}
								/>
							) : props.checked ? (
								<i className="icon icon-checkmark" />
							) : !props.checked && props.checked !== null ? (
								<i className="icon icon-cross" />
							) : null}
						</div>
					) : null}
				</div>
			</div>
			{props.tip ? <div className="tip active">{props.tip}</div> : null}
		</>
	);
};
