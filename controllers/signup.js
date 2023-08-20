export const signup = async (req, res, pool, bcrypt, saltRounds) => {
  const { name, email, password } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const usersQuery =
      'INSERT INTO users (name, email, joined) VALUES ($1, $2, $3) RETURNING *';
    const loginQuery = 'INSERT INTO login (email, hash) VALUES ($1, $2)';
    const hash = await bcrypt.hash(password, saltRounds);
    await client.query(loginQuery, [email, hash]);
    const data = await client.query(usersQuery, [name, email, new Date()]);
    await client.query('COMMIT');
    res.json(data.rows[0]);
  } catch {
    await client.query('ROLLBACK');
    res.status(400).json('Unable to Register');
  } finally {
    client.release;
  }
};
