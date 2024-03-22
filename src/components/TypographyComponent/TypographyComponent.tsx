import { Typography } from "@mui/material";

interface TypographyComponentProps {
  content: string;
  numberLine?: number;
}
function TypographyComponent(props: TypographyComponentProps) {
  const { content, numberLine = 2 } = props;
  return (
    <Typography
      sx={{
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: numberLine,
      }}
      gutterBottom
      variant="subtitle1"
    >
      <strong> {content}</strong>
    </Typography>
  );
}

export default TypographyComponent;
