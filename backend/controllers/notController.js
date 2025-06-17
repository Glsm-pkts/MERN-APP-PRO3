const NotModel = require("../models/notModels")

const mongoose = require('mongoose');
//POST
const notOluştur = async (req,res) => {
    const {baslik, aciklama} = req.body;

    try {
const not = await NotModel.create({baslik, aciklama})
res.status(200).json(not)
    }catch(error) {
res.status(400).json({hata:error.message})
    }
}
//GET
const notlarGetir = async (req, res) => {
    const notlar = await NotModel.find().sort({
        createdAt: -1 // en yeni olanları ilk göster
    })

    res.status(200).json(notlar)
}
//GET by ID
// Notları ID ile getirme

const notGetir = async (req, res) => {
    const { id } = req.params;
    console.log(`İstek alınan ID: ${id}`); 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ hata: 'Geçersiz id' });
    }
    const not = await NotModel.findById(id);
    if (!not) {
        return res.status(404).json({ hata: 'Not bulunamadı' });
    }
    res.status(200).json(not);

};

//DELETE
const notSil = async (req, res) => {
    const{id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({hata: 'Geçersiz id'})
    }
    const not = await NotModel.findOneAndDelete({_id:id})

    if(!not) {
        return res.status(404).json({hata: 'Not silinemedi'})
    }
    res.status(200).json(not)
}

//PATCH
const notGuncelle = async (req, res) => {
    const{id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({hata: 'Geçersiz id'})
    }
    const  not = await NotModel.findOneAndUpdate({_id:id},{
        ...req.body
    },{new:true})

    if(!not) {
        return res.status(404).json({hata: 'Not guncellenmedi'})
    }
    res.status(200).json(not)
}
module.exports={
    notOluştur, notlarGetir, notGetir, notSil, notGuncelle
}