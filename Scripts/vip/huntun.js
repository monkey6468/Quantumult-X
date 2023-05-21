/******************************
脚本功能：混沌 解锁VIP、缓存、画中画
软件版本：6.12.0
更新时间：2023-5-21
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

^https:\/\/course\.hundun\.cn\/course\/expire_course_list url reject
^http[s]?:\/\/(course|user)\.hundun\.cn\/(get_course_detail|get_user_info|user\/adviser\/get)\? url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/huntun.js

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

    obj.data.playback_button.join_name = "人民币玩家";
    obj.data.playback_button.page_url = "";
    obj.data.playback_button.h5_url = "";
    obj.data.playback_button.buy_item = "";
    obj.data.playback_button.btn_name = "";

    obj.data.free_trial_info = "";
}

if (url.indexOf('/get_user_info') != -1) {
    obj.data.sku_list[10].dhy_info.title = "㊗️恭喜你";
    obj.data.sku_list[10].dhy_info.button_text = "🎆🐮🍺";
    obj.data.sku_list[10].dhy_info.desc = "尊贵的人民币玩家";
    obj.data.sku_list[10].sku_buy_entrance = "";

    obj.data.adviser.page_url = "";
}

body = JSON.stringify(obj);
$done({body});