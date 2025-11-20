# WhatsApp Broadcast Tool Walkthrough

## Overview
I have built a web-based application that allows you to upload customer data (Excel/CSV) and generate personalized WhatsApp broadcast links.

## Features
- **File Upload**: Supports `.xlsx`, `.xls`, and `.csv` files.
- **Data Parsing**: Automatically extracts Name, Phone, and Points columns.
- **Template System**: Customizable message template with placeholders `[nama customer]` and `[jumlah poin]`.
- **Smart Link Generation**: Automatically formats phone numbers to international format (62...) and encodes messages.
- **Premium UI**: Modern Dark Mode design with Glassmorphism effects.

## How to Run
1. Open the terminal in VS Code.
2. Run the following command to start the development server:
   ```bash
   npm run dev
   ```
3. Ctrl+Click the link shown in the terminal (usually `http://localhost:5173`) to open the app in your browser.

## How to Use
1. **Upload Data**: Click the upload area and select your customer data file. You can use the `sample_data.csv` file included in the project to test.
2. **Customize Message**: Edit the message in the text area. The links in the table below will update automatically.
3. **Send Messages**: Click the "Send Message" button next to each customer to open WhatsApp Web/App with the pre-filled message.

## Files Created
- `index.html`: Main application structure.
- `style.css`: Premium styling.
- `main.js`: Application logic.
- `sample_data.csv`: Sample file for testing.
