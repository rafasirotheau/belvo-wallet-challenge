import { AppBar, Box, Button, Toolbar } from "@mui/material";
import belvoLogoSrc from "../assets/belvo_pride.svg?url";
import ContainerContent from "./ContainerContent";
import { useAuthContext } from "../contexts/authorization";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/AppHeader/UserInfo";

const AppHeader = () => {
  const {
    authInfo: { isLoggedIn = false, username } = {},
    logoutHandler = () => null,
  } = useAuthContext();
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{ borderBottom: "1px solid #F0F0F0", justifyContent: "center" }}
      color="inherit"
      position="sticky"
      elevation={0}
    >
      <ContainerContent>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={belvoLogoSrc}
              width="85"
              height="24"
              alt="Belvo"
              style={{ marginTop: "6px" }}
            />
          </Box>

          {isLoggedIn ? (
            <UserInfo username={username} logoutHandler={logoutHandler} />
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </Toolbar>
      </ContainerContent>
    </AppBar>
  );
};

export default AppHeader;
