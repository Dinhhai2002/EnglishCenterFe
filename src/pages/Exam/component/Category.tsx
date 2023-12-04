import Button from "@/components/Button/Button";
import { Grid } from "@mui/material";

function Category({
  item,
  index,
  handleClickCategory,
  setActive,
  active,
}: any) {
  return (
    <Grid
      sx={index > 4 ? { marginTop: 0 } : undefined}
      item
      xs={index < 4 ? 2.5 : 2}
      key={index}
    >
      <Button
        onClick={() => {
          handleClickCategory(item.id);
          setActive(item.id);
        }}
        block
        content={item.name}
        transparent
        active={active === item.id}
      />
    </Grid>
  );
}

export default Category;
