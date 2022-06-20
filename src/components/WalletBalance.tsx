import { useState } from "react";
import {
  Stack,
  Grid,
  GridProps,
  Typography,
  Collapse,
  Divider,
} from "@mui/material";
import { TransactionRole } from "../api/belvo-wallet.types";
import { useWalletContext } from "../contexts/wallet";
import { TransactionTypeButtons } from "./transaction";
import NewTransactionForm from "./NewTransactionForm";
import { ItemPaper } from "./commons";

const WalletBalance = ({ ...props }: GridProps) => {
  const { balance, getWallet = () => null } = useWalletContext();
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState<TransactionRole>(null);

  const onRoleChange = (selectedAction: TransactionRole) => {
    setRole(selectedAction);
    setShowForm(selectedAction !== null);
  };

  return (
    <Grid container spacing={1} {...props}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          {balance &&
            Object.entries(balance).map(([currency, total]) => (
              <ItemPaper key={`wallet-balance-${currency}`}>
                <Typography variant="body1" component="span">
                  <strong>{currency}:</strong> {total}
                </Typography>
              </ItemPaper>
            ))}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <TransactionTypeButtons onTypeChange={onRoleChange} />
      </Grid>

      <Grid item xs={12}>
        <Collapse in={showForm}>
          <Divider variant="middle" />
          {role && balance && (
            <NewTransactionForm
              userRole={role}
              balance={balance}
              mt={2}
              onSuccess={getWallet}
            />
          )}
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default WalletBalance;
