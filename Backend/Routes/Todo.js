import express from "express";
import {createTodo,MarkUpadte,GetAllTodo,deleteTodo,DiscriotionUpadte} from '../Controllers/TodoController.js'
import  {verifyToken} from '../Auth/verifyToken.js'
const router = express.Router();

router.post("/:id",verifyToken,createTodo)
router.patch("/:id",verifyToken,MarkUpadte)
router.get("/:id",verifyToken,GetAllTodo)
router.delete("/:id",verifyToken,deleteTodo)
router.patch("/update/:id",verifyToken,DiscriotionUpadte)
export default router;