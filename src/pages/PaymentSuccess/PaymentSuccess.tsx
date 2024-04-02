import Button from "@/components/Button/Button";
import { routes } from "@/routes/routes";
import paymentApiService from "@/services/API/PaymentApiService";
import { Box, CircularProgress, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./PaymentSuccess.module.scss";

const cx = classNames.bind(styles);

function PaymentSuccess() {
  const [course, setCourse] = useState<any>({});
  const [loading, setLoading] = useState(true);

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

  // số tiền gửi qua bên vnpay *100 nên phải chia lại
  useLayoutEffect(() => {
    const jsonCourse: any = localStorage.getItem("course");
    const jsonPromotion: any = localStorage.getItem("promotion");
    setCourse(JSON.parse(jsonCourse));
    paymentApiService
      .createPayment(
        Number(JSON.parse(jsonCourse).id),
        Number(vnp_Amount) / 100,
        jsonPromotion ? Number(JSON.parse(jsonPromotion).id) : 0
      )
      .then((data: any) => {
        setLoading(false);
        toast.success(
          `Thanh toán thành công.Hệ thống sẽ chuyển đến trang chủ sau 5s nữa!`
        );

        setTimeout(() => {
          navigate(routes.Home);
        }, 5000);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={cx("body")}>
      <div className={cx("content")}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <div className={cx("header")}>
              <h2>
                Bạn đã thanh toán thành công khóa học:
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="red"
                  gutterBottom
                >
                  {course.name}
                </Typography>
              </h2>
            </div>

            <Button
              content="Quay về trang chủ"
              primary
              fullWidth
              to={routes.Home}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
