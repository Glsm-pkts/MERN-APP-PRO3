const express = require('express');
const router = express.Router();


// Controllerları yükle
const { notOluştur, notlarGetir, notGetir, notSil, notGuncelle } = require('../controllers/notController');

router.get("/", notlarGetir); // Önce tüm notları listeleyen rota
router.get("/:id", notGetir); // Sonra ID ile tek not getiren rota

// Yeni not ekle
router.post('/', notOluştur)

// Not sil
router.delete("/:id", notSil)

// Not güncelle
router.patch('/:id', notGuncelle);


module.exports = router;
