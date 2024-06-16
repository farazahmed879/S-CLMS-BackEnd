import CustomGridComponent from "../../../Components/custom-grid";
import CustomModal from "../../../Components/modal";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
const UserSelector = ({ open, setOpen, product }) => {
  //   const columns = [{ field: "name", headerName: "Name", width: 170 }];
  const [checked, setChecked] = React.useState([1]);

  const data = [
    { id: 1, name: "Faraz" },
    { id: 2, name: "Ahmed" },
    { id: 3, name: "Sheikh" },
    { id: 4, name: "bilal" },
    { id: 5, name: "moosani" },
    { id: 6, name: "Abdul" },
    { id: 7, name: "rafay" },
    { id: 8, name: "hadi" },
    { id: 9, name: "zuhaib" },
    { id: 10, name: "bisham" },
  ];

  const handleClose = () => {
    setOpen(false);
    onModalClose();
  };

  const handleOk = () => {
    console.log(checked);
    let payload = {
      users: data.filter((d) => checked.includes(d.id)),
      productId: product?.id,
    };
    // hit api
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
    console.log("----");
    setChecked([]);
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
                  {/* <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar> */}
                  <ListItemText id={labelId} primary={value.name} />
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
