import requests  
import re  
import traceback
import os

merge = []

try:  
    url = 'https://lncn.org/'  
    response = requests.get(url)  
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

if not os.path.exists("Free/List"):
    os.makedirs("Free/List")
with open("Free/List/incn.txt",'w') as f:
    f.write(txt)