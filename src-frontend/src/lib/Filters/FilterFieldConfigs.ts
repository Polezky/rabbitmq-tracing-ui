import type { ILayoutConfig } from "$lib/Layout/ILayoutConfig";
import type { LogItem } from "$lib/LogItem";
import { format } from "date-fns";
import type { IFilterFieldConfig } from "./IFilterFieldConfig";
import { FilterFieldType } from "./FilterFieldType";

export const filterFieldConfigs: Readonly<IFilterFieldConfig>[] = [
  Object.freeze({
    type: FilterFieldType.DateTime,
    displayName: 'Date & Time',
    logItemKey: 'timestamp',
    getDisplayValue: (logItem: LogItem, config: ILayoutConfig) => format(logItem.timestamp, config.dateTimeFormat),
  }),
  Object.freeze({ type: FilterFieldType.Number, displayName: 'Channel', logItemKey: 'channel' }),
  Object.freeze({ type: FilterFieldType.Text, displayName: 'Connection', logItemKey: 'connection' }),
  Object.freeze({ type: FilterFieldType.Text, displayName: 'Exchange', logItemKey: 'exchange' }),
  Object.freeze({ type: FilterFieldType.Text, displayName: 'Node', logItemKey: 'node' }),
  Object.freeze({
    type: FilterFieldType.Text,
    displayName: 'Payload',
    logItemKey: 'payload',
    getDisplayValue: getPayloadDisplayValue,
  }),
  Object.freeze({ type: FilterFieldType.Text, displayName: 'Queue', logItemKey: 'queue' }),
  Object.freeze({ type: FilterFieldType.TextArray, displayName: 'Routed Queues', logItemKey: 'routed_queues' }),
  Object.freeze({ type: FilterFieldType.TextArray, displayName: 'Routing Keys', logItemKey: 'routing_keys' }),
  Object.freeze({ type: FilterFieldType.Text, displayName: 'Type', logItemKey: 'type' }),
  Object.freeze({ type: FilterFieldType.Text, displayName: 'User', logItemKey: 'user' }),
  Object.freeze({ type: FilterFieldType.Text, displayName: 'Vhost', logItemKey: 'vhost' }),
  Object.freeze({ type: FilterFieldType.Number, displayName: 'Delivery Mode', logItemKey: 'delivery_mode' }),
];


function getPayloadDisplayValue(logItem: LogItem, config: ILayoutConfig): string {
  if (config.shouldFormatPayload) {
    return `<pre class="ellipsis">${logItem.formattedPayload}</pre>`
  }
  return logItem.payload;
}