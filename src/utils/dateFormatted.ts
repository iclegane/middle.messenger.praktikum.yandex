export function isToday(someDate: Date): boolean {
  const today = new Date();

  return someDate.getDate() === today.getDate()
        && someDate.getMonth() == today.getMonth()
        && someDate.getFullYear() == today.getFullYear();
}

export function getMonthByDate(date: Date): string {
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  return months[date.getMonth()];
}

export function dateFormatted(date: string) {
  const dateConstructor = new Date(date);

  if (isToday(dateConstructor)) {
    return `${dateConstructor.getHours()}:${String(dateConstructor.getMinutes()).padStart(2, '0')}`;
  }
  return `${dateConstructor.getDate()} ${getMonthByDate(dateConstructor)}`;
}

export function dateFormattedTime(date: string) {
  const dateConstructor = new Date(date);

  return `${dateConstructor.getHours()}:${String(dateConstructor.getMinutes()).padStart(2, '0')}`;
}

export function getFormattedYear(date: Date): string {
  return String(date.getFullYear());
}

export function getFormattedMonth(date: Date): string {
  return String((date.getMonth() + 1)).padStart(2, '0');
}

export function getFormattedDay(date: Date): string {
  return String((date.getDate())).padStart(2, '0');
}
