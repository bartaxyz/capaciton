import React from "react";
import styled from "styled-components";

import { Text } from "../Text/Text";

export interface LabelProps {}

export const Label: React.FC<LabelProps> = (props) => <Root {...props} />;

const Root = styled(Text)`
  font-size: 12px;
  opacity: 0.5;
`;
