/*********************
bilibili签到脚本 

create : 2020.06.24 
*********************/

const cookieName = "bilibili";
const cookieKey = "test_cookie_bilibili_2";
const toolKit = init();
const cookieVal = toolKit.getdata(cookieKey);

sign();

function sign() {
  let url = {
    url: `https://api.live.bilibili.com/sign/doSign`,
    headers: {
      Cookie: cookieVal,
    },
  };

  toolKit.get(url, (error, response, data) => {
    let result = JSON.parse(data);
    let title = `${cookieName}`;

    if (result && result.code == 0) {
      // 签到成功
      let subTitle = `签到结果: 成功`;
      let detail = `本月累计: ${result.data.hadSignDays}/${result.data.allDays}次, 说明: ${result.data.text}`;
      toolKit.msg(title, subTitle, detail);
    } else {
      // 签到失败
      let subTitle = `签到结果: 失败`;
      let detail = `说明: ${result.message}`;
      toolKit.msg(title, subTitle, detail);
    }
    toolKit.log(`${cookieName}, data: ${data}`);
    toolKit.done();
  });
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
    console.log(key, $prefs.valueForKey(key));
    $prefs.setValueForKey(key, "");
    // console.log("2", $prefs.valueForKey(key));
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
