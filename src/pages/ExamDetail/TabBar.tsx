import Comments from "@/components/Comments/NewComments";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Alert, Box, Button, Tab } from "@mui/material";
import DialogComponent from "./DialogComponent";

function TabBar({
  value,
  handleChangeTab,
  handleStartExam,
  open,
  handleClose,
  handleSubmitDoExam,
  onAddComment,
  exam,
}: any) {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab sx={{ fontSize: 16 }} label="Làm full Test" value="1" />
            <Tab sx={{ fontSize: 16 }} label="Thảo luận" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Alert sx={{ fontSize: 16, marginBottom: 5 }} severity="info">
            Sẵn sàng để bắt đầu làm full test? Để đạt được kết quả tốt nhất, bạn
            cần tập trung cao độ nhất.
          </Alert>
          <Button variant="contained" onClick={handleStartExam}>
            Bắt đầu thi
          </Button>
          <DialogComponent
            open={open}
            handleClose={handleClose}
            handleSubmit={handleSubmitDoExam}
          />
        </TabPanel>
        <TabPanel value="2">
          <Comments examId={exam.id} onAddComment={onAddComment} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabBar;
