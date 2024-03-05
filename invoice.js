const pdfdoc = require('pdfkit')
const fs = require('fs');
const path = require('path');
const {generateString} = require('./generateRandomString');
const { mailsend } = require('./emailConfiguration');

const createInvoicePDF = (userdata) => { 

    const doc = new pdfdoc();
    let filepath = path.join(__dirname, `PDF/Invoice-${Date.now()}-${generateString(7)}.pdf`);
    const writeStream = fs.createWriteStream(`${filepath}`);
    doc.pipe(writeStream);
    
    doc.fontSize(38).text("INVOICE", 60, 70);
    doc.image('./tsp.jpg', { align: 'right', valign: 'center', fit: [500, 50] }, 60, 100);
    doc.fontSize(12).text('Order ID', 62, 140);
    doc.fontSize(12).text('#0000001', 62, 160); // data
    doc.fontSize(12).text('Date of issue', 200, 140);
    doc.fontSize(12).text(userdata.order_date, 200, 160); // order date
    
    doc.fontSize(14).text("Billed to : ", 62, 200);
    doc.fontSize(12).text(userdata.customer_name, 62, 220); // customer name
    doc.fontSize(12).text(userdata.address, 62, 240); // address 
    doc.fontSize(12).text(userdata.city, 62, 260); // city
    doc.fontSize(12).text(userdata.pincode, 62, 280); // pinocode
    
    // table 
    doc.fontSize(14).text("Item", 62, 340);
    doc.fontSize(14).text("price", 360, 340);
    doc.fontSize(14).text("Qty", 430, 340);
    doc.fontSize(14).text("Amount", 490, 340);
    
    // line
    doc.moveTo(50, 360).lineTo(560, 360).stroke();
    let itemHeight = 360;
    for (let i = 0; i < 4; i++) {
        itemHeight += 20;
        // item       price  qty  amount
    doc.fontSize(12).text("test item, test, item, test item", 62, itemHeight);
    doc.fontSize(12).text("200", 361, itemHeight);
    doc.fontSize(12).text("2", 431, itemHeight);
    doc.fontSize(12).text("400", 491, itemHeight);
        
    }
    
    // line
    doc.moveTo(50, 620).lineTo(560, 620).stroke();
    doc.fontSize(14).text("Total", 62, 630);
    doc.fontSize(14).text("1600", 490, 630);
    doc.moveDown();
    doc.fontSize(14).text("Thanks for choosing ", 0, 700, { align: "center" });
    doc.image('./tsp.jpg', {align: 'center', valign: 'center', fit: [750, 30] }, 690, 0);
    
    doc.end();

    writeStream.on('finish', () => { 
        console.log('PDF created successfully');
        let emaildata = {
            to: 'meet.sanghavi@plutustec.com',
            subject: "INVOICE",
            filepath: filepath
        }
        mailsend(emaildata);
    })
    

}

module.exports = { createInvoicePDF };