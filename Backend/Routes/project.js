import express from "express";
import {createProject,GetAllProjects,GetProject,titleUpadte} from '../Controllers/ProjectController.js'
import  {verifyToken} from '../Auth/verifyToken.js'
const router = express.Router();

router.get("/:id",verifyToken,GetProject)
router.get('/',verifyToken,GetAllProjects)
router.post('/',verifyToken,createProject)
router.put('/:id',verifyToken,titleUpadte)
export default router;