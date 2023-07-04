# Promotion

## Definition

### Promotion Type

-   後端 api 回傳參數 `promotionType` (Number)
    -   1: First Deposit
    -   2: Redeposit
    -   3: Free Bet
    -   5: Wallet Bonus
    -   6: Rebate
    -   7: Cashback
    -   8: Other
    -   9001: Special Bonus

### Promotion Status

-   後端 api 回傳參數 `status` (Number)
    -   1: Running
    -   2: Canceled
    -   3: Expiry
    -   4: Fulfill
    -   5: Transfer Out

### Category Id

-   後端 api 回傳參數 `categoryId` (Number)
    -   1: Slots
    -   2: Live Casino
    -   3: Fishing
    -   4: Saba Sports
    -   5: Lottery
    -   6: Sports
    -   7: PT Slots
    -   8: PT Live Casino
    -   9: SBSW
    -   10: Mega888 Slot RNG Fishing

### Wallet Type

-   後端 api 回傳參數 `walletType` (Number)
    -   0: Transfer (轉帳錢包)
    -   1: Seamless（單一錢包）

### Bonus Type

    -   後端 api 回傳參數 `bonusType` (Number)
        -   1: Percentage
        -   2: Amount

## Component

### Promotion List

-   使用到的 api

    -   `GetPromotionListV3`: `api/Promotion/GetPromotionListV3/{langId}`

-   規則

    -   從 api `GetPromotionListV3` 撈取資料，經過顯示規則篩選、且判斷未過期顯示於列表
    -   顯示規則：
        -   時間須介於後端參數 `displayFrom` 和 `displayTo` 間
        -   `displayFrom` 和 `displayTo` 不論時區皆為同個時間（例：後台設定 `displayFrom` 為 2023-01-01 00:00:00，不同時區： 2023-01-01 00:00:00 (+00:00)、2023-01-01 00:00:00 (+08:00)）
    -   判斷是否過期：
        -   已登入、已加入（後端參數 `isJoin`: true）、且優惠類型（後端參數 `promotionType`）不為 rebate 且不為 cashback 時，檢查後端傳入參數 `custExpiryTime` 是否比現在時間更晚（更晚代表未過期）
        -   不是以上條件的話，則檢查後端傳入參數 `periodTo` 是否比現在時間更晚（更晚代表未過期）
    -   新優惠：現在時間為優惠開始（後端參數 `periodFrom`）14 天內
    -   已領取（並顯示已領取 icon）：已加入（後端參數 `isJoin`: true）或是狀態（後端參數 `status`）為正在進行（Running）或是已兌換（Transfer Out）
    -   顯示新優惠 icon：
        -   在新優惠規則（優惠上架 14 天內）、且優惠未領取（以上面的已領取條件去做判斷）、且優惠可加入（後端參數 `canJoin`: true）
    -   顯示已過期 icon：
        -   filter 分類為 special bonus，且無法加入（後端參數 `canJoin`: false）
        -   已使用過優惠（後端參數 `beenUsed`: true）

### Filter Bar

-   7 種 Type（定義於前端）:
    -   all
    -   firstDeposit
        -   優惠類型（後端參數 `promotionType`） 為 First Deposit 或是 Wallet Bonus
    -   other
        -   優惠類型（後端參數 `promotionType`） 為 Other
    -   sportsbook
        -   種類（後端參數 `categoryId`） 為 Saba Sports
    -   liveCasino
        -   種類（後端參數 `categoryId`） 為 PT Live Casino
        -   錢包類型（後端參數 `walletType`） 為 Seamless（單一錢包）且 種類（後端參數 `categoryId`） 為 Live Casino
    -   slot
        -   種類（後端參數 `categoryId`） 為 PT Slots
        -   種類（後端參數 `categoryId`） 為 Mega888 Slot RNG Fishing
        -   錢包類型（後端參數 `walletType`）為 Seamless（單一錢包）且 種類（後端參數 `categoryId`）為 Slots
    -   specialBonus
        -   登入後才會出現的分類

### Join Button

-   使用到的 api

    -   `SetClaimPromotion`: `api/Promotion/SetClaimPromotion/{langId}`
        -   參數：`BonusCode` (String)、`DeviceType` (Number)、`LockedAmount` (Number)

