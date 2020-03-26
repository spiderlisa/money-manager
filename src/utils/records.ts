import { Record } from '@/store/models';

export interface RecordsDay {
  date: string;
  records: Record[];
}

function dayWithDate(days: RecordsDay[], date: string): RecordsDay | null {
  let day = null;
  days.forEach((d: RecordsDay) => {
    if ((new Date(d.date)).toLocaleDateString() === (new Date(date)).toLocaleDateString()) {
      day = d;
    }
  });

  return day;
}

export function groupRecordsByDate(journal: Record[]): RecordsDay[] {
  const days: RecordsDay[] = [];

  journal.forEach((record: Record) => {
    const date = record.recordDate;
    const day = dayWithDate(days, date);

    if (day) {
      day.records.push(record);
    } else {
      days.push({
        date: date,
        records: [record]
      });
    }
  });

  days.sort((d1: RecordsDay, d2: RecordsDay) => {
    if (d1.date > d2.date) return -1;
    if (d1.date < d2.date) return 1;
    return 0;
  });

  return days;
}
