import { passwordCheck } from "../common";

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

	test("callback `checked` should be false", () => {
		result = {
			checked: false,
			message: "msg_PasswordVaildate"
		};

		// check Length must be 6-15 characters.
		expect(passwordCheck("@Aa11")).toStrictEqual(result);
		expect(passwordCheck("@Aa1111111111111")).toStrictEqual(result);

		expect(passwordCheck("Aa1111")).toStrictEqual(result);
		expect(passwordCheck("1111aA")).toStrictEqual(result);
		expect(passwordCheck("1111aa")).toStrictEqual(result);
		expect(passwordCheck("111111")).toStrictEqual(result);
	});

	test("callback `checked` should be true", () => {
		result = {
			checked: true,
			message: ""
		};

		expect(passwordCheck("@Aa111")).toStrictEqual(result);
		expect(passwordCheck("111aA@")).toStrictEqual(result);
		expect(passwordCheck("1111a@")).toStrictEqual(result);
		expect(passwordCheck("1111A@")).toStrictEqual(result);
	});
});
