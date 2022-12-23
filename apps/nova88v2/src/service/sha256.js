import sha256 from "sha256";

/**
 * * 前端的body原本的Request照傳，多傳 token 和  timestamp (要驗證是否再30秒之內)
 * * timestamp 用來驗證是否在在時間內
 * * token 把全部參數包含 process.env.REACT_APP_TOKEN 及 timestamp 丟進 sha256
 * */
export const withToken = args => {
	const timestamp = Date.now();
	const token = sha256({
		...args,
		token: process.env.REACT_APP_TOKEN,
		timestamp
	});

	return {
		...args,
		timestamp,
		token
	};
};
