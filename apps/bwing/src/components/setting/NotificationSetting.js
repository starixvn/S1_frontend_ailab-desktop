/* eslint-disable react/self-closing-comp */
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	useNotificationSetting,
	NotificationStateEnum
} from "@ailab-desktop/common";
import { Select } from "@ailab-desktop/components";
import { userInfoContext } from "../common/context";

const NotificationSetting = () => {
	// ====== hook ======
	const { t } = useTranslation();

	// 從 userInfo 拿取財務訊息的設定狀態
	const {
		userInfo: { financeNotification, soundEffects },
		setUserInfo // 設定 UserInfo 的函數
	} = useContext(userInfoContext);

	const {
		notificationEnabledArg,
		notificationMutedArg,
		isSetCustSettingLoading,
		disableNotificationSoundCheckbox,
		handleNotificationMuted,
		handleNotificationEnabled
	} = useNotificationSetting({
		setUserInfo,
		financeNotification,
		soundEffects
	});

	return (
		<div className="setting-content">
			<div className="setting-subtitle">
			{t('lbl_General_DepositWithdrawlNotification')}
			</div>
			<div className="setting-group">
				<Select
					value={notificationEnabledArg}
					options={[
						{
							value: NotificationStateEnum.Enabled,
							label: "lbl_General_On"
						},
						{
							value: NotificationStateEnum.Disable,
							label: "lbl_General_Off"
						}
					]}
					isTranslation
					onChange={handleNotificationEnabled}
				/>
				<div className="setting-checkbox">
					<label className="checkbox-content">
						<input
							type="checkbox"
							checked={
								notificationMutedArg ===
								NotificationStateEnum.Enabled
							}
							// 是否禁用通知音效
							disabled={
								disableNotificationSoundCheckbox ||
								isSetCustSettingLoading
							}
							onChange={handleNotificationMuted}
						/>
						<div className="checkbox-icon"></div>
						<span>{t('lbl_General_SoundEffects')}</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default NotificationSetting;
