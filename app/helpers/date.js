import { helper } from '@ember/component/helper';

function date(longDate) {
  if (longDate[0] != undefined) {
    console.log(longDate);
    let date = new Date(longDate);
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let newDate = date.getFullYear() + '-' + month + '-' + day;
    return newDate;
  } else {
    return;
  }
}

export default helper(date);
