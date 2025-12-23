import {
  BaseWidgetProps,
  WidgetType,
  DisplayWidgetProps,
  StaticWidgetProps,
} from "../types/WidgetType";

export abstract class BaseWidgetModel<TProps extends BaseWidgetProps> {
  protected config: TProps;

  constructor(config: TProps) {
    this.config = config;
  }

  get id() {
    return this.config.id;
  }

  get type(): WidgetType {
    return this.config.type;
  }

  get title() {
    return this.config.title;
  }

  setTitle(next: string) {
    this.config = { ...this.config, title: next };
  }

  // The model can always return its config as props
  get props(): TProps {
    return this.config;
  }
}

export abstract class BaseDisplayWidgetModel<
  TProps extends DisplayWidgetProps
> extends BaseWidgetModel<TProps> {
  get dataBinding() {
    return this.config.dataBinding;
  }
  abstract get props(): TProps;
}

// Base class for static widgets
export abstract class BaseStaticWidgetModel<
  TProps extends StaticWidgetProps
> extends BaseWidgetModel<TProps> {
  abstract get props(): TProps;
}
