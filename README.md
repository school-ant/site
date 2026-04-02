# Сайт організації

Статичний веб-сайт, побудований на чистому HTML, CSS без зовнішніх фреймворків. Підтримує PWA (Progressive Web App).

## Структура проєкту

```
site/
├── index.html              # Головна сторінка
├── about.html              # Про нас
├── services.html           # Послуги
├── news.html               # Новини
├── contact.html            # Контакти
├── transparency.html       # Прозорість
├── style.css               # Головні стилі
├── sw.js                   # Service Worker (PWA)
├── site.webmanifest        # Маніфест PWA
├── docs/
│   ├── lesson-schedule.jpg # Розклад занять
│   └── osvprog.pdf         # Освітня програма
└── images/
    ├── about/
    │   ├── history-1.avif  # Фото з історії організації
    │   ├── history-2.avif
    │   ├── history-3.avif
    │   └── history-4.avif
    ├── logo.avif                    # Логотип
    ├── screenshot-wide.png          # Скріншот (широкий) для PWA
    ├── screenshot-mobile.png        # Скріншот (мобільний) для PWA
    ├── favicon.ico                  # Фавікон
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    ├── icon-maskable-192.png
    └── icon-maskable-512.png
```

## Технології

- HTML5, CSS3 — без зовнішніх фреймворків
- PWA — підтримка офлайн-режиму через Service Worker
- Формати зображень AVIF для оптимальної продуктивності
