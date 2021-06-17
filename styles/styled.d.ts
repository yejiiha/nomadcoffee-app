import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    theme: {
      textColor: string;
      bgColor: string;
      orangeColor: string;
      formColor: string;
      borderColor: string;
      darkGray: string;
      lightGray: string;
    };
  }
}
