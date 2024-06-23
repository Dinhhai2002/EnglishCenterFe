import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function DropDown({
  value,
  onChange,
  listValue,
  isValueAll = false,
  label,
  isFullWidth = true,
  isMargin = false,
  id = 1,
}: any) {
  return (
    <FormControl
      sx={isMargin && { marginTop: 2, marginBottom: 2 }}
      fullWidth={isFullWidth}
      id={id}
    >
      <InputLabel required id="demo-simple-select-label">
        {label}
      </InputLabel>

      <Select
        defaultValue={value}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
      >
        {isValueAll && <MenuItem value={-1}>Tất cả</MenuItem>}
        {listValue.map((item: any, index: any) => (
          <MenuItem key={index} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDown;
