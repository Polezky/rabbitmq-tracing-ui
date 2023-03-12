import { logFilterFieldConfigs } from "$lib/LogFilters/LogFilterFieldConfigs";
import type { IColumnConfig, IColumnsConfig } from "./IColumnConfig";
import { writable } from 'svelte/store';
import { dateTimeFormatItems } from "./DateTimeFormatItem";

const localStorageKey = 'logItemColumnsConfig';

let columns: IColumnConfig[] = [];

export const logItemColumnConfig = writable<IColumnsConfig>(getOrCreateConfig());

export function updateDateTimeFormat(dateTimeFormat: string): void {
  logItemColumnConfig.update(c => ({ ...c, dateTimeFormat }));
}

export function toggleShouldFormatPayload(): void {
  logItemColumnConfig.update(c => ({ ...c, shouldFormatPayload: !c.shouldFormatPayload }));
}

export function toggleColumnVisibility(column: IColumnConfig): void {
  column.isVisible = !column.isVisible;
  updateState({ columns: getSortedColumns(columns) });
}

export function moveColumnLeft(column: IColumnConfig): void {
  moveColumn(column, false);
}

export function moveColumnRight(column: IColumnConfig): void {
  moveColumn(column, true);
}

export function canMoveColumnLeft(column: IColumnConfig): boolean {
  const visibleColumns = getVisibleColumns();
  return column.index > Math.min(...visibleColumns.map((c) => c.index));
}

export function canMoveColumnRight(column: IColumnConfig): boolean {
  const visibleColumns = getVisibleColumns();
  return column.index < Math.max(...visibleColumns.map((c) => c.index));
}

export function getVisibleColumns(): IColumnConfig[] {
  return columns.filter(c => c.isVisible);
}

logItemColumnConfig.subscribe(c => {
  columns = c.columns;
  saveConfig(c);
});

function getOrCreateConfig(): IColumnsConfig {
  const json = typeof localStorage !== 'undefined'
    ? localStorage.getItem(localStorageKey)
    : undefined;

  if (json) {
    return JSON.parse(json);
  }

  const defaultColumns = logFilterFieldConfigs
    .map<IColumnConfig>(({ displayName, logItemKey }, index) => ({
      displayName,
      logItemKey,
      isVisible: true,
      index
    }));

  return {
    isEditMode: false,
    columns: getSortedColumns(defaultColumns),
    dateTimeFormat: dateTimeFormatItems[0].format,
    shouldFormatPayload: false,
  };
}

function saveConfig(config: IColumnsConfig): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  const json = JSON.stringify(config);
  localStorage.setItem(localStorageKey, json);
}

function moveColumn(column: IColumnConfig, toRight: boolean): void {
  if ((toRight && !canMoveColumnRight(column))
    || (!toRight && !canMoveColumnLeft(column))) {
    return;
  }
  const visibleColumns = getVisibleColumns();
  const columnIndex = column.index;
  const otherColumn = toRight
    ? visibleColumns.find((c) => c.index > columnIndex)!
    : visibleColumns.reverse().find((c) => c.index < columnIndex)!;
  column.index = otherColumn.index;
  otherColumn.index = columnIndex;
  updateState({ columns: getSortedColumns(columns) });
}

function updateState(config: Partial<IColumnsConfig>): void {
  logItemColumnConfig.update(c => ({ ...c, ...config }));
}

function getSortedColumns(columns: IColumnConfig[]): IColumnConfig[] {
  return columns.sort((a, b) => a.index - b.index);
}