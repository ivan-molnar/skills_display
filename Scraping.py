import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Safari()
driver.get("https://skills.algosup.com/evaluations")
element = driver.find_element(by=By.XPATH, value='//*[@id="username"]')
element.send_keys("") #EMAIL
element = driver.find_element(by=By.XPATH, value='//*[@id="password"]')
element.send_keys("") #PASSWORD
button = driver.find_element(by=By.XPATH, value='//*[@id="app__container"]/main/div[3]/form/div[3]/button')
button.click()
time.sleep(4)
f = driver.find_elements(by=By.CLASS_NAME, value='rz-cell-data')
alltxt = []
for t in f:
    alltxt.append(t.text)
driver.get("http://127.0.0.1:5500/input.html")
element = driver.find_element(by=By.XPATH, value='/html/body/textarea')
element.send_keys(alltxt)
button = driver.find_element(by=By.XPATH, value='/html/body/button')
button.click()