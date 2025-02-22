import "../index.css";
import Drawer from "./Drawer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function EditProject() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [originalProject, setOriginalProject] = useState(null);
    const [project, setProject] = useState({
        projectId: '',
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
        projectStatus: '',
    });
    const { project_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`${API_URL}/projects/${project_id}`);
                console.log("Dữ liệu API:", response.data); // Debug dữ liệu từ API
                setProject(response.data);
                setOriginalProject(response.data); // Lưu dữ liệu gốc để có thể khôi phục
            } catch (error) {
                console.error('Không thể tải dữ liệu dự án:', error);
            }
        };
        if (project_id) {
            fetchProject();
        }
    }, [project_id]);

    const handleChange = (key: string, value: string) => {
        setProject({ ...project, [key]: value });
    };

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

        // Chuyển đổi ngày thành định dạng YYYY-MM-DD
        const formattedProject = {
            ...project,
            projectStartDate: project.projectStartDate.split("T")[0],
            projectEndDate: project.projectEndDate.split("T")[0],
        };

        try {
            await axios.put(`${API_URL}/projects/${formattedProject.projectId}`, formattedProject);
            alert('Dự án đã được cập nhật!');
            navigate('/project');
        } catch (error) {
            console.error("Lỗi khi cập nhật dự án:", error);
            alert('Không thể cập nhật dự án');
        }
    };

    const handleCancel = () => {
        if (originalProject) {
            setProject(originalProject); // Khôi phục dữ liệu ban đầu
        }
    };

    const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) return;

    try {
        await axios.delete(`${API_URL}/projects/${project.projectId}`);
        alert("Dự án đã được xóa thành công!");
        navigate('/project'); // Chuyển hướng về trang danh sách dự án
    } catch (error) {
        console.error("Lỗi khi xóa dự án:", error);
        alert("Không thể xóa dự án.");
    }
};

  return (
    <div className="w-screen h-screen bg-[url(/assets/images/background.png)] bg-cover bg-center bg-no-repeat flex justify-center items-center overflow-hidden">
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
            <p className="font-bold text-2xl">CHỈNH SỬA DỰ ÁN</p>
              <div className="w-[90%] h-[80%] max-w-[700px] max-h-[500px] bg-white/50 rounded-4xl flex flex-col py-2 gap-2 items-center snap-y overflow-y-auto">
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center pt-4 gap-4">
                    <PiBarcodeBold className="h-[100%] w-[5%] min-w-[24px]" />
                    <p className="w-full h-full bg-white rounded-2xl flex items-center pl-2">{project.projectId || ""}</p>
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiClipboardBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="text" value={project.projectTitle} placeholder="Tên dự án" onChange={(event) => handleChange('projectTitle', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiUserCircleBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input type="text" value={project.projectManager} placeholder="Chủ dự án" onChange={(event) => handleChange('projectManager', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
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
                            selected={project.projectStartDate ? new Date(project.projectStartDate) : null}
                            onChange={(date) => handleChange("projectStartDate", date ? date.toISOString().slice(0, 10) : "")}
                            dateFormat="yyyy-MM-dd"
                            className="bg-white rounded-2xl px-2 py-1 w-full h-[50px]"
                            placeholderText="Chọn ngày bắt đầu"
                        />
                    </div>
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiMapPinFill className="h-[100%] w-[5%] min-w-[24px] text-red-700"/>
                    <textarea value={project.projectLocation} placeholder="Địa chỉ dự án" onChange={(event) => handleChange('projectLocation', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2 resize-none" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[100px] items-center gap-4">
                    <PiBookBookmarkBold className="h-[100%] w-[5%] min-w-[24px]"/>
                      <textarea value={project.projectInfo} placeholder="Miêu tả dự án" onChange={(event) => handleChange('projectInfo', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2 resize-none" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiUsersThreeFill className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input value={project.projectNumberOfEmployees} type="number" min="0" placeholder="Số lượng nhân viên" onChange={(event) => handleChange('projectNumberOfEmployees', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input value={project.projectBudget} type="number" placeholder="Ngân sách (VND)" onChange={(event) => handleChange('projectBudget', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input value={project.projectEstimate} type="number" placeholder="Dự toán (VND)" onChange={(event) => handleChange('projectEstimate', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input value={project.projectAcceptance} type="number" placeholder="Thu (VND)" onChange={(event) => handleChange('projectAcceptance', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiCurrencyCircleDollarBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input value={project.projectPayment} type="number" placeholder="Chi (VND)" onChange={(event) => handleChange('projectPayment', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
                </div>
                <div className="relative flex flex-row w-[90%] h-[10%] min-h-[50px] items-center gap-4">
                    <PiDiscBold className="h-[100%] w-[5%] min-w-[24px]"/>
                    <input value={project.projectProgress} type="number" min={0} max={100} placeholder="Tiến độ (0-100%)" onChange={(event) => handleChange('projectProgress', event.target.value)} className="w-full h-full bg-white rounded-2xl pl-2" />
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
            <div className="flex gap-4 w-[90%] max-w-[700px]">
                <button
                    onClick={() => {
                        handleCancel();
                        navigate('/project');
                    }}
                    className="w-[40%] h-[50px] bg-gradient-to-r from-[#F7941D] to-[#BE1E2D] text-white font-black rounded-2xl hover:opacity-80 active:opacity-50">
                    CANCEL
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-[40%] h-[50px] bg-gradient-to-r from-[#BE1E2D] to-[#F7941D] text-white font-black rounded-2xl hover:opacity-80 active:opacity-50">
                    SUBMIT
                </button>
                  <button
                    onClick={() => {
                        handleDelete();
                    }}
                    className="w-[20%] h-[50px] bg-[#BE1E2D] text-white font-black rounded-2xl hover:opacity-80 active:opacity-50">
                    DELETE
                </button>
            </div>
        </div>
    </div>
  );
}

export default EditProject;
