const router = require("express").Router();
let data = require("../data");
const Aktor = require("../data/data-model");
const cors = require("cors");
router.use(cors({ origin: true }));

router.get("/", (req, res, next) => {
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

router.delete("/:id", (req, res, next) => {
  const {id}=req.params;

  Aktor.finAktorById(id).then(silinecek_aktor=>{
     Aktor.deleteAktor(id).then(deleted=>{
      if(deleted){
          res.status(204).end();
      }else{
          next({
          statusCode:400,
          errorMessage:"Hicbir aktor silinmedi."
      })
      }
  }).catch(error=>{
    next({
        statusCode:500,
        errorMessage:"Aktor silinirken hata olustu.",
        error
    })
  }) 
  }).catch(error=>{
    next({
        statusCode:500,
        errorMessage:"Aktor bulunurken hata olustu.",
        error
    })
  }) 

  
});

router.patch("/:id",(req,res,next)=>{
    const {id}=req.params;
    const updatedAktor = req.body;

    if(!updatedAktor.isim){
        next({
            statusCode:400,
            errorMessage:"Aktor ismi bos olamaz."
        })
    }else {
        Aktor.updateAktor(updatedAktor,id).then(updated=>{
        res.status(200).json(updated)
    })
    .catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Aktor duzenlenırken hata olustu."
        })
    })
    }

    
})

// router.put("/:id", (req, res) => {
//   console.log(req.body);
//   const id = req.params.id;
//   const body = req.body;
//   const current_aktor = data.find((aktor) => aktor.id === parseInt(id));
//   console.log(current_aktor);
//   if (current_aktor) {
//     data[id - 1] = body;
//     res.status(204).end();
//   } else {
//     res
//       .status(404)
//       .json({ errorMessage: "Degistirmek istediginiz parametreler hatalı." });
//   }
// });

router.get("/:id", (req, res, next) => {
  const {id} = req.params;

  Aktor.finAktorById(id).then(aktor=>{
      if(aktor){
          res.status(200).json(aktor);
      }else{
          next({
          statusCode:400,
          errorMessage:"Aktor bulunamadı.",
      })
      }
      
  })
  .catch((error)=>{
      next({
          statusCode:500,
          errorMessage:"Aktor bulunurken hata olustu.",
          error
      })
  })
});

module.exports = router;
