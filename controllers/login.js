export const login = async (req, res, pool, bcrypt) => {
  const client = await pool.connect();
  try {
    const data = await client.query('SELECT * FROM login WHERE email=$1', [
      req.body.email,
    ]);
    if (data.rows.length === 0) {
      throw 'Wrong email or password';
    }
    const hash = data.rows[0].hash;
    const result = await bcrypt.compare(req.body.password, hash);
    if (!result) {
      throw 'Wrong email or password';
    }
    const user = await client.query('SELECT * FROM users WHERE email=$1', [
      req.body.email,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.release;
  }
};
