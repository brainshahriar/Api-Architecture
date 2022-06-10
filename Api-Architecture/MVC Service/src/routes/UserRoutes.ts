import express from 'express'
import multer from 'multer';
import path from 'path';
import userController from '../controllers/UserController';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ path.extname(file.originalname))
    }
  })
  
  
  const upload = multer({
    storage:storage
  }).single("image")

//public route

router.post('/post',upload,userController.post)
router.get('/getall',userController.get)
router.get('/getall/:id',userController.getByid)
router.put('/update/:id',upload,userController.update)
router.delete('/delete/:id',userController.delete)

// router.patch('/todoupdate/:id',upload,todoController.updateTodo)


export default router