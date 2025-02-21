import "../index.css";
import Drawer from "./Drawer";
import axios from "axios";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import {
    PiRows,
    PiMagnifyingGlass,
    PiBellBold,
    PiChatCircleDotsBold,
    PiUserCircleBold,
    PiClipboardBold,
    PiCheckSquareBold,
    PiArrowSquareDownBold,
    PiArrowSquareLeftBold,
    PiExclamationMarkFill,
    PiArticleBold,
    PiFacebookLogo,
    PiInstagramLogo,
    PiMessengerLogo,
} from "react-icons/pi";

const API_URL = "http://localhost:3000";

function Dashboard() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [statusData, setStatusData] = useState<{ name: string; value: number }[]>([]);
    const COLORS = ["#5EE173", "#3A82EF", "#FF495F", "#FFB038", "#EE3CD2"];
    const navigate = useNavigate();

    useEffect(() => {
    axios
        .get(`${API_URL}/projects/status-summary`)
        .then((response) => {
        const formattedData = response.data.map(
            (item: { project_status: string; total: number }) => ({
            name: item.project_status,
            value: item.total,
            })
        );
            setStatusData(formattedData);
        })
        .catch((error) => {
        console.error("Error fetching status summary:", error);
        });
    }, []);
    const totalProjects = statusData.reduce((sum, item) => sum + item.value, 0);
    const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
        <div className="flex flex-row flex-wrap justify-between">
        {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center px-3">
            <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
            ></div>
            <span className="font-bold text-gray-700">
                {entry.payload.value} {entry.value}
            </span>
            </div>
        ))}
        </div>
    );
    };

  return (
    <div className="relative w-screen h-screen bg-[url(./assets/images/background.png)] bg-cover bg-center bg-no-repeat flex justify-center items-center overflow-hidden">
        {showDrawer && <Drawer />}
        {/* Header */}
        <div className="absolute top-0 flex flex-row w-screen h-[50px] bg-[#F5F5F5] items-center gap-1 z-10">
            <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="content-center"
            >
            <PiRows className="text-[40px]"></PiRows>
            </button>
            <div className="relative flex flex-row w-[50%] h-[70%] bg-white rounded-xl border-2 pl-2 border-[#F7941D] items-center content-center">
            <input
                type="text"
                placeholder="Search"
                className="h-full w-full focus:outline-none"
            ></input>
            <PiMagnifyingGlass className="mr-1 text-[30px] text-gray-500"></PiMagnifyingGlass>
            </div>
            <button className="ml-auto h-[70%] rounded-xl border-2 border-[#F7941D] content-center">
            <PiBellBold className="px-1 text-[30px]"></PiBellBold>
            </button>
            <button className="ml-1 h-[70%] rounded-xl border-2 border-[#F7941D] content-center">
            <PiChatCircleDotsBold className="px-1 text-[30px]"></PiChatCircleDotsBold>
            </button>
            <button className="mr-1 ml-1 h-[70%] rounded-xl border-2 border-[#F7941D] content-center">
            <PiUserCircleBold className="px-1 text-[30px]"></PiUserCircleBold>
            </button>
        </div>
        {/* Contents */}
        <div className="flex flex-row flex-wrap absolute w-full h-screen pt-[60px] gap-5 justify-center snap-y overflow-y-auto">
            <div className="relative w-[300px] h-[300px] bg-white rounded-4xl flex flex-col gap-2 justify-center items-center">
                <p className="absolute bg-white font-bold top-0 mt-2 py-2 px-10 rounded-2xl z-5 shadow">Project Status Overview</p>
                <PieChart width={300} height={300}>
                <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend content={<CustomLegend />} />
                </PieChart>
                <p className="absolute mb-20 text-4xl font-black">{totalProjects}</p>
            </div>
            <div className="relative w-[300px] h-[300px] bg-white rounded-4xl flex flex-col gap-2 justify-center items-center">
                <p className="absolute bg-white font-bold top-0 mt-2 py-2 px-10 rounded-2xl z-5 shadow">Job Status Overview</p>
                <PieChart width={300} height={300}>
                <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend content={<CustomLegend />} />
                </PieChart>
                <p className="absolute mb-20 text-4xl font-black">{totalProjects}</p>
            </div>
            <div className="flex flex-row w-[90%] max-w-[500px] h-[300px] flex-wrap justify-center gap-2 snap-y overflow-y-auto">
                <button onClick={() => navigate('/project')} className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiCheckSquareBold className="text-5xl text-[#5EE173] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#5EE173]">{statusData.length > 0 ? statusData[0].value : 0}</p>Dự án<br/>Đã hoàn thành</p>
                </button>
                <button onClick={() => navigate('/project')} className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiArticleBold className="text-5xl text-[#3A82EF] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#3A82EF]">{statusData.length > 0 ? statusData[1].value : 0}</p>Dự án<br/>Đang tiến hành</p>
                </button>
                <button onClick={() => navigate('/project')} className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiArrowSquareLeftBold className="text-5xl text-[#FF495F] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#FF495F]">{statusData.length > 0 ? statusData[2].value : 0}</p>Dự án<br/>Chậm tiến độ</p>
                </button>
                <button onClick={() => navigate('/project')} className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiExclamationMarkFill className="text-5xl text-[#FFB038] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#FFB038]">{statusData.length > 0 ? statusData[3].value : 0}</p>Dự án<br/>Sắp tới hạn</p>
                </button>
                <button onClick={() => navigate('/project')} className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiArrowSquareDownBold className="text-5xl text-[#EE3CD2] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#EE3CD2]">{statusData.length > 0 ? statusData[4].value : 0}</p>Dự án<br/>Bị trì hoãn</p>
                </button>
                <button className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiClipboardBold className="text-5xl text-[#5EE173] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#5EE173]">{statusData.length > 0 ? statusData[0].value : 0}</p>Công việc<br/>Đã hoàn thành</p>
                </button>
                <button className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiClipboardBold className="text-5xl text-[#3A82EF] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#3A82EF]">{statusData.length > 0 ? statusData[1].value : 0}</p>Công việc<br/>Đang tiến hành</p>
                </button>
                <button className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiClipboardBold className="text-5xl text-[#FF495F] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#FF495F]">{statusData.length > 0 ? statusData[2].value : 0}</p>Công việc<br/>Sắp đến hạn</p>
                </button>
                <button className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiClipboardBold className="text-5xl text-[#FFB038] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#FFB038]">{statusData.length > 0 ? statusData[3].value : 0}</p>Công việc<br/>Chậm tiến độ</p>
                </button>
                <button className="flex flex-row w-[150px] h-[70px] bg-white rounded-lg justify-start items-center hover:opacity-50">
                    <PiClipboardBold className="text-5xl text-[#EE3CD2] ml-2 border-2 p-2 border-[#E4E4E4]"/>
                    <p className="text-[12px] text-gray-500 m-auto"><p className="font-black text-xl text-[#EE3CD2]">{statusData.length > 0 ? statusData[4].value : 0}</p>Công việc<br/>Bị trì hoãn</p>
                </button>
              </div>
            {/*Footer*/}
            <div className="flex flex-row flex-wrap w-full h-auto bottom-0 bg-white p-4 justify-around">
                <div className="flex-1/3 flex flex-col flex-wrap">
                    <p className="text-balance font-black mx-3 text-end">Địa chỉ:<p className="font-medium">Testtttttttttt ttttttttttttttttttt tttttttttttt ttttttttttttttttt ttttt</p></p>
                    <p className="text-balance font-black mx-3 text-end">Số điện thoại:<p className="font-medium">Testttttt tttttttttttttttttttt ttttttttttttttttt tttttttttttttt ttttttt</p></p>
                    <p className="text-balance font-black mx-3 text-end">Giờ hành chính:<p className="font-medium">Testtttttttttttt ttttttttttttttt tttttttttttttttttttt tttttttttttttttt</p></p>
                </div>
                <div className="relative flex-1/3 flex flex-col bg-[#FFF8EF] items-center rounded-2xl shadow-2xl">
                    <div className="w-[90%] h-[30%] bg-[url(/assets/images/logo.png)] my-2 bg-contain bg-center bg-no-repeat z-1"></div>
                    <div className="absolute bottom-0 w-full h-full bg-[url(/assets/images/building.png)] bg-cover bg-bottom bg-no-repeat z-0"></div>
                </div>
                <div className="flex-1/3 flex flex-col gap-1 items-start">
                    <p className="text-balance font-black mx-3">Liên hệ với chúng tôi tại:</p>
                    <button className="text-balance font-black flex flex-row hover:bg-blue-900 hover:text-white p-2"><PiFacebookLogo className="text-3xl text-blue-900 mx-3"/>Facebook</button>
                    <button className="text-balance font-black flex flex-row hover:bg-pink-900 hover:text-white p-2"><PiInstagramLogo className="text-3xl text-pink-900 mx-3"/>Instagram</button>
                    <button className="text-balance font-black flex flex-row hover:bg-blue-700 hover:text-white p-2"><PiMessengerLogo className="text-3xl text-blue-700 mx-3"/>Messenger</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
