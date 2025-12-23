import {
  BaseDashboard,
  StackNode,
  RowNode,
  ColumnNode,
  WidgetNode,
  BaseNode,
} from "../models/DashBoard";

import {
  MetricCardModel,
  FormCardModel,
  AlertListModel,
  StaticBannerModel,
  DisplayLabelModel,
  SignalChartModel,
} from "../models/Widgets";
import type {
  WidgetCatalog,
  WidgetProps,
  MetricCardProps,
  SignalChartProps,
  StaticBannerProps,
  DisplayLabelProps,
  FormCardProps,
  AlertListProps,
} from "../types/WidgetType";

import type {
  DashboardConfigProps,
  LayoutNode,
  StackNodeProps,
  RowNodeProps,
  ColumnNodeProps,
  WidgetNodeProps,
} from "../types/DashboardType";

export class DashboardBuilder {
  private readonly data: DashboardConfigProps;
  private dashboard: BaseDashboard<DashboardConfigProps>;
  private widgetCatalog: Map<string, WidgetProps>;

  constructor(data: DashboardConfigProps, widgetCatalog: WidgetProps[]) {
    this.data = data;
    this.dashboard = new BaseDashboard(data);

    // Build a map for quick widget lookup by id
    this.widgetCatalog = new Map();
    widgetCatalog.forEach((widget) => {
      this.widgetCatalog.set(widget.id, widget);
    });
  }

  getDashboard() {
    return this.dashboard;
  }

  // Recursively build a node and its children
  buildNode(nodeConfig: LayoutNode): BaseNode<LayoutNode> {
    switch (nodeConfig.type) {
      case "stack":
        return this.buildStackNode(nodeConfig);
      case "row":
        return this.buildRowNode(nodeConfig);
      case "column":
        return this.buildColumnNode(nodeConfig);
      case "widget":
        return this.buildWidgetNode(nodeConfig);
      default:
        throw new Error(`Unknown node type: ${(nodeConfig as any).type}`);
    }
  }

  buildStackNode(config: StackNodeProps): StackNode {
    // Recursively build all children
    const children = config.children.map((childConfig) =>
      this.buildNode(childConfig)
    );
    return new StackNode(config, children);
  }

  buildRowNode(config: RowNodeProps): RowNode {
    // Recursively build all children
    const children = config.children.map((childConfig) =>
      this.buildNode(childConfig)
    );
    return new RowNode(config, children);
  }

  buildColumnNode(config: ColumnNodeProps): ColumnNode {
    // Recursively build all children
    const children = config.children.map((childConfig) =>
      this.buildNode(childConfig)
    );
    return new ColumnNode(config, children);
  }

  buildWidgetNode(config: WidgetNodeProps): WidgetNode {
    // Lookup widget configuration from catalog
    const widgetConfig = this.widgetCatalog.get(config.widgetId);

    if (!widgetConfig) {
      throw new Error(`Widget not found in catalog: ${config.widgetId}`);
    }

    // Create the appropriate widget model based on type
    let widgetModel;
    switch (widgetConfig.type) {
      case "MetricCard":
        widgetModel = new MetricCardModel(widgetConfig);
        break;
      case "DisplayLabel":
        widgetModel = new DisplayLabelModel(widgetConfig);
        break;
      case "AlertList":
        widgetModel = new AlertListModel(widgetConfig);
        break;
      case "SignalChart":
        widgetModel = new SignalChartModel(widgetConfig);
        break;
      case "StaticBanner":
        widgetModel = new StaticBannerModel(widgetConfig);
        break;
      case "FormCard":
        widgetModel = new FormCardModel(widgetConfig);
        break;
      default:
        throw new Error(`Unknown widget type: ${(widgetConfig as any).type}`);
    }

    // Create WidgetNode and attach the widget model
    const widgetNode = new WidgetNode(config);
    widgetNode.setWidget(widgetModel);

    return widgetNode;
  }

  // Build the entire layout tree
  buildLayoutTree(): BaseNode<LayoutNode> {
    return this.buildNode(this.data.layout);
  }
}
