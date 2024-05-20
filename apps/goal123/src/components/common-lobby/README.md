# Lobby 共用元件

此共用元件說明於 2024 年 4 月 23 日建立，主要用於各頁面的 Lobby 功能。

---------------------------------------

## 1. Hooks 說明

### useClickItem

負責處理遊戲項目的點擊事件，並傳遞遊戲相關參數。此 Hook 包括以下參數:

- `isLogin`: 用戶登入狀態
- `langId`: 語言 ID
- `tpId`: 產品類型 ID
- `gameId`: 遊戲 ID
- `loginCallback`: 登入回調函數
- `tpGameType`: 遊戲類型

### useGetSubMenu

此 Hook 用於根據指定的遊戲類別獲取相應的子選單項目。

`defMenuLinks()` 函數返回一個物件，包含不同遊戲類別的資訊。每個類別都包含一組子選單。
例如：`{ 'sports': { subMenu: [...], ... }, 'casino': { subMenu: [...], ... } }`

### 使用方法

- 使用變數 `category` 索引到具體類別，提取該類別的資料。
- 例如，若 `category` 為 "sports"，則可以訪問體育遊戲類別的資訊。

---------------------------------------

## 2. 組件

### LobbyBanner
- 顯示各 Lobby 頁面的 Banner。將對應語系網址傳入 props 即可。

### LobbyBottomBanner
- 顯示各 Lobby 底部的 Banner。已經添加英文（en）和越南文（vn）語系的判定。

### LobbyListItem
- 顯示各 Lobby 的遊戲項目。需搭配 useGetSubMenu 取出的 submenu 項目，並將其 map 後的 submenuItem 傳入共用元件 LobbyListItem即可。