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
  config: ILogFilterFieldConfig;
  operatorsMap: Map<LogFilterOperator, ILogFilterOperation<LogFilterOperationType>>;
  operators: LogFilterOperator[];
  operator: LogFilterOperator;

  constructor(id?: string) {
    this.id = id || getId();
  }

  targetText: string;
  targetNumber: number;
  targetDateTime: string;

  configure(config: ILogFilterFieldConfig) {
    this.config = config;
    this.operatorsMap = fieldTypeOperations.get(this.config.type)!;
    this.operators = Array.from(this.operatorsMap.keys());
    this.operator = this.operators[0];

    this.targetText = '';
    this.targetNumber = 0;

    const offset = new Date().getTimezoneOffset();
    const localDateAsUtc = new Date(new Date().getTime() - (offset * 60 * 1000));
    this.targetDateTime = localDateAsUtc
      .toISOString()
      .split(':')
      .slice(0, -1)
      .join(':');
  }

  filter(logItem: LogItem): boolean {
    const value = logItem[this.config.logItemKey] as LogFilterOperationType;
    const operation = this.operatorsMap.get(this.operator)!;

    let targetValue: LogFilterOperationType;
    if (this.config.type === LogFilterFieldType.DateTime) {
      targetValue = new Date(this.targetDateTime);
    } else if (this.config.type === LogFilterFieldType.Number) {
      targetValue = this.targetNumber;
    } else if (this.config.type === LogFilterFieldType.Text
      || this.config.type === LogFilterFieldType.TextArray) {
      targetValue = this.targetText;
    } else {
      throw new Error(`Not implemented type ${this.config.type}`);
    }

    return operation(value, targetValue);
  }

  static fromObjects(objects: LogFilterField[]): LogFilterField[] {
    return objects.map(object => {
      const field = new LogFilterField(object.id);
      const config = logFilterFieldConfigs.find(c => c.logItemKey === object.config.logItemKey);
      field.configure(config!);

      field.operator = object.operator || field.operators[0];
      field.targetText = object.targetText;
      field.targetNumber = object.targetNumber;
      field.targetDateTime = object.targetDateTime;

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