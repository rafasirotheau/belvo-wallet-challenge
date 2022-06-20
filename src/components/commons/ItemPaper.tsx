import { Paper, PaperProps, styled } from "@mui/material";
import { ElementType } from "react";

const BalanceItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "left",
}));

const ItemPaper = <C extends ElementType>(
  props: PaperProps<C, { component?: C }>
) => <BalanceItem variant="outlined" square {...props} />;

export default ItemPaper;
