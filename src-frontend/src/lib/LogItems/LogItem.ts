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
    logItem.payload = tryFormatJson(decodeBase64(logItem.payload));
    return logItem;
  }
}

function decodeBase64(base64: string): string {
  const charCodes = window
    .atob(base64)
    .split('')
    .map(x => x.charCodeAt(0));
  const buffer = Uint8Array.from(charCodes);
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

function tryFormatJson(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    return json;
  }
}