import { read, utils } from 'xlsx';

// DOM Elements
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');
const templateInput = document.getElementById('templateInput');
const resultsCard = document.getElementById('resultsCard');
const customerCount = document.getElementById('customerCount');
const tableBody = document.querySelector('#dataTable tbody');

// State
let customerData = [];

// Event Listeners
fileInput.addEventListener('change', handleFileUpload);
templateInput.addEventListener('input', () => renderTable(customerData));

// Functions
async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  fileNameDisplay.textContent = file.name;

  try {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert to JSON
    const jsonData = utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      alert('File appears to be empty or invalid format.');
      return;
    }

    // Normalize keys and store
    customerData = jsonData.map(row => normalizeRow(row));

    // Show results
    resultsCard.classList.remove('hidden');
    customerCount.textContent = `${customerData.length} Customers`;

    renderTable(customerData);

  } catch (error) {
    console.error('Error parsing file:', error);
    alert('Error parsing file. Please ensure it is a valid Excel or CSV file.');
  }
}

function normalizeRow(row) {
  // Create a normalized object with standard keys based on common variations
  const normalized = {
    name: '',
    phone: '',
    points: 0,
    original: row // Keep original data just in case
  };

  // Helper to find value by fuzzy key match
  const findValue = (keywords) => {
    const key = Object.keys(row).find(k =>
      keywords.some(keyword => k.toLowerCase().includes(keyword))
    );
    return key ? row[key] : '';
  };

  normalized.name = findValue(['nama', 'name', 'customer']);
  normalized.phone = findValue(['hp', 'phone', 'telp', 'wa', 'mobile', 'nomor']);
  normalized.points = findValue(['poin', 'point', 'score', 'jumlah']);

  return normalized;
}

function formatPhoneNumber(phone) {
  if (!phone) return '';

  // Convert to string and remove non-digits
  let cleaned = String(phone).replace(/\D/g, '');

  // Replace leading 0 with 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  // If it doesn't start with 62, assume it needs it (if it's a reasonable length)
  else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
}

function generateWhatsAppLink(phone, name, points) {
  const template = templateInput.value;
  const formattedPhone = formatPhoneNumber(phone);

  if (!formattedPhone) return '#';

  let message = template
    .replace(/\[nama customer\]/gi, name || 'Customer')
    .replace(/\[jumlah poin\]/gi, points || '0');

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

function renderTable(data) {
  tableBody.innerHTML = '';

  data.forEach(row => {
    const tr = document.createElement('tr');

    const link = generateWhatsAppLink(row.phone, row.name, row.points);

    tr.innerHTML = `
      <td>${row.name || '-'}</td>
      <td>${row.points || '0'}</td>
      <td>${row.phone || '-'}</td>
      <td>
        <a href="${link}" target="_blank" class="btn-whatsapp">
          <span>💬</span> Send Message
        </a>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}
