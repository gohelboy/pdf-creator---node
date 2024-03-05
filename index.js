const {createInvoicePDF} = require('./invoice');

let userdata = {
    order_id: '1',
    order_date: '27/5/2023',
    customer_name: 'Test',
    address: 'kharvavada julelal road near ambe temple',
    city: 'veraval',
    pincode: '362265',
}
createInvoicePDF(userdata)


