import React, { useContext } from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { userInfoContext } from "../components/common/context";
import { bannerImgUrl } from "../config";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<Content />
				</main>
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { userInfo } = useContext(userInfoContext);

	const getImage = imgNum => {
		return `img${imgNum}`;
	};

	return userInfo?.langId === "en" ? (
		<section className="essayPage">
			<div className="title">HOW TO WITHDRAW</div>
			<p>
				Step 1: After logging into Bwing's website. Click on "CASHIER"
				and choose "Withdraw".
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					9
				)}.png`}
				alt={getImage(9)}
			/>
			<p>
				Step 2: Update bank information at "My Account"
				<br />
				• If you haven’t updated your information on the Profile page,
				please update first.
				<br />
				• You can add multiple bank accounts at the same time.
				<br />
				• Your real name, bank account name, and your ID name have to be
				the same.
				<br />
				After filling all the necessary information, click the "Submit"
				button..
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					10
				)}.png`}
				alt={getImage(10)}
			/>
			<p>
				Step 3: Click the button Add a bank account and fill in the
				information
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					11
				)}.png`}
				alt={getImage(11)}
			/>
			<p>
				Step 4: Choose your preferred bank account, input the amount,
				and click the button Submit.
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					12
				)}.png`}
				alt={getImage(12)}
			/>
			<p>Step 5: Confirm the information</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					13
				)}.png`}
				alt={getImage(13)}
			/>
			<p className="annotation">
				We will verify and notify you as soon as possible.
				<br />
				You can check the status of your withdrawal order at "Withdrawal
				history"
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					14
				)}.png`}
				alt={getImage(14)}
			/>
			<p className="annotation">
				Note: Bwing may ask for other information to verify your account
				before processing the withdrawal request.
			</p>
		</section>
	) : (
		<section className="essayPage">
			<div className="title">HƯỚNG DẪN RÚT TIỀN</div>
			<p>
				Bước 1: Sau khi đăng nhập vào website của Bwing. Nhấp vào “GIAO
				DỊCH” và chọn “Rút tiền”
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					1
				)}.png`}
				alt={getImage(1)}
			/>
			<p>
				Bước 2: Cập nhật thông tin ngân hàng tại “Tài khoản của tôi”
				<br />
				• Nếu bạn chưa cập nhật đầy đủ thông tin, bạn cần phải điền
				thông tin trong trang Hồ sơ trước.
				<br />
				• Thành viên có thể cập nhật nhiều ngân hàng một lúc.
				<br />
				• Tên thật trong Hồ sơ, tên tài khoản ngân hàng, và tên trong
				CMND của bạn phải giống nhau.
				<br />
				Sau khi điền tất cả thông tin cần thiết, vui lòng chọn nút Gửi.
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					2
				)}.png`}
				alt={getImage(2)}
			/>
			<p>Bước 3: Thêm tài khoản rút tiền</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					3
				)}.png`}
				alt={getImage(3)}
			/>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					4
				)}.png`}
				alt={getImage(4)}
			/>
			<p>
				Bước 4: Chọn ngân hàng muốn rút tiền về và nhập số tiền muốn
				rút. Bấm “Rút Tiền”
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					5
				)}.png`}
				alt={getImage(5)}
			/>
			<p>Bước 5: Xác nhận thông tin </p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					6
				)}.png`}
				alt={getImage(6)}
			/>
			<p>Hệ thống sẽ xác thực và thông báo nhanh nhất có thể.</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					7
				)}.png`}
				alt={getImage(7)}
			/>
			<p>
				Bước 4: Kiểm tra trạng thái lệnh rút tiền tại “Lịch sử rút tiền”
			</p>
			<img
				src={`${bannerImgUrl}/desktop/img/HowWithdraw/${getImage(
					8
				)}.png`}
				alt={getImage(8)}
			/>
			<p className="annotation">
				Lưu ý: Bwing có thể yêu cầu các thông tin khác để xác mình tài
				khoản trước khi rút tiền
			</p>
		</section>
	);
};
