import CloseDialog from "@/components/CloseDialog/CloseDialog";
import promotionApiService from "@/services/API/PromotionApiService";
import { Promotion } from "@/types/Promotion";
import { PromotionTypeEnum } from "@/utils/enum/PromotionTypeEnum";
import { StatusEnum } from "@/utils/enum/StatusEnum";
import utils from "@/utils/Utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface DialogRatingProps {
  //   post: Post;
  open: boolean;
  handleClose: any;
  handleApplyPromotion: any;
}

function DialogPromotion(props: DialogRatingProps) {
  const { open, handleClose, handleApplyPromotion } = props;
  const [value, setValue] = useState<any>(0);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const { currentUser, isCurrentUser } = utils.getCurrentUser();

  useEffect(() => {
    promotionApiService
      .getAll("", StatusEnum.ON)
      .then((data) => {
        setPromotions(data.data.list);
      })
      .catch((error: any) => {});
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const checkPointPromotion = (pointPromotion: number, valueSelected: number) =>
    pointPromotion - valueSelected;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmitPromotion = async () => {
    const point = checkPointPromotion(
      currentUser.point_promotion,
      Number(value)
    );

    if (point < 0) {
      toast.error(
        `Điểm tích lũy của bạn không đủ để áp dụng mã khuyến mãi này!`
      );
      return;
    }

    const promotionSelected = promotions.filter(
      (promotion) => Number(value) === promotion.point
    );
    handleApplyPromotion(promotionSelected[0]);
    handleClose();
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle sx={{ marginRight: 4 }} variant="h5" id="alert-dialog-title">
        {"Quy đổi điểm tích lũy"}
      </DialogTitle>
      <CloseDialog handleCloseDialog={handleClose} />
      <FormControl sx={{ padding: 2 }}>
        {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {promotions.length > 0 &&
            promotions.map((promotion: Promotion) => (
              <FormControlLabel
                key={promotion.id}
                value={promotion.point}
                control={<Radio />}
                label={
                  promotion.promotion_type === PromotionTypeEnum.PERCENT
                    ? `Giảm giá ${promotion.promotion_value}% = ${promotion.point} điểm`
                    : `Giảm giá ${utils.formatMoney(
                        promotion.promotion_value
                      )} đ = ${promotion.point} điểm`
                }
              />
            ))}
        </RadioGroup>
      </FormControl>
      <Typography sx={{ marginX: 2 }} variant="h6">
        Điểm tích lũy của người dùng : {currentUser.point_promotion}
      </Typography>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmitPromotion}>
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogPromotion;
