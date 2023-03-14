import type { IFilterFieldConfig } from "./IFilterFieldConfig";
import type { IFilterOperation, FilterOperationType } from "./IFilterOperation";
import { filterFieldConfigs } from "./FilterFieldConfigs";
import { FilterFieldType } from "./FilterFieldType";
import { FilterOperator } from "./FilterOperator";
import type { LogItem } from "$lib/LogItem";

const textOperations = new Map<FilterOperator, IFilterOperation<string>>([
  [FilterOperator.IsEqual, (v, t) => v === t],
  [FilterOperator.IsNotEqual, (v, t) => v !== t],
  [FilterOperator.StartsWith, (v, t) => v?.startsWith(t)],
  [FilterOperator.EndsWith, (v, t) => v?.endsWith(t)],
  [FilterOperator.Includes, (v, t) => v?.includes(t)],
  [FilterOperator.DoesNotInclude, (v, t) => !v?.includes(t)],
]) as Map<FilterOperator, IFilterOperation<FilterOperationType>>;

const textArrayOperations = new Map<FilterOperator, IFilterOperation<string[], string>>([
  [FilterOperator.IsEqual, (v, t) => v.some(vv => vv === t)],
  [FilterOperator.IsNotEqual, (v, t) => v.some(vv => vv !== t)],
  [FilterOperator.StartsWith, (v, t) => v.some(vv => vv?.startsWith(t))],
  [FilterOperator.EndsWith, (v, t) => v.some(vv => vv?.endsWith(t))],
  [FilterOperator.Includes, (v, t) => v.some(vv => vv?.includes(t))],
  [FilterOperator.DoesNotInclude, (v, t) => v.some(vv => !vv?.includes(t))],
]) as Map<FilterOperator, IFilterOperation<FilterOperationType>>;

const numberOperations = new Map<FilterOperator, IFilterOperation<number>>([
  [FilterOperator.IsEqual, (v, t) => v === t],
  [FilterOperator.IsNotEqual, (v, t) => v !== t],
  [FilterOperator.Greater, (v, t) => v > t],
  [FilterOperator.GreaterOrEqual, (v, t) => v >= t],
  [FilterOperator.Less, (v, t) => v < t],
  [FilterOperator.LessOrEqual, (v, t) => v <= t],
]) as Map<FilterOperator, IFilterOperation<FilterOperationType>>;

const dateOperations = new Map<FilterOperator, IFilterOperation<Date>>([
  [FilterOperator.After, (v, t) => v >= t],
  [FilterOperator.Before, (v, t) => v <= t],
]) as Map<FilterOperator, IFilterOperation<FilterOperationType>>;

const fieldTypeOperations = new Map<FilterFieldType, Map<FilterOperator, IFilterOperation<FilterOperationType>>>([
  [FilterFieldType.Text, textOperations],
  [FilterFieldType.TextArray, textArrayOperations],
  [FilterFieldType.Number, numberOperations],
  [FilterFieldType.DateTime, dateOperations],
]);

export class FilterField {
  readonly id;
  config: IFilterFieldConfig;
  operatorsMap: Map<FilterOperator, IFilterOperation<FilterOperationType>>;
  operators: FilterOperator[];
  operator: FilterOperator;

  constructor(id?: string) {
    this.id = id || getId();
  }

  targetText: string;
  targetNumber: number;
  targetDateTime: string;

  configure(config: IFilterFieldConfig) {
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
    const value = logItem[this.config.logItemKey] as FilterOperationType;
    const operation = this.operatorsMap.get(this.operator)!;

    let targetValue: FilterOperationType;
    if (this.config.type === FilterFieldType.DateTime) {
      targetValue = new Date(this.targetDateTime);
    } else if (this.config.type === FilterFieldType.Number) {
      targetValue = this.targetNumber;
    } else if (this.config.type === FilterFieldType.Text
      || this.config.type === FilterFieldType.TextArray) {
      targetValue = this.targetText;
    } else {
      throw new Error(`Not implemented type ${this.config.type}`);
    }

    return operation(value, targetValue);
  }

  static fromObjects(objects: FilterField[]): FilterField[] {
    return objects.map(object => {
      const field = new FilterField(object.id);
      const config = filterFieldConfigs.find(c => c.logItemKey === object.config.logItemKey);
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