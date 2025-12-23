import {
  DashboardConfigProps,
  NodeBaseProps,
  ContainerNodeBaseProps,
  StackNodeProps,
  RowNodeProps,
  ColumnNodeProps,
  WidgetNodeProps,
  LayoutNode,
} from "../types/DashboardType";
import type { BaseWidgetModel } from "./Base";
import type { BaseWidgetProps } from "../types/WidgetType";

export class BaseDashboard<PropType extends DashboardConfigProps> {
  protected dashboardConfig: PropType;

  constructor(dashboardConfig: PropType) {
    this.dashboardConfig = dashboardConfig;
  }

  get dashboardId() {
    return this.dashboardConfig.dashboardId;
  }
  get version() {
    return this.dashboardConfig.version;
  }

  get title() {
    return this.dashboardConfig.title;
  }

  get layout() {
    return this.dashboardConfig.layout;
  }
}

export abstract class BaseNode<TProps extends NodeBaseProps> {
  protected config: TProps;

  constructor(config: TProps) {
    this.config = config;
  }

  get id() {
    return this.config.id;
  }

  get type() {
    return this.config.type;
  }
}

export abstract class BaseNodeContainer<
  TProps extends ContainerNodeBaseProps
> extends BaseNode<TProps> {
  get gap() {
    return this.config.gap;
  }

  get childrenProps() {
    return this.config.children;
  }
}

export class StackNode extends BaseNodeContainer<StackNodeProps> {
  children: BaseNode<any>[];

  constructor(config: StackNodeProps, children: BaseNode<LayoutNode>[]) {
    super(config);
    this.children = children;
  }
}

export class RowNode extends BaseNodeContainer<RowNodeProps> {
  children: BaseNode<any>[];

  constructor(config: RowNodeProps, children: BaseNode<LayoutNode>[]) {
    super(config);
    this.children = children;
  }
}

export class ColumnNode extends BaseNodeContainer<ColumnNodeProps> {
  children: BaseNode<any>[];

  constructor(config: ColumnNodeProps, children: BaseNode<LayoutNode>[]) {
    super(config);
    this.children = children;
  }
}

export class WidgetNode extends BaseNode<WidgetNodeProps> {
  widget?: BaseWidgetModel<BaseWidgetProps>;

  get widgetId() {
    return this.config.widgetId;
  }

  setWidget(widget: BaseWidgetModel<BaseWidgetProps>) {
    this.widget = widget;
  }

  getWidget() {
    return this.widget;
  }
}
