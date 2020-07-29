import React from "react";
import styled from "styled-components";
import { ChevronDownThinIcon } from "xyz-icon-set-react";

interface Option {
  label: string;
  value: string;
}

export interface SelectProps extends React.ComponentPropsWithRef<"select"> {
  options: Option[];
}

export const Select: React.FC<SelectProps> = ({ options, ref, ...props }) => (
  <Root>
    <SelectRoot ref={ref} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectRoot>

    <Icon>
      <ChevronDownThinIcon />
    </Icon>
  </Root>
);

const Root = styled.div`
  position: relative;
`;

const SelectRoot = styled.select`
  -webkit-appearance: none;
  box-sizing: border-box;
  padding: 8px 12px;
  appearance: none;
  display: block;
  width: 100%;
  height: 32px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 4px;

  font-family: Public Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  font-size: 0;
  transform: translateY(-50%);
  zoom: 0.75;
  pointer-events: none;
`;
