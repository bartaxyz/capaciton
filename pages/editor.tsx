import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ChevronLeftIcon } from "xyz-icon-set-react";
// import SortableTree from "react-sortable-tree";

import { useLocalStorage } from "utils/useLocalStorage";
import { Workspace } from "pages";

import { Typography, Form, CodeBlock, Tabs, TabsProps } from "../ui";

import dynamic from "next/dynamic";

const SortableTree = dynamic(() => import("react-sortable-tree"), {
  ssr: false,
});

const defaultWorkspace: Workspace = {
  layoutTree: {
    component: "div",
  },
  innerState: [],
  outerState: [],
};

export default () => {
  const [workspace, setWorkspace] = useLocalStorage(
    "workspace",
    defaultWorkspace
  );

  const renderWorkspace = () => {};

  const [workspaceTitle, setWorkspaceTitle] = useLocalStorage(
    "workspaceTitle",
    "Component"
  );
  const [titleFocused, setTitleFocused] = useState(false);
  const onTitleFocus: React.ComponentProps<"span">["onFocus"] = (event) => {
    setTitleFocused(true);
  };
  const onTitleBlur: React.ComponentProps<"span">["onBlur"] = (event) => {
    setTitleFocused(false);
    setWorkspaceTitle(event.currentTarget.textContent || "");
  };

  const [treeData, setTreeData] = useState<any>([
    {
      title: "Div",
      expanded: true,
      children: [
        { title: "main" },
        {
          title: "value2",
          expanded: true,
          children: [{ title: "value3" }],
        },
      ],
    },
  ]);
  const onTreeDataUpdate = (data: any) => {
    setTreeData(data);
  };

  // Copy code block
  const copyTimeout = useRef<number>();
  const [codeBlockMouseOver, setCodeBlockMouseOver] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const onCodeBlockMouseOver = () => {
    setCodeBlockMouseOver(true);
  };

  const onCodeBlockMouseOut = () => {
    setCodeBlockMouseOver(false);
  };

  const onCodeBlockClick = () => {
    setCopiedToClipboard(true);

    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
    }

    copyTimeout.current = setTimeout(() => {
      setCopiedToClipboard(false);
    }, 5000);
  };

  // Tabs
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabChange: TabsProps["onChange"] = (index) => {
    setActiveTab(index);
  };

  return (
    <EditorLayout>
      <PanelLayout>
        <PanelLayoutBack>
          <PanelLayoutBackIcon>
            <ChevronLeftIcon />
          </PanelLayoutBackIcon>
          <PanelLayoutBackLabel>Component Library</PanelLayoutBackLabel>
        </PanelLayoutBack>
        <ComponentEditor>
          <PanelLayoutContent>
            <Typography.Label>You're editing</Typography.Label>
            <ComponentTitle
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={onTitleBlur}
            >
              {workspaceTitle}
            </ComponentTitle>

            <ComponentEditorFormRow>
              <div>
                <Typography.Label>Exported as</Typography.Label>
                {codeBlockMouseOver && !copiedToClipboard && (
                  <Typography.Label>
                    {" "}
                    &middot; Copy to clipboard
                  </Typography.Label>
                )}
                {copiedToClipboard && (
                  <Typography.Label>
                    {" "}
                    &middot; Copied to clipboard
                  </Typography.Label>
                )}
              </div>
              <CodeBlock
                code={`<${workspaceTitle.replace(/\s/g, "")} />`}
                copyable={true}
                onClick={onCodeBlockClick}
                onMouseOver={onCodeBlockMouseOver}
                onMouseOut={onCodeBlockMouseOut}
              />
            </ComponentEditorFormRow>
            <ComponentEditorFormRow>
              <Typography.Label>Root Element</Typography.Label>
              <Form.Select
                options={[
                  { label: "Div", value: "div" },
                  { label: "Span", value: "span" },
                  { label: "Article", value: "article" },
                  { label: "Nav", value: "nav" },
                ]}
              />
            </ComponentEditorFormRow>
          </PanelLayoutContent>

          <Tabs.Base
            activeIndex={activeTab}
            onChange={onTabChange}
            items={[
              {
                label: "General State",
                component: (
                  <TabContent>
                    <Typography.Label>
                      Global component states. Use these to change how the
                      component looks or behaves.
                    </Typography.Label>
                  </TabContent>
                ),
              },
              {
                label: "Local State",
                component: (
                  <TabContent>
                    <Typography.Label>Local State</Typography.Label>
                  </TabContent>
                ),
              },
              {
                label: "Layout",
                component: (
                  <TabContent>
                    <Typography.Label>
                      Layout. Hej dou, hej hej
                    </Typography.Label>
                  </TabContent>
                ),
              },
            ]}
          />
        </ComponentEditor>
        <SortableTree treeData={treeData} onChange={onTreeDataUpdate} rowHeight={32} />
      </PanelLayout>
      <ContentLayout>
        <Typography.Label></Typography.Label>
        <ArtboardLayout>
          <span contentEditable={true} suppressContentEditableWarning={true}>
            Content
          </span>
        </ArtboardLayout>
      </ContentLayout>
      <PanelLayout />
    </EditorLayout>
  );
};

const PanelLayout = styled.div`
  position: relative;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
`;

const PanelLayoutBack = styled.div`
  height: 48px;
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const PanelLayoutBackIcon = styled.div`
  font-size: 0;
`;

const PanelLayoutBackLabel = styled(Typography.Label)`
  opacity: 1;
  font-weight: 500;
`;

const PanelLayoutContent = styled.div`
  padding: 24px 16px;
`;

const ComponentEditor = styled.div`
  background: rgba(0, 0, 0, 0.02);
`;

const ComponentEditorFormRow = styled.div`
  display: grid;
  grid-row-gap: 4px;
  margin-bottom: 16px;

  &:first-of-type {
    margin-top: 12px;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ComponentTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  display: block;
  margin-top: 4px;
`;

const TabContent = styled.div`
  padding: 16px;
`;

const ContentLayout = styled.div`
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ArtboardLayout = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin-top: 4px;
`;

const EditorLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 320px 1fr 320px;
`;
