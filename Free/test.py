#!/usr/bin/env python3
import requests
import traceback
import json
import ssr_utils

headers = {
    "Host": "api-2.quickg.cc",
    "Authorization": "Token d327b0df4873e3e2020578ae77083ae059634ca7",
    "channel": "GW",
    "appVersion": "2.1.7",
    # "Accept-Language":"zh-CN,zh-Hans;q=0.9",
    # "Accept-Encoding":"gzip, deflate, br",
    "platform": "ios",
    "imei": "b8d5f841bdd44230b8b155b3b9317f31",
    "Content-Length": "0",
    "User-Agent": "Telescope/219 CFNetwork/1335.0.3 Darwin/21.6.0",
    "Accept": "application/json",
    "systemVersion": "15.6.1",
}


# ========== 抓取 api-2.quickg.cc 的节点 ==========
try:
    url = "https://api-2.quickg.cc/api/v5/nodes/"
    res = requests.post(url=url, headers=headers)
    json_str = res.content

    # 将JSON字符串解析为Python字典
    data = json.loads(json_str)

    # configs = ["{}:{}@{}:{}".format(
    #     c["method"], c["passwd"], c["ip"], c["port"])
    #     for c in data["data"]]
    # ss = [base64.urlsafe_b64encode(bytes(x, "utf8")) for x in configs]

    # for s in ss:
    #     print(str(s, "utf8"))
    # print(configs)
    # for item in data["data"]:
        # print(a)
    item = data["data"][1]
        # 从字典中提取节点信息
    server_address = item['ip'] # ieplszhk-sz.cctelescope.xyz
    server_port = item['port'] # 50409
    protocol = item['protocol'] # auth_aes128_md5
    # protocol_param = item['protoparam'] # 265413:vEP631dLku
    method = item['method'] # aes-256-cfb
    obfs = item['obfs'] # tls1.2_ticket_auth
    password = item['passwd'] # hGkQ6915tD
    remarks = item['name'] # 马来西亚_R_567
    protocol_param = item['protoparam'] # 265413:vEP631dLku
    obfs_param = item['obfsparam'] # ajax.microsoft.com

        # 将节点信息转换为SS节点格式的字符串
    ssr = ssr_utils.SSR()
    ssr.set(server=server_address,
        port=server_port,
        method=method,
        password=password,
        protocol=protocol,
        proto_param=protocol_param,
        obfs=obfs,
        obfs_param=obfs_param,
        remarks=remarks
        )    
    
    print(ssr.url)
  
    # 打印SS节点字符串
    # print(ss_node_str)
    # print(data)

# res = requests.get(sub_url,headers=headers)
# merge += str(base64.b64decode(res.text.encode()),'utf-8').strip().replace('\r\n','\n').split('\n')
except:
    traceback.print_exc()


# ========== 写出文件 ==========
# txt = ''
# for url in set(merge):
#     txt = txt + url + '\n'

# if not os.path.exists("Free/List"):
#     os.makedirs("Free/List")
# with open("Free/List/kzkj.txt",'w') as f:
#     f.write(txt)
