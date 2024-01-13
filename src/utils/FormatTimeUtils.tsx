const { differenceInDays } = require("date-fns");

class FormatTimeUtils {
  public customTimerCompleteExam(minutes: number, seconds: number) {
    let StringMinutes: string = "";
    let StringSeconds: string = "";

    minutes < 10
      ? (StringMinutes = `0${minutes}`)
      : (StringMinutes = `${minutes}`);

    seconds < 10
      ? (StringSeconds = `0${seconds}`)
      : (StringSeconds = `${seconds}`);

    return `${StringMinutes}:${StringSeconds}`;
  }

  public calculateDateTarget(date: any) {
    const [day, month, year] = date ? date.split("/") : "";

    const inputDate: any = new Date(year, month - 1, day);

    const currentDate: any = new Date();
    const daysDiff: any = differenceInDays(inputDate, currentDate);

    return daysDiff;
  }

  public createDateFromDMY(dateString: string) {
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Tháng trong JavaScript bắt đầu từ 0 (0 - Tháng 1, 1 - Tháng 2,...)
    const year = parseInt(parts[2], 10);

    // Tạo đối tượng Date từ các thành phần ngày, tháng và năm
    const date = new Date(year, month, day);

    return date;
  }
}
const formatTimeUtils = new FormatTimeUtils();
export default formatTimeUtils;
