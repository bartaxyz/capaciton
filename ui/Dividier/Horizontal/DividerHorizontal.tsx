import React from "react";
import styled from "styled-components";

export interface DividerHorizontalProps {}

export const DividerHorizontal: React.FC<DividerHorizontalProps> = () => (
  <Root />
);

const Root = styled.div`
  background: rgba(0, 0, 0, 0.1);
  height: 1px;
  width: 100%;
`;
