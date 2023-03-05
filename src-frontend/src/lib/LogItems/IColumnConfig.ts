import type { LogItem } from './LogItem';
export interface IColumnConfig {
  displayName: string;
  logItemKey: keyof LogItem;
  isVisible: boolean;
  index: number;
}