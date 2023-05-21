var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

if (url.indexOf('/get_course_detail') != -1) {
    obj.data.course_meta.allow_money_buy = 0;
    obj.data.course_meta.allow_yanzhi_buy = 1;
    obj.data.course_meta.allow_play_title = "";
    obj.data.course_meta.end_ts = "2058-10-20 08:00:00";
    obj.data.course_meta.allow_download = 1;
    obj.data.course_meta.allow_play = 1;
    obj.data.course_meta.expire_time = "2058-10-20";
    obj.data.course_meta.is_buy = 1;
    
    obj.data.playback_button.join_name = "人民币玩家";
    obj.data.playback_button.page_url = "";
    obj.data.playback_button.h5_url = "";
    obj.data.playback_button.buy_item = "";
    obj.data.playback_button.btn_name = "";
    
    obj.data.play_limit.expire_timetamp = 2802297600;
    obj.data.play_limit.play_time = "2058-10-20 08:00:00";
    obj.data.play_limit.rob_time = "2058-10-20 08:00:00";
    
    obj.data.free_trial_info = "";
    
    body = JSON.stringify(obj);
}

if (url.indexOf('/get_user_info') != -1) {
    obj.data.purchased_yxs = 1;
    obj.data.sxy19_expire_date = "2058-10-20";
    obj.data.dhy_expire_time = "2058-10-20";
    obj.data.purchased_yxs_tgroup = 1;
    
    obj.data.sku_list[10].dhy_info.title = "㊗️恭喜你";
    obj.data.sku_list[10].dhy_info.button_text = "🎆🐮🍺";
    obj.data.sku_list[10].dhy_info.desc = "尊贵的人民币玩家";
    obj.data.sku_list[10].sku_buy_entrance = "";
    
    obj.data.ss_sxy19_expire_time = "2058-10-20 08:00:00";
    obj.data.yxs_expire_date = "2058-10-20";
    
    obj.data.super_expire_time_display = "2058-10-20 08:00:00";
    obj.data.expire_time = "2058-10-20 08:00:00";
    
    obj.data.purchased_wlxy = 1;
    obj.data.is_yxs_old_vip = 1;
    obj.data.in_7days_period = 0;
    obj.data.ss_yxs_expire_time = "2058-10-20 08:00:00";
    obj.data.ss_cxy18_expire_time = "2058-10-20 08:00:00";
    obj.data.is_buy_sxy = 1;
    
    obj.data.adviser.title = "";
    obj.data.adviser.page_url = "";
    
    body = JSON.stringify(obj);
}
$done({body});
