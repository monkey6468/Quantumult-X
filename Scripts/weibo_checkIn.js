/*********************
微博超话题签到js脚本

注：id 和 cookie 是必要参数
eg：
签到领红包id: 1008081c23bc9bd53e3dadc4d97064a5b49ac3
长沙那些事儿id: 100808f504c5f9987e017ec43fcc710a3bba75

*********************/

const fetch = require("node-fetch");
const querystring = require("querystring");

function encodeSearchParams(obj) {
  const params = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    // 如果值为undefined置空
    if (typeof value === "undefined") {
      value = "";
    }
    //使用encodeURIComponent进行编码
    if (Array.isArray(obj[key])) {
      //类型为数组的时候
      value.forEach((item) => {
        params.push([key, encodeURIComponent(item)].join("="));
      });
    }
    if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
      //类型为对象的时候
      Object.keys(obj[key]).forEach((item) => {
        params.push([key, encodeURIComponent(obj[key][item])].join("="));
      });
    } else {
      params.push([key, encodeURIComponent(value)].join("="));
    }
  });
  return params.join("&");
}

function request(url, data, method = "get") {
  if (method === "get") {
    if (data) {
      url = `${url}?${encodeSearchParams(data)}`;
    }
  }

  return fetch(url, {
    method,
    // body: JSON.stringify(data),
    headers: {
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      cookie:
        'login_sid_t=924278f8912c38c6b751b7a3dba95e01; cross_origin_proto=SSL; _s_tentry=passport.weibo.com; Apache=7012347792806.706.1624451405607; SINAGLOBAL=7012347792806.706.1624451405607; wb_view_log=1280*8002; ULV=1624451405627:1:1:1:7012347792806.706.1624451405607:; SUB=_2A25N11kwDeRhGeRK71MW9C3PzTmIHXVupc34rDV8PUNbmtANLUHukW9NU1l-1Rwkx3O15qKnvkMjRfJIhVNWUofj; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWDvMYdhEaCSdYxin8vd2o.5JpX5KzhUgL.FozXSh2NShe0So-2dJLoI7D8UJ8VMfvqIg8a; ALF=1655987424; SSOLoginState=1624451424; wvr=6; wb_view_log_2441743365=1280*8002; webim_unReadCount={"time":1624454510335,"dm_pub_total":0,"chat_group_client":0,"chat_group_notice":0,"allcountNum":25,"msgbox":0}',
    },
  }).then((response) => {
    return response.json();
  });
}

function checkin() {
  request(
    "https://weibo.com/p/aj/general/button",
    {
      api: "http://i.huati.weibo.com/aj/super/checkin",
      id: "10080867e346d6acb71c0a12d1e33b4692abed",
    },
    "get"
  ).then((res) => {
    console.log(res);

    // if (res.status != 200) throw console.log("需要登录");
    // var { code, msg, data } = res.data;

    // if (res.status != 200) throw console.log("需要登录");
    //   var { code, msg, data } = res.data;

    //   if (code == 100000) {
    //     // console.log(res.msg)
    //     return console.log(res.data);
    //   }
    //   if (code == 382004) {
    //     return console.log("今天已签到");
    //   }
  });
}

checkin();
