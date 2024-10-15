
const company = require('../models/company.model')

exports.create = (req, res) => {

    if(!req.body.companyName) {
        return res.status(400).send({
            message: "Firma ismi boş olamaz"
        })
    }
         new company({
             companyName: req.body.companyName,
             companyPhone: req.body.companyPhone,
             companyOwner: req.body.companyOwner,
             companyContact: req.body.companyContact,
             companyContactPhone: req.body.companyContactPhone,
             location: req.body.location,
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
    company.find()
        .then(company => {
            res.send(company)
        })
        .catch(err => {
            res.status(500).send(err.message.json())
        })
}

// idye sahip Firmayı getir
exports.findOne = (req, res) => {
    company.findById(req.params.companyId)
        .then(company => {
            if(!company) {
                return res.status(404).send({
                    message: "Firma bulunamadı"
                })
            }

            res.send(company)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `bu idye sahip Firma bulunamadı id: ${req.params.companyId}`
                })
            }
            return res.status(500).send({
                message: `Firmau getirirken hata oluştu. companyId: ${req.params.companyId}, ${err.message}`
            })
        })
}

// idye sahip Firmau güncelle
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: `Firma içeriği boş olamaz`
        })
    }

    company.findByIdAndUpdate(req.params.companyId, {
        companyName: req.body.companyName || '',
        companyPhone: req.body.companyPhone,
        companyOwner: req.body.companyOwner,
        companyContact: req.body.companyContact,
        companyContactPhone: req.body.companyContactPhone,
        location: req.body.location,
        companyDescription: req.body.companyDescription,
    }, {new: true})
        .then(company => {
            if(!company) {
                return res.status(404).send({
                    message: `şu idye sahip Firma bulunamadı: ${req.params.companyId}`
                })
            }
            res.send(company)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `şu idye sahip Firma bulunamadı ${req.params.companyId}`
                })
            }
            return res.status(500).send({
                message: `Firma getirirken hata oluştu. companyId: ${req.params.companyId}, ${err.message}`
            })
        })
}

// idye sahip Firmayı sil
exports.delete = (req, res) => {
    company.findByIdAndRemove(req.params.companyId)
        .then(company => {
            if(!company) {
                return res.status(404).send({
                    message: "Firma bulunamadı. id: " + req.params.companyId
                });
            }
            res.send({
                message: `Firma başarıyla silindi!`
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