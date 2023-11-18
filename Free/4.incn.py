import base64
import requests  
import re  
import traceback
import os

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"}
merge = []

# ========== 抓取 lncn.org 的节点 ==========
try:  
    url = 'https://lncn.org/'  
    response = requests.get(url, headers=headers)  
    content = response.text  
    
    # 使用正则表达式查找包含"ssr://"的字符串  
    ssr_links = re.findall(r'"ssr://.*?"', content)  
    
    # 打印结果  
    # print(ssr_links)

    for item in ssr_links: 
        str = item.replace('"', '')       
        print(str)
        merge.append(str) 
except:
    traceback.print_exc()    

# ========== 写出文件 ==========
txt = ''
for url in set(merge):
    txt = txt + url + '\n'

if not os.path.exists("FreeList"):
    os.makedirs("FreeList")
with open("FreeList/incn.txt",'w') as f:
    f.write(txt)


# ========== 将字符串转换为Base64编码 ==========
# 将字符串转换为字节对象  
utf8Str = txt.encode('utf-8')  

# 将字节对象转换为Base64编码  
base64Str = base64.b64encode(utf8Str) 
print(base64Str)  
with open("FreeList/incn_base64",'w') as f:
    f.write(base64Str.decode('utf-8'))    