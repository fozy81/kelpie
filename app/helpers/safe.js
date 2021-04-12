import { helper } from '@ember/component/helper';

function safe(value) {
  let textContent = value;
  console.log('colour: ' + value);
  return value;
}

export default helper(safe);
