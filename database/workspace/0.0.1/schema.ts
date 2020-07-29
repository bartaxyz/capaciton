export interface WorkspaceBooleanState {
  type: "boolean";
  default: boolean;
}
export interface WorkspaceStringState {
  type: "string";
  default: string;
}

export type WorkspaceStateType = WorkspaceBooleanState | WorkspaceStringState;

export interface WorkspaceLayoutComponent {
  component: "div" | "span";
  children?: WorkspaceLayoutComponent[] | WorkspaceLayoutComponent;
  css?: string;
}

export interface Workspace {
  layoutTree: WorkspaceLayoutComponent;
  innerState: WorkspaceStateType[];
  outerState: WorkspaceStateType[];
}