const express = require("express");
const router = express.Router();
const {upload} = require('../middleware/multer')

const {savePlace, getPlace, deletePlace, updatePlace} = require('../controllers/place-controller');

router.get('/',getPlace);
//router.post('/',savePlace);
router.delete('/:pid',deletePlace);
router.post("/", upload.single('image'), savePlace);
//router.put('/:pid',updatePlace);
// router.post('/upload_image/:pid', upload.single("image"), uploadImage);
router.put("/:pid", upload.single('image'), updatePlace);

module.exports = router;