
export type LogFilterOperationType = string | string[] | Date | number;

export interface ILogFilterOperation<V extends LogFilterOperationType, T extends LogFilterOperationType = V> {
  (value: V, targetValue: T): boolean;
}
