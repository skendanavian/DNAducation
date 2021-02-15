import React from "react";
// import { useDownloadMenuStyles } from "@mui-treasury/styles/menu/download";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Original design here: https://github.com/siriwatknp/mui-treasury/issues/777

const TooltipMenu = (props) => {
  const { editExam, deleteExam } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (event) => {
    setAnchorEl(event.currentTarget);
    editExam();
  };

  const handleDelete = () => {
    setAnchorEl(null);
    deleteExam();
  };

  return (
    <div>
      <IconButton
        // className={downloadMenuClasses.button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        // classes={{ paper: downloadMenuClasses.paper }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default TooltipMenu;
