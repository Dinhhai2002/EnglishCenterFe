import DropDown from "@/components/DropDown/DropDown";
import authenticationApiService from "@/services/API/AuthenticationApiService";
import paymentApiService from "@/services/API/PaymentApiService";
import { listPaymentMethods } from "@/utils/ListValueDropDown";
import { FunctionIsDevelopment } from "@/utils/MessageToast";
import { LoadingButton } from "@mui/lab";
import { Box, Card, CircularProgress, SelectChangeEvent } from "@mui/material";
import classNames from "classnames/bind";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Payment.module.scss";
import TableCourse from "./TableCourse";

const cx = classNames.bind(styles);

function Payment() {
  const [course, setCourse] = useState<any>({});
  const [type, setType] = useState("0");
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const { id } = useParams();

  const price_discount =
    course.price - (course.price * course.discount_percent) / 100;
  useLayoutEffect(() => {
    authenticationApiService
      .getDetailCourse(Number(id))
      .then((data: any) => {
        setCourse(data.data);
        localStorage.setItem("course", JSON.stringify(data.data));
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, []);

  const handleSubmitPayment = () => {
    setLoadingButton(true);
    if (Number(type) === 1) {
      toast.success(`${FunctionIsDevelopment}`);
      setLoadingButton(false);
      return;
    }

    paymentApiService
      .getUrlPayment(course.id, price_discount)
      .then((data: any) => {
        window.location.href = data.data;
        setLoadingButton(false);
      })
      .catch((error: any) => {
        setLoadingButton(false);
      });
  };

  const handleChangePaymentMethod = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

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
              <h2>Thanh toán</h2>
              <h3>
                Quý khách vui lòng chọn dịch vụ thanh toán theo khóa học dưới
                đây
              </h3>
            </div>

            <div className={cx("info")}>
              <h3>Thông tin chi tiết khóa học</h3>
            </div>

            <Card sx={{ marginBottom: 2 }}>
              <TableCourse course={course} />
            </Card>
            <div className={cx("payment")}>
              <h3>Vui lòng chọn phương thức thanh toán online</h3>

              <DropDown
                isMargin={true}
                value={type}
                onChange={handleChangePaymentMethod}
                listValue={listPaymentMethods}
                label="Hình thức học"
              />
            </div>
            <LoadingButton
              onClick={handleSubmitPayment}
              variant="contained"
              loading={loadingButton}
            >
              Thanh toán
            </LoadingButton>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;
