import CloseDialog from "@/components/CloseDialog/CloseDialog";
import DropDownComponent from "@/components/DropDownComponent/DropDownComponent";
import courseApiService from "@/services/API/CourseApiService";
import noteApiService from "@/services/API/NoteApiService";
import { Dialog, DialogContent, DialogTitle, Grid, Zoom } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import ListNote from "./ListNote";

function DialogViewNote({ openViewNote, handleCloseDialogViewNote }: any) {
  const [listNote, setListNote] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [listCourse, setListCourse] = useState([]);
  const [course, setCourse] = useState<number>(-1);

  const fetchDataNote = (
    courseId: number,
    chapterId: number,
    keySearch: string,
    status: number,
    page: number,
    limit: number,
    isPagination: number
  ) => {
    noteApiService
      .getAll(courseId, chapterId, keySearch, status, page, limit, isPagination)
      .then((data: any) => {
        setListNote(data.data.list);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    fetchDataNote(-1, -1, "", 1, 0, 20, 0);
    courseApiService
      .getAll()
      .then((data) => {
        setListCourse(data.data);
      })
      .catch((error: any) => {});
  }, []);
  useEffect(() => {
    fetchDataNote(-1, -1, "", 1, 0, 20, 0);
  }, [isChange]);

  const handleStatusCourse = (e: ChangeEvent<HTMLInputElement>): void => {
    setCourse(Number(e.target.value));
  };

  useEffect(() => {
    fetchDataNote(course, -1, "", 1, 0, 20, 0);
  }, [course]);

  return (
    <Dialog
      open={openViewNote}
      onClose={handleCloseDialogViewNote}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
      maxWidth="md"
    >
      <DialogTitle id="responsive-dialog-title">Ghi chú bài học</DialogTitle>

      <DialogContent>
        <CloseDialog handleCloseDialog={handleCloseDialogViewNote} />

        <Grid
          sx={{ display: "flex", justifyContent: "end", width: 600, margin: 2 }}
        >
          <DropDownComponent
            arr={listCourse}
            label="Tên khóa học"
            value={course}
            handleStatusChange={handleStatusCourse}
            type={1}
          />
        </Grid>
        <ListNote
          listNote={listNote}
          isChange={isChange}
          setIsChange={setIsChange}
        />
      </DialogContent>
    </Dialog>
  );
}

export default DialogViewNote;
