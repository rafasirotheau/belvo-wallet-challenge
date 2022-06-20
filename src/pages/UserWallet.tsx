import { Container, Grid, Typography } from "@mui/material";
import { SectionHeading, SectionPaper } from "../components/commons";
import { WalletTransactionsList } from "../components";
import WalletBalance from "../components/WalletBalance";
import { WalletProvider } from "../contexts/wallet";

const UserWallet = () => (
  <WalletProvider>
    <Container maxWidth="lg">
      <SectionHeading>My Wallet</SectionHeading>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <SectionPaper>
            <Typography variant="h6" component={"h2"}>
              Balance
            </Typography>
            <WalletBalance />
          </SectionPaper>
        </Grid>
        <Grid item xs={12} md={8}>
          <SectionPaper>
            <Typography variant="h6" component={"h2"}>
              Transactions
            </Typography>
            <WalletTransactionsList perPage={5} showControls={false} />
          </SectionPaper>
        </Grid>
      </Grid>
    </Container>
  </WalletProvider>
);

export default UserWallet;
