import { useDepositWithdrawTracker } from "@ailab-desktop/common";

const useDepositWithdraw = () => {
	const { checkDepositSuccessful } = useDepositWithdrawTracker();
	return { checkDepositSuccessful };
};

export default useDepositWithdraw;
