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
		return `img${imgNum}`;
	};

	return userInfo?.langId === "en" ? (
		<section className="essayPage">
			<div className="title">HOW TO PLAY </div>
			<p>
				Step 1: Register a Bwing account
				<br />
				• Access: https://www.bwing.com/
				<br />
				• Select "Register" and fill in information including: username,
				password, email, and choose currency in VND.
				<br />
				• Check the box “I agree to the Bwing Terms and Conditions and
				the Bwing Rules and Regulations.” and the box “I confirm I am
				over 18 years old”.
				<br />• Click "REGISTER"
			</p>

			<img
				src={require(`../styles/img/HowPlay/${getImage(7)}.png`)}
				alt={getImage(7)}
			/>
			<p>
				Step 2: Sign in and deposit
				<br />
				Log in to your Bwing account and choose any deposit method to
				deposit into your Bwing account. Your balance will appear at the
				top of the screen as shown.
			</p>
			<img
				src={require(`../styles/img/HowPlay/${getImage(8)}.png`)}
				alt={getImage(8)}
			/>
			<p className="annotation">
				See also: How to send money Bwing (hyperlink)
			</p>
			<p>
				Step 3: Transfer funds and Choose your favorite game
				<br />
				Bwing account has two (2) wallets:
				<br />
				Main wallet: to use in Bwing CASINO products; LIVE CASINO and
				FISH WORLD
				<br />
				Sportsbook wallet: to use in products in SPORTS, VIRTUAL SPORTS,
				ESPORTS, Vgaming, OW CASINO, and LOTTERY.
				<br />
				Choose "Transfer Funds" at the top of the page or in the Cashier
				section.
			</p>
			<img
				src={require(`../styles/img/HowPlay/${getImage(9)}.png`)}
				alt={getImage(9)}
			/>
			<p className="annotation">
				Choose your wallet, and enter the amount you want to transfer.
				Then, press the button "Transfer" to complete.
			</p>
			<img
				src={require(`../styles/img/HowPlay/${getImage(10)}.png`)}
				alt={getImage(10)}
			/>
			<p>
				Step 4: Place a bet
				<br />
				Successful fund transfer balance will be available immediately.
				You can start choosing your favorite game and place your bets.
				Bwing offers a wide range of games from sports, casino to slots,
				and fishing games, with competitive odds for tournaments all
				around the world. Start your journey now
			</p>
		</section>
	) : (
		<section className="essayPage">
			<div className="title">HƯỚNG DẪN CÁCH CHƠI </div>
			<p>
				Bước 1: Đăng ký tài khoản Bwing
				<br />
				• Truy cập: https://www.bwing.com/vn
				<br />
				• Chọn “Đăng ký” và điền thông tin gồm: tên truy cập, mật khẩu,
				và chọn tiền tệ VND.
				<br />
				• Đánh dấu vào ô “Tôi đồng ý với Điều Khoản và Điều Kiện và Quy
				Tắc và Quy Định Đặt Cược của Bwing.” và ô “Tôi xác nhận tôi đã
				trên 18 tuổi”
				<br />• Chọn nút “ĐĂNG KÝ”
			</p>
			<img
				src={require(`../styles/img/HowPlay/${getImage(1)}.png`)}
				alt={getImage(1)}
			/>
			<p>
				Bước 2: Đăng nhập và nạp tiền Đăng nhập vào tài khoản Bwing và
				chọn phương thức gửi tiền bất kỳ để thực hiện nạp tiền vào tài
				khoản Bwing. Số dư sẽ hiện lên phía trên cùng màn hình như hình
				minh họa.
			</p>
			<img
				src={require(`../styles/img/HowPlay/${getImage(2)}.png`)}
				alt={getImage(2)}
			/>
			<img
				src={require(`../styles/img/HowPlay/${getImage(3)}.png`)}
				alt={getImage(3)}
			/>
			<p className="annotation">Xem thêm: Cách gửi tiền Bwing</p>
			<p>
				Bước 3: Chuyển quỹ để chơi trò yêu thích Tài khoản Bwing sẽ có
				hai (2) ví:
				<br />
				Ví chính: tham gia các sản phẩm Bwing CASINO; LIVE CASINO và BẮN
				CÁ
				<br />
				Ví Sportsbook/Ví thể thao: tham gia các sản phẩm trong sảnh THỂ
				THAO, THỂ THAO ẢO, THỂ THAO ĐIỆN TỬ, Vgaming, OW CASINO, và XỔ
				SỐ.
				<br />
				Chọn nút “Chuyển quỹ” ở đầu trang, hoặc bấm vào mũi tên cạnh số
				tiền trong tài khoản vào chọn “Chuyển quỹ”.
			</p>
			<img
				src={require(`../styles/img/HowPlay/${getImage(4)}.png`)}
				alt={getImage(4)}
			/>
			<img
				src={require(`../styles/img/HowPlay/${getImage(5)}.png`)}
				alt={getImage(5)}
			/>
			<img
				src={require(`../styles/img/HowPlay/${getImage(6)}.png`)}
				alt={getImage(6)}
			/>
			<p>
				Bước 4: Đặt cược
				<br />
				Chuyển quỹ thành công số dư sẽ có ngay trong ví. Bạn có thể bắt
				đầu chọn trò chơi yêu thích của mình và đặt cược tùy thích.
				Bwing cung cấp các trò chơi đa dạng từ thể thao, casino đến các
				trò nổ hũ hay bắn cá. Kèo cược với tỷ lệ hấp dẫn cho các giải
				đấu trên khắp hành tinh. Bắt đầu trải nghiệm ngay!
			</p>
		</section>
	);
};
