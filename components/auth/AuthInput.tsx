import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  width: 300px;
  background-color: ${(props) => props.theme.theme.formColor};
  padding: 12px 5px;
  margin-bottom: 8px;
  border-radius: 4px;
  color: ${(props) => props.theme.theme.textColor};
  border: 1px solid ${(props) => props.theme.theme.borderColor};
`;
