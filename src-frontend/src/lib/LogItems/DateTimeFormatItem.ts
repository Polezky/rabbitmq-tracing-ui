import { format } from "date-fns";

export class DateTimeFormatItem {
  _dateTimeFormat: string;
  example: string;

  constructor(
    dateTimeFormat: string,

  ) {
    this.format = dateTimeFormat;
  }

  get format(): string {
    return this._dateTimeFormat;
  }

  set format(value: string) {
    this._dateTimeFormat = value;
    this.example = format(new Date(), this._dateTimeFormat);
  }

}

export const dateTimeFormatItems = [
  new DateTimeFormatItem('MMM dd H:mm:ss.SSS'),
  new DateTimeFormatItem('MMM d H:mm:ss'),
  new DateTimeFormatItem('MM/dd/yyyy H:mm:ss.SSS'),
  new DateTimeFormatItem('MM/dd/yyyy H:mm:ss'),
  new DateTimeFormatItem('dd-MM-yyyy H:mm:ss.SSS'),
  new DateTimeFormatItem('dd-MM-yyyy H:mm:ss'),
]