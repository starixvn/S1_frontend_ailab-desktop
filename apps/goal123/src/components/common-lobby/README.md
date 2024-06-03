# Lobby 共用元件

## 1. 組件

### LobbyBanner
- 顯示各 Lobby 頁面的 Banner。將對應語系網址傳入 props 即可。

### LobbyBottomBanner
- 顯示各 Lobby 底部的 Banner。已經添加英文（en）和越南文（vn）語系的判定。

### LobbyListItem
- 顯示各 Lobby 的遊戲項目。需搭配 useGetSubMenu 取出的 submenu 項目，並將其 map 後的 submenuItem 傳入共用元件 LobbyListItem即可。