import { render, waitFor, fireEvent } from "@testing-library/react";
import * as Authorization from "../../contexts/authorization";
import { AuthContextData } from "../../contexts/authorization";
import * as router from "react-router";
import UserLogin from "../UserLogin";

const navigateMock = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigateMock);
});

const useAuthContextSpy = jest.spyOn(Authorization, "useAuthContext");

const loginHandlerMock = jest
  .fn()
  .mockName("loginHandler")
  .mockResolvedValue({});
useAuthContextSpy.mockImplementation(
  (): AuthContextData => ({ loginHandler: loginHandlerMock })
);

const credentials = {
  username: "user@email.com",
  password: "123asd",
};

async function testingRender(fillFormAndSubmit = false) {
  const { getByTestId, getByRole, getByLabelText } = render(
    <Authorization.AuthProvider>
      <UserLogin />
    </Authorization.AuthProvider>
  );

  await waitFor(() => expect(useAuthContextSpy).toHaveBeenCalledTimes(1));

  const button = getByRole("button");
  const userInput = getByLabelText("username");
  const passInput = getByLabelText("password");

  if (fillFormAndSubmit) {
    fireEvent.change(userInput, { target: { value: credentials.username } });
    fireEvent.change(passInput, { target: { value: credentials.password } });

    fireEvent.click(button);
  }

  return {
    getByTestId,
    button,
    userInput,
    passInput,
  };
}

describe("UserLogin", () => {
  afterEach(() => {
    useAuthContextSpy.mockClear();
  });

  it("should proper initial render UserLogin page", async () => {
    const { button } = await testingRender();

    expect(button).toBeDisabled();
  });

  it("should enable submit button on input change", async () => {
    const { userInput, passInput, button } = await testingRender();

    fireEvent.change(userInput, { target: { value: credentials.username } });

    expect(button).toBeDisabled();

    fireEvent.change(passInput, { target: { value: credentials.password } });

    expect(button).not.toBeDisabled();
  });

  it("should call login handler on submit and redirect on success", async () => {
    await testingRender(true);

    expect(loginHandlerMock).toHaveBeenCalledWith(credentials);

    await waitFor(() => expect(navigateMock).toHaveBeenCalled());

    expect(navigateMock).toHaveBeenCalledWith("/user/wallet");
  });

  it("should call login handler on submit and show error on fail", async () => {
    loginHandlerMock.mockRejectedValueOnce({ response: { status: 401 } });
    const { button, getByTestId } = await testingRender(true);

    await waitFor(() => getByTestId("alert-error"));

    expect(getByTestId("alert-error")).toHaveTextContent("Invalid credentials");
    expect(button).not.toBeDisabled();
  });
});
