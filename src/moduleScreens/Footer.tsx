import "../index.css";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiMessengerLogo,
} from "react-icons/pi";

function Footer() {
    return (
        <div className="flex flex-row flex-wrap w-full h-auto bottom-0 bg-white p-4 justify-around">
            <div className="flex-1/3 flex flex-col flex-wrap">
                <p className="text-balance font-black mx-3 text-end">Địa chỉ:<p className="font-medium">133 Hermann Gmeiner, Hưng Phúc, Vinh, Nghệ An</p></p>
                <p className="text-balance font-black mx-3 text-end">Số điện thoại:<p className="font-medium">0935 613 976</p></p>
                <p className="text-balance font-black mx-3 text-end">Giờ hành chính:<p className="font-medium">Thứ Hai - Thứ Bảy 7:30 - 17:00</p></p>
            </div>
            <div className="relative flex-1/3 flex flex-col bg-[#ffe1bd] items-center rounded-2xl">
                <div className="w-[90%] h-[30%] bg-[url(/assets/images/logo.png)] my-2 bg-contain bg-center bg-no-repeat z-1"></div>
                <div className="absolute bottom-0 w-full h-full bg-[url(/assets/images/building.png)] bg-cover bg-bottom bg-no-repeat z-0"></div>
            </div>
            <div className="flex-1/3 flex flex-col gap-1 items-start">
                <p className="text-balance font-black mx-3">Liên hệ với chúng tôi tại:</p>
                <button className="text-balance font-black flex flex-row hover:bg-blue-900 hover:text-white p-2"><PiFacebookLogo className="text-3xl text-blue-900 mx-3" />Facebook</button>
                <button className="text-balance font-black flex flex-row hover:bg-pink-900 hover:text-white p-2"><PiInstagramLogo className="text-3xl text-pink-900 mx-3" />Instagram</button>
                <button className="text-balance font-black flex flex-row hover:bg-blue-700 hover:text-white p-2"><PiMessengerLogo className="text-3xl text-blue-700 mx-3" />Messenger</button>
            </div>
        </div>
    );
}

export default Footer;
