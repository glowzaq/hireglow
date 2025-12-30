import express from 'express'
import { server } from '../controllers/serverController'

const router = express.Router()

router.get("/", server)