import "../index.css";
import { useNavigate } from "react-router-dom";
import {
  PiCheckerboardBold,
  PiClipboardBold,
  PiSuitcaseBold,
  PiNoteBold,
  PiProjectorScreenChartBold,
  PiUserCircleGearBold,
} from "react-icons/pi";

function Drawer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col absolute top-[50px] left-0 w-[300px] h-auto pb-4 bg-white rounded-br-lg shadow-lg items-center z-10">
      <div className="w-[70%] h-[100px] bg-[url(/assets/images/logo.png)] bg-contain bg-center bg-no-repeat"></div>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex flex-row w-[90%] h-[60px] text-[24px] font-bold text-gray-500 justify-start items-center rounded-2xl hover:border-2 hover:border-[#BE1E2D] hover:bg-[#FFF8EF] hover:text-[#BE1E2D] active:bg-[#BE1E2D] active:text-white"
      >
        <PiCheckerboardBold className="text-[32px] text-gray-500 mx-2" />
        Dashboard
      </button>
      <button
        onClick={() => navigate("/project")}
        className="flex flex-row w-[90%] h-[60px] text-[24px] font-bold text-gray-500 justify-start items-center rounded-2xl hover:border-2 hover:border-[#BE1E2D] hover:bg-[#FFF8EF] hover:text-[#BE1E2D] active:bg-[#BE1E2D] active:text-white"
      >
        <PiClipboardBold className="text-[32px] text-gray-500 mx-2" />
        Quản lý dự án
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex flex-row w-[90%] h-[60px] text-[24px] font-bold text-gray-500 justify-start items-center rounded-2xl hover:border-2 hover:border-[#BE1E2D] hover:bg-[#FFF8EF] hover:text-[#BE1E2D] active:bg-[#BE1E2D] active:text-white"
      >
        <PiSuitcaseBold className="text-[32px] text-gray-500 mx-2" />
        Quản lý công việc
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex flex-row w-[90%] h-[60px] text-[24px] font-bold text-gray-500 justify-start items-center rounded-2xl hover:border-2 hover:border-[#BE1E2D] hover:bg-[#FFF8EF] hover:text-[#BE1E2D] active:bg-[#BE1E2D] active:text-white"
      >
        <PiNoteBold className="text-[32px] text-gray-500 mx-2" />
        Quản lý đề xuất
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex flex-row w-[90%] h-[60px] text-[24px] font-bold text-gray-500 justify-start items-center rounded-2xl hover:border-2 hover:border-[#BE1E2D] hover:bg-[#FFF8EF] hover:text-[#BE1E2D] active:bg-[#BE1E2D] active:text-white"
      >
        <PiProjectorScreenChartBold className="text-[32px] text-gray-500 mx-2" />
        Báo cáo
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex flex-row w-[90%] h-[60px] text-[24px] font-bold text-gray-500 justify-start items-center rounded-2xl hover:border-2 hover:border-[#BE1E2D] hover:bg-[#FFF8EF] hover:text-[#BE1E2D] active:bg-[#BE1E2D] active:text-white"
      >
        <PiUserCircleGearBold className="text-[32px] text-gray-500 mx-2" />
        Quản trị
      </button>
    </div>
  );
}

export default Drawer;
