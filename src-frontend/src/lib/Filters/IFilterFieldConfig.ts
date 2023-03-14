import type { ILayoutConfig } from "$lib/Layout/ILayoutConfig";
import type { LogItem } from "$lib/LogItem";
import type { FilterFieldType } from "./FilterFieldType";

export type FieldFormatter = (logItem: LogItem, config: ILayoutConfig) => string;

export interface IFilterFieldConfig {
  type: FilterFieldType;
  displayName: string;
  logItemKey: keyof LogItem;
  getDisplayValue?: FieldFormatter;
}
