const mongoose = require('mongoose')

const SalesSchema = mongoose.Schema([{
    productNumber: String,
    productName: String,
    warehouseName: String,
    productDescription: String,
    productStock: String,
    purchasePrice: String,
    salePrice: String,
}], {
    timestamps: true
})

module.exports = mongoose.model('sales', SalesSchema, 'sales')