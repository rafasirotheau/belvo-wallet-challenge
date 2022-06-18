import { useAuthContext, AuthProvider } from "../authorization";
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as Helpers from "../authorization.helpers";
import * as ApiConfig from "../../api/belvo-wallet.config";
import * as BelvoWalletApiActions from "../../api/belvo-wallet";
import { mockedLoginResponse, mockedTokenData } from "./__mocks__";
import { LOCALSTORAGE_KEY } from "../authorization.helpers";

const generateAuthInfoSpy = jest.spyOn(Helpers, "generateAuthInfo");
const setTokenSpy = jest.spyOn(ApiConfig, "setToken");
const doLoginSpy = jest.spyOn(BelvoWalletApiActions, "doLogin");
const onSuccessMock = jest.fn();

doLoginSpy.mockResolvedValue(mockedLoginResponse);
const mockedLoginCredentials = {
  username: "user",
  password: "123foo",
};
const TestingComponent = () => {
  const { loginHandler, authInfo } = useAuthContext();

  const onClick = () => {
    if (loginHandler) {
      loginHandler(mockedLoginCredentials).then(onSuccessMock);
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
  const { getByTestId, getByRole } = render(
    <AuthProvider>
      <TestingComponent />
    </AuthProvider>
  );

  await waitFor(() => expect(generateAuthInfoSpy).toHaveBeenCalledTimes(1));

  return {
    token: getByTestId("token").textContent,
    expiration: getByTestId("expiration").textContent,
    isLoggedIn: getByTestId("isLoggedIn").textContent,
    button: getByRole("button"),
    getByTestId,
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
    jest.useFakeTimers();
    jest.setSystemTime(new Date(mockedTokenData.expiration + 100000));

    Helpers.tokenFromLocalStorage.set(mockedLoginResponse);

    const { token, expiration, isLoggedIn } = await testingRender();

    expect(token).toBe(mockedLoginResponse.access_token);
    expect(expiration).toBe("1655565542000");
    expect(isLoggedIn).toBe("true");

    expect(setTokenSpy).toHaveBeenCalledWith(mockedTokenData.accessToken);

    jest.useRealTimers();
    window.localStorage.removeItem(LOCALSTORAGE_KEY);
  });

  it("should proper handle login", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(mockedTokenData.expiration + 100000));

    const { button, token, expiration, isLoggedIn, getByTestId } =
      await testingRender();

    expect(token).toBe("");
    expect(expiration).toBe("");
    expect(isLoggedIn).toBe("false");

    fireEvent.click(button);

    await waitFor(() => expect(onSuccessMock).toHaveBeenCalled());

    expect(onSuccessMock).toHaveBeenCalledWith(mockedLoginResponse);
    expect(doLoginSpy).toHaveBeenCalledWith(mockedLoginCredentials);

    expect(getByTestId("token").textContent).toBe(
      mockedLoginResponse.access_token
    );
    expect(getByTestId("expiration").textContent).toBe("1655565542000");
    expect(getByTestId("isLoggedIn").textContent).toBe("true");

    jest.useRealTimers();
  });
});
