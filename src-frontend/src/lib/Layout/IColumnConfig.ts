import type { LogItem } from "$lib/LogItem";

export interface IColumnConfig {
  displayName: string;
  logItemKey: keyof LogItem;
  isVisible: boolean;
  index: number;
  width: number;
}
