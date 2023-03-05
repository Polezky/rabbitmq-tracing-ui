export enum LogFilterOperator {
  IsEqual,
  IsNotEqual,
  Includes,
  DoesNotInclude,
  StartsWith,
  EndsWith,
  Greater,
  GreaterOrEqual,
  Less,
  LessOrEqual,
  After,
  Before
}

export const logFilterOperatorsMap = new Map<LogFilterOperator, string>([
  [LogFilterOperator.IsEqual, 'is equal'],
  [LogFilterOperator.IsNotEqual, 'is not equal'],
  [LogFilterOperator.Includes, 'includes'],
  [LogFilterOperator.DoesNotInclude, 'doesn\'t include'],
  [LogFilterOperator.StartsWith, 'starts with'],
  [LogFilterOperator.EndsWith, 'ends with'],
  [LogFilterOperator.Greater, 'is greater'],
  [LogFilterOperator.GreaterOrEqual, 'is greater or equal'],
  [LogFilterOperator.Less, 'is less'],
  [LogFilterOperator.LessOrEqual, 'is less or equal'],
  [LogFilterOperator.After, 'is after'],
  [LogFilterOperator.Before, 'is before'],
]);