-   規則

    -   只要有以下條件即 ”不“ 顯示 Join Button
        -   已登入 且 已加入（後端參數 `isJoin`: true）
        -   優惠類型（後端參數 `promotionType`）為 rebate
        -   優惠類型（後端參數 `promotionType`）為 other
        -   filter 分類為 special bonus，且不可加入（後端參數 `canJoin` 不為 true）
        -   優惠已使用（後端參數 `beenUsed`: true）
        -   優惠時間未到：後端參數 `periodFrom` 晚於現在時間
        -   優惠時間已過：後端參數 `periodTo` 早於現在時間
    -   按鈕顯示文字
        -   優惠類型（後端參數 `promotionType`）為 cashback：Claim Now
        -   其他：Join Now

-   行為
    -   點擊 Join Button，檢查是否可加入優惠
        -   未登入：彈出登入視窗
        -   如使用者資料中無 accountName 或 phoneNo 或 email：彈出更新個人資訊彈窗
        -   優惠可加入（後端參數 `canJoin`: true）且未加入（後端參數 `isJoin` 不為 true）且 結果（後端參數 `result`）為 1 且 要求金額（後端參數 `requiredAmount`）大於 0：彈出最低存款提醒彈窗
            -   需存入金額：要求金額（後端參數 `requiredAmount`）- 使用者已存款金額（後端參數 `depositAmount`）
            -   按鈕：Later（關閉彈窗）、Deposit Now（導轉至 deposit 頁面）
    -   上述檢查通過後，call api: `SetClaimPromotion`
        -   回傳未驗證 OTP （errorCode 為 -5）狀況時，需彈出更新個人資訊彈窗詢問是否導轉至 Profile 更新個人資訊
        -   除以上狀況，如回傳失敗（errorCode 不為 0）則直接將後端回傳 message 顯示於彈窗
        -   如成功（errorCode 為 0）則開啟成功領取彈窗

### More Info Button

-   規則

    -   優惠類型（後端參數 `promotionType`）為 Other 且 無優惠行為（後端參數 `promotionAction` 不為 true）：More Info Button 為連結，導轉目標為後端參數 `promotionLink`
    -   非上述條件則顯示按鈕

### Progress Bar 進度條

-   使用到的 api

    -   `GetCustSpecificBonus`: `api/Account/GetCustSpecificBonus`
        -   參數：`BonusCode` (String)、`TpId` (Number)、`PromoCategoryId` (Number)

-   規則

    -   顯示條件：優惠為已加入（後端參數 `isJoin`: true）、且狀態（後端參數 `status`）不可為已實現（Fulfill）且 不可為已取消（Canceled）、且優惠類型（後端參數 `promotionType`）不為 cashback 且 不為 rebate
    -   只要符合條件，就會顯示於 promotion list 的符合條件優惠中 或 符合條件的 promotion info 彈窗中
    -   百分比：`custTurnOver` / `custRollOver`
    -   名稱：後端參數 `fullFillType` 為 2 時顯示 Winover，其餘狀況下顯示 Turnover
    -   Reload Button： 後端參數 `hideReloadBtn` 不為 true 時顯示

-   行為
    -   點擊 Reload Button，call api: `GetCustSpecificBonus`
    -   找到此優惠並且將後端回傳的參數 `rollover` 更新於此優惠的 `custRollOver`、後端回傳的參數 `turnover` 更新於此優惠的 `custTurnOver`

### Expiry Time 剩餘時間

-   規則
    -   已加入（後端參數 `isJoin`:true）且 狀態（後端參數 `status`）為 Running 且 有後端參數 `custExpiryTime` 時，以後端參數 `custExpiryTime` 為到期時間，其餘以後端參數 `periodTo` 為到期時間
    -   活動時間：時間在後端參數 `periodFromTime` 之後
    -   如果是在活動時間內，則顯示到期時間 DD 天 HH 小時; 不在活動時間內，則顯示到期時間 0 天 0 小時

### Promotion Info 彈窗

-   使用到的 api

    -   `GetPromotionDetail`: `api/Promotion/GetPromotionDetail/{langId}`
        -   參數：`BonusCode` (String)、`CurrencyId` (Number)、`DeviceType` (Number)

