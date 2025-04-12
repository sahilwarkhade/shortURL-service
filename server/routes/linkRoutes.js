const express=require("express");
const authMiddleware = require("../middlewares/auth");
const { createShortLink, redirectLink, getAllUserLinks, getAnalytics } = require("../controllers/link");

const router = express.Router();

router.post("/shortlink",authMiddleware,createShortLink);
router.get("/alluserlinks",authMiddleware,getAllUserLinks)
router.get('/analytics', authMiddleware, getAnalytics);
router.get("/:id",redirectLink);
  

module.exports=router;