import utils from "@/utils/Utils";
import { Divider, List, ListItem, ListItemText, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

interface CalculateAmountCourseProps {
  products: any[];
  totalAmount: number;
}

function CalculateAmountCourse({
  products,
  totalAmount,
}: CalculateAmountCourseProps) {
  console.log(products);

  return (
    <Paper sx={{ marginTop: 2, borderRadius: 2 }}>
      <List
        disablePadding
        sx={{
          bgcolor: "background.paper",
          paddingX: 1,
        }}
      >
        {products.map((product: any) => (
          <ListItem
            key={product.id}
            sx={{
              py: 1,
              px: 0,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <ListItemText sx={{ mr: 2 }} primary={product.name} />
            <Typography variant="body1" fontWeight="medium" sx={{ mr: 2 }}>
              {utils.formatMoney(product.price)} đ
            </Typography>
          </ListItem>
        ))}
        <Divider></Divider>
        <ListItem
          sx={{
            py: 1,
            px: 0,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <ListItemText
            sx={{
              mr: 2,
              color: "#131B20",
              fontWeight: 700,
            }}
            primary={"Tổng tiền"}
          />
          <Typography variant="body1" sx={{ mr: 2 }}>
            <strong>{utils.formatMoney(totalAmount)} đ</strong>
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
}

export default CalculateAmountCourse;
