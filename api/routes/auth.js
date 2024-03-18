import express from "express";
import {register, login, logout,addpersonaldata,addpersonaldiet,getpersonalmeals,checkpersonaldata,updatepersonaldata,getpersonalmealsfortrack,getpersonaldata,getcalory} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/addpersonaldata", addpersonaldata);
router.post("/checkpersonaldata", checkpersonaldata);
router.post("/updatepersonaldata", updatepersonaldata);
router.get("/getpersonaldata", getpersonaldata);
router.get("/getcalory", getcalory);
router.post("/addpersonaldiet", addpersonaldiet);
router.get("/getpersonalmeals", getpersonalmeals);
router.get("/getpersonalmealsfortrack", getpersonalmealsfortrack);
export default router