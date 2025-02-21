import "../index.css";
import Drawer from "./Drawer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {
    PiRows,
    PiMagnifyingGlass,
    PiBellBold,
    PiChatCircleDotsBold,
    PiUserCircleBold,
    PiClipboardBold,
    PiArrowFatRightFill,
    PiCalendarBlankBold,
    PiBarcodeBold,
    PiDiscBold,
    PiMapPinFill,
    PiBookBookmarkBold,
    PiUsersThreeFill,
    PiCurrencyCircleDollarBold,
    PiWaveSineFill,
} from "react-icons/pi";

const API_URL = "http://localhost:3000";

function NewProject() {
    const [showDrawer, setShowDrawer] = useState(false);

    const generateRandomProjectId = () => {
        const randomLetters = Array.from({ length: 6 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
        ).join(''); // 6 chữ cái in hoa ngẫu nhiên

        const randomNumbers = String(Math.floor(100000 + Math.random() * 900000)); // 6 số ngẫu nhiên

        return `ENTIZ-${randomLetters}-${randomNumbers}`;
    };

    useEffect(() => {
        setProject((prev) => ({ ...prev, projectId: generateRandomProjectId() }));
    }, []);

    const handleChange = (key: string, value: string) => {
        setProject({ ...project, [key]: value });
    };

    const [project, setProject] = useState({
        projectId: generateRandomProjectId(),
        projectTitle: '',
        projectManager: '',
        projectStartDate: '',
        projectEndDate: '',
        projectLocation: '',
        projectInfo: '',
        projectNumberOfEmployees: '',
        projectBudget: '',
        projectEstimate: '',
        projectAcceptance: '',
        projectPayment: '',
        projectProgress: '',
        projectStatus: 'Ongoing', // Giá trị mặc định
    });

    const handleSubmit = async () => {
        if (!project.projectTitle.trim()) {
        alert('Vui lòng nhập tên dự án!');
        return;
        }
        if (!project.projectManager.trim()) {
        alert('Vui lòng nhập tên người quản lý');
        return;
        }
        if (!project.projectStartDate.trim()) {
        alert('Vui lòng nhập ngày bắt đầu dự án');
        return;
        }
        if (!project.projectEndDate.trim()) {
        alert('Vui lòng nhập ngày kết thúc dự án');
        return;
        }

        try {
        await axios.post(`${API_URL}/projects`, project);
        alert('Dự án đã được thêm!');
        setProject({
            projectId: generateRandomProjectId(),
            projectTitle: '',
            projectManager: '',
            projectStartDate: '',
            projectEndDate: '',
            projectLocation: '',
            projectInfo: '',
            projectNumberOfEmployees: '',
            projectBudget: '',
            projectEstimate: '',
            projectAcceptance: '',
            projectPayment: '',
            projectProgress: '',
            projectStatus: 'Ongoing',
        });
        } catch (error) {
        alert('Không thể thêm dự án');
        }
    };

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
        <div className="flex flex-col absolute w-full h-screen pt-[50px] gap-5 items-center justify-center snap-y overflow-y-auto">
            <p className="font-bold text-2xl">TẠO DỰ ÁN MỚI</p>
              <div className="w-[90%] h-[80%] max-w-[700px] max-h-[500px] bg-white/50 rounded-4xl flex flex-col py-2 gap-2 items-center snap-y overflow-y-auto">
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center pt-4 gap-4">
                    <PiBarcodeBold className="h-[100%] w-[5%] min-w-[24px]" />
                    <p className="w-full h-full bg-white rounded-2xl flex items-center pl-2">{project.projectId}</p>
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiClipboardBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="text" placeholder="Tên dự án" onChange={(event) => handleChange('projectTitle', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiUserCircleBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="text" placeholder="Chủ dự án" onChange={(event) => handleChange('projectManager', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCalendarBlankBold className="h-[100%] w-[5%] min-w-[24px]" />
                    <div className="flex flex-row w-full h-full gap-1 items-center">
                        <DatePicker
                            selected={project.projectStartDate ? new Date(project.projectStartDate) : null}
                            onChange={(date) => handleChange("projectStartDate", date?.toISOString().split("T")[0] || "")}
                            dateFormat="yy/MM/dd"
                            className="bg-white rounded-2xl px-2 py-1 w-full h-[50px]"
                            placeholderText="Chọn ngày bắt đầu"
                        />
                        <PiArrowFatRightFill className="h-[100%] w-[5%] min-w-[24px] text-green-500"/>
                        <DatePicker
                            selected={project.projectEndDate ? new Date(project.projectEndDate) : null}
                            onChange={(date) => handleChange("projectEndDate", date?.toISOString().split("T")[0] || "")}
                            dateFormat="yy/MM/dd"
                            className="bg-white rounded-2xl px-2 py-1 w-full h-[50px]"
                            placeholderText="Chọn ngày hoàn thành"
                        />
                    </div>
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiMapPinFill className="h-[100%] w-[5%] min-w-[24px] text-red-700"/>
                    <textarea placeholder="Địa chỉ dự án" onChange={(event) => handleChange('projectLocation', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2 resize-none" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[100px] items-center gap-4">
                    <PiBookBookmarkBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <textarea placeholder="Miêu tả dự án" onChange={(event) => handleChange('projectInfo', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2 resize-none" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiUsersThreeFill className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="number" min="0" placeholder="Số lượng nhân viên" onChange={(event) => handleChange('projectNumberOfEmployees', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="number" placeholder="Ngân sách (VND)" onChange={(event) => handleChange('projectBudget', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="number" placeholder="Dự toán (VND)" onChange={(event) => handleChange('projectEstimate', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="number" placeholder="Thu (VND)" onChange={(event) => handleChange('projectAcceptance', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="number" placeholder="Chi (VND)" onChange={(event) => handleChange('projectPayment', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="relative flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiDiscBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="number" min={0} max={100} placeholder="Tiến độ (0-100%)" onChange={(event) => handleChange('projectProgress', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiWaveSineFill className="h-[100%] w-[5%] min-w-[24px]"/>
                    <form>
                        <select onChange={(event) => handleChange('projectStatus', event.target.value) } className="w-full h-full bg-white text-gray-900 rounded-2xl focus:ring-red-700 focus:border-red-700 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-700 dark:focus:border-red-700">
                            <option value="" disabled>Trạng thái hiện tại</option>
                            <option value="Ongoing">Đang tiến hành</option>
                            <option value="Slowed">Chậm tiến độ</option>
                            <option value="Deadline">Sắp tới hạn</option>
                            <option value="Delayed">Bị trì hoãn</option>
                            <option value="Completed">Đã hoàn thành</option>
                        </select>
                    </form>
                </div>
            </div>
            <button onClick={handleSubmit} className="w-[90%] h-[50px] max-w-[700px] bg-linear-to-r from-[#BE1E2D] to-[#F7941D] text-white font-black rounded-2xl mb-2 hover:opacity-80 active:opacity-50">
                SUBMIT
            </button>
        </div>
    </div>
  );
}

export default NewProject;
