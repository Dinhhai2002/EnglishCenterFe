import { Divider } from "@mui/material";
import InforResult from "./InforResult";
import ListAnswer from "./ListAnswer";

function ResultDetail({
  handleClickOpenDetail,
  handleCloseDetail,
  openDialogMapDetail,
  result,
  handleSubmitViewResult,
}: any) {
  return (
    <>
      <InforResult
        handleSubmitViewResult={handleSubmitViewResult}
        result={result}
      />

      <Divider sx={{ marginTop: 2 }} />

      <ListAnswer
        handleClickOpenDetail={handleClickOpenDetail}
        handleCloseDetail={handleCloseDetail}
        openDialogMapDetail={openDialogMapDetail}
        result={result}
      />
    </>
  );
}

export default ResultDetail;
