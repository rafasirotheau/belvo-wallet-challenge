import { Container, ContainerProps } from "@mui/material";
import { ElementType } from "react";

const ContainerContent = <C extends ElementType>(
  props: ContainerProps<C, { component?: C }>
) => <Container maxWidth="lg" {...props} />;

export default ContainerContent;
