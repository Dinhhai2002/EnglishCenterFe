import { listTabPart } from "@/utils/LabelUtils";
import { TabPanel } from "@mui/lab";
import { Box, Button } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./DoExamOnline.module.scss";
import Part from "./Part";

const cx = classNames.bind(styles);
function ViewQuestion({
  listQuestion,
  selectedAnswers,
  handleRadioChange,
  handleButtonClickNext,
}: any) {
  return (
    <Box>
      {listTabPart.map((item: any, index: any) => (
        <TabPanel key={item.value} value={item.value}>
          <div className={cx("list-answer")}>
            <Part
              listQuestion={listQuestion}
              selectedAnswers={selectedAnswers}
              handleRadioChange={handleRadioChange}
              type={Number(item.value)}
            />
          </div>
          <div className={cx("btn")}>
            <Button variant="contained" onClick={handleButtonClickNext}>
              Tiếp theo
            </Button>
          </div>
        </TabPanel>
      ))}
    </Box>
  );
}

export default ViewQuestion;
