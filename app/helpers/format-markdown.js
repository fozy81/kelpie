import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import { parse } from 'marked';

export default helper(function ([value]) {
  return htmlSafe(parse(value));
});
