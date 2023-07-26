import dayjs from 'dayjs';

const DATE_FORMAT = {
  year: 'YYYY',
  hoursMins: 'HH:MM',
};


function humanizeDateYear(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT.year) : '';
}

//function humanizeDateHoursMin(dueDate) {
//  return dueDate ? dayjs(dueDate).format(DATE_FORMAT.hoursMins) : '';
//}

export {humanizeDateYear};
