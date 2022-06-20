import { Avatar, Box, Icon, Typography } from "@mui/material";
import { TransactionProps } from "../api/belvo-wallet.types";
import { ItemPaper } from "./commons";

interface WalletTransactionProps extends TransactionProps {
  key?: string;
  userEmail: string;
}

const WalletTransaction = ({
  description,
  amount,
  currency,
  sender,
  status,
  receiver,
  userEmail,
  ...props
}: WalletTransactionProps) => {
  const transactionIcon = sender === userEmail ? "remove" : "add";
  const primaryText =
    sender === userEmail ? `Sent to ${receiver}` : `Received from ${sender}`;

  return (
    <ItemPaper sx={{ display: "flex", alignItems: "center", px: 2 }} {...props}>
      <Box sx={{ mr: 1 }}>
        <Avatar>
          <Icon>{transactionIcon}</Icon>
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1, my: 0.5 }}>
        <Typography component="p" variant="body1" color="text.primary">
          {primaryText} ({status})
        </Typography>
        <Typography component="p" variant="body2" color="text.primary">
          {currency} {amount}
        </Typography>
        <Typography component="p" variant="body2" color="text.primary">
          {description}
        </Typography>
      </Box>
    </ItemPaper>
  );
};

export default WalletTransaction;
