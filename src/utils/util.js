export function getSortedArray(array) {
  return array.sort((a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });
}

function convertToTwoDigits(value = "") {
  if (value.length < 2) {
    return `0${value}`;
  }
  return value;
}

export function getDateFormat(date) {
  const year = date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();

  day = convertToTwoDigits(day);
  month = convertToTwoDigits(month);

  return `${year}-${month}-${day}`;
}

export function getTimeFormat(time) {
  let hours = "" + time.getHours();
  let minutes = "" + time.getMinutes();
  let seconds = "" + time.getSeconds();

  hours = convertToTwoDigits(hours);
  minutes = convertToTwoDigits(minutes);
  seconds = convertToTwoDigits(seconds);

  return `${hours}:${minutes}:${seconds}`;
}

export function getDateAndTimeFormat(date, time) {
  const dateFormat = getDateFormat(date);
  const timeFormat = getTimeFormat(time);

  return `${dateFormat}T${timeFormat}`;
}
