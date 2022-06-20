import { ChangeEvent } from "react";

export type State = Record<string, unknown>;
export const onChangeInput =
  (
    state: State,
    setStateFn: (state: State) => void,
    customValidator?: (value: unknown) => boolean
  ) =>
  ({
    target: { name, value },
    preventDefault,
  }: ChangeEvent<HTMLInputElement>) => {
    if (typeof customValidator === "function" && customValidator(value)) {
      preventDefault();
      return;
    }
    setStateFn({ ...state, [name]: value });
  };

export const floatNumberValidator = (input: unknown) => {
  let result;
  try {
    result = isNaN(Number(input));
  } catch (e) {
    result = false;
  }

  return result;
};
