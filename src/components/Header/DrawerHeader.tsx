import { Box, Button, Divider, Drawer, MenuItem } from "@mui/material";

interface DrawerHeaderProps {
  open: boolean;
  toggleDrawer: any;
  scrollToSection: (key: string) => void;
}

function DrawerHeader({
  open,
  toggleDrawer,
  scrollToSection,
}: DrawerHeaderProps) {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          minWidth: "60dvw",
          p: 2,
          backgroundColor: "background.paper",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            flexGrow: 1,
          }}
        >
          {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
        </Box>
        <MenuItem onClick={() => scrollToSection("features")}>
          Features
        </MenuItem>
        <MenuItem onClick={() => scrollToSection("testimonials")}>
          Testimonials
        </MenuItem>
        <MenuItem onClick={() => scrollToSection("highlights")}>
          Highlights
        </MenuItem>
        <MenuItem onClick={() => scrollToSection("pricing")}>Pricing</MenuItem>
        <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem>
        <Divider />
        <MenuItem>
          <Button
            color="primary"
            variant="contained"
            component="a"
            href="/material-ui/getting-started/templates/sign-up/"
            target="_blank"
            sx={{ width: "100%" }}
          >
            Sign up
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            color="primary"
            variant="outlined"
            component="a"
            href="/material-ui/getting-started/templates/sign-in/"
            target="_blank"
            sx={{ width: "100%" }}
          >
            Sign in
          </Button>
        </MenuItem>
      </Box>
    </Drawer>
  );
}

export default DrawerHeader;
