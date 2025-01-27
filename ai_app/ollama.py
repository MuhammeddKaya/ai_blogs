import requests

prompt = "can u exlain this code"

response = requests.post('http://localhost:11434/api/generate',
json={
"model": "deepseek-coder:6.7b",
"prompt": prompt,
"stream": False
})
response = response.json()
print(response['response'])

modellist=(
"deepseek-coder-v2:latest","deepseek-coder:6.7b","chsword/DeepSeek-V3:latest","ollama3.2:1b","qwen2.5-coder:32b","granite3-moe:latest") 
