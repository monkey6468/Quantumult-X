/******************************
脚本功能：彩云天气 解锁SVIP
软件版本：6.15.0
更新时间：2023-5-24
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

 [rewrite_local]

 ^https:\/\/ad\.caiyunapp\.com\/ url reject
 ^https:\/\/biz\.(caiyunapp|cyapi)\.(com|cn) url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/caiyun.js

 [mitm]

 hostname = *.cyapi.cn, *.caiyunapp.com

 *************************************/

var obj = JSON.parse($response.body);

if ($request.url.indexOf('/user') != -1) {
    obj.result.device_id = "78B61F3B-706F-44E8-9E4D-F68BDA1BA896";
    obj.result._id = "6358cb93e7a295001482d9aa";
    obj.result.svip_given = 365;
    obj.result.ranking_above = 91;
    obj.result.is_visitor = false;
    obj.result.is_phone_verified = true;
    obj.result.hasBeenInvited = true;
    obj.result.is_xy_vip = true;
    obj.result.vip_expired_at = 2802297600;
    obj.result.is_vip = true;
    obj.result.xy_svip_expire = 2802297600;
    obj.result.third_party_ids = [
        "63592fa7e7a295001888256b",
        "639ac02db1839300133031c0"
    ];
    obj.result.wt.vip = {
        "is_auto_renewal" : false,
        "enabled" : true,
        "svip_auto_renewal_type" : "",
        "expired_at" : 2802297600,
        "auto_renewal_type" : "",
        "svip_expired_at" : 2802297600
    };
    obj.result.wt.svip_given = 365;
    obj.result.wt.ranking_above = 91;
    obj.result.vip_take_effect = 1;
    obj.result.is_auto_renewal = false;
    obj.result.is_primary = true;
    obj.result.xy_vip_expire = 0;
    obj.result.platform_id = "o3rJ_t00r0mxqS6GCVWMaVtEFLUk";
    obj.result.svip_expired_at = 2802297600;
    obj.result.svip_take_effect = 1;
    obj.result.vip_type = "s";
    obj.result.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps";
    obj.result.bound_status.qq = {
        "id" : "63592fa7e7a295001888256b",
        "username" : "obj",
        "is_bound" : true
    };
    obj.result.bound_status.weixin = {
        "id" : "639ac02db1839300133031c0",
        "username" : "obj",
        "is_bound" : true
    };
    obj.result.bound_statuscaiyun = {
        "id" : "6358cb93e7a295001482d9aa",
        "username" : "",
        "is_bound" : true
    };
}

if ($request.url.indexOf('/visitors') != -1) {
    obj.result.device_id = "78B61F3B-706F-44E8-9E4D-F68BDA1BA896";
    obj.result._id = "6358cb93e7a295001482d9aa";
    obj.result.svip_given = 365;
    obj.result.ranking_above = 91;
    obj.result.is_visitor = false;
    obj.result.is_phone_verified = true;
    obj.result.hasBeenInvited = true;
    obj.result.is_xy_vip = true;
    obj.result.vip_expired_at = 2802297600;
    obj.result.is_vip = true;
    obj.result.xy_svip_expire = 2802297600;
    obj.result.third_party_ids = [
        "63592fa7e7a295001888256b",
        "639ac02db1839300133031c0"
    ];
    obj.result.wt.vip = {
        "is_auto_renewal" : false,
        "enabled" : true,
        "svip_auto_renewal_type" : "",
        "expired_at" : 2802297600,
        "auto_renewal_type" : "",
        "svip_expired_at" : 2802297600
    };
    obj.result.wt.svip_given = 365;
    obj.result.wt.ranking_above = 91;
    obj.result.vip_take_effect = 1;
    obj.result.is_auto_renewal = false;
    obj.result.is_primary = true;
    obj.result.xy_vip_expire = 0;
    obj.result.platform_id = "o3rJ_t00r0mxqS6GCVWMaVtEFLUk";
    obj.result.svip_expired_at = 2802297600;
    obj.result.svip_take_effect = 1;
    obj.result.vip_type = "s";
    obj.result.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps";
    obj.result.bound_statuscaiyun = {
        "id" : "6358cb93e7a295001482d9aa",
        "username" : "",
        "is_bound" : true
    };
}

$done({body : JSON.stringify(obj)});
