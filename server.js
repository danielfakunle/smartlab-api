import bcrypt from 'bcrypt';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import pkg from 'pg';
import { faceDetect } from './controllers/faceDetect.js';
import { getUserProfile } from './controllers/getUserProfile.js';
import { login } from './controllers/login.js';
import { signup } from './controllers/signup.js';

const app = express();
const saltRounds = 10;
const { Pool } = pkg;
const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => signup(req, res, pool, bcrypt, saltRounds));

app.post('/login', (req, res) => login(req, res, pool, bcrypt));

app.get('/profile/:id', (req, res) => getUserProfile(req, res, pool));

app.put('/facedetect', (req, res) => faceDetect(req, res, pool));

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// async function getPostgresVersion() {
//   const client = await pool.connect();

//   try {
//     const res = await client.query('SELECT version()');

//     console.log(res.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPostgresVersion();
