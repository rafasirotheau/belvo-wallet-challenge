import { Stack, Typography } from "@mui/material";
import WalletTransaction from "./WalletTransaction";
import { useWalletContext } from "../contexts/wallet";

interface Props {
  perPage: number;
  showControls: boolean;
}
const WalletTransactionsList = ({
  perPage = 10,
  showControls = true,
}: Props) => {
  const { transactions, email } = useWalletContext();

  return (
    <Stack spacing={2}>
      {transactions &&
        email &&
        transactions
          .slice(-1 * perPage)
          .reverse()
          .map((transaction, index) => (
            <WalletTransaction
              {...transaction}
              key={`transaction-item-${index}`}
              userEmail={email}
            />
          ))}
      {showControls ? (
        <Typography variant="body2">Showing {perPage}</Typography>
      ) : (
        <Typography variant="body2">Showing last {perPage}</Typography>
      )}
    </Stack>
  );
};

export default WalletTransactionsList;
