import { DataBinding } from "../types/WidgetType";
import { RuntimeDataSources } from "../types/DataSourceType";

export function resolveBinding(
  binding: DataBinding,
  data: RuntimeDataSources
): unknown {
  const { source, path } = binding;

  // Special case: "$" means “the whole thing”
  if (path === "$") return data[source];

  const bucket: any = data[source];

  // Simple path like "heartRate" or "operatorNote"
  return bucket?.[path];
}
