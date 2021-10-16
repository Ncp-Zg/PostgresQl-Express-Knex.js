const router = require("express").Router();
let data = require("../data");
const Aktor = require("../data/data-model");
const cors = require("cors");
router.use(cors({ origin: true }));

router.get("/", (req, res) => {
  Aktor.findAktor()
    .then((aktorler) => {
      res.status(200).json(aktorler);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktorler alınırken hata olustu",
        error,
      });
    });
  //   res.status(200).json(data);
});

router.post("/", (req, res, next) => {
  const yeniAktor = req.body;

  if(!yeniAktor.isim){
      next({
          statusCode:400,
          errorMessage:"Aktor eklemek icin isim girmelisiniz."
      })
  }else {
      Aktor.addAktor(yeniAktor).then(added =>{
          res.status(201).json(added);
      }).catch(error=>{
          next({
              statusCode:500,
              errorMessage:"Aktor eklerken hata olustu",
              error
          })
      })
  }
});

router.delete("/:id", (req, res) => {
  const silinecek_id = req.params.id;
  const silinecek_aktor = data.find(
    (aktor) => aktor.id === Number(silinecek_id)
  );

  if (silinecek_aktor) {
    data = data.filter((aktor) => aktor.id !== Number(silinecek_id));
    res.status(204).end();
  } else {
    res
      .status(404)
      .json({ errorMessage: "Silmeye calıstıgınız aktor sıstemde yok." });
  }
});

router.put("/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const body = req.body;
  const current_aktor = data.find((aktor) => aktor.id === parseInt(id));
  console.log(current_aktor);
  if (current_aktor) {
    data[id - 1] = body;
    res.status(204).end();
  } else {
    res
      .status(404)
      .json({ errorMessage: "Degistirmek istediginiz parametreler hatalı." });
  }
});

router.get("/:id", (req, res) => {
  console.log("req.body", req.body);
  const { id } = req.params;
  const aktor = data.find((aktor) => aktor.id === parseInt(id));
  if (aktor) {
    res.status(200).json(aktor);
  } else {
    res.status(404).send("Aradıgınız aktor bulunamadı...");
  }
});

module.exports = router;
