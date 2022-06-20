import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack, TextField, Typography, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "../contexts/authorization";
import { SectionHeading } from "../components/commons";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>();

  const navigate = useNavigate();
  const { loginHandler } = useAuthContext();

  const inputChangeHandler = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [name]: value });
    if (formError) setFormError(null);
  };

  const anyEmpty = useMemo(() => {
    return Object.values(credentials).some((content) => content.length === 0);
  }, [credentials]);

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    if (formError) setFormError(null);
    setLoading(true);

    if (loginHandler) {
      loginHandler(credentials)
        .then(() => {
          navigate("/user/wallet");
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setFormError("Invalid credentials");
          }
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Container maxWidth="xs">
        <Stack component="form" spacing={2} onSubmit={onSubmit}>
          <SectionHeading>Enter your credentials</SectionHeading>
          <Typography component="h1"></Typography>

          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={credentials.username}
            onChange={inputChangeHandler}
            error={!!formError}
            inputProps={{
              "aria-label": "username",
            }}
          />
          <TextField
            label="Password"
            inputProps={{
              "aria-label": "password",
            }}
            variant="outlined"
            name="password"
            type="password"
            value={credentials.password}
            onChange={inputChangeHandler}
            error={!!formError}
          />

          <LoadingButton
            loading={isLoading}
            variant="contained"
            size="large"
            type="submit"
            disabled={anyEmpty}
          >
            Connect Account
          </LoadingButton>

          {!!formError && (
            <Alert data-testid="alert-error" severity="error">
              {formError}
            </Alert>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default UserLogin;
