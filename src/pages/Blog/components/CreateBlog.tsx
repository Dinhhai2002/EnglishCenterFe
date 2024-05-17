import utils from "@/utils/Utils";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import DialogCreatePost from "./DialogCreatePost";

export const config = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "blockQuote",
    "link",
    "numberedList",
    "bulletedList",
    "imageUpload",
    "insertTable",
    "tableColumn",
    "tableRow",
    "mergeTableCells",
    // "mediaEmbed",
    "|",
    "undo",
    "redo",
  ],
};

function CreateBlog() {
  const [open, setOpen] = useState(false);
  const { isCurrentUser } = utils.getCurrentUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (id: number) => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ marginY: 4, color: "black" }}>
        <strong> Danh sách Blog</strong>
      </Typography>
      {isCurrentUser && (
        <Button variant="contained" onClick={handleClickOpen}>
          Tạo Blog
        </Button>
      )}

      <DialogCreatePost open={open} handleClose={handleClose} />
    </Box>
  );
}

export default CreateBlog;
