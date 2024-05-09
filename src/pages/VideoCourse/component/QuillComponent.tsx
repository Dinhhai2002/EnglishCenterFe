import noteApiService from "@/services/API/NoteApiService";
import { Method } from "@/utils/enum/MethodEnum";
import { CreateSuccess } from "@/utils/MessageToast";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ color: ["red", "blue", "black", "green", "yellow", "pink"] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];
function QuillComponent({
  initialValue = "",
  method = Method.CREATE,
  handleCancelEdit,
  id = 0,
  lessonsId = 0,
  chapterId = 0,
  courseId = 0,
  handleClose,
  handleUpdateSuccess,
}: any) {
  const [value, setValue] = useState(initialValue);

  const handleSubmitNote = () => {
    switch (method) {
      case Method.CREATE:
        noteApiService
          .create(courseId, chapterId, lessonsId, value)
          .then((data: any) => {
            toast.success(CreateSuccess);
            handleClose();
          })
          .catch((error: any) => {});
        break;
      case Method.UPDATE:
        if (initialValue === value) {
          return;
        }
        noteApiService
          .update(id, courseId, chapterId, lessonsId, value)
          .then((data: any) => {
            handleUpdateSuccess();
          })
          .catch((error: any) => {});
        break;
    }
  };
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      item
      xs={12}
    >
      <ReactQuill
        value={value}
        onChange={setValue}
        theme="snow"
        modules={modules}
        formats={formats}
      ></ReactQuill>
      <Grid sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          sx={{ marginTop: 2 }}
          onClick={handleSubmitNote}
          variant="contained"
        >
          {method === Method.CREATE ? "Tạo" : "Sửa"} ghi chú
        </Button>
        {method === Method.UPDATE && (
          <Button
            sx={{ marginLeft: 2, marginTop: 2 }}
            onClick={handleCancelEdit}
            variant="contained"
          >
            Hủy bỏ
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default QuillComponent;
