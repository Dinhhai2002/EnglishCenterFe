import { Typography } from "@mui/material";

interface TypographyComponentProps {
  content: string;
  numberLine?: number;
  variant?: string;
  strong?: boolean;
  color?: string;
}
function TypographyComponent(props: TypographyComponentProps) {
  const {
    content,
    numberLine = 2,
    variant = "subtitle1",
    strong = true,
    color = "text.secondary",
  } = props;
  return (
    <Typography
      sx={{
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: numberLine,
      }}
      color={color}
      gutterBottom
      variant="subtitle1"
    >
      {strong ? <strong> {content}</strong> : content}
    </Typography>
  );
}

export default TypographyComponent;
