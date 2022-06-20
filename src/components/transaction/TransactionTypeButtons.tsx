import { useState } from "react";
import { Button, ButtonGroup, Icon } from "@mui/material";
import { TransactionRole } from "../../api/belvo-wallet.types";

interface TransactionTypeButtons {
  onTypeChange: (role: TransactionRole) => void;
}

const TransactionTypeButtons = ({ onTypeChange }: TransactionTypeButtons) => {
  const [active, setActive] = useState<TransactionRole>(null);

  const handleClick = (selectedAction: NonNullable<TransactionRole>) => {
    const role = selectedAction === active ? null : selectedAction;

    setActive(role);
    onTypeChange(role);
  };

  return (
    <ButtonGroup fullWidth disableElevation>
      <Button
        variant={active === "receiver" ? "contained" : "outlined"}
        startIcon={<Icon>call_received</Icon>}
        onClick={() => handleClick("receiver")}
      >
        Request
      </Button>
      <Button
        variant={active === "sender" ? "contained" : "outlined"}
        endIcon={<Icon>call_made</Icon>}
        onClick={() => handleClick("sender")}
      >
        Send
      </Button>
    </ButtonGroup>
  );
};

export default TransactionTypeButtons;
