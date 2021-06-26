/*********************
iQIYI 签到 cookie脚本

create : 2020.06.24 
*********************/

var cookie = "";
const cookieKey = "test_cookie_iQIYI_34";
const cookieTimeKey = "CookieQYTime";
var LogDetails = false; // 响应日志

var out = 0; // 超时 (毫秒) 如填写, 则不少于3000
var $toolKit = toolKit();

(async () => {
  out = $toolKit.read("iQIYI_TimeOut") || out;
  cookie = cookie || $toolKit.read(cookieKey);
  LogDetails = $toolKit.read("iQIYI_LogDetails") === "true" ? true : LogDetails;
  if ($toolKit.isRequest) {
    GetCookie();
  } else if (cookie) {
    await login();
    await Checkin();
    await Lottery(500);
    await $toolKit.time();
  } else {
    $toolKit.notify("爱奇艺会员", "", "签到终止, 未获取Cookie");
  }
})().finally(() => {
  $toolKit.done();
});

function GetCookie() {
  var CKA = $request.url.match(/(psp_cki=|P00001=|authcookie=)([A-Za-z0-9]+)/);
  var CKB = JSON.stringify($request.headers).match(
    /(psp_cki=|P00001=|authcookie=)([A-Za-z0-9]+)/
  );
  var iQIYI = CKA || CKB || null;
  //
  var RA = $toolKit.read(cookieKey);
  if (iQIYI) {
    if (RA != iQIYI[2]) {      
      if (!$toolKit.write(iQIYI[2], cookieKey)) {
        $toolKit.notify(`${RA ? `更新` : `首次写入`}爱奇艺签到Cookie失败‼️`,"","");
      } else {
        var oldTime = $toolKit.read(cookieTimeKey);
        // 21600
        if (!oldTime || (oldTime && (Date.now() - oldTime) / 1000 >= 21600)) {
          $toolKit.write(JSON.stringify(Date.now()), cookieTimeKey);
          $toolKit.notify(`${RA ? `更新` : `首次写入`}爱奇艺签到Cookie成功 🎉`,"","");          
        } else {
          console.log(`\n更新爱奇艺Cookie成功! 🎉\n检测到频繁通知, 已转为输出日志`);
          $toolKit.notify("更新爱奇艺Cookie成功!","","");
        }
      }
    } else {
      console.log("\n爱奇艺-与本机储存Cookie相同, 跳过写入 ⚠️");
      $toolKit.notify("爱奇艺-与本机储存Cookie相同, 跳过写入 ⚠️","","");
    }
  } else {
    console.log("\n爱奇艺-请求不含Cookie, 跳过写入‼️");
    $toolKit.notify("爱奇艺-请求不含Cookie, 跳过写入‼️","","");
  }
}

