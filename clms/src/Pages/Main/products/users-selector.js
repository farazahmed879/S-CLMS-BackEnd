import CustomGridComponent from "../../../Components/custom-grid";
import CustomModal from "../../../Components/modal";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";

const UserSelector = ({ open, setOpen, data = [], handleSubmit }) => {
  const [checked, setChecked] = useState([1]);

  const handleClose = () => {
    setOpen(false);
    onModalClose();
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onModalClose = () => {
    setChecked([]);
  };

  const handleOk = () => {
    handleSubmit(checked);
  };

  return (
    <CustomModal
      onClose={onModalClose}
      title="Select User"
      open={open}
      handleClose={handleClose}
      handleOk={handleOk}
    >
      <List dense sx={{ width: "20rem", bgcolor: "background.paper" }}>
        {data.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <>
              <ListItem
                key={value.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value.id)}
                    checked={checked.includes(value.id)}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={`${value?.email}`} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </CustomModal>
  );
};

export default UserSelector;
