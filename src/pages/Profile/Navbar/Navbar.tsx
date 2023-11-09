import HomeCourseOnline from "@/pages/Home/HomeCourseOnline/HomeCourseOnline";
import ChangePassword from "@/pages/Profile/ChangePassword/ChangePassword";
import ProfileCover from "@/pages/Profile/ProfileCover/ProfileCover";
import PaymentUserHistory from "@/pages/Profile/TablePaymentUser/PaymentUserHistory";
import userApiService from "@/services/API/UserApiService";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ResultExamProfile from "../ResultExamProfile/ResultExamProfile";



function Navbar() {
  const [value, setValue] = useState("2");
  const [currentUser, setCurrentUser] = useState<any>({});

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    userApiService
      .getUser()
      .then((data: any) => {
        setCurrentUser(data.data);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <div style={{ width: "70%" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Khóa học của tôi" value="1" />
                <Tab label="Kết quả luyện thi" value="2" />
                <Tab label="Thanh toán gần đây" value="3" />
                <Tab label="Thông tin cá nhân" value="4" />
                {currentUser.is_google === 0 && (
                  <Tab label="Đổi mật khẩu" value="5" />
                )}
              </TabList>
            </Box>
            <TabPanel value="1">
              <HomeCourseOnline isPagination isUserCourse />
            </TabPanel>
            <TabPanel value="2">
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12}>
                  <ResultExamProfile />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <PaymentUserHistory />
            </TabPanel>
            <TabPanel value="4">
              <ProfileCover user={currentUser} />
            </TabPanel>
            {currentUser.is_google === 0 && (
              <TabPanel value="5">
                <ChangePassword />
              </TabPanel>
            )}
          </TabContext>
        </Box>
    </div>
  );
}
export default Navbar;
