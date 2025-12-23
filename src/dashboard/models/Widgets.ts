import { RuntimeDataSources } from "../types/DataSourceType";
import type {
  MetricCardProps,
  DisplayLabelProps,
  AlertListProps,
  SignalChartProps,
  StaticBannerProps,
  FormCardProps,
} from "../types/WidgetType";
import { BaseDisplayWidgetModel, BaseStaticWidgetModel } from "./Base";

// ========== Display Widgets (data-driven) ==========

export class MetricCardModel extends BaseDisplayWidgetModel<MetricCardProps> {
  get props(): MetricCardProps {
    return this.config;
  }

  resolveValue(data: RuntimeDataSources): number | null {
    const { source, path } = this.dataBinding;

    // source is "telemetry" | "session" | "alerts"
    const bucket = data[source];

    // bucket is union, so we narrow safely
    if (source === "telemetry") {
      const value = bucket[path as keyof typeof bucket];
      return typeof value === "number" ? value : null;
    }

    return null; // MetricCard expects number; session/alerts don't fit
  }
}

export class DisplayLabelModel extends BaseDisplayWidgetModel<DisplayLabelProps> {
  get props(): DisplayLabelProps {
    return this.config;
  }

  resolveValue(data: RuntimeDataSources): string | null {
    const { source, path } = this.dataBinding;

    if (source === "session") {
      const value = data.session[path as keyof typeof data.session];
      return typeof value === "string" ? value : null;
    }

    return null; // DisplayLabel expects string; telemetry/alerts don't fit
  }
}

export class AlertListModel extends BaseDisplayWidgetModel<AlertListProps> {
  get props(): AlertListProps {
    return this.config;
  }

  resolveValue(data: RuntimeDataSources): RuntimeDataSources["alerts"] {
    const { source, path } = this.dataBinding;

    // Special case: path "$" means return entire data source
    if (path === "$" && source === "alerts") {
      return data.alerts;
    }

    return [];
  }
}

export class SignalChartModel extends BaseDisplayWidgetModel<SignalChartProps> {
  get props(): SignalChartProps {
    return this.config;
  }

  resolveValue(data: RuntimeDataSources): Array<{ t: number; y: number }> {
    const { source, path } = this.dataBinding;

    if (source === "telemetry" && path === "signalSeries") {
      return data.telemetry.signalSeries;
    }

    return [];
  }
}

// ========== Static Widgets ==========

export class StaticBannerModel extends BaseStaticWidgetModel<StaticBannerProps> {
  get props(): StaticBannerProps {
    return this.config;
  }
}

export class FormCardModel extends BaseStaticWidgetModel<FormCardProps> {
  get props(): FormCardProps {
    return this.config;
  }
}
