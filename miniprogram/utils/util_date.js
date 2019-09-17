const formValidate = function validateHandler(selector, rule, message) {
  var form = $(selector);
  var options = {
    errorElement: 'span',
    errorClass: 'form-error',
    focusInvalid: true,
    focusCleanup: true,
    rules: rule || {},
    messages: message || {}
  };
  return form.validate(options);
}

const fromDateToStr = function (date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const formatCardNo = function (value, len) {
  if (!value) return "";
  // 十六进制
  value = parseInt(value).toString(16);
  //
  var offset = 0;
  if (value.length < len) {
    offset = len - value.length;
  }
  for (var i = 0; i < offset; i++) {
    value = "0" + value;
  }
  // 将值截取为数组
  var list = [];
  var pos = 0;
  for (var i = 0; i < len / 2; i++) {
    list.unshift(value.substr(pos, 2));
    pos = pos + 2;
  }
  value = list.join("");
  return value.toUpperCase();
}

module.exports = {
  formValidate: formValidate,
  fromDateToStr: fromDateToStr,
  formatCardNo: formatCardNo
}