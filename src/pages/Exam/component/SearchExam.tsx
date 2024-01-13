import Button from "@/components/Button/Button";
import DropDown from "@/components/DropDown/DropDown";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import Category from "./Category";
import CategorySkeleton from "./CategorySkeleton";

function SearchExam({
  handleClickCategory,
  setActive,
  active,
  loading,
  listCategoryExam,
  setKeySearch,
  topic,
  handleChangeTopic,
  listTopicExam,
  loadingButton,
  handleSubmit,
}: any) {
  return (
    <Grid container item xs={8}>
      <Grid item xs={2}>
        <Button
          onClick={() => {
            handleClickCategory(-1);
            setActive(undefined);
          }}
          block
          content={"Tất cả"}
          transparent
          active={active === undefined}
        />
      </Grid>
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))
        : listCategoryExam.map((item: any, index: number) => (
            <Category
              key={item.id}
              item={item}
              index={index}
              handleClickCategory={handleClickCategory}
              setActive={setActive}
              active={active}
            />
          ))}

      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Nhập từ khóa để tìm kiếm"
          id="fullWidth"
          name="keySearch"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setKeySearch(event.target.value);
          }}
        />
      </Grid>
      <Grid sx={{ marginLeft: 2 }} item xs={3}>
        <DropDown
          value={topic}
          onChange={handleChangeTopic}
          listValue={listTopicExam}
          isValueAll={true}
          label="Bộ đề thi"
        />
      </Grid>
      <Grid sx={{ marginTop: 4 }} item xs={3}>
        <LoadingButton
          variant="outlined"
          loading={loadingButton}
          onClick={handleSubmit}
        >
          Tìm kiếm
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default SearchExam;
