import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Safari()
driver.get("https://skills.algosup.com/evaluations")
element = driver.find_element(by=By.XPATH, value='//*[@id="username"]')
element.send_keys("louisdechoulot@gmail.com") #EMAIL
element = driver.find_element(by=By.XPATH, value='//*[@id="password"]')
element.send_keys("polo27072002") #PASSWORD
button = driver.find_element(by=By.XPATH, value='//*[@id="app__container"]/main/div[3]/form/div[3]/button')
button.click()
time.sleep(3)
f = driver.find_elements(by=By.CLASS_NAME, value='rz-cell-data')
alltxt = ""
for t in f:
    alltxt += t.text
driver.get("http://127.0.0.1:5500/input.html")
javaScript = 'document.getElementById("input").value = `'+alltxt+'`;'
driver.execute_script(javaScript)
time.sleep(.5)
button = driver.find_element(by=By.XPATH, value='/html/body/button')
button.click()