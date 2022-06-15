import { AppBar, Toolbar } from "@mui/material";
import belvoLogoSrc from "../assets/belvo_pride.svg?url";
import ContainerContent from "./ContainerContent";

const AppHeader = () => {
  return (
    <AppBar
      sx={{ borderBottom: "1px solid #F0F0F0", justifyContent: "center" }}
      color="inherit"
      position="sticky"
      elevation={0}
    >
      <ContainerContent>
        <Toolbar disableGutters>
          <img
            src={belvoLogoSrc}
            width="85"
            height="24"
            alt="Belvo"
            style={{ marginTop: "6px" }}
          />
        </Toolbar>
      </ContainerContent>
    </AppBar>
  );
};

export default AppHeader;
