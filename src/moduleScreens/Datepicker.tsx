import { useState } from "react";
import ToDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import locale tiếng Việt

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="relative">
      <ToDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yy/MM/dd" // Định dạng ngày
        className="border-2 border-gray-300 rounded-md px-2 py-1 w-full"
        placeholderText="Chọn ngày"
      />
    </div>
  );
};

export default DatePicker;
