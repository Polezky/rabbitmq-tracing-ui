export enum FilterOperator {
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

export const filterOperatorsMap = new Map<FilterOperator, string>([
  [FilterOperator.IsEqual, 'is equal'],
  [FilterOperator.IsNotEqual, 'is not equal'],
  [FilterOperator.Includes, 'includes'],
  [FilterOperator.DoesNotInclude, 'doesn\'t include'],
  [FilterOperator.StartsWith, 'starts with'],
  [FilterOperator.EndsWith, 'ends with'],
  [FilterOperator.Greater, 'is greater'],
  [FilterOperator.GreaterOrEqual, 'is greater or equal'],
  [FilterOperator.Less, 'is less'],
  [FilterOperator.LessOrEqual, 'is less or equal'],
  [FilterOperator.After, 'is after'],
  [FilterOperator.Before, 'is before'],
]);