export interface DashboardConfigProps {
  dashboardId: string;
  title: string;
  version: number;
  layout: LayoutNode;
}

export type LayoutNode =
  | StackNodeProps
  | RowNodeProps
  | ColumnNodeProps
  | WidgetNodeProps;

export type LayoutNodeType = "stack" | "row" | "column" | "widget";

export interface NodeBaseProps {
  id: string;
  type: LayoutNodeType;
}

// container nodes share gap + children
export interface ContainerNodeBaseProps extends NodeBaseProps {
  gap: number;
  children: LayoutNode[];
}

export interface StackNodeProps extends ContainerNodeBaseProps {
  type: "stack";
}

export interface RowNodeProps extends ContainerNodeBaseProps {
  type: "row";
}

export interface ColumnNodeProps extends ContainerNodeBaseProps {
  type: "column";
}

export interface WidgetNodeProps extends NodeBaseProps {
  type: "widget";
  widgetId: string;
}
