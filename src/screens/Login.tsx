import "../index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      setMessage(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Lỗi kết nối server!");
    }
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }
  };

  return (
    <div className="w-screen h-screen bg-[url(/assets/images/background.png)] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="w-[90%] h-[80%] max-w-[700px] max-h-[500px] bg-white/50 rounded-4xl flex flex-col gap-2 justify-center items-center">
        <div className="w-[90%] h-[15%] bg-[url(/assets/images/logo.png)] bg-contain bg-center bg-no-repeat"></div>
        <p className="w-[70%] h-[10%] text-center text-[#262262] font-bold">
          BUILD TODAY, CREATE VALUE TOMORROW
        </p>
        <div className="w-[70%] h-[15%]">
          <p className="w-full h-[30%] text-[16px] mb-1">Tên đăng nhập</p>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[70%] bg-white rounded-xl border-2 pl-2 border-[#F7941D]"
          ></input>
        </div>
        <div className="relative w-[70%] h-[15%]">
          <p className="w-full h-[30%] text-[16px] mb-1">Mật khẩu</p>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[70%] bg-white rounded-xl border-2 pl-2 border-[#F7941D]"
          ></input>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="flex flex-row absolute top-[45%] right-[5%] p-2"
          >
            {showPassword ? (
              <PiEye className="mt-0.5 text-[20px]"></PiEye>
            ) : (
              <PiEyeClosed className="mt-0.5 text-[20px]"></PiEyeClosed>
            )}
            <p className="font-extralight ml-1">Hiển thị</p>
          </button>
        </div>
        <div className="w-[70%] flex justify-end items-center mb-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label className="text-sm">Nhớ mật khẩu</label>
        </div>
        <button
          onClick={handleLogin}
          className="w-[70%] h-[10%] bg-linear-to-r from-[#BE1E2D] to-[#F7941D] text-white rounded-2xl m-2 hover:opacity-80 active:opacity-50"
        >
          Login
        </button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