function toolKit() {
  const times = 0;
  const start = Date.now();
  const isRequest = typeof $request != "undefined";
  const isQuanX = typeof $task != "undefined";
  const isNode = typeof require == "function" ;
  const node = (() => {
    if (isNode) {
      const request = require("request");
      return {
        request,
      };
    } else {
      return null;
    }
  })();
  const notify = (title, subtitle, message) => {
    if (isQuanX) $notify(title, subtitle, message);    
    if (isNode) log("\n" + title + "\n" + subtitle + "\n" + message);
  };
  const write = (value, key) => {
    return $prefs.setValueForKey(value, key);
  };
  const read = (key) => {
    return $prefs.valueForKey(key);
  };
  const adapterStatus = (response) => {
    if (response) {
      if (response.status) {
        response["statusCode"] = response.status;
      } else if (response.statusCode) {
        response["status"] = response.statusCode;
      }
    }
    return response;
  };
  const get = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string")
        options = {
          url: options,
        };
      options["method"] = "GET";
      $task.fetch(options).then(
        (response) => {
          callback(null, adapterStatus(response), response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
        
    if (isNode) {
      node.request(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
  };

  const log = (message) => console.log(message);
  const time = () => {
    const end = ((Date.now() - start) / 1000).toFixed(2);
    return console.log("\n签到用时: " + end + " 秒");
  };
  const done = (value = {}) => {
    return $done(value);
  };
  return {
    isRequest,
    isNode,
    notify,
    write,
    read,
    get,
    log,
    time,
    times,
    done,
  };
}

function login() {
  return new Promise((resolve) => {
    var URL = {
      url:
        "https://cards.iqiyi.com/views_category/3.0/vip_home?secure_p=iPhone&scrn_scale=0&dev_os=0&ouid=0&layout_v=6&psp_cki=" +
        cookie +
        "&page_st=suggest&app_k=8e48946f144759d86a50075555fd5862&dev_ua=iPhone8%2C2&net_sts=1&cupid_uid=0&xas=1&init_type=6&app_v=11.4.5&idfa=0&app_t=0&platform_id=0&layout_name=0&req_sn=0&api_v=0&psp_status=0&psp_uid=451953037415627&qyid=0&secure_v=0&req_times=0",
      headers: {
        sign: "7fd8aadd90f4cfc99a858a4b087bcc3a",
        t: "479112291",
      },
    };
    $toolKit.get(URL, function (error, response, data) {
      const Details = LogDetails ? (data ? `response:\n${data}` : "") : "";
      if (!error && data.match(/\"text\":\"\d.+?\u5230\u671f\"/)) {
        $toolKit.expire = data.match(/\"text\":\"(\d.+?\u5230\u671f)\"/)[1];
        console.log(`爱奇艺-查询成功: ${$toolKit.expire} ${Details}`);
      } else {
        console.log(`爱奇艺-查询失败${error || ": 无到期数据 ⚠️"} ${Details}`);
      }
      resolve();
    });
    if (out) setTimeout(resolve, out);
  });
}

function Checkin() {
  return new Promise((resolve) => {
    var URL = {
      url:
        "https://tc.vip.iqiyi.com/taskCenter/task/queryUserTask?autoSign=yes&P00001=" +
        cookie,
    };
    $toolKit.get(URL, function (error, response, data) {
      if (error) {
        $toolKit.data = "签到失败: 接口请求出错 ‼️";
        console.log(`爱奇艺-${$toolKit.data} ${error}`);
      } else {
        const obj = JSON.parse(data);
        const Details = LogDetails ? `response:\n${data}` : "";
        if (obj.msg == "成功") {
          if (obj.data.signInfo.code == "A00000") {
            var AwardName = obj.data.signInfo.data.rewards[0].name;
            var quantity = obj.data.signInfo.data.rewards[0].value;
            var continued = obj.data.signInfo.data.continueSignDaysSum;
            $toolKit.data =
              "签到成功: " +
              AwardName +
              quantity +
              ", 已连签" +
              continued +
              "天 🎉";
            console.log(`爱奇艺-${$toolKit.data} ${Details}`);
          } else {
            $toolKit.data = "签到失败: " + obj.data.signInfo.msg + " ⚠️";
            console.log(`爱奇艺-${$toolKit.data} ${Details}`);
          }
        } else {
          $toolKit.data = "签到失败: Cookie无效 ⚠️";
          console.log(`爱奇艺-${$toolKit.data} ${Details}`);
        }
      }
      resolve();
    });
    if (out) setTimeout(resolve, out);
  });
}

function Lottery(s) {
  return new Promise((resolve) => {
    $toolKit.times++;
    const URL = {
      url:
        "https://iface2.iqiyi.com/aggregate/3.0/lottery_activity?app_k=0&app_v=0&platform_id=0&dev_os=0&dev_ua=0&net_sts=0&qyid=0&psp_uid=0&psp_cki=" +
        cookie +
        "&psp_status=0&secure_p=0&secure_v=0&req_sn=0",
    };
    setTimeout(() => {
      $toolKit.get(URL, async function (error, response, data) {
        if (error) {
          $toolKit.data += "\n抽奖失败: 接口请求出错 ‼️";
          console.log(
            `爱奇艺-抽奖失败: 接口请求出错 ‼️ ${error} (${$toolKit.times})`
          );
          //$toolKit.notify("爱奇艺", "", $toolKit.data)
        } else {
          const obj = JSON.parse(data);
          const Details = LogDetails ? `response:\n${data}` : "";
          $toolKit.last = data.match(/(机会|已经)用完/) ? true : false;
          if (obj.awardName && obj.code == 0) {
            $toolKit.data += !$toolKit.last
              ? `\n抽奖成功: ${obj.awardName.replace(/《.+》/, "未中奖")} 🎉`
              : `\n抽奖失败: 今日已抽奖 ⚠️`;
            console.log(
              `爱奇艺-抽奖明细: ${obj.awardName.replace(
                /《.+》/,
                "未中奖"
              )} 🎉 (${$toolKit.times}) ${Details}`
            );
          } else if (data.match(/\"errorReason\"/)) {
            msg = data.match(/msg=.+?\)/)
              ? data
                  .match(/msg=(.+?)\)/)[1]
                  .replace(/用户(未登录|不存在)/, "Cookie无效")
              : "";
            $toolKit.data += `\n抽奖失败: ${msg || `未知错误`} ⚠️`;
            console.log(
              `爱奇艺-抽奖失败: ${msg || `未知错误`} ⚠️ (${$toolKit.times}) ${
                msg ? Details : `response:\n${data}`
              }`
            );
          } else {
            $toolKit.data += "\n抽奖错误: 已输出日志 ⚠️";
            console.log(`爱奇艺-抽奖失败: \n${data} (${$toolKit.times})`);
          }
        }
        if (!$toolKit.last && $toolKit.times < 3) {
          await Lottery(s);
        } else {
          const expires = $toolKit.expire
            ? $toolKit.expire.replace(/\u5230\u671f/, "")
            : "获取失败 ⚠️";
          if (!$toolKit.isNode)
            $toolKit.notify("爱奇艺", "到期时间: " + expires, $toolKit.data);
        }
        resolve();
      });
    }, s);
    if (out) setTimeout(resolve, out + s);
  });
}
