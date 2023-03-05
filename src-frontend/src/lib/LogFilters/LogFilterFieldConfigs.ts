import type { LogItem } from "$lib/LogItems/LogItem";
import type { ILogFilterFieldConfig } from "./ILogFilterFieldConfig";
import { LogFilterFieldType } from "./LogFilterFieldType";

export const logFilterFieldConfigs: Readonly<ILogFilterFieldConfig>[] = [
  Object.freeze({
    type: LogFilterFieldType.DateTime,
    displayName: 'Date & Time',
    logItemKey: 'timestamp',
    getDisplayValue: (logItem: LogItem) => logItem.timestamp.toISOString(),
  }),
  Object.freeze({ type: LogFilterFieldType.Number, displayName: 'Channel', logItemKey: 'channel' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'Connection', logItemKey: 'connection' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'Exchange', logItemKey: 'exchange' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'Node', logItemKey: 'node' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'Payload', logItemKey: 'payload' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'Queue', logItemKey: 'queue' }),
  Object.freeze({ type: LogFilterFieldType.TextArray, displayName: 'Routed Queues', logItemKey: 'routed_queues' }),
  Object.freeze({ type: LogFilterFieldType.TextArray, displayName: 'Routing Keys', logItemKey: 'routing_keys' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'Type', logItemKey: 'type' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'User', logItemKey: 'user' }),
  Object.freeze({ type: LogFilterFieldType.Text, displayName: 'Vhost', logItemKey: 'vhost' }),
  Object.freeze({ type: LogFilterFieldType.Number, displayName: 'Delivery Mode', logItemKey: 'delivery_mode' }),
];
