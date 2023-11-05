#!/usr/bin/env python3
import os
import requests
import traceback
import json
# import ssr_utils

headers = {
    "Cookie": 'HWWAFSESID=b5d93139ff5ec504bfb; HWWAFSESTIME=1687516484996; Hm_lvt_ec4ae7f8ec5cd869cf861fb68cf2024b=1675182770,1675561539; PHPSESSID=isl9k14nvc5ostqucn7lnjsap0',
    "content-type": "application/json",
    'user-agent': 'ToyotaUccn/5.6.5 (com.frontnetwork.FTMS; build:202303151746; iOS 16.5.0) Alamofire/5.4.4',
    'ts': '20230623183630841',
    'osver': '16.5',
    'ckey': 'c2add694bf942dc77b376592d9c862cd',
    'version': '1.0.0',
    'rs': '2',
    'terminal': 'mac',
    'content-length': '24',
    'sign': 'Vbf/GzaTGDZsxMtOZKgIFi/JDhg=',
    'deviceid': '56F3093C537748FA9B45CD9912ABA71D',
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJwZXJtaXNzaW9ucyI6WyJzZWxmIl0sImlzcyI6ImF1dGgwIiwiaWQiOiI0NDY1OTY3Iiwib3BlcmF0aW9uU291cmNlIjoiRlRNU19BUFAiLCJleHAiOjE2ODgxMjEyODksIm9wZXJhdG9yTmFtZSI6InVzZXIiLCJub25jZSI6IjM4MTIzOTc4OTQxYTQzNDk4MWIzMzg3NWRkOWM3MmM2IiwiaXNPcGVyYXRvciI6ZmFsc2V9.rHFOhZDaKWRwISVf4d_ahWyBMembsXjk-6-iIN6EFEoeRZBRAF4e8EVEW4GOITp9qs2umBh8So4fy8fZ1FHlbA',
    'accept-language': 'zh-Hans-CN;q=1.0, en-CN;q=0.9',
    'ostype': 'ios',
}

data = {
    "isMysteryBoxes": '0',
}

merge = []
# ========== 抓取 api-2.quickg.cc 的节点 ==========
try:
    url = "https://superapp.ftms.com.cn/superapp/member/wt/signIn"
    response = requests.post(url, data=data, headers=headers)
    print(response.text)
    # url = "https://superapp.ftms.com.cn/superapp/member/wt/signIn"
    # res = requests.post(url=url, headers=headers)
    json_str = response.content

    # 将JSON字符串解析为Python字典
    data = json.loads(json_str)

    # for item in data["data"]:
    #     # 从字典中提取节点信息
    #     server_address = item['ip'] # ieplszhk-sz.cctelescope.xyz
    #     server_port = item['port'] # 50409
    #     protocol = item['protocol'] # auth_aes128_md5
    #     protocol_param = item['protoparam'] # 265413:vEP631dLku
    #     method = item['method'] # aes-256-cfb
    #     obfs = item['obfs'] # tls1.2_ticket_auth
    #     obfs_param = item['obfsparam'] # ajax.microsoft.com
    #     password = item['passwd'] # hGkQ6915tD
    #     remarks = item['name'] # 马来西亚_R_567

    #     # 将节点信息转换为SS节点格式的字符串
    #     ssr = ssr_utils.SSR()
    #     ssr.set(server = server_address,
    #             port = server_port,
    #             method = method,
    #             password = password,
    #             protocol = protocol,
    #             proto_param = protocol_param,
    #             obfs = obfs,
    #             obfs_param = obfs_param,
    #             remarks = remarks)
    #     #打印SS节点字符串
    #     print(ssr.url)
    #     merge.append(ssr.url)

except:
    traceback.print_exc()


# ========== 写出文件 ==========
# txt = ''
# for url in set(merge):
#     txt = txt + url + '\n'

# if not os.path.exists("Free/List"):
#     os.makedirs("Free/List")
# with open("Free/List/scope.txt",'w') as f:
#     f.write(txt)
