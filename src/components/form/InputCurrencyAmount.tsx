import { useMemo } from "react";
import { Grid, MenuItem } from "@mui/material";
import Input from "./Input";
import { validateAmount } from "./InputCurrencyAmount.helpers";
import { floatNumberValidator, onChangeInput, State } from "../../utils/form";
import { Balance, BaseTransactionPayload } from "../../api/belvo-wallet.types";
import { CURRENCIES } from "../../api/belvo-wallet.consts";

interface InputCurrencyAmountProps {
  state: State | BaseTransactionPayload;
  setState: (state: State) => void;
  balance: Balance;
}

const InputCurrencyAmount = ({
  state,
  setState,
  balance,
}: InputCurrencyAmountProps) => {
  const handleCurrencyChange = onChangeInput(state, setState);
  const handleAmountChange = onChangeInput(
    state,
    setState,
    floatNumberValidator
  );

  const selectedBalance = useMemo(() => {
    const selectedCurrency = state.currency;
    return selectedCurrency !== ""
      ? balance[selectedCurrency as BaseTransactionPayload["currency"]]
      : 0;
  }, [balance, state.currency]);

  return (
    <Grid container columnSpacing={{ xs: 1 }}>
      <Grid item xs={4}>
        <Input
          select
          label="Currency"
          name="currency"
          inputsObject={state}
          onChange={handleCurrencyChange}
        >
          {CURRENCIES.map((currency) => (
            <MenuItem
              key={`transaction-currency-selector-${currency}`}
              value={currency}
            >
              {currency}
            </MenuItem>
          ))}
        </Input>
      </Grid>
      <Grid item xs={8}>
        <Input
          name="amount"
          label="Amount"
          inputsObject={state}
          onChange={handleAmountChange}
          validationFn={validateAmount(selectedBalance)}
          disabled={state.currency === ""}
        />
      </Grid>
    </Grid>
  );
};

export default InputCurrencyAmount;
