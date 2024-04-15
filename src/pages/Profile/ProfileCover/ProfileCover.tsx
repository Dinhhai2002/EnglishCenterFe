import { Avatar, Box, CardMedia, Typography } from "@mui/material";

import {
  AvatarWrapper,
  ButtonUploadWrapper,
  CardCover,
} from "@/components/CustomMui/CustomMui";
import utils from "@/utils/Utils";
import DialogUser from "./DialogUser";
import DialogAvatar from "./UploadAvatar";
import { useEffect, useLayoutEffect, useState } from "react";
import userApiService from "@/services/API/UserApiService";

const ProfileCover = () => {
  const [user, setUser] = useState<any>({});
  const [changeData, setChangeData] = useState<any>(true);

  const fetchUser = async () => {
    const dataUser = await userApiService.getUser();
    setUser(dataUser.data);
  };

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [changeData]);

  return (
    <>
      <Box display="flex" mb={3}></Box>
      <CardCover>
        <CardMedia image={user.avatar_url} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.user_name} src={user.avatar_url} />
        <ButtonUploadWrapper>
          <DialogAvatar changeData={changeData} setChangeData={setChangeData} />
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
            <DialogUser
              user={user}
              changeData={changeData}
              setChangeData={setChangeData}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCover;
