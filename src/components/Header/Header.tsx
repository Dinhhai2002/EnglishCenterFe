import imageHeader from "@/assets/image/Header.png";
import { routes } from "@/routes/routes";
import MenuIcon from "@mui/icons-material/Menu";
import { PaletteMode } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, NavLink as RouterLink } from "react-router-dom";
import DrawerHeader from "./DrawerHeader";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

interface HeaderProps {
  mode: PaletteMode;
}

const listNavbar = [
  {
    content: "KHÓA HỌC CỦA TÔI",
    to: `${routes.Profile}`,
  },
  {
    content: "KHÓA HỌC ONLINE",
    to: `${routes.CourseOnline}`,
  },
  {
    content: "ĐỀ THI ONLINE",
    to: `${routes.Exam}`,
  },
  {
    content: "BLOG",
    to: `${routes.Blog}`,
  },
];

function Header({ mode }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  let isCurrentUser = false;
  let user: any = localStorage.getItem("user");
  let currentUser = JSON.parse(user);

  if (currentUser) {
    isCurrentUser = true;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    isCurrentUser = false;
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Link
                id="home"
                style={{ padding: 6 }}
                to={routes.Home}
                onClick={() => scrollToSection("home")}
              >
                <img
                  src={imageHeader}
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Link>

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {listNavbar.map((item: any) => (
                  <Button
                    key={item.content}
                    disableRipple
                    component={RouterLink}
                    to={
                      !isCurrentUser && item.to === routes.Profile
                        ? routes.Login
                        : item.to
                    }
                    sx={{ py: "6px", px: "12px", ml: 1 }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {item.content}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {isCurrentUser ? (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleLogout}
                  component={RouterLink}
                  to={routes.Home}
                >
                  Đăng xuất
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component={RouterLink}
                    to={routes.Login}
                  >
                    ĐĂNG NHẬP
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component={RouterLink}
                    to={routes.Register}
                  >
                    ĐĂNG KÝ
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <DrawerHeader
                open={open}
                toggleDrawer={toggleDrawer(false)}
                scrollToSection={scrollToSection}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
