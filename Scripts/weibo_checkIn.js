/*********************
微博超话题签到js脚本

注：id 和 cookie 是必要参数
eg：
签到领红包id: 1008081c23bc9bd53e3dadc4d97064a5b49ac3
长沙那些事儿id: 100808f504c5f9987e017ec43fcc710a3bba75

*********************/

const axios = require("axios");

checkin();

function checkin() {
  axios
    .get("https://weibo.com/p/aj/general/button", {
      params: {
        // ajwvr: 6,
        api: "http://i.huati.weibo.com/aj/super/checkin",
        id: "100808875a090e1c1afb167b6ce26f0794ea80",
        // location: "page_100808_super_index",
        timezone: "GMT+0800",
        ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
        // screen: "1280*800",
      },
      headers: {
        // referer:
        //   "https://weibo.com/p/1008081c23bc9bd53e3dadc4d97064a5b49ac3/super_index",
        cookie:
          'login_sid_t=924278f8912c38c6b751b7a3dba95e01; cross_origin_proto=SSL; _s_tentry=passport.weibo.com; Apache=7012347792806.706.1624451405607; SINAGLOBAL=7012347792806.706.1624451405607; wb_view_log=1280*8002; ULV=1624451405627:1:1:1:7012347792806.706.1624451405607:; SUB=_2A25N11kwDeRhGeRK71MW9C3PzTmIHXVupc34rDV8PUNbmtANLUHukW9NU1l-1Rwkx3O15qKnvkMjRfJIhVNWUofj; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWDvMYdhEaCSdYxin8vd2o.5JpX5KzhUgL.FozXSh2NShe0So-2dJLoI7D8UJ8VMfvqIg8a; ALF=1655987424; SSOLoginState=1624451424; wvr=6; wb_view_log_2441743365=1280*8002; webim_unReadCount={"time":1624454510335,"dm_pub_total":0,"chat_group_client":0,"chat_group_notice":0,"allcountNum":25,"msgbox":0}',
      },
    })
    .then(function (res) {
      if (res.status != 200) throw console.log("需要登录");
      var { code, msg, data } = res.data;
      
      if (code == 100000) {
        // console.log(res.msg)
        return console.log(res.data);        
      }
      if (code == 382004) {
        return console.log("今天已签到");
      }
    })
    .catch(function (error) {
      alert(error);
    });
}
