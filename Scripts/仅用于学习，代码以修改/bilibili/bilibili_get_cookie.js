/*********************
bilibili签到 cookie脚本 

create : 2020.06.24 
*********************/

const cookieName = 'bilibili'
const cookieKey = 'cookie_bilibili'
const toolKit = init()
const cookieVal = $request.headers['Cookie']

if (cookieVal) {
  if (toolKit.setdata(cookieVal, cookieKey)) {
    toolKit.msg(`${cookieName}`, '获取Cookie: 成功', `${cookieVal}\n\n\n备注：\nQ：写入 Cookie 成功, 但签到不成功?\n1、看看是不是在登录前就写入 Cookie 了\n2、如果是，请确保在登录成功后，再尝试写入 Cookie`)    
  }
}

function init() {
  // 网络请求部分
  get = (url, cb) => {
    url.method = "GET";
    $task.fetch(url).then((resp) => cb(null, {}, resp.body));
  };
  post = (url, cb) => {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
  }

  // 数据处理部分
  getdata = (key) => {
    return $prefs.valueForKey(key);
  };
  setdata = (key, val) => {
    return $prefs.setValueForKey(key, val);
  };

  // 日志输出部分
  msg = (title, subtitle, body) => {
    $notify(title, subtitle, body);
  };
  log = (message) => {
    console.log(message)
  };
  
  done = (value = {}) => {
    $done(value);
  };

  return { getdata, setdata, get, msg, log,done };
}
toolKit.done()
