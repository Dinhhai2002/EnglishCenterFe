import noteApiService from "@/services/API/NoteApiService";
import { Method } from "@/utils/enum/MethodEnum";
import {
  CreateSuccess,
  DeleteSuccess,
  EditSuccess,
} from "@/utils/MessageToast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import DialogDeleteNote from "./DialogDeleteNote";
import QuillComponent from "./QuillComponent";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function ListNote({ listNote, isChange, setIsChange }: any) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");
  const [openMapEditNote, setOpenMapEditNote] = useState<any>({});
  const [openDialogMapDelete, setOpenDialogMapDelete] = useState<any>({});

  const handleClickOpenEdit = (id: any, content: any) => {
    setOpenMapEditNote((prevState: any) => ({
      ...prevState,
      [id]: true,
    }));
    setIsEdit(true);
    setValue(content);
  };

  const handleCancelEdit = (id: any) => {
    setOpenMapEditNote((prevState: any) => ({
      ...prevState,
      [id]: false,
    }));
    setIsEdit(false);
  };

  const handleClickOpenDelete = (id: any) => {
    setOpenDialogMapDelete((prevState: any) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleCloseDelete = (id: any) => {
    setOpenDialogMapDelete((prevState: any) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleUpdateSuccess = () => {
    setIsEdit(false);
    setIsChange(!isChange);
    toast.success(EditSuccess);
  };

  const handleChangeStatusNote = (id: any) => {
    noteApiService
      .changeStatus(Number(id))
      .then((data: any) => {
        handleCloseDelete(id);
        toast.success(DeleteSuccess);
        setIsChange(!isChange);
      })
      .catch((error: any) => {});
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={1}>
        <Grid xs={12} md={12} item>
          <Demo>
            <List>
              {listNote.length > 0 ? (
                listNote.map((item: any) => (
                  <ListItem
                    divider={true}
                    key={item.id}
                    secondaryAction={
                      <Box sx={{ marginRight: -2.5 }}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            handleClickOpenEdit(item.id, item.content);
                          }}
                          edge="end"
                          aria-label="delete"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleClickOpenDelete(item.id);
                          }}
                          color="primary"
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    {openDialogMapDelete[item.id] && (
                      <DialogDeleteNote
                        openDialogMapDelete={openDialogMapDelete}
                        id={item.id}
                        handleCloseDelete={handleCloseDelete}
                        handleChangeStatusNote={handleChangeStatusNote}
                      />
                    )}
                    {isEdit && openMapEditNote[item.id] ? (
                      <QuillComponent
                        initialValue={value}
                        method={Method.UPDATE}
                        handleCancelEdit={() => {
                          handleCancelEdit(item.id);
                        }}
                        id={item.id}
                        handleUpdateSuccess={handleUpdateSuccess}
                      />
                    ) : (
                      <ListItemText
                        sx={{ wordWrap: "break-word" }}
                        primary={
                          // item.content
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        }
                      />
                    )}
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    sx={{ color: "red" }}
                    primary={"Chưa có ghi chú"}
                  />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListNote;
