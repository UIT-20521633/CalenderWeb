import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month); //tránh trường hợp month là số thập phân
  const year = dayjs().year(); //năm hiện tại
  //lấy ngày đầu tiên của tháng đó thuốc thứ mấy trong tuần (0-6) của tháng
  //.day() trả về 0 nếu là chủ nhật, 1 nếu là thứ 2, 2 nếu là thứ 3, ..., 6 nếu là thứ 7
  //Mục đích: là để refill ngày của tháng trước đó
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth; //số ngày của tháng trước đó cần refill để đủ 1 tuần đâu tiên của tháng
  const daysMatrix = new Array(5).fill([]).map(() => {
    //số hàng
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}
