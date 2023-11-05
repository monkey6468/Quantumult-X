#!/usr/bin/env python3
import requests
import re
import traceback
from bs4 import BeautifulSoup, Tag
import os

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"}
merge = []

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

    sub_url = re.search(r'<h3 class="title"><a href="(https://banyunxiaoxi.icu/20(.*?)/(.*?)/(.*?)/20(.*?)-(.*?)-(.*?)/)"',res.text).groups()[0]
    print(sub_url)

    sub_res = requests.get(sub_url, headers=headers)

    soup = BeautifulSoup(sub_res.content, 'html.parser')
    cites = soup.find_all('blockquote')  # soup.cite
    content = cites[0]
    listData = content.contents[0]

    data = ""
    for strText in listData:
        if isinstance(strText, Tag) == False:
            item = str(strText).split("\n")
            if (len(item)>1) :
                # print(item[1])
                merge.append(item[1])
            else:
                # print(strText)
                merge.append(strText) 

except:
    traceback.print_exc()


# ========== 写出文件 ==========
txt = ''
for url in set(merge):
    txt = txt + url + '\n'
    print(txt)

if not os.path.exists("FreeList"):
    os.makedirs("FreeList")
with open("FreeList/xxby.txt",'w') as f:
    f.write(txt)

