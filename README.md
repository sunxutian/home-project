# ✈️ Dynamic Travel Itinerary & Attractions Dashboard

A premium, responsive, client-side travel dashboard that loads and displays your trip itinerary and dining guide dynamically from any public Google Sheet.

## 🚀 Features

- **Google Sheet Syncing**: Paste any Google Sheet link or ID. The dashboard fetches, parses, and renders it in real-time.
- **Persistent Caching**: Saved configurations and fetched itinerary data are cached in `localStorage` for instant loading and offline capability.
- **Ad-Hoc Mapping Engine**: The interactive Leaflet map automatically detects stops, numbers them in order, draws daily route lines, and frames the view to fit the current day's attractions.
  - *Tip: If you write coordinates like `[41.025, 28.974]` in the notes cell of a custom stop, it will be dynamically plotted on the map!*
- **Countdown Timer**: Automatically parses your departure flight time and updates a live countdown.
- **Smart Link Helpers**: Scans row text and automatically extracts ticket vouchers (like Klook links) and reviews (TripAdvisor/Google Maps searches) to render them as clean, responsive button badges.
- **Day/Night Theme**: Floating toggle button with LocalStorage preference persistence.
- **Easy Sharing**: You can share your itinerary link with others by appending the sheet ID as a query parameter:
  `https://yourusername.github.io/home-project/?sheet=YOUR_SPREADSHEET_ID`

---

## 📅 Google Sheet Template Format

To sync your data, make sure your sheet column headers match these names (order doesn't matter):

### Itinerary Tab (e.g. `Sheet2`)
- **日期 (Date)**: e.g. `6/19（Day 1）\nFriday`. Adding a newline creates a sub-theme for that day.
- **时间 (Time)**: e.g. `12:30 - 13:15` or `Morning`.
- **项目 (Activity)**: The main name/title of the attraction.
- **交通 (Transport)**: Travel notes or transit method.
- **备注 (Notes)**: Details, ticket prices, tips, or URLs.
- **特色餐饮推荐 (街头小吃与咖啡甜点) (Food Recommendation)**: Inline dining tips for that specific time/stop.

### Food Recommendations Tab
- **Area / Schedule Match**: e.g., `Old City (Days 1 & 2)` or `New City (Day 3)`.
- **Category**: e.g., `Dessert` or `Street Food`.
- **Name**: The restaurant name.
- **Must Try / Description**: Famous dishes or details.
- **Location Notes**: Street address or area description.

---

## 🔒 Sharing Configuration

To import your Google Sheet:
1. Open your sheet on Google Drive.
2. Click **Share** in the top right.
3. Change the General Access option to **"Anyone with the link can view"**.
4. Copy the link and paste it into the "Import Google Sheet" drawer on this website!
