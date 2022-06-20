import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useAuthContext } from "../contexts/authorization";

const RestrictedPages = ({ children }: { children: JSX.Element }) => {
  const { authInfo, logoutHandler } = useAuthContext();
  const [timer, setTimer] = useState("--:--");
  const location = useLocation();
  let logoutTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (authInfo?.expiration && logoutHandler) {
      const { expiration } = authInfo;
      logoutTimer = setTimeout(logoutHandler, expiration - Date.now());

      interval = setInterval(() => {
        const { sec, min } = (() => {
          const totalSec = parseInt(String((expiration - Date.now()) / 1000));
          const sec = totalSec % 60;

          return {
            sec: sec < 10 ? `0${sec}` : sec,
            min: parseInt(String(totalSec / 60)),
          };
        })();
        setTimer(`${min}:${sec}`);
      }, 1000);
    }
    return () => {
      clearTimeout(logoutTimer);
      clearInterval(interval);
    };
  }, [authInfo?.expiration]);

  if (!authInfo?.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // show expiration time, since there's no refresh token
  return (
    <>
      <Typography variant="body2" textAlign="right">
        Session expires in: {timer}
      </Typography>
      {children}
    </>
  );
};

export default RestrictedPages;
