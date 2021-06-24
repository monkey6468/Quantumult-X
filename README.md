# Quantumult-X
用于学习JavaScript

- 代码仅使用于 `Quantumult X`

# `bilibili`配置说明

`风车`> `配置文件` -> `编辑`

```
[MITM]
*.bilibili.com
```

```
[rewrite_local]
# bilibili 获取cookie
^https:\/\/(m|live)\.bilibili\.com\/?.? url script-request-header bilibili_get_cookie.js
```

```
[task_local]
# bilibili 签到
1 0 * * * bilibili_checkIn.js
```

# 二、使用说明

1、浏览器登录 [https://m.bilibili.com](https://m.bilibili.com)

2、配置 hostname `[MITM]`

3、配置本地重新规则 `[rewrite_local]`

4、把 `bilibili_get_cookie.js` 和 `bilibili_checkIn.js` 传到`On My iPhone` - `Quantumult X` - `Scripts `(传到 `iCloud` 相同目录也可，注意要打开 `quanx` 的 `iCloud` 开关)

5、刷新浏览器 [https://m.bilibili.com](https://m.bilibili.com)

6、系统提示: 获取Cookie: 成功

7、最后就可以把 获取cookie 脚本和hostname 注释掉了

# 参考感谢🙏

[@chavyleung](https://github.com/chavyleung/scripts/tree/master/bilibili)
