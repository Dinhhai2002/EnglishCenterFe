import Image from "@/components/Image/Image";
import resultDetailApiService from "@/services/API/ResultDetailApiService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
function DialogDetailAnswer({
  openDialogMapDetail,
  id,
  handleCloseDetail,
}: any) {
  const [resultDetail, setResultDetail] = useState<any>({});
  useEffect(() => {
    resultDetailApiService
      .findOne(id)
      .then((data: any) => {
        setResultDetail(data.data);
      })
      .catch((error: any) => {});
  }, [id, openDialogMapDetail]);

  return (
    <Dialog
      open={openDialogMapDetail[id] || false}
      onClose={() => {
        handleCloseDetail(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle id="responsive-dialog-title">
        Đáp án chi tiết #{resultDetail.sort}
      </DialogTitle>
      <DialogTitle id="responsive-dialog-title">
        {`${resultDetail.sort}. ${resultDetail.content}`}
      </DialogTitle>
      {resultDetail.exam_detail_id === 1 && (
        <Image src={resultDetail.url_image} />
      )}
      {resultDetail.exam_detail_id === 6 && (
        <Typography sx={{ marginLeft: 1 }} variant="body1">
          {resultDetail.paragraph}
        </Typography>
      )}
      <DialogContent>
        <FormControl>
          <FormLabel id="1">
            {/* {index + 1}.{type !== 2 && item.content} */}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            value={resultDetail.answer_user_choose || ""}
            name={`answer${resultDetail.sort}`}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={`A.${resultDetail.answer_a}`}
              disabled={true}
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={`B.${resultDetail.answer_b}`}
              disabled={true}
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={`C.${resultDetail.answer_c}`}
              disabled={true}
            />
            {resultDetail.exam_detail_id !== 2 && (
              <FormControlLabel
                value="D"
                control={<Radio />}
                label={`D.${resultDetail.answer_d}`}
                disabled={true}
              />
            )}
          </RadioGroup>
        </FormControl>
        <Typography sx={{ marginLeft: 1 }} variant="h6">
          Đáp án đúng : {resultDetail.answer_correct}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleCloseDetail(id);
          }}
          variant="outlined"
        >
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDetailAnswer;
