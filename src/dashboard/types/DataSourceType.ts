export interface RuntimeDataSources {
  telemetry: {
    heartRate: number;
    moodIndex: number;
    signalSeries: Array<{ t: number; y: number }>;
  };
  session: {
    operatorNote: string;
  };
  alerts: Array<{
    id: string;
    level: "info" | "warning" | "danger";
    message: string;
    ts: string;
  }>;
}
