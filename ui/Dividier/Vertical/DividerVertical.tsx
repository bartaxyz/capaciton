import React from "react";
import styled from "styled-components";

import {
  DividerHorizontalProps,
  DividerHorizontal,
} from "../Horizontal/DividerHorizontal";

export interface DividerVerticalProps extends DividerHorizontalProps {}

export const DividerVertical: React.FC<DividerVerticalProps> = () => <Root />;

const Root = styled(DividerHorizontal)`
  height: 100%;
  width: 1px;
`;
