import re
import time
import csv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# Ruta al ChromeDriver
service = Service("C:/WebDrivers/chromedriver.exe")  # ← ajusta si lo guardaste en otra carpeta

# Configura Chrome en modo sin cabeza
options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")

driver = webdriver.Chrome(service=service, options=options)

# Lista de enlaces
urls = [
    "https://maps.app.goo.gl/fv3DSVdKMFWqQsg2A",
    "https://maps.app.goo.gl/j8BMwBpYnC2qTbVn6",
    "https://maps.app.goo.gl/gyvonV7u7VCrLa216",
    # ... agrega todos tus enlaces aquí
]

# Expresión regular para coordenadas
coord_pattern = re.compile(r'@(-?\d+\.\d+),(-?\d+\.\d+)')

# Crear archivo CSV
with open("coordenadas_resultado.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Enlace", "Latitud", "Longitud", "Estado"])

    for url in urls:
        try:
            driver.get(url)
            time.sleep(6)  # espera más tiempo para redirección completa
            final_url = driver.current_url
            match = coord_pattern.search(final_url)
            if match:
                lat, lng = match.groups()
                writer.writerow([url, lat, lng, "✔ Coordenadas encontradas"])
                print(f"{url} → {lat}, {lng}")
            else:
                writer.writerow([url, "", "", "✘ No encontradas"])
                print(f"{url} → Coordenadas no encontradas")
        except Exception as e:
            writer.writerow([url, "", "", f"⚠ Error: {e}"])
            print(f"{url} → Error: {e}")

driver.quit()
