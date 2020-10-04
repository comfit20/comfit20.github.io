from selenium import webdriver
import time

driver = webdriver.Firefox()

def test_timer():
    for i in range(100):
            driver.get("http://comfit20.github.io/index.html#yoga")

            elem = driver.find_element_by_id("yogaanytime")
            elem.click()

            time.sleep(1.0)

            timer = None
            try:
                timer = driver.find_element_by_id("timer-1")
            except Exception as e:
                print(e)
            assert timer

    print(timer)
    driver.close()
