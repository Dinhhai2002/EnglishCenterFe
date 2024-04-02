import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box } from "@mui/material";

interface ButtonPaymentProps {
  handleClickOpen: any;
  handleSubmitPayment: any;
  loadingButton: boolean;
}

function ButtonPayment({
  handleClickOpen,
  handleSubmitPayment,
  loadingButton,
}: ButtonPaymentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        justifyContent: "space-between",
        alignItems: "end",
        marginTop: 3,
      }}
    >
      <Button
        variant="contained"
        sx={{
          width: {
            xs: "100%",
            sm: "fit-content",
            marginTop: 2,
            fontSize: 18,
          },
        }}
        onClick={handleClickOpen}
      >
        Áp dụng điểm khuyến mãi
      </Button>

      <LoadingButton
        variant="contained"
        endIcon={<ChevronRightRoundedIcon />}
        sx={{
          width: { xs: "100%", sm: "fit-content", fontSize: 18 },
        }}
        onClick={handleSubmitPayment}
        loading={loadingButton}
      >
        Thanh toán
      </LoadingButton>
    </Box>
  );
}

export default ButtonPayment;
