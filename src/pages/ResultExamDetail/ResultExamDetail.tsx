import { Box, CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ResultExamDetail.module.scss";

import resultApiService from "@/services/API/ResultApiService";
import { FunctionIsDevelopment } from "@/utils/MessageToast";
import { toast } from "react-toastify";
import ResultDetail from "./component/ResultDetail";

const cx = classNames.bind(styles);

export function ResultExamDetail() {
  const [result, setResult] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [openDialogMapDetail, setOpenDialogMapDetail] = useState<any>({});
  const { resultId } = useParams();

  useEffect(() => {
    resultApiService
      .getDetail(resultId)
      .then((data: any) => {
        setResult(data.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpenDetail = (id: any) => {
    setOpenDialogMapDetail((prevState: any) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleCloseDetail = (id: any) => {
    setOpenDialogMapDetail((prevState: any) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleSubmitViewResult = () => {
    toast.success(`${FunctionIsDevelopment}`);
    return;
  };

  return (
    <div className={cx("body")}>
      <div className={cx("container")}>
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
            <ResultDetail
              handleClickOpenDetail={handleClickOpenDetail}
              handleCloseDetail={handleCloseDetail}
              openDialogMapDetail={openDialogMapDetail}
              result={result}
              handleSubmitViewResult={handleSubmitViewResult}
            />
          )}
        </div>
      </div>
    </div>
  );
}
