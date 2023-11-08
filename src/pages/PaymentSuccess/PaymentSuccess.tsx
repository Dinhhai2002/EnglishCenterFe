import Button from "@/components/Button/Button";
import { routes } from "@/routes/routes";
import paymentApiService from "@/services/API/PaymentApiService";
import classNames from "classnames/bind";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./PaymentSuccess.module.scss";

const cx = classNames.bind(styles);

function PaymentSuccess() {
  const [course, setCourse] = useState<any>({});
  const [count, setCount] = useState<number>(0);

  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  // Trích xuất các tham số từ URL
  const vnp_Amount = url.searchParams.get("vnp_Amount");
  // const vnp_BankCode = url.searchParams.get("vnp_BankCode");
  // const vnp_BankTranNo = url.searchParams.get("vnp_BankTranNo");
  // const vnp_CardType = url.searchParams.get("vnp_CardType");
  // const vnp_OrderInfo = url.searchParams.get("vnp_OrderInfo");
  // const vnp_PayDate = url.searchParams.get("vnp_PayDate");
  // const vnp_ResponseCode = url.searchParams.get("vnp_ResponseCode");
  // const vnp_TmnCode = url.searchParams.get("vnp_TmnCode");
  // const vnp_TransactionNo = url.searchParams.get("vnp_TransactionNo");
  // const vnp_TransactionStatus = url.searchParams.get("vnp_TransactionStatus");
  // const vnp_TxnRef = url.searchParams.get("vnp_TxnRef");
  // const vnp_SecureHash = url.searchParams.get("vnp_SecureHash");

  useLayoutEffect(() => {
    const jsonCourse: any = localStorage.getItem("course");
    setCourse(JSON.parse(jsonCourse));
    setCount(count + 1);
  }, []);

  //   số tiền gửi qua bên vnpay *100 nên phải chia lại
  if (count === 1) {
    paymentApiService
      .createPayment(Number(course.id), Number(vnp_Amount) / 100)
      .then((data: any) => {
        toast.success(
          `Thanh toán thành công.Hệ thống sẽ chuyển đến trang chủ sau 5s nữa!`
        );

        setTimeout(() => {
          navigate(routes.Home);
        }, 5000);
      })
      .catch((error: any) => {});
  }

  return (
    <div className={cx("body")}>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <h2>Thanh toán thành công</h2>
          {/* <h3>
              Quý khách vui lòng chọn dịch vụ thanh toán theo khóa học dưới đây
            </h3> */}
        </div>

        <Button
          content="Quay về trang chủ"
          primary
          fullWidth
          to={routes.Home}
        />
      </div>
    </div>
  );
}

export default PaymentSuccess;
