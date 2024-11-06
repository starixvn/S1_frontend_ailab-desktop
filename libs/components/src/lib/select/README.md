# Select 組件

-   Select 是一個可重用的下拉選擇框組件，支持多種功能，如搜尋、圖標、翻譯和錯誤處理。它允許用戶從選項列表中進行選擇，並且可以作為受控或非受控組件運行。

### ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

```tsx
import React, { useState } from "react";
import Select from "./Select";

const options = [
	{ value: "1", label: "選項1" },
	{ value: "2", label: "選項2", disabled: true },
	{ value: "3", label: "選項3" }
];

const MyComponent = () => {
	const [selectedValue, setSelectedValue] = useState("1"); // 設定初始選擇為選項1

	const handleSelectChange = newValue => {
		console.log("選中的值是:", newValue);
		setSelectedValue(newValue); 
	};

	return (
		<Select
			options={options}
			value={selectedValue} // 這裡使用 value 來設置當前選中的選項
			placeholder="請選擇"
			onChange={handleSelectChange}
		/>
	);
};

export default MyComponent;
```
