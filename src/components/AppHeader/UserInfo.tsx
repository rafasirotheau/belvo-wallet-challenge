import { useCallback, useRef, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { AuthInfoType } from "../../contexts/authorization.helpers";
import { useNavigate } from "react-router-dom";

interface Props {
  logoutHandler: () => void;
  username?: AuthInfoType["username"];
}

const UserInfo = ({ logoutHandler, username = "" }: Props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const anchorEl = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleMenu}
        color="primary"
        ref={anchorEl}
      >
        <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        sx={{ mt: "45px" }}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem
          onClick={() => {
            navigate("/user/wallet");
            toggleMenu();
          }}
        >
          Wallet
        </MenuItem>
        <MenuItem
          onClick={() => {
            logoutHandler();
            toggleMenu();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;
