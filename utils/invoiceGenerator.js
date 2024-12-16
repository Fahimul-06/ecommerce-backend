const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateInvoice = (orderId, orderDetails) => {
  const doc = new PDFDocument();
  const invoicePath = `invoices/invoice_${orderId}.pdf`;

  
  doc.pipe(fs.createWriteStream(invoicePath));

  doc.fontSize(20).text(`Invoice for Order ${orderId}`);
  doc.fontSize(12).text(`Total Price: $${orderDetails.totalPrice}`);

  doc.end();
  return invoicePath;
};

module.exports = generateInvoice;