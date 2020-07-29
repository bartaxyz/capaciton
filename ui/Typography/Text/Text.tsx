import React from "react";
import styled from "styled-components";

export interface TextProps extends React.ComponentPropsWithRef<"span"> {}

export const Text: React.FC<TextProps> = (props) => {
  return <Root {...props} />;
};

const Root = styled.span`
  font-family: "Public Sans";
`;
