import { DefaultTheme } from "styled-components";

export interface CustomTheme extends DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    warning: string;
    error: string;
  };
}

export const theme: CustomTheme = {
  colors: {
    primary: "#ffffff",
    secondary: "#52bc5e",
    warning: "#f3dc37",
    error: "#ef7384"
  },
};
