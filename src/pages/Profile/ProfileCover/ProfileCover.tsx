import {
  Avatar,
  Box,
  Button,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";

import {
  AvatarWrapper,
  ButtonUploadWrapper,
  CardCover,
  CardCoverAction,
} from "@/components/CustomMui/CustomMui";
import utils from "@/utils/Utils";
import DialogUser from "./DialogUser";

const Input = styled("input")({
  display: "none",
});

const ProfileCover = ({ user }: any) => {
  return (
    <>
      <Box display="flex" mb={3}>
        {/* <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip> */}
        {/* <Box>
          <Typography variant="h4" component="h4" gutterBottom>
            Trang cá nhân {user.user_name}
          </Typography>
          <Typography variant="subtitle2">{user.full_name}</Typography>
        </Box> */}
      </Box>
      <CardCover>
        <CardMedia image={user.avatar_url} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Thay đổi
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.user_name} src={user.avatar_url} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.user_name}
        </Typography>
        <Typography variant="subtitle2">
          Địa chỉ: {user.full_address}
        </Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {utils.getRole(Number(user.role))} | {user.email} | {user.phone}
        </Typography>
        <Box
          display={{ xs: "block", md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <DialogUser user={user} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCover;
