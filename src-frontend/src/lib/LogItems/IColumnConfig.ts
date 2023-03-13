import type { LogItem } from './LogItem';

export interface IColumnsConfig {
  isEditMode: boolean;
  columns: IColumnConfig[];
  dateTimeFormat: string;
  shouldFormatPayload: boolean;
  canAdjustColumnWidths: boolean;
}

export interface IColumnConfig {
  displayName: string;
  logItemKey: keyof LogItem;
  isVisible: boolean;
  index: number;
  width: number;
}