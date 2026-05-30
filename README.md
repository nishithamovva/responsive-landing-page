# Expense Tracker

<!-- 
Plan:
1. Scaffold project structure (README.md, index.html, styles.css, app.js, storage.js, utils.js).
2. Implement sticky/fixed navigation menu with scroll & hover effects.
3. Implement localStorage layer (schema versioning, settings, basic CRUD).
4. Implement Dashboard view (summaries, charts).
5. Implement Transactions view (list, filter, sort, search).
6. Implement add/edit/delete transactions with validation and undo.
7. Budget feature.
8. Settings & data management (import, export, reset).
9. Polish accessibility & responsiveness.
-->

## Features
- Add, edit, delete (with undo) expenses and income
- Dashboard with summaries and category breakdown
- Transaction filtering, sorting, and search
- Budget tracking
- Data export/import (CSV/JSON)
- Fully offline capable using local storage

## How to run
Simply open `index.html` in any modern web browser or use a static file server like Live Server.

## Data Schema & Versioning
- `version`: integer tracking the schema version.
- `settings`: currency symbol, theme, start of week.
- `transactions`: array of transaction objects:
  - `id`: string
  - `type`: "expense" | "income"
  - `amount`: number
  - `category`: string
  - `date`: ISO string "YYYY-MM-DD"
  - `note`: string
  - `paymentMethod`: string
  - `createdAt`: ISO datetime
  - `updatedAt`: ISO datetime

## Manual Test Checklist
- [ ] Add a new expense/income and verify it appears on the dashboard.
- [ ] Edit a transaction and verify the amount/category updates.
- [ ] Delete a transaction, ensure undo toast appears, and click undo.
- [ ] Scroll the page to verify the fixed navigation changes style.
- [ ] Export data to CSV.
- [ ] Set a budget and verify the warning states.

## Future Improvements
- Cloud sync
- Multiple accounts/wallets
- Recurring transactions
