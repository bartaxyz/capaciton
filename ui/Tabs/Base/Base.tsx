import React from "react";
import styled, { css } from "styled-components";
import { Typography } from "ui/Typography";

export interface TabsItem {
  label: React.ReactNode;
  component: React.ReactNode;
}

export interface TabsProps {
  activeIndex: number;
  items: TabsItem[];
  onChange(index: number): void;
}

export const Base: React.FC<TabsProps> = (props) => {
  const { activeIndex, items, onChange } = props;

  return (
    <Root>
      <Navigation>
        {items.map((item, index) => (
          <NavigationItem
            key={index}
            active={activeIndex === index}
            onClick={onChange.bind({}, index)}
          >
            <NavigationItemLabel active={activeIndex === index}>
              {item.label}
            </NavigationItemLabel>
          </NavigationItem>
        ))}
      </Navigation>

      <Content>{items[activeIndex].component}</Content>
    </Root>
  );
};

const Root = styled.div``;

const Navigation = styled.div`
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

interface NavigationItemProps {
  active: boolean;
}

const NavigationItem = styled.div<NavigationItemProps>`
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: -1px;
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0);
  border-bottom: none;

  ${({ active }) =>
    active &&
    css`
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: none;
    `}

  &:hover {
    opacity: 1;
  }
`;

const NavigationItemLabel = styled(Typography.Label)<NavigationItemProps>`
  opacity: 1;
`;

const Content = styled.div`
  background: white;
`;
