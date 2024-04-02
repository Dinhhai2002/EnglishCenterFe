import formatTimeUtils from "@/utils/FormatTimeUtils";
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

function getProducts(point: string, dateTarget: string, timeExam: number) {
  return [
    {
      id: 1,
      name: "Ngày dự thi : ",
      value: dateTarget,
    },
    {
      id: 2,
      name: "Tới kỳ thi : ",
      value: timeExam + 1 > 0 ? timeExam + 1 : 0,
    },
    {
      id: 3,
      name: "Điểm mục tiêu : ",
      value: point,
    },
  ];
}
interface TargetPaperProps {
  target: any;
  isTarget: boolean;
  urlAvatar: string;
  username: string;
}

function TargetPaper({
  target,
  urlAvatar,
  username,
  isTarget,
}: TargetPaperProps) {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    setProducts(
      getProducts(
        target.point_target,
        target.time_exam,
        formatTimeUtils.calculateDateTarget(target.time_exam)
      )
    );
  }, [target]);

  return (
    <Paper sx={{ marginTop: 2, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginY: 2,
        }}
      >
        <Avatar sx={{ marginY: 1 }} alt="Remy Sharp" src={urlAvatar} />
        <Typography variant="body1">
          <strong>{username}</strong>
        </Typography>
      </Box>
      <Divider></Divider>
      {isTarget ? (
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
                {product.value}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ paddingY: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="body1">
            <strong>Chưa tạo mục tiêu</strong>
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default TargetPaper;
