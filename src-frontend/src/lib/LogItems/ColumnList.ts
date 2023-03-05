import { logFilterFieldConfigs } from "$lib/LogFilters/LogFilterFieldConfigs";
import type { IColumnConfig } from "./IColumnConfig";
import { writable } from 'svelte/store';

const localStorageKey = 'logItemColumnList';

interface IColumnsConfig {
  isEditMode: boolean;
  columns: IColumnConfig[];
}

export const logItemColumnConfig = writable<IColumnsConfig>({ isEditMode: false, columns: [] });

let _instance: LogItemColumnList;

export class LogItemColumnList {
  constructor(private columns: IColumnConfig[]) {
    logItemColumnConfig.update(config => ({ ...config, columns: this.columns }));
  }

  toggleColumnVisibility(column: IColumnConfig): void {
    column.isVisible = !column.isVisible;
    const isEditMode = this.columns.some((c) => c.isVisible) ? undefined : false;
    this.saveColumnsAndUpdateStore(isEditMode);
  }

  moveColumnLeft(column: IColumnConfig): void {
    this.moveColumn(column, false);
  }

  moveColumnRight(column: IColumnConfig): void {
    this.moveColumn(column, true);
  }

  canMoveColumnLeft(column: IColumnConfig): boolean {
    const visibleColumns = this.getVisibleColumns();
    return column.index > Math.min(...visibleColumns.map((c) => c.index));
  }

  canMoveColumnRight(column: IColumnConfig): boolean {
    const visibleColumns = this.getVisibleColumns();
    return column.index < Math.max(...visibleColumns.map((c) => c.index));
  }

  getVisibleColumns(): IColumnConfig[] {
    return this.columns.filter(c => c.isVisible);
  }

  private moveColumn(column: IColumnConfig, toRight: boolean): void {
    if ((toRight && !this.canMoveColumnRight(column)) || (!toRight && !this.canMoveColumnLeft(column))) {
      return;
    }
    const visibleColumns = this.getVisibleColumns();
    const columnIndex = column.index;
    const otherColumn = toRight
      ? visibleColumns.find((c) => c.index > columnIndex)!
      : visibleColumns.reverse().find((c) => c.index < columnIndex)!;
    column.index = otherColumn.index;
    otherColumn.index = columnIndex;
    this.columns = getSortedColumns(this.columns);
    this.saveColumnsAndUpdateStore();
  }

  private saveColumnsAndUpdateStore(isEditMode?: boolean): void {
    this.save();
    logItemColumnConfig.update(config => {
      return {
        columns: this.columns,
        isEditMode: isEditMode === undefined ? config.isEditMode : isEditMode
      };
    });
  }

  private save(): void {
    const json = JSON.stringify(this.columns);
    localStorage.setItem(localStorageKey, json);
  }

  static get instance(): LogItemColumnList {
    if (!_instance) {
      const columns = getOrCreateColumns();
      _instance = new LogItemColumnList(columns);
    }
    return _instance;
  }
}

function getOrCreateColumns(): IColumnConfig[] {
  let columns: IColumnConfig[];
  const json = typeof localStorage !== 'undefined'
    ? localStorage.getItem(localStorageKey)
    : undefined;

  if (json) {
    columns = JSON.parse(json!);
  } else {
    columns = logFilterFieldConfigs
      .map<IColumnConfig>(({ displayName, logItemKey }, index) => ({
        displayName,
        logItemKey,
        isVisible: true,
        index
      }));
  }
  return getSortedColumns(columns);
}

function getSortedColumns(columns: IColumnConfig[]): IColumnConfig[] {
  return columns.sort((a, b) => a.index - b.index);
}