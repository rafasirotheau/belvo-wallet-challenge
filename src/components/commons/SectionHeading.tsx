import { Typography, TypographyProps } from "@mui/material";
import { ElementType } from "react";

const SectionHeading = <C extends ElementType>(
  props: TypographyProps<C, { component?: C }>
) => (
  <Typography
    variant="h5"
    component="h1"
    gutterBottom
    align="center"
    {...props}
  />
);

export default SectionHeading;
