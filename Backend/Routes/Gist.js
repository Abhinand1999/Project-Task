import express from "express";
import {createGits} from '../Controllers/gistController.js'
import  {verifyToken} from '../Auth/verifyToken.js'

const router = express.Router();
router.post('/:id',createGits)


export default router;