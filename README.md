# RTV Poin Broadcast Tool

A web-based application to generate personalized WhatsApp broadcast messages for customer loyalty points.

## Features

- 📂 Upload customer data (Excel/CSV)
- 💬 Customizable message templates
- 🔗 Auto-generate WhatsApp links
- 📱 Smart phone number formatting
- 🎨 Premium dark mode UI

## How to Use

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Upload your customer data:**
   - File should contain columns: Name, Phone, Points
   - Supports `.xlsx`, `.xls`, and `.csv` formats

4. **Customize the message template:**
   - Use `[nama customer]` for customer name
   - Use `[jumlah poin]` for points amount

5. **Click "Send Message" to open WhatsApp with pre-filled message**

## Sample Data

A sample CSV file (`sample_data.csv`) is included for testing.

## Tech Stack

- Vite
- Vanilla JavaScript
- SheetJS (xlsx)
- CSS3 with Glassmorphism

## Made with love by Ari 💖
