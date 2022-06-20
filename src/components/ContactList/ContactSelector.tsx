import { Box, TextField, Autocomplete } from "@mui/material";
import { ContactsProps } from "../../api/belvo-wallet.types";
import { useEffect, useState } from "react";
import { getContacts } from "../../api/belvo-wallet";

interface ContactSelectorProps {
  onChange?: (contact: string) => void;
}
const ContactSelector = ({ onChange }: ContactSelectorProps) => {
  const [contactsList, setContactsList] = useState<ContactsProps[]>([]);

  useEffect(() => {
    return () => {
      getContacts().then((data) => setContactsList(data));
    };
  }, []);

  return (
    <Autocomplete
      fullWidth
      options={contactsList}
      onChange={(_, newValue: ContactsProps | null) => {
        typeof onChange === "function" && onChange(newValue?.email ?? "");
      }}
      autoHighlight
      getOptionLabel={(option) => option.email || option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name} ({option.email})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a contact"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

export default ContactSelector;
