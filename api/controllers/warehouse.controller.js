
const warehouse = require('../models/warehouse.model')

exports.create = (req, res) => {

    if(!req.body.name) {
        return res.status(400).send({
            message: "Depo ismi boş olamaz"
        })
    }
    new warehouse({
        stockNumber: req.body.stockNumber,
        productName: req.body.productName,
        warehouse: req.body.warehouse,
        stock: req.body.stock,
        purchasePrice: req.body.purchasePrice,
        salePrice: req.body.salePrice,
        companyDescription: req.body.companyDescription,
    }).save()
        .then(data => {
            console.log(data, 'data')
            res.send(data)
        })
        .catch(err => {
            console.log(err, 'err')
            res.status(500).send(err.message.json())
        })
}

// tüm Firmaları getir
exports.findAll = (req, res) => {
    warehouse.find()
        .then(warehouse => {
            res.send(warehouse)
        })
        .catch(err => {
            res.status(500).send(err.message.json())
        })
}

// idye sahip Firmau getir
exports.findOne = (req, res) => {
    warehouse.findById(req.params.companyId)
        .then(warehouse => {
            if(!warehouse) {
                return res.status(404).send({
                    message: "Depo bulunamadı"
                })
            }

            res.send(warehouse)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `bu idye sahip Depo bulunamadı id: ${req.params.companyId}`
                })
            }
            return res.status(500).send({
                message: `Depo getirirken hata oluştu. warehouseId: ${req.params.companyId}, ${err.message}`
            })
        })
}

// idye sahip Firmau güncelle
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: `Depo içeriği boş olamaz`
        })
    }

    warehouse.findByIdAndUpdate(req.params.companyId, {
        stockNumber: req.body.stockNumber,
        productName: req.body.productName,
        warehouse: req.body.warehouse,
        stock: req.body.stock,
        purchasePrice: req.body.purchasePrice,
        salePrice: req.body.salePrice,
        companyDescription: req.body.companyDescription,
    }, {new: true})
        .then(warehouse => {
            if(!warehouse) {
                return res.status(404).send({
                    message: `şu idye sahip Depo bulunamadı: ${req.params.companyId}`
                })
            }
            res.send(warehouse)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `şu idye sahip Depo bulunamadı ${req.params.companyId}`
                })
            }
            return res.status(500).send({
                message: `Depo getirirken hata oluştu. warehouseId: ${req.params.companyId}, ${err.message}`
            })
        })
}

// idye sahip Firmau sil
exports.delete = (req, res) => {
    warehouse.findByIdAndRemove(req.params.companyId)
        .then(warehouse => {
            if(!warehouse) {
                return res.status(404).send({
                    message: "Depo bulunamadı. id: " + req.params.companyId
                });
            }
            res.send({
                message: `Depo başarıyla silindi!`
            })
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'FirmaFound') {
                return res.status(404).send({
                    message: "Depo bulunamadı id: " + req.params.companyId
                });
            }
            return res.status(500).send({
                message: "Depo bulunamadı id: " + req.params.companyId
            });
        })
}