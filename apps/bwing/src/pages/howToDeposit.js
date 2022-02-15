import React, { useContext } from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { userInfoContext } from "../components/common/context";

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
		return `image${imgNum}`;
	};

	return userInfo?.langId === "en" ? (
		<section className="essayPage">
			<div className="title">HOW TO DEPOSIT</div>
			<p>Step 1: "LOG IN" at the homepage</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(19)}.png`)
						.default
				}
				alt={getImage(19)}
			/>
			<p>
				Step 2: Fill in the registered information and click "LOGIN"
				button.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(2)}.png`)
						.default
				}
				alt={getImage(2)}
			/>
			<p>
				Step 3: Choose “Deposit” button at the top of the page, or click
				on the arrow next to your balance and choose “Deposit”.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(13)}.png`)
						.default
				}
				alt={getImage(13)}
			/>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(24)}.png`)
						.default
				}
				alt={getImage(24)}
			/>
			<p>
				Step 4: Choose your preferred deposit method among e-wallet,
				internet banking, and domestic bank transfer. After that, choose
				the provider you want.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(33)}.png`)
						.default
				}
				alt={getImage(33)}
			/>

			<div className="title">Deposit via e-wallet </div>
			<p>
				Step 1: Choose one provider among Momo, ZaloPay, or Viettel Pay.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(36)}.png`)
						.default
				}
				alt={getImage(36)}
			/>
			<p>Step 2: Choose one of the available accounts.</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(21)}.png`)
						.default
				}
				alt={getImage(21)}
			/>
			<p>
				Step 3: Input the amount you want to deposit, choose “Submit”
				button. Please note that different gateways have different
				deposit limits.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(16)}.png`)
						.default
				}
				alt={getImage(16)}
			/>
			<p>Step 4: Choose “Confirm” button. </p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(12)}.png`)
						.default
				}
				alt={getImage(12)}
			/>
			<p>
				Step 5: The system will display the QR code and instruction to
				deposit via Momo. Please open Momo app and scan this QR code to
				deposit.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(8)}.png`)
						.default
				}
				alt={getImage(8)}
			/>
			<div className="title">Deposit via online banking</div>
			<p>Step 1: Choose one of the appropriate payment gateways</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(9)}.png`)
						.default
				}
				alt={getImage(9)}
			/>
			<p>Step 2: Choose your preferred bank </p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(34)}.png`)
						.default
				}
				alt={getImage(34)}
			/>
			<p>
				Step 3: Select the bank you want to use and enter the amount to
				be transacted. Please note that different gateways have
				different deposit limits. (by default, the system has 3 zero at
				the end. If you want to deposit 300,000, just enter 300)
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(18)}.png`)
						.default
				}
				alt={getImage(18)}
			/>
			<p>Step 4: Choose “Confirm” button.</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(10)}.png`)
						.default
				}
				alt={getImage(10)}
			/>
			<p>
				Step 5: Input your account name and password and follow the
				instructions.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(14)}.png`)
						.default
				}
				alt={getImage(14)}
			/>

			<div className="title">Deposit via local bank transfer</div>
			<p>Step 1: Choose Local bank transfer</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(5)}.png`)
						.default
				}
				alt={getImage(5)}
			/>
			<p>Step 2: Choose 1 of the available banks. </p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(11)}.png`)
						.default
				}
				alt={getImage(11)}
			/>
			<p>
				Step 3: Fill in your real name as in your ID (if you haven’t
				updated in your Profile page) and input the amount you want to
				deposit. The system defaults to 3 zeros at the end. If a member
				wants to deposit 300,000 just enter 300. Choose “Submit” button.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(28)}.png`)
						.default
				}
				alt={getImage(28)}
			/>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(25)}.png`)
						.default
				}
				alt={getImage(25)}
			/>
			<p>
				Step 4: In case you haven’t updated your name in your profile
				page, please confirm your name as in your ID and your bank
				account to avoid delaying the transaction.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(40)}.png`)
						.default
				}
				alt={getImage(40)}
			/>
			<p>Step 5: Confirm the amount </p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(29)}.png`)
						.default
				}
				alt={getImage(29)}
			/>
			<p>
				Step 6 (optional): To speed up the verification process, you can
				upload the bank receipt in the image format and fill in the
				reference number on the receipt.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(41)}.png`)
						.default
				}
				alt={getImage(41)}
			/>
			<p>We will verify and notify you as soon as possible.</p>
		</section>
	) : (
		<section className="essayPage">
			<div className="title">HƯỚNG DẪN NẠP TIỀN</div>
			<p>Bước 1: “ĐĂNG NHẬP” tại trang chủ</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(27)}.png`)
						.default
				}
				alt={getImage(27)}
			/>
			<p>Bước 2: Điền thông tin đã đăng ký và nhấp nút “ĐĂNG NHẬP”</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(38)}.png`)
						.default
				}
				alt={getImage(38)}
			/>
			<p>
				Bước 3: Nhấp chọn “Nạp tiền” ở đầu trang, hoặc bấm vào mũi tên
				cạnh số tiền trong tài khoản vào chọn “Nạp tiền”.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(22)}.png`)
						.default
				}
				alt={getImage(22)}
			/>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(15)}.png`)
						.default
				}
				alt={getImage(15)}
			/>
			<p>
				Bước 4: Chọn phương thức gửi tiền yêu thích. Trong danh sách các
				nhà cung cấp cổng thanh toán ví điện tử, ngân hàng trực tuyến,
				hoặc chuyển khoản trong nước, vui lòng chọn nhà cung cấp bạn
				muốn và làm theo hướng dẫn.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(33)}.png`)
						.default
				}
				alt={getImage(33)}
			/>

			<div className="title">Nạp tiền qua ví điện tử </div>
			<p>
				Bước 1: Lựa chọn các ví điện tử Momo, Zalo Pay hoặc Viettel Pay.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(35)}.png`)
						.default
				}
				alt={getImage(35)}
			/>
			<p>Bước 2: Chọn cổng nạp. </p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(31)}.png`)
						.default
				}
				alt={getImage(31)}
			/>
			<p>
				Bước 3: Nhập số tiền bạn muốn nạp, chọn nút “Nạp tiền". Lưu ý
				mỗi cổng thanh toán có hạn mức nạp khác nhau.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(7)}.png`)
						.default
				}
				alt={getImage(7)}
			/>
			<p>Bước 4: Chọn nút “Xác nhận”.</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(32)}.png`)
						.default
				}
				alt={getImage(32)}
			/>
			<p>
				Bước 5: Hệ thống sẽ hiển thị mã QR tương ứng và hướng dẫn nạp
				bằng Momo. Vui lòng mở ứng dụng Momo và quét mã QR này để nạp
				tiền.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(8)}.png`)
						.default
				}
				alt={getImage(8)}
			/>

			<div className="title">Nạp tiền ngân hàng trực tuyến</div>
			<p>Bước 1: Chọn một trong các cổng thanh toán thích hợp.</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(39)}.png`)
						.default
				}
				alt={getImage(39)}
			/>
			<p>Bước 2: Chọn ngân hàng của bạn</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(17)}.png`)
						.default
				}
				alt={getImage(17)}
			/>
			<p>
				Bước 3: Nhập số tiền bạn muốn nạp, chọn nút “Nạp tiền". Lưu ý
				mỗi cổng thanh toán có hạn mức nạp khác nhau.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(3)}.png`)
						.default
				}
				alt={getImage(3)}
			/>
			<p>Bước 4: Chọn nút “Xác nhận”.</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(20)}.png`)
						.default
				}
				alt={getImage(20)}
			/>
			<p>
				Bước 5: Nhập tên tài khoản và mật khẩu internet banking của ngân
				hàng tương ứng và làm theo hướng dẫn.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(14)}.png`)
						.default
				}
				alt={getImage(14)}
			/>

			<div className="title">Nạp tiền bằng chuyển khoản trong nước</div>
			<p>Bước 1: Chọn chuyển khoản trong nước</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(6)}.png`)
						.default
				}
				alt={getImage(6)}
			/>
			<p>Bước 2: Chọn 1 trong các ngân hàng có sẵn.</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(23)}.png`)
						.default
				}
				alt={getImage(23)}
			/>
			<p>
				Bước 3: Điền tên thật như trong CMND của bạn (nếu bạn chưa cập
				nhật trong trang Hồ sơ) và nhập số tiền bạn muốn nạp. Hệ thống
				mặc định 3 số 0 ở cuối. Ví dụ bạn muốn nạp 300,000 chỉ cần điền
				300. Chọn nút “Nạp tiền".
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(4)}.png`)
						.default
				}
				alt={getImage(4)}
			/>
			<p>
				Bước 4: Xác nhận tên của bạn đúng với tên trên CMND và tài khoản
				ngân hàng để tránh bị trì hoãn giao dịch.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(26)}.png`)
						.default
				}
				alt={getImage(26)}
			/>
			<p>Bước 5: Xác nhận số tiền</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(1)}.png`)
						.default
				}
				alt={getImage(1)}
			/>
			<p>
				Bước 6 (không bắt buộc): Để quá trình xác thực nhanh hơn, bạn có
				thể tải lên biên lai ngân hàng bằng định dạng ảnh và điền số
				tham chiếu trên biên lai.
			</p>
			<img
				src={
					require(`../styles/img/HowDeposit/${getImage(37)}.png`)
						.default
				}
				alt={getImage(37)}
			/>
			<p>Hệ thống sẽ xác thực và thông báo nhanh nhất có thể.</p>
		</section>
	);
};
