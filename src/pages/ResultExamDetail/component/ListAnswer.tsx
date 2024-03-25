import { Grid, Typography } from "@mui/material";
import ItemAnswer from "./ItemAnswer";

function ListAnswer({
  handleClickOpenDetail,
  handleCloseDetail,
  openDialogMapDetail,
  result,
}: any) {
  return (
    <>
      <Typography sx={{ marginTop: 2 }} variant="h6">
        <strong> KẾT QUẢ CHI TIẾT</strong>
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {result.list_result_detail
            .slice(0, Math.ceil(result.list_result_detail.length / 2))
            .map((item: any) => (
              <ItemAnswer
                key={item.id}
                handleClickOpenDetail={handleClickOpenDetail}
                handleCloseDetail={handleCloseDetail}
                openDialogMapDetail={openDialogMapDetail}
                item={item}
              />
            ))}
        </Grid>
        <Grid item xs={6}>
          {result.list_result_detail
            .slice(Math.ceil(result.list_result_detail.length / 2))
            .map((item: any) => (
              <ItemAnswer
                key={item.id}
                handleClickOpenDetail={handleClickOpenDetail}
                handleCloseDetail={handleCloseDetail}
                openDialogMapDetail={openDialogMapDetail}
                item={item}
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default ListAnswer;
