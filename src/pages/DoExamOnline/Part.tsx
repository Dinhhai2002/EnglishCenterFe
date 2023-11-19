import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import classNames from "classnames/bind";
import styles from "./DoExamOnline.module.scss";

const cx = classNames.bind(styles);
function Part({ listQuestion, selectedAnswers, handleRadioChange, type }: any) {
  return (
    <>
      {listQuestion.map(
        (item: any, index: any) =>
          item.exam_detail_id === type && (
            <div key={index} className={cx("item-answer", "part-one")}>
              {/* mỗi type tương ứng với mỗi part */}
              {(type === 3 || type === 4) && item.url_image && (
                <h2 style={{ color: "#35509a" }}>
                  Theo dõi câu hỏi từ {index + 1} đến {index + 3} và trả lời câu
                  hỏi
                </h2>
              )}
              {(type === 1 || type === 3 || type === 4) && item.url_image && (
                <img src={item.url_image} alt="" />
              )}
              {type === 6 && (
                <h2 style={{ color: "#35509a" }}>
                  {item.paragraph !== "" &&
                    `Theo dõi đoạn văn dưới và điền đáp án phù hợp từ câu ${
                      index + 1
                    } đến ${index + 4} vào chỗ trống!`}
                </h2>
              )}
              {(type === 6 || type === 7) && <span>{item.paragraph}</span>}
              <FormControl>
                <FormLabel id="1">
                  {index + 1}.{type !== 2 && item.content}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  value={selectedAnswers[index] || ""}
                  onChange={(event) => handleRadioChange(index, event)}
                  name={`answer${index + 1}`}
                >
                  <FormControlLabel
                    value="A"
                    control={<Radio />}
                    label={
                      type === 1 || type === 2 ? `A.` : `A.${item.answer_a}`
                    }
                  />
                  <FormControlLabel
                    value="B"
                    control={<Radio />}
                    label={
                      type === 1 || type === 2 ? `B.` : `B.${item.answer_b}`
                    }
                  />
                  <FormControlLabel
                    value="C"
                    control={<Radio />}
                    label={
                      type === 1 || type === 2 ? `C.` : `C.${item.answer_c}`
                    }
                  />
                  {type !== 2 && (
                    <FormControlLabel
                      value="D"
                      control={<Radio />}
                      label={type === 1 ? `D.` : `D.${item.answer_d}`}
                      className={cx("text")}
                    />
                  )}
                </RadioGroup>
              </FormControl>
            </div>
          )
      )}
    </>
  );
}

export default Part;
