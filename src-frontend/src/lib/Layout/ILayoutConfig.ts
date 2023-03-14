import type { IColumnConfig } from './IColumnConfig';

export interface ILayoutConfig {
  isEditMode: boolean;
  columns: IColumnConfig[];
  dateTimeFormat: string;
  shouldFormatPayload: boolean;
  canAdjustColumnWidths: boolean;
}

