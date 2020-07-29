import React from "react";
import styled, { css } from "styled-components";
import copy from "copy-to-clipboard";

export interface CodeBlockProps extends React.ComponentPropsWithRef<"div"> {
  code: string;
  copyable?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
  const { code, copyable, onClick } = props;

  const onRootClick: CodeBlockProps["onClick"] = (event) => {
    if (copyable) {
      copy(code);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Root {...props} code={code} copyable={copyable} onClick={onRootClick}>
      <Code>
        <Pre>{code}</Pre>
      </Code>
    </Root>
  );
};

const Root = styled.div<CodeBlockProps>`
  background: rgba(0, 0, 0, 0.05);
  padding: 8px 12px;
  border-radius: 4px;
  transition: 0.1s;

  ${({ copyable }) =>
    copyable &&
    css`
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }

      &:active {
        background: rgba(0, 0, 0, 0.15);
      }
    `}
`;

const Code = styled.code``;

const Pre = styled.pre`
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
`;
