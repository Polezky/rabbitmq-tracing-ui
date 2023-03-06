import type { LogItem } from "../LogItems/LogItem";
import type { ILogFilterFieldConfig } from "./ILogFilterFieldConfig";
import type { ILogFilterOperation, LogFilterOperationType } from "./ILogFilterOperation";
import { logFilterFieldConfigs } from "./LogFilterFieldConfigs";
import { LogFilterFieldType } from "./LogFilterFieldType";
import { LogFilterOperator } from "./LogFilterOperator";

const textOperations = new Map<LogFilterOperator, ILogFilterOperation<string>>([
  [LogFilterOperator.IsEqual, (v, t) => v === t],
  [LogFilterOperator.IsNotEqual, (v, t) => v !== t],
  [LogFilterOperator.StartsWith, (v, t) => v?.startsWith(t)],
  [LogFilterOperator.EndsWith, (v, t) => v?.endsWith(t)],
  [LogFilterOperator.Includes, (v, t) => v?.includes(t)],
  [LogFilterOperator.DoesNotInclude, (v, t) => !v?.includes(t)],
]) as Map<LogFilterOperator, ILogFilterOperation<LogFilterOperationType>>;

const textArrayOperations = new Map<LogFilterOperator, ILogFilterOperation<string[], string>>([
  [LogFilterOperator.IsEqual, (v, t) => v.some(vv => vv === t)],
  [LogFilterOperator.IsNotEqual, (v, t) => v.some(vv => vv !== t)],
  [LogFilterOperator.StartsWith, (v, t) => v.some(vv => vv?.startsWith(t))],
  [LogFilterOperator.EndsWith, (v, t) => v.some(vv => vv?.endsWith(t))],
  [LogFilterOperator.Includes, (v, t) => v.some(vv => vv?.includes(t))],
  [LogFilterOperator.DoesNotInclude, (v, t) => v.some(vv => !vv?.includes(t))],
]) as Map<LogFilterOperator, ILogFilterOperation<LogFilterOperationType>>;

const numberOperations = new Map<LogFilterOperator, ILogFilterOperation<number>>([
  [LogFilterOperator.IsEqual, (v, t) => v === t],
  [LogFilterOperator.IsNotEqual, (v, t) => v !== t],
  [LogFilterOperator.Greater, (v, t) => v > t],
  [LogFilterOperator.GreaterOrEqual, (v, t) => v >= t],
  [LogFilterOperator.Less, (v, t) => v < t],
  [LogFilterOperator.LessOrEqual, (v, t) => v <= t],
]) as Map<LogFilterOperator, ILogFilterOperation<LogFilterOperationType>>;

const dateOperations = new Map<LogFilterOperator, ILogFilterOperation<Date>>([
  [LogFilterOperator.After, (v, t) => v >= t],
  [LogFilterOperator.Before, (v, t) => v <= t],
]) as Map<LogFilterOperator, ILogFilterOperation<LogFilterOperationType>>;

const fieldTypeOperations = new Map<LogFilterFieldType, Map<LogFilterOperator, ILogFilterOperation<LogFilterOperationType>>>([
  [LogFilterFieldType.Text, textOperations],
  [LogFilterFieldType.TextArray, textArrayOperations],
  [LogFilterFieldType.Number, numberOperations],
  [LogFilterFieldType.DateTime, dateOperations],
]);

export class LogFilterField {
  readonly id;
  targetValue: LogFilterOperationType;
  config: ILogFilterFieldConfig;
  operatorsMap: Map<LogFilterOperator, ILogFilterOperation<LogFilterOperationType>>;
  operators: LogFilterOperator[];
  operator: LogFilterOperator;

  constructor(id?: string) {
    this.id = id || getId();
  }

  get targetDate(): string {
    const date = this.targetValue as Date;
    const offset = date.getTimezoneOffset();
    const utcDate = new Date(date.getTime() - (offset * 60 * 1000));
    return utcDate.toISOString().split('T')[0];
  }

  set targetDate(dateTime: string) {
    this.targetValue = new Date(dateTime);
  }

  get targetTime(): string {
    const date = this.targetValue as Date;
    const offset = date.getTimezoneOffset();
    const utcDate = new Date(date.getTime() - (offset * 60 * 1000));
    return utcDate.toISOString().split('T')[1].split('.')[0];
  }

  set targetTime(value: string) {
    const [hours, minutes] = value.split(':').map(x => parseInt(x));
    (this.targetValue as Date).setHours(hours, minutes, 0, 0);
  }

  configure(config: ILogFilterFieldConfig, targetValue?: string) {
    this.config = config;
    this.operatorsMap = fieldTypeOperations.get(this.config.type)!;
    this.operators = Array.from(this.operatorsMap.keys());
    this.operator = this.operators[0];

    if (this.config.type === LogFilterFieldType.DateTime) {
      this.targetValue = targetValue ? new Date(targetValue) : new Date();
    } else if (this.config.type === LogFilterFieldType.Number) {
      this.targetValue = targetValue ? parseFloat(targetValue) : 0;
    } else if (this.config.type === LogFilterFieldType.Text
      || this.config.type === LogFilterFieldType.TextArray) {
      this.targetValue = targetValue || '';
    } else {
      throw new Error(`Not implemented type ${this.config.type}`);
    }
  }

  filter(logItem: LogItem): boolean {
    const value = logItem[this.config.logItemKey] as LogFilterOperationType;
    const operation = this.operatorsMap.get(this.operator)!;
    return operation(value, this.targetValue);
  }

  static fromObjects(objects: LogFilterField[]): LogFilterField[] {
    return objects.map(object => {
      const field = new LogFilterField(object.id);
      const config = logFilterFieldConfigs.find(c => c.logItemKey === object.config.logItemKey);
      field.configure(config!, object.targetValue as string);
      return field;
    });
  }

}

function getId(): string {
  return Date.now()
    + '-'
    + Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    )
      .toString(36);
}