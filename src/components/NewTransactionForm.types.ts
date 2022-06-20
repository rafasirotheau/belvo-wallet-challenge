import {
  Balance,
  BaseTransactionPayload,
  TransactionProps,
  TransactionRole,
} from "../api/belvo-wallet.types";
import { StackProps } from "@mui/material";

export interface NewTransactionFormProps extends StackProps {
  userRole: NonNullable<TransactionRole>;
  balance: Balance;
  onSuccess: (response?: TransactionProps) => void;
}

export interface WalletTransactionHandlerArgs
  extends Pick<NewTransactionFormProps, "userRole"> {
  payload: BaseTransactionPayload;
  contact: string;
}

export interface SnackPropsState {
  open: boolean;
  severity?: "success" | "error";
  message?: string;
}

export type SetSnackPropsState = (arg0: SnackPropsState) => void;
