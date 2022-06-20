import { useState, FormEvent, useCallback, useMemo } from "react";
import { Stack, Typography } from "@mui/material";
import { ContactSelector } from "./ContactList";
import { Input, InputCurrencyAmount } from "./form";
import {
  NewTransactionFormProps,
  SnackPropsState,
} from "./NewTransactionForm.types";
import {
  onCloseSnack,
  titleStr,
  walletTransactionHandler,
} from "./NewTransactionForm.helpers";
import { BaseTransactionPayload } from "../api/belvo-wallet.types";
import { onChangeInput, State } from "../utils/form";
import { SnackbarAlert } from "./commons";
import { LoadingButton } from "@mui/lab";

const NewTransactionForm = ({
  userRole,
  balance,
  onSuccess,
  ...props
}: NewTransactionFormProps) => {
  const [snackProps, setSnackProps] = useState<SnackPropsState>({
    open: false,
    severity: undefined,
    message: "",
  });
  const [partialTransactionPayload, setPartialTransactionPayload] = useState<
    State | BaseTransactionPayload
  >({
    amount: "",
    currency: "",
    description: "",
  });
  const [contact, setContact] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const requiredNotEmpty = useMemo(() => {
    const { amount, currency } = partialTransactionPayload;
    if (amount === "" || currency === "") return true;
    return contact === "";
  }, [partialTransactionPayload, contact]);

  const submitTransaction = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!userRole) return;

      walletTransactionHandler(
        {
          payload: partialTransactionPayload as BaseTransactionPayload,
          userRole,
          contact,
        },
        setSnackProps,
        setLoading
      ).then(() => {
        typeof onSuccess === "function" && onSuccess();
      });
    },
    [partialTransactionPayload, userRole, contact]
  );

  return (
    <form autoComplete="off" onSubmit={submitTransaction}>
      <Stack spacing={2} {...props}>
        <Typography variant="h6" component={"h2"}>
          {titleStr(userRole)}
        </Typography>
        <ContactSelector onChange={setContact} />

        <div>
          <InputCurrencyAmount
            state={partialTransactionPayload}
            setState={setPartialTransactionPayload}
            balance={balance}
          />
        </div>

        <Input
          name="description"
          label="Description"
          value={partialTransactionPayload.description}
          onChange={onChangeInput(
            partialTransactionPayload,
            setPartialTransactionPayload
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={isLoading}
          disabled={requiredNotEmpty}
        >
          Submit
        </LoadingButton>
      </Stack>

      <SnackbarAlert
        open={snackProps.open}
        autoHideDuration={6000}
        onClose={onCloseSnack(snackProps, setSnackProps)}
        severity={snackProps.severity}
        message={snackProps.message}
      />
    </form>
  );
};

export default NewTransactionForm;
