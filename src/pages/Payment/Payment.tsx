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
import Checkout from "./components/Checkout";
import styles from "./Payment.module.scss";
import TableCourse from "./TableCourse";

const cx = classNames.bind(styles);

function Payment() {
  const [course, setCourse] = useState<any>({});

  const { id } = useParams();

  useLayoutEffect(() => {
    authenticationApiService
      .getDetailCourse(Number(id))
      .then((data: any) => {
        setCourse(data.data);
        localStorage.setItem("course", JSON.stringify(data.data));
      })
      .catch((error: any) => {});
  }, []);

  // const handleSubmitPayment = () => {
  //   setLoadingButton(true);
  //   if (Number(type) === 1) {
  //     toast.success(`${FunctionIsDevelopment}`);
  //     setLoadingButton(false);
  //     return;
  //   }

  //   paymentApiService
  //     .getUrlPayment(course.id, price_discount)
  //     .then((data: any) => {
  //       window.location.href = data.data;
  //       setLoadingButton(false);
  //     })
  //     .catch((error: any) => {
  //       setLoadingButton(false);
  //     });
  // };

  // const handleChangePaymentMethod = (event: SelectChangeEvent) => {
  //   setType(event.target.value);
  // };

  return <Checkout />;
}

export default Payment;
