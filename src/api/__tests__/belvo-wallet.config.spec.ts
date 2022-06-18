import { setToken } from "../belvo-wallet.config";
import { AxiosInstance } from "axios";

const mockedInstance = {
  defaults: {
    headers: {
      common: {},
    },
  },
};

const mockedToken = "foo";

describe("setToken()", () => {
  it("should proper set Authorization header", () => {
    setToken(mockedToken, mockedInstance as AxiosInstance);

    expect(mockedInstance.defaults.headers.common).toEqual({
      Authorization: `Bearer ${mockedToken}`,
    });
  });
});
