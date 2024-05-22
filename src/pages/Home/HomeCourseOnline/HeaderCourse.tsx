import DropDown from "@/components/DropDown/DropDown";
import { LoadingButton } from "@mui/lab";
import { Grid, SelectChangeEvent, TextField } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./HomeCourseOnline.module.scss";
const cx = classNames.bind(styles);

interface HeaderCourseProps {
  position: string;
  title: string;
  isSearch: boolean;
  setKeySearch: (value: string) => void;
  loading: boolean;
  handleSubmit: () => void;
  listCategoryCourse: any[];
  categoryCourseId: string;
  setCategoryCourseId: (value: string) => void;
}
function HeaderCourse({
  position,
  title,
  isSearch,
  setKeySearch,
  loading,
  handleSubmit,
  listCategoryCourse,
  categoryCourseId,
  setCategoryCourseId,
}: HeaderCourseProps) {
  const handleChangeCategoryCourse = (event: SelectChangeEvent) => {
    setCategoryCourseId(event.target.value as string);
  };
  return (
    <div className={cx("header")}>
      <h2 className={cx({ position })}>{title}</h2>
      {isSearch && (
        <Grid
          sx={{
            marginTop: 4,
            display: "flex",
          }}
          container
          item
          xs={12}
        >
          <Grid item xs={6}>
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
              value={categoryCourseId}
              onChange={handleChangeCategoryCourse}
              listValue={listCategoryCourse}
              isValueAll={true}
              label="Danh mục khóa học"
            />
          </Grid>
          <Grid
            sx={{ marginLeft: 2, display: "flex", alignItems: "center" }}
            item
            xs={2}
          >
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleSubmit}
            >
              Tìm kiếm
            </LoadingButton>
          </Grid>
        </Grid>
      )}

      {/* {isSearch && (
        <Grid
          sx={{
            marginTop: 4,
            display: "flex",
          }}
          item
        >
          <TextField
            sx={{ width: "80%", marginRight: 4 }}
            fullWidth
            label="Nhập từ khóa để tìm kiếm"
            id="fullWidth"
            name="keySearch"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setKeySearch(event.target.value);
            }}
          />
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleSubmit}
          >
            Tìm kiếm
          </LoadingButton>
        </Grid>
      )} */}
    </div>
  );
}

export default HeaderCourse;
