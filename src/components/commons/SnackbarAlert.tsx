import {
  Alert as MuiAlert,
  AlertProps,
  Snackbar,
  SnackbarProps,
} from "@mui/material";
import { forwardRef } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarAlertProps extends SnackbarProps {
  severity?: AlertProps["severity"];
}

const SnackbarAlert = ({
  onClose,
  message,
  severity,
  ...props
}: SnackbarAlertProps) => {
  return (
    <Snackbar onClose={onClose} {...props}>
      <Alert
        onClose={onClose as AlertProps["onClose"]}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
