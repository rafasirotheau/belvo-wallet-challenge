export const validateAmount = (currentBalance: number) =>
  function validation(value: unknown): string | null {
    if (value === "") return null;
    try {
      const valueAsNumber = Number(value);

      if (valueAsNumber > currentBalance) return "Not enough balance";
      if (isNaN(valueAsNumber) || valueAsNumber <= 0) return "Invalid value";

      return null;
    } catch (e) {
      return "Cannot validate";
    }
  };
