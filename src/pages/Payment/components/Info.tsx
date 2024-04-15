import * as React from "react";

import paymentApiService from "@/services/API/PaymentApiService";
import { Course } from "@/types/Course";
import { Promotion } from "@/types/Promotion";
import { PromotionTypeEnum } from "@/utils/enum/PromotionTypeEnum";
import { useEffect, useState } from "react";
import ButtonPayment from "./ButtonPayment";
import CalculateAmountCourse from "./CalculateAmountCourse";
import CardCourse from "./CardCourse";
import DialogPromotion from "./DialogPromotion";

interface InfoProps {
  course: Course;
}

function getProducts(course: Course) {
  return [
    {
      id: 1,
      name: "Giá tiền",
      price: course.price,
    },
    {
      id: 2,
      name: "Giảm giá",
      price: course.price * (course.discount_percent / 100),
    },
    {
      id: 3,
      name: "Áp dụng voucher",
      price: 0,
    },
  ];
}

export default function Info({ course }: InfoProps) {
  const [products, setProducts] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calculateTotalAmount = (
    price: number,
    discountPercent: number,
    pricePromotion: number
  ) => {
    return price - (price * discountPercent) / 100 - pricePromotion;
  };

  useEffect(() => {
    localStorage.removeItem("promotion");
    setProducts(getProducts(course));
    setTotalAmount(
      calculateTotalAmount(course.price, course.discount_percent, 0)
    );
  }, [course]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitPayment = async () => {
    setLoadingButton(true);
    const data = await paymentApiService.getUrlPayment(course.id, totalAmount);
    window.location.href = data.data;
    setLoadingButton(false);
  };

  const handleApplyPromotion = (promotion: Promotion) => {
    let pricePromotion =
      PromotionTypeEnum.CASH === promotion.promotion_type
        ? promotion.promotion_value
        : (course.price * promotion.promotion_value) / 100;

    products[2].price = pricePromotion;
    setProducts(products);

    setTotalAmount(
      calculateTotalAmount(
        course.price,
        course.discount_percent,
        pricePromotion
      )
    );

    localStorage.setItem("promotion", JSON.stringify(promotion));
  };

  return (
    <React.Fragment>
      <CardCourse course={course} />
      <CalculateAmountCourse products={products} totalAmount={totalAmount} />
      <ButtonPayment
        handleClickOpen={handleClickOpen}
        handleSubmitPayment={handleSubmitPayment}
        loadingButton={loadingButton}
      />
      <DialogPromotion
        open={open}
        handleClose={handleClose}
        handleApplyPromotion={handleApplyPromotion}
      />
    </React.Fragment>
  );
}
