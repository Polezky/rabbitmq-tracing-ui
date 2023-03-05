import type { LogItem } from "../LogItems/LogItem";
import type { LogFilterFieldType } from "./LogFilterFieldType";

export type LogItemFieldFormatter = (logItem: LogItem) => string;

export interface ILogFilterFieldConfig {
  type: LogFilterFieldType;
  displayName: string;
  logItemKey: keyof LogItem;
  getDisplayValue?: LogItemFieldFormatter;
}