-   規則

    -   Join Button
        -   優惠類型（後端參數 `promotionType`）為 Other，按鈕文字顯示 Apply Now，點擊打開 Live Chat 對話框
        -   非上述條件則顯示 Join Button （與 promotion list 使用同一元件）
    -   All Promos Button
        -   來源為首頁的 promotion list 則出現
        -   點擊後導轉至 promtion 頁面
    -   Cashback Info
        -   如果後端參數 `cashBackDetails` 不為 null，則顯示
        -   表格欄位：
            -   Loss With Bonus：後端參數 `lossAmountWithBonus`
            -   Net Loss：後端參數 `lossAmount`
            -   Total Net Loss：後端參數 `totalLossAmount`
            -   Min Net Loss Required：後端參數 `minLossAmount`
            -   Percentage：後端參數 `percentage`
            -   Total Bonus：後端參數 `originalTotalBonus`
            -   Max Bonus：後端參數 `maxBonus`
            -   Total Bonus Claimable：後端參數 `totalBonus`
    -   Deposit Slip
        -   有以下條件則 "不" 顯示
            -   沒有後端參數 `refList`
            -   優惠類型（後端參數 `promotionType`）不為 Redeposit
            -   分類不為 specialBonus 且 優惠類型（後端參數 `promotionType`）為 First Deposit
        -   顯示內容為後端參數 `refList` 中的 `depositId` 和 `amount` 組成的表格，最下方 Total 欄位顯示後端參數 `depositAmount`
    -   Deposit Menu
        -   以下條件皆符合才顯示：有後端參數 `depositId` 且 可加入（後端參數 `canJoin`: true）且 尚未加入（後端參數 `isJoin` 不為 true）且 [優惠類型（後端參數 `promotionType`）為 First Deposit 或 Redeposit]
        -   顯示欄位：
            -   ID：後端參數 `depositId`
            -   DepositAmount：後端參數 `depositAmount`
    -   Promo Rule
        -   如果後端參數 `tierAmountList` 的陣列長度大於 0，則顯示以下 `tierAmountList` 中的表格欄位
            -   Min Deposit：後端參數 `requiredAmount`
            -   Bonus：後端參數 `bonus`（如果 bonus 類型（後端參數`bonusType`）為 Percentage 時，在後面加上 %）
            -   Max Bonus Amount（如果 bonus 類型（後端參數`bonusType`）為 Percentage 才顯示）：後端參數 `maxBonus`
            -   Roll Over（如果後端參數 `fulfillType` 為 2 時則顯示 Win Over ）：後端參數 `fulfillType` 為 2 時則顯示 `winOver`，其餘顯示 `rollOver`
        -   如果優惠類型（後端參數 `promotionType`）不為 Other 或 Rebate
            -   後端參數 `requiredAmount` 大於 0 時，顯示欄位 Min Deposit：後端參數 `requiredAmount`
            -   Bonus：後端參數 `bonus`（如果 bonus 類型（後端參數`bonusType`）為 Percentage 時，在後面加上 %）
            -   Max Bonus Amount（如果 bonus 類型（後端參數`bonusType`）為 Percentage 且 優惠類型（後端參數 `promotionType`）不為 Other 或 Rebate 才顯示）：後端參數 `maxBonus`
            -   Max Bonus Amount（如果 bonus 類型（後端參數`bonusType`）為 Percentage 才顯示）：後端參數 `maxBonus`
            -   Roll Over（如果後端參數 `fulfillType` 為 2 時則顯示 Win Over ）：後端參數 `fulfillType` 為 2 時則顯示 `winOver`，其餘顯示 `rollOver`
            -   Remaining Time：

-   行為

    -   拿取從 promotion list 傳過來的 bonus code，將資料顯示

### Special Bonus

-   使用到的 api

    -   `GetSpecialPromotionListV2`: `api/Promotion/GetSpecialPromotionListV2/{langId}`
    -   `SetSpecialCode`: `api/Promotion/SetSpecialCode/{langId}`
        -   參數：`DeviceType` (Number)、`SpecialCode` (String)

-   規則
    -   登入後才會出現的分類
    -   一進入分類就 call api: `GetSpecialPromotionListV2` 取回資料顯示於列表
    -   使用者可在輸入框中輸入 bonus code，按下 submit 做搜尋
    -   搜尋時 call api: `SetSpecialCode` 之後需再 call api: `GetSpecialPromotionListV2` 重撈一次資料
