import utils from "@/utils/Utils";
import { Typography } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  const { currentUser, isCurrentUser } = utils.getCurrentUser();
  return (
    <Grid container spacing={3}>
      <Typography variant="h4">
        <strong>Thông tin người mua khóa học</strong>
      </Typography>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="first-name" required>
          Tên người mua
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder={currentUser.user_name}
          autoComplete="first name"
          disabled
          required
        />
      </FormGrid>

      <FormGrid item xs={12}>
        <FormLabel htmlFor="phone" required>
          Số điện thoại
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          placeholder={currentUser.phone}
          autoComplete="shipping address-line1"
          disabled
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="gmail" required>
          Gmail
        </FormLabel>
        <OutlinedInput
          id="gmail"
          name="gmail"
          type="address2"
          placeholder={currentUser.email}
          autoComplete="shipping address-line2"
          required
          disabled
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Địa chỉ
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder={currentUser.full_address}
          autoComplete="shipping address-line1"
          required
          disabled
        />
      </FormGrid>
    </Grid>
  );
}
