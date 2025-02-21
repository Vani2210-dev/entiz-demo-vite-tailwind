import "../index.css";
import Drawer from "./Drawer";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";
import {
    PiRows,
    PiMagnifyingGlass,
    PiBellBold,
    PiChatCircleDotsBold,
    PiUserCircleBold,
    PiCalendarBlankBold,
    PiBarcodeBold,
    PiDiscBold,
    PiMapPinFill,
    PiBookBookmarkBold,
    PiUsersThreeFill,
    PiCurrencyCircleDollarBold,
    PiPlusCircleBold,
    PiFacebookLogo,
    PiInstagramLogo,
    PiMessengerLogo,
    PiArrowFatLeftFill,
    PiArrowFatRightFill,
} from "react-icons/pi";

const API_URL = "http://localhost:3000";

function Project() {
    const [showDrawer, setShowDrawer] = useState(false);
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("Ongoing");
    const [page, setPage] = useState(1);
    const limit = 5; // Số dự án mỗi trang

    interface Project {
        project_id: string;
        project_title: string;
        project_manager: string;
        project_start_date: string;
        project_end_date: string;
        project_location: string;
        project_info: string;
        project_number_of_employees: number;
        project_budget: number;
        project_estimate: number;
        project_acceptance: number;
        project_payment: number;
        project_progress: number;
        project_status: string;
    }

    useEffect(() => {
        axios.get<Project[]>(`${API_URL}/projects/filter`, { params: { status, search, page, limit } })
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách dự án:", error);
            });
    }, [status, search, page]);

  return (
    <div className="w-screen h-screen bg-[url(./assets/images/background.png)] bg-cover bg-center bg-no-repeat flex justify-center items-center overflow-hidden">
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
                value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }}
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
        <div className="flex flex-row flex-wrap absolute w-full h-screen pt-[50px] gap-5 justify-center snap-y overflow-y-auto">
            <div className="flex flex-row w-full h-[50px] bg-white items-center">
                <select
                    value={status}
                      onChange={(e) => { setStatus(e.target.value); setPage(1)}}
                    className="py-2 ml-2 rounded-2xl font-bold"
                >
                    <option value="Ongoing">Đang tiến hành</option>
                    <option value="Slowed">Chậm tiến độ</option>
                    <option value="Deadline">Sắp tới hạn</option>
                    <option value="Delayed">Bị trì hoãn</option>
                    <option value="Completed">Đã hoàn thành</option>
                </select>
                <button onClick={() => navigate("/newproject")} className="flex flex-row ml-auto mr-2 gap-1 items-center">
                    <p className="font-bold">Thêm dự án</p>
                    <PiPlusCircleBold className="text-[30px]" />
                </button>
              </div>
            <div className="w-[90%]">
                {projects.length === 0 ? (
                    <p className="text-center text-gray-500">Không có dự án nào.</p>
                ) : (
                    projects.map((project) => (
                        <div key={project.project_id} className="relative border border-[#BE1E2D] rounded-2xl bg-white mb-5">
                            <div className="flex flex-row w-full rounded-t-2xl p-1 bg-[#BE1E2D]">
                                <p className="p-2 border-r-2 border-white text-white font-bold"><b className="font-light">Mã dự án</b><br/>{project.project_id}</p>
                                <p className="p-2 text-white font-bold"><b className="font-light">Tên dự án</b><br/>{project.project_title}</p>
                            </div>
                            <div className="flex flex-row flex-wrap w-full rounded-t-2xl p-1 justify-between gap-2">
                                <div className="flex flex-col flex-wrap">
                                    <p className="flex flex-row">
                                        <PiUserCircleBold className="m-1 flex-shrink-0 text-[#BE1E2D]" />
                                        <b className="whitespace-nowrap" >Người quản lý:</b> {project.project_manager}
                                    </p>
                                    <p className="flex flex-row">
                                        <PiCalendarBlankBold className="m-1 flex-shrink-0 text-[#BE1E2D]" />
                                        <b className="whitespace-nowrap" >Ngày bắt đầu:</b> {new Date(project.project_start_date).toISOString().split("T")[0]}
                                    </p>
                                    <p className="flex flex-row">
                                        <PiArrowFatRightFill className="m-1 flex-shrink-0 text-[#BE1E2D]" />
                                        <b className="whitespace-nowrap" >Ngày kết thúc:</b> {new Date(project.project_end_date).toISOString().split("T")[0]}
                                    </p>
                                    <p className="flex flex-row">
                                        <PiMapPinFill className="m-1 flex-shrink-0 text-[#BE1E2D]" />
                                        <b className="whitespace-nowrap" >Vị trí:</b> {project.project_location}
                                    </p>
                                    <p className="flex flex-row">
                                        <PiBookBookmarkBold className="m-1 flex-shrink-0 text-[#BE1E2D]" />
                                        <b className="whitespace-nowrap" >Miêu tả:</b> {project.project_info}
                                    </p>
                                    <p className="flex flex-row">
                                        <PiUsersThreeFill className="m-1 flex-shrink-0 text-[#BE1E2D]" />
                                        <b className="whitespace-nowrap" >Số nhân viên:</b> {project.project_number_of_employees}
                                    </p>
                                </div>
                                <div className="flex flex-col flex-wrap">
                                    <p className="flex flex-row">
                                        <PiCurrencyCircleDollarBold className="m-1 flex-shrink-0 text-[#3A82EF]" />
                                        <b className="whitespace-nowrap" >Ngân sách:</b> {project.project_budget.toLocaleString()} VNĐ
                                    </p>
                                    <p className="flex flex-row">
                                        <PiCurrencyCircleDollarBold className="m-1 flex-shrink-0 text-[#FFB038]" />
                                        <b className="whitespace-nowrap" >Ước tính:</b> {project.project_estimate.toLocaleString()} VNĐ
                                    </p>
                                    <p className="flex flex-row">
                                        <PiCurrencyCircleDollarBold className="m-1 flex-shrink-0 text-[#FF495F]" />
                                        <b className="whitespace-nowrap" >Chấp nhận:</b> {project.project_acceptance.toLocaleString()} VNĐ
                                    </p>
                                    <p className="flex flex-row">
                                        <PiCurrencyCircleDollarBold className="m-1 flex-shrink-0 text-[#5EE173]" />
                                        <b className="whitespace-nowrap" >Thanh toán:</b> {project.project_payment.toLocaleString()} VNĐ
                                    </p>
                                    <p className="flex flex-row">
                                        <PiDiscBold className="m-1 flex-shrink-0 text-[#BE1E2D]" />
                                        <b className="whitespace-nowrap" >Tiến độ:</b> {project.project_progress}%
                                    </p>
                                    <p className="flex flex-row">
                                        <PiBarcodeBold className="m-1 flex-shrink-0 text-[#3A82EF]" />
                                        <b className="whitespace-nowrap" >Trạng thái:</b> {project.project_status}
                                    </p>
                                </div>
                                <div className="m-auto">
                                    <PieChart width={100} height={100}>
                                        <Pie
                                            data={[{ "name": "Done", "value": project.project_progress }, { "name": "notDone", "value": 100 - project.project_progress }]}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%" cy="50%"
                                            outerRadius={50}
                                            innerRadius={10}
                                            fill="#8884d8"
                                        >
                                        <Cell key="Done" fill="#5EE173" />
                                        <Cell key="notDone" fill="#FF495F" />
                                        </Pie>
                                    </PieChart>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center gap-4 mt-4 h-[10%] max-h-[50px]">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="p-2 bg-[#BE1E2D] text-white rounded-full disabled:opacity-50"
                >
                    <PiArrowFatLeftFill/>
                </button>

                <p className="text-lg bg-white font-black p-2 rounded-2xl flex items-center">Trang {page}</p>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="p-2 bg-[#BE1E2D] text-white rounded-full"
                >
                    <PiArrowFatRightFill/>
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

export default Project;
