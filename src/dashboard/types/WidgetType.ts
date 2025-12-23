import { RuntimeDataSources } from "./DataSourceType";

export interface WidgetCatalog {
  widgets: WidgetProps[];
}

export type WidgetProps =
  | MetricCardProps
  | StaticBannerProps
  | DisplayLabelProps
  | AlertListProps
  | FormCardProps
  | SignalChartProps;

export type WidgetType =
  | "MetricCard"
  | "StaticBanner"
  | "DisplayLabel"
  | "AlertList"
  | "FormCard"
  | "SignalChart";

export interface BaseWidgetProps {
  id: string;
  type: WidgetType;
  title: string;
}

// Base for widgets that consume live data
export interface DisplayWidgetProps extends BaseWidgetProps {
  dataBinding: DataBinding;
}

// Base for widgets with static content only
export interface StaticWidgetProps extends BaseWidgetProps {
  // No dataBinding - purely static
}

// keys in the dataSources object
export type DataSourceKey = keyof RuntimeDataSources;

export interface DataBinding<S extends DataSourceKey = DataSourceKey> {
  source: S;
  path: string;
}

// ---------- common configs ----------
export interface FormatConfig {
  unit: string;
  decimals: number;
}

export type ThresholdOp = ">" | "<" | ">=" | "<=" | "==" | "!=";

export type Severity = "info" | "warning" | "danger";

export interface ThresholdConfig {
  op: ThresholdOp;
  value: number;
  severity: Severity;
  label: string;
}

// ---------- widgets ----------
// Data-driven widgets
export interface MetricCardProps extends DisplayWidgetProps {
  type: "MetricCard";
  format: FormatConfig;
  thresholds: ThresholdConfig[];
}

export interface DisplayLabelProps extends DisplayWidgetProps {
  type: "DisplayLabel";
}

export interface AlertListProps extends DisplayWidgetProps {
  type: "AlertList";
  maxItems: number;
}

// Static widgets
export interface StaticBannerProps extends StaticWidgetProps {
  type: "StaticBanner";
  text: string;
  variant: Severity | "success"; // allow "info" etc; extend if you want
}

export type FieldKind = "TextInput" | "Select" | "Toggle";

export interface FormSchema {
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  kind: FieldKind;
  required: boolean;

  // optional constraints depending on kind
  minLen?: number;
  pattern?: string;
  options?: string[];
}

export interface SubmitAction {
  type: "toast" | "noop";
  message: string;
}

export interface FormCardProps extends StaticWidgetProps {
  type: "FormCard";
  schema: FormSchema;
  submitAction: SubmitAction; // sibling of schema (matches your JSON)
}

// Chart config (rename to avoid collision)
export interface DownsampleConfig {
  enabled: boolean;
  targetPoints: number;
}

export interface ChartConfig {
  downsample: DownsampleConfig;
}

export interface SignalChartProps extends DisplayWidgetProps {
  type: "SignalChart";
  chart: ChartConfig;
}
