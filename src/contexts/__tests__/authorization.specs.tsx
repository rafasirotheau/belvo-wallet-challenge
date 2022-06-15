import { AuthProvider, useAuthContext } from "../authorization";
import { render, waitFor } from "@testing-library/react";
import * as Helpers from "../authorization.helpers";
import * as ApiConfig from "../../api/belvo-wallet.config";

const generateAuthInfoSpy = jest.spyOn(Helpers, "generateAuthInfo");
const setTokenSpy = jest.spyOn(ApiConfig, "setToken");
const onSuccessMock = jest.fn();

const TestingComponent = () => {
  const { loginHandler, authInfo } = useAuthContext();

  const onClick = () => {
    if (loginHandler) {
      loginHandler({ username: "foo", password: "bar" }).then(onSuccessMock);
    }
  };

  return (
    <>
      <p data-testid="token">{authInfo?.accessToken}</p>
      <p data-testid="expiration">{authInfo?.expiration}</p>
      <p data-testid="isLoggedIn">{authInfo?.isLoggedIn?.toString()}</p>

      <button onClick={onClick}>login</button>
    </>
  );
};

async function testingRender() {
  const { getByTestId } = render(
    <AuthProvider>
      <TestingComponent />
    </AuthProvider>
  );

  await waitFor(() => expect(generateAuthInfoSpy).toHaveBeenCalledTimes(1));

  return {
    token: getByTestId("token").textContent,
    expiration: getByTestId("expiration").textContent,
    isLoggedIn: getByTestId("isLoggedIn").textContent,
  };
}

describe("AuthProvider", () => {
  afterEach(() => {
    generateAuthInfoSpy.mockClear();
  });
  it("should instantiate provider without localStorage token", async () => {
    const { token, expiration, isLoggedIn } = await testingRender();

    expect(token).toBe("");
    expect(expiration).toBe("");
    expect(isLoggedIn).toBe("false");
  });

  it("should instantiate provider with localStorage token", async () => {
    const tokenData = {
      access_token:
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWNreSIsImV4cCI6MTY1NTMyNjc0OX0.JIkYKkfyQ0Y18qZarGIxWfUurPuqrJZu_4w7OViqxSAeHFAHA_R7ikjoszzzDcAgyaH32q_mI7MDpf7a3EaMVg",
      token_type: "bearer",
    };
    Helpers.tokenFromLocalStorage.set(tokenData);

    const { token, expiration, isLoggedIn } = await testingRender();

    expect(token).toBe(tokenData.access_token);
    expect(expiration).toBe("1655326749000");
    expect(isLoggedIn).toBe("true");

    expect(setTokenSpy).toHaveBeenCalledWith(tokenData.access_token);
  });
});
