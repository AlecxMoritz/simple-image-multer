const router = require('express').Router();
const Image = require('../db').import('../models/image');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
        filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+ file.originalname)
    }
});

var upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    options = { multi: true };

    Image.create({
        path: req.file.path
    })
    .then(successData => res.status(200).json({ data: successData }))
    .catch(err => res.status(500).json({ error: err }))
});

router.get('/:id', (req, res) => {
    Image.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(foundImage => {
        res.status(200);
        res.sendFile(path.resolve('./' + foundImage.path))
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;