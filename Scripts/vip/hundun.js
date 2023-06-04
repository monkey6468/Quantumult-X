/******************************
脚本功能：混沌 解锁VIP、缓存、画中画
软件版本：6.12.0
更新时间：2023-6-4
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

^https:\/\/course\.hundun\.cn\/course\/expire_course_list url reject
^http[s]?:\/\/(course|user)\.hundun\.cn\/(get_course_detail|get_user_info)? url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/hundun.js

[mitm]

hostname = *.hundun.*

*******************************/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

if (url.indexOf('/get_course_detail') != -1) {
    obj.data.course_meta.allow_play_title = "";
    obj.data.course_meta.end_ts = "2058-10-20 08:00:00";
    obj.data.course_meta.allow_download = 1;
    obj.data.course_meta.allow_play = 1;
    obj.data.course_meta.expire_time = "2058-10-20";

    obj.data.free_trial_info = "";
}

if (url.indexOf('/get_user_info') != -1) {
    for (var i = 0; i < obj.data.sku_list.length; i++) {
        if (i == 10) {
            obj.data.sku_list[i].dhy_info.title = "㊗️恭喜你";
            obj.data.sku_list[i].dhy_info.button_text = "🎆🐮🍺";
            obj.data.sku_list[i].dhy_info.desc = "尊贵的人民币玩家";
            obj.data.sku_list[i].sku_buy_entrance = "";
        }
    }

    obj.data.adviser.page_url = "";
}

body = JSON.stringify(obj);
$done({body});
