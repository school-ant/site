# Спільна таблиця результатів

У коді вже підготовлена підтримка спільного рейтингу через Supabase.

Щоб вона реально запрацювала на всіх пристроях:

1. Створіть проєкт у Supabase.
2. У SQL Editor виконайте файл `supabase-schema.sql`.
3. Скопіюйте `leaderboard-config.example.js` у `leaderboard-config.js`.
4. Вставте у `leaderboard-config.js`:
   - URL проєкту
   - publishable key або anon key
   - назву таблиці `quiz_leaderboard`

Після цього сторінка `entertainment.html` почне зберігати й читати рейтинг спільно для всіх пристроїв.

Якщо конфіг не заповнений, сайт автоматично працює у локальному режимі через `localStorage`.
