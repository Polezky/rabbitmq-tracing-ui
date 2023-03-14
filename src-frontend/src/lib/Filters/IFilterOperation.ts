export type FilterOperationType = string | string[] | Date | number;

export interface IFilterOperation<V extends FilterOperationType, T extends FilterOperationType = V> {
  (value: V, targetValue: T): boolean;
}
