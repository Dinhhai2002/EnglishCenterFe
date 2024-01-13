import FormatTimeUtils from "@/utils/FormatTimeUtils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

function DateComponent({ setCurrentDate, dateTarget }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Ngày dự thi"
          // value={dateTarget}
          onChange={(newValue: any) => setCurrentDate(newValue)}
          views={["year", "month", "day"]}
          defaultValue={
            dateTarget
              ? dayjs(new Date(FormatTimeUtils.createDateFromDMY(dateTarget)))
              : dayjs(new Date())
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateComponent;
