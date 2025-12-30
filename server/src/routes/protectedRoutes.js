import express from 'express'
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/me", protect, (req, res)=>{
    res.set("Cache-Control", "no-store")
    res.json({user: req.user})
})

export default router