#!/usr/bin/env python3
import requests
import urllib.request
import re
from urllib.parse import unquote
import base64
import traceback
from bs4 import BeautifulSoup, Tag


headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"}
merge = []

# ========== 抓取 kkzui.com 的节点 ==========
try:
    res = requests.get("https://kkzui.com/jd?orderby=modified",headers=headers)
    article_url = re.search(r'<h2 class="item-heading"><a href="(https://kkzui.com/(.*?)\.html)">20(.*?)号(.*?)个高速免费节点(.*?)免费代理</a></h2>',res.text).groups()[0]

    res = requests.get(article_url,headers=headers)
    sub_url = re.search(r'<p><strong>这是v2订阅地址</strong>：(.*?)</p>',res.text).groups()[0]
    print(sub_url)

    res = requests.get(sub_url,headers=headers)
    merge += str(base64.b64decode(res.text.encode()),'utf-8').strip().replace('\r\n','\n').split('\n')
except:
    traceback.print_exc()


# ========== 抓取 banyunxiaoxi.icu 的节点 ==========
# 十六进制转十进制
def ox2dec(ox: str):
    return int(ox, 16)

def decode(to_decode: str):
    decode = []
    key = ox2dec(to_decode[:2])  # 前两位为密钥
    data = []
    for i in range(2, len(to_decode), 2):
        to_decode_i = ox2dec(to_decode[i:i + 2])
        # print(to_decode_i,key)
        decode_i = to_decode_i ^ key  # 十进制异或会先转二进制异或，结果再转回十进制
        decode.append(chr(decode_i))  # 十进制数转字符
    return "".join(decode)


try:
    res = requests.get("https://banyunxiaoxi.icu/", headers=headers)
    res.encoding = 'UTF-8'
    pattern = r'<a href="(https://banyunxiaoxi.icu/(.*?)/)" class="post-title"><h3>20(.*?)-(.*?)-(.*?)节点更新(.*?)个</h3></a>'
    searchValue = re.search(pattern, res.text)
    article_url = searchValue.groups()[0]
    res = requests.get(article_url, headers=headers)

    soup = BeautifulSoup(res.content, 'html.parser')
    cites = soup.find_all('cite')  # soup.cite
    content = cites[0]
    listData = content.contents

    data = ""
    for strText in listData:
        if isinstance(strText, Tag):
            if strText.name in "br":
                merge.append(data)
                data = ""
            else:
                data = data + decode(str(strText.get('data-cfemail')))
        else:
            data = data + str(strText)
            
    # for data in merge:
    #     print(data)


except:
    traceback.print_exc()



# ========== 写出文件 ==========
txt = ''
for url in set(merge):
    txt = txt + url + '\n'

with open("list_raw.txt",'w') as f:
    f.write(txt)
with open("list.txt",'w') as f:
    b64txt = base64.b64encode(txt.encode())
    f.write(str(b64txt,'utf-8'))




# ========== 抓取 vpnbay.com 的节点 ==========
# def decode_email(email_str):
#     # 方法来自 https://zhuanlan.zhihu.com/p/36912486
#     email_list = re.findall(r'.{2}',email_str)
#     key = email_list[0]
#     ll = []

#     for e in email_list[1:]:
#         # 对十六进制进行异或运算
#         r = hex(int(key,16) ^ int(e,16))
#         ll.append(r)

#     # 拼接运算后的字符串
#     a = ''.join(ll)
#     # URL解码字符串
#     email = unquote(a.replace('0x','%'))
#     return email

# try:
#     res = requests.get("https://vpnbay.com/free-ss-vmess-trojan-nodes.html",headers=headers)
#     for url, _ in re.findall(r"((vmess|ss|trojan|ssr)://.*?)<br />",res.text):
#         if "email-protection" in url:
#             host = decode_email(re.search(r'data-cfemail="(.*?)"',url).group(1))
#             merge.append(re.sub("<a.*?>.*?</a>",host,url))
#         else:
#             merge.append(url)
# except:
#     traceback.print_exc()


# ========== 抓取 JACKUSR2089/v2ray-subscribed 的节点 ==========
# try:
#     res = requests.get("https://api.github.com/repos/JACKUSR2089/v2ray-subscribed/contents").json()
#     subs = {}

#     for file in res:
#         name = re.match(r"(\d+)(-|\.)(\d+)(-|\.)(\d+)",file['name'])
#         if name:
#             subs[name.group()] = int(name.groups()[0])*10000+int(name.groups()[2])*100+int(name.groups()[4])

#     subs = sorted(subs.items(),key=lambda k:k[1])
#     sub_url = "https://raw.githubusercontent.com/JACKUSR2089/v2ray-subscribed/master/"+subs[-1][0]

#     res = requests.get(sub_url)
#     merge += str(base64.b64decode(res.text.encode()),'utf-8').strip().replace('\r\n','\n').split('\n')
# except:
#     traceback.print_exc()


