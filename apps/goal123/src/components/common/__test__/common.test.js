import { passwordCheck } from "../common.js";

describe("passwordCheck test", () => {
	let result = {
		checked: true,
		message: ""
	};

	test("check if data is empty.", () => {
		result = {
			checked: false,
			message: "msg_PasswordReq"
		};

		expect(passwordCheck("")).toStrictEqual(result);
	});

	test("check Length must be 8-20 characters.", () => {
		result = {
			checked: false,
			message: "msg_PasswordLength"
		};

		expect(passwordCheck("Ss@7777")).toStrictEqual(result);
		expect(passwordCheck("Ss@777777777777777777")).toStrictEqual(result);
	});

	test("callback `checked` should be false", () => {
		result = {
			checked: false,
			message: "msg_PasswordVaildate"
		};

		expect(passwordCheck("Ss777777")).toStrictEqual(result);
		expect(passwordCheck("S@777777")).toStrictEqual(result);
		expect(passwordCheck("s@777777")).toStrictEqual(result);
		expect(passwordCheck("77777777")).toStrictEqual(result);
		expect(passwordCheck("ssssssss")).toStrictEqual(result);
		expect(passwordCheck("SSSSSSSS")).toStrictEqual(result);
		expect(passwordCheck("@@@@@@@@")).toStrictEqual(result);
		expect(passwordCheck("7777777S")).toStrictEqual(result);
		expect(passwordCheck("7777777s")).toStrictEqual(result);
		expect(passwordCheck("7777777@")).toStrictEqual(result);
		expect(passwordCheck("777777Ss")).toStrictEqual(result);
		expect(passwordCheck("777777s@")).toStrictEqual(result);
		expect(passwordCheck("777777S@")).toStrictEqual(result);
		expect(passwordCheck("77777SS@")).toStrictEqual(result);
		expect(passwordCheck("77777ss@")).toStrictEqual(result);
	});

	test("callback `checked` should be true", () => {
		result = {
			checked: true,
			message: ""
		};

		expect(passwordCheck("77777Ss@")).toStrictEqual(result);
		expect(passwordCheck("S77777s@")).toStrictEqual(result);
		expect(passwordCheck("s77777S@")).toStrictEqual(result);
		expect(passwordCheck("Ss777777@")).toStrictEqual(result);
		expect(passwordCheck("Ss@77777")).toStrictEqual(result);
	});
});
