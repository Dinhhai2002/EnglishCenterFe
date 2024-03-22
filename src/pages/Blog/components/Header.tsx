import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { NavLink as RouterLink } from "react-router-dom";
import { routes } from "@/routes/routes";
import { useState } from "react";
import React from "react";

interface HeaderProps {
  sections?: ReadonlyArray<{
    id: number;
    name: string;
    url: string;
  }>;
  title: string;
  isCategory?: Boolean;
  handleClickCategoryBlog: Function;
}

export default function Header(props: HeaderProps) {
  const [categoryBlogId, setCategoryBlogId] = useState<number>();
  const { sections, title, isCategory = true, handleClickCategoryBlog } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button component={RouterLink} to={routes.Home} size="small">
          Trang chủ
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
      </Toolbar>
      {isCategory && (
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: "space-between", overflowX: "auto" }}
        >
          {sections?.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.id}
              variant="body2"
              href={section.url}
              underline={categoryBlogId == section.id ? "always" : "none"}
              sx={{
                p: 1,
                flexShrink: 0,
                cursor: "pointer",
                color: categoryBlogId == section.id ? "#35509a" : "inherit",
              }}
              onClick={() => {
                setCategoryBlogId(section.id);
                handleClickCategoryBlog(section.id);
              }}
            >
              {section.name}
            </Link>
          ))}
        </Toolbar>
      )}
    </React.Fragment>
  );
}
