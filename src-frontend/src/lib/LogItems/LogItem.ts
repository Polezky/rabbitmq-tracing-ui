export class LogItem {
  channel: number;
  connection: string;
  exchange: string;
  node: string;
  payload: string;
  properties: {
    delivery_mode: number;
  };
  queue: string;
  routed_queues: string[];
  routing_keys: string[];
  timestamp: Date;
  type: string;
  user: string;
  vhost: string;

  delivery_mode: number;

  constructor(item: LogItem) {
    Object.assign(this, item);
  }

  static fromJson(json: string): LogItem {
    const logItem = new LogItem(JSON.parse(json));
    logItem.timestamp = new Date(logItem.timestamp);
    logItem.delivery_mode = logItem.properties.delivery_mode;
    logItem.payload = window.atob(logItem.payload);
    return logItem;
  }
}
