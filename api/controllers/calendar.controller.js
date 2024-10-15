
const calendar = require('../models/calendar.model')

exports.create = (req, res) => {

    new calendar({
        date: req.body.date,
        title: req.body.title,
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
    calendar.find()
        .then(calendar => {
            res.send(calendar)
        })
        .catch(err => {
            res.status(500).send(err.message.json())
        })
}

// idye sahip Firmau getir
exports.findOne = (req, res) => {
    calendar.findById(req.params.date)
        .then(calendar => {
            if(!calendar) {
                return res.status(404).send({
                    message: "calendar bulunamadı"
                })
            }

            res.send(calendar)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `bu idye sahip Depo bulunamadı id: ${req.params.title}`
                })
            }
            return res.status(500).send({
                message: `Depo getirirken hata oluştu. calendar: ${req.params.title}, ${err.message}`
            })
        })
}

// idye sahip Firmau güncelle
exports.update = (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            message: `Depo içeriği boş olamaz`
        })
    }

    calendar.findByIdAndUpdate(req.params.title, {
        title: req.body.title,
        date: req.body.date,
    }, {new: true})
        .then(calendar => {
            if(!calendar) {
                return res.status(404).send({
                    message: `şu idye sahip Depo bulunamadı: ${req.params.title}`
                })
            }
            res.send(calendar)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `şu idye sahip calendar bulunamadı ${req.params.title}`
                })
            }
            return res.status(500).send({
                message: `calendar getirirken hata oluştu. calendar: ${req.params.title}, ${err.message}`
            })
        })
}

// idye sahip Firmau sil
exports.delete = (req, res) => {
    calendar.findByIdAndRemove(req.params.title)
        .then(calendar => {
            if(!calendar) {
                return res.status(404).send({
                    message: "calendar bulunamadı. id: " + req.params.title
                });
            }
            res.send({
                message: `calendar başarıyla silindi!`
            })
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'FirmaFound') {
                return res.status(404).send({
                    message: "Depo bulunamadı id: " + req.params.title
                });
            }
            return res.status(500).send({
                message: "Depo bulunamadı id: " + req.params.title
            });
        })
}