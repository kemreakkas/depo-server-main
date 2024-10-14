
const sales = require('../models/sales.model')

exports.create = (req, res) => {

    if(!req.body.name) {
        return res.status(400).send({
            message: "Firma ismi boş olamaz"
        })
    }
    new sales({
        productNumber: req.body.productNumber,
        productName: req.body.productName,
        warehouseName: req.body.warehouseName,
        productDescription: req.body.productDescription,
        productStock: req.body.productStock,
        purchasePrice: req.body.purchasePrice,
        salePrice: req.body.salePrice,
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
    sales.find()
        .then(sales => {
            res.send(sales)
        })
        .catch(err => {
            res.status(500).send(err.message.json())
        })
}

// idye sahip Firmau getir
exports.findOne = (req, res) => {
    sales.findById(req.params.companyId)
        .then(sales => {
            if(!sales) {
                return res.status(404).send({
                    message: "Satış bulunamadı"
                })
            }

            res.send(sales)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `bu idye sahip satış bulunamadı id: ${req.params.companyId}`
                })
            }
            return res.status(500).send({
                message: `Satış getirirken hata oluştu. companyId: ${req.params.companyId}, ${err.message}`
            })
        })
}

// idye sahip Firmau güncelle
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: `Satış içeriği boş olamaz`
        })
    }

    sales.findByIdAndUpdate(req.params.companyId, {
        productNumber: req.body.productNumber,
        productName: req.body.productName,
        warehouseName: req.body.warehouseName,
        productDescription: req.body.productDescription,
        productStock: req.body.productStock,
        purchasePrice: req.body.purchasePrice,
        salePrice: req.body.salePrice,
    }, {new: true})
        .then(sales => {
            if(!sales) {
                return res.status(404).send({
                    message: `şu idye sahip satış bulunamadı: ${req.params.companyId}`
                })
            }
            res.send(sales)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `şu idye sahip satış bulunamadı ${req.params.companyId}`
                })
            }
            return res.status(500).send({
                message: `Satış getirirken hata oluştu. companyId: ${req.params.companyId}, ${err.message}`
            })
        })
}

// idye sahip Firmayı sil
exports.delete = (req, res) => {
    sales.findByIdAndRemove(req.params.companyId)
        .then(sales => {
            if(!sales) {
                return res.status(404).send({
                    message: "Satış bulunamadı. id: " + req.params.companyId
                });
            }
            res.send({
                message: `Satış başarıyla silindi!`
            })
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'FirmaFound') {
                return res.status(404).send({
                    message: "Firma bulunamadı id: " + req.params.companyId
                });
            }
            return res.status(500).send({
                message: "Firma bulunamadı id: " + req.params.companyId
            });
        })
}