import { TransactionRole } from "../api/belvo-wallet.types";
import { doWalletTransaction } from "../api/belvo-wallet";
import {
  SetSnackPropsState,
  SnackPropsState,
  WalletTransactionHandlerArgs,
} from "./NewTransactionForm.types";
import { SyntheticEvent } from "react";

export function titleStr(role: NonNullable<TransactionRole>) {
  return role === "sender" ? "Sending to" : "Requesting from";
}

export function onCloseSnack(
  getter: SnackPropsState,
  setter: SetSnackPropsState
) {
  return (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setter({ ...getter, open: false });
  };
}

export function walletTransactionHandler(
  { payload, userRole, contact }: WalletTransactionHandlerArgs,
  setSnackProps: SetSnackPropsState,
  setLoading: (isLoading: boolean) => void
) {
  setLoading(true);
  return doWalletTransaction(payload, userRole, contact)
    .then((data) => {
      setSnackProps({
        open: true,
        severity: "success",
        message: "Transaction sent successfully",
      });
      return data;
    })
    .catch((e) => {
      const errorMessage = e.response.data?.detail[0]?.msg;
      setSnackProps({
        open: true,
        severity: "error",
        message: errorMessage || e.message || "Unexpected error.",
      });
    })
    .finally(() => {
      setLoading(false);
    });
}
