export type PropertyValue = unknown;

export type ValueType =
  | "INT"
  | "FLOAT"
  | "STRING"
  | "BOOLEAN"
  | "VECTOR"
  | "UNKNOWN";

export type AccessMode = "RO" | "WO" | "RW";
export type AccessLevel = "USER" | "OPERATOR" | "ENGINEER" | "ADMIN";

// --- 1. Schema: what the property IS ----------------------------------------

export interface PropertySchema {
  /** Unique id of the property (within a device or globally) */
  propertyId: string;

  /** Logical path, e.g. "axis[0].position" */
  propertyPath: string;

  /** Type of value (int, float, vector, etc.) */
  valueType: ValueType;

  /** Default value if device hasn’t sent anything yet */
  defaultValue?: PropertyValue;

  /** Read/write semantics */
  accessMode: AccessMode;

  /** Minimum access level required to change it */
  requiredAccessLevel: AccessLevel;

  /** Domain specific usage, e.g. "Monitoring", "Control", "Config" */
  assignment: string;

  /** Human-facing label, e.g. "Motor Speed" */
  displayName: string;

  /** How UI should render it, e.g. "slider", "checkbox", "vector-graph" */
  displayType: string;

  /** Internal code, permission key, or feature flag */
  accessCode: string;

  /** Unit label, e.g. "°C", "rpm", "V" */
  unitLabel: string;
}

// --- 2. Config updates ------------------------------------------------------

export interface ConfigUpdate {
  previousValue: PropertyValue;
  newValue: PropertyValue;
  timestamp: Date;
  schemaVersion?: string;
  propertyId?: string;
  bindingId?: string;
}

// --- 3. Runtime attributes (optional, from backend) -------------------------

export interface PropertyAttributes {
  /** Optional extra display name override */
  displayedName?: string;

  /** Pure unit symbol, if you need it separate from schema.unitLabel */
  unitSymbol?: string;

  /** e.g. "k", "M" for kilo/mega */
  metricPrefixSymbol?: string;

  /** Should this value go into historicData according to backend policy? */
  archivePolicy?: number;
}

// --- 4. Binding: what the property is doing RIGHT NOW -----------------------

export interface PropertyBinding {
  /** Arbitrary attributes coming from backend / device */
  attributes: PropertyAttributes;

  /** Latest value + when it was last updated */
  timestamp: string; // ISO string
  value: PropertyValue; // current value

  /** Optional: last raw value we saw directly from the device */
  lastKnownDeviceValue?: PropertyValue;

  /** History of config changes */
  configUpdates: Map<Date, ConfigUpdate>;

  /** Samples over time */
  historicData: Map<Date, PropertyValue>;
}

// --- 5. Models & proxies ----------------------------------------------------

export interface BasePropertyModel {
  /** Convenience id (same as schema.propertyId usually) */
  propertyId: string;

  /** Static definition */
  schema: PropertySchema;

  /** Live state rep */
  binding: PropertyBinding;
}

export interface BaseDeviceModel {
  deviceId: string;
  classId: string;
  status: "OFFLINE" | "ONLINE" | "ALIVE";

  /** key = property path or id */
  properties: Record<string, BasePropertyModel>;
}

export type BaseDeviceProxy = Map<string, BaseDeviceModel>;
export type BasePropertyProxy = Map<string, BasePropertyModel>;
