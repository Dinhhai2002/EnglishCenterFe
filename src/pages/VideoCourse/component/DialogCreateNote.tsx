import CloseDialog from "@/components/CloseDialog/CloseDialog";
import { Dialog, DialogContent, DialogTitle, Zoom } from "@mui/material";
import QuillComponent from "./QuillComponent";

function DialogCreateNote({
  lessonsId,
  chapterId,
  courseId,
  open,
  handleCloseDialog,
}: any) {
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle id="responsive-dialog-title">Ghi chú bài học</DialogTitle>

      <DialogContent>
        <CloseDialog handleCloseDialog={handleCloseDialog} />

        <QuillComponent
          lessonsId={lessonsId}
          chapterId={chapterId}
          courseId={courseId}
          handleClose={handleCloseDialog}
        />
      </DialogContent>
    </Dialog>
  );
}

export default DialogCreateNote;
