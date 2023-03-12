

/******************************
脚本功能：简讯+解锁VIP
软件版本：5.0.2
更新时间：2023-3-12
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

^https?:\/\/api\.tipsoon\.com\/api\/v1\/top\/ad url reject-img
^https?:\/\/api\.tipsoon\.com url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/jianxun.js

[mitm] 

hostname = api.tipsoon.com

*******************************/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

/**js 中 indexof() 只能处理字符串类型，如果没有检索到目标字符串，则返回 -1*/
if (url.indexOf('/info') != -1) {
    obj.data.is_vip = true;
    obj.data.vip_expire_time = "2058-03-12 09:54:28";

    body = JSON.stringify(obj);
}
$done({body});
