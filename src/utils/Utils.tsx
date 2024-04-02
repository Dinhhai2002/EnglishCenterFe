import { User } from "@/types/User";
import { useNavigate } from "react-router-dom";

class Utils {
  public getCurrentUser() {
    let isCurrentUser = false;
    let user: any = localStorage.getItem("user");
    let currentUser: User = JSON.parse(user);

    if (currentUser) {
      isCurrentUser = true;
    }

    return { currentUser, isCurrentUser };
  }

  public getTotalPage(totalRecord: number, limit: number) {
    if (totalRecord % limit !== 0) {
      return Math.floor(totalRecord / limit) + 1;
    } else {
      return Math.floor(totalRecord / limit);
    }
  }

  public getRole(id: number) {
    switch (id) {
      case 0:
        return "Người dùng";
      case 1:
        return "Học sinh";
      case 2:
        return "Giáo viên";
      case 3:
        return "Admin";
      default:
        return "Người dùng";
    }
  }
  public roundNumber(number: number, decimals: number): number {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  public formatMoney(amount: number) {
    if (amount > 0) return amount.toLocaleString("vi-VN");
    else return `${amount}`;
  }
}
const utils = new Utils();
export default utils;
