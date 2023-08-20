export const getUserProfile = async (req, res, pool) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    const data = await client.query('SELECT * FROM users WHERE id=$1', [id]);
    if (data.rows.length === 0) {
      throw 'Error getting user';
    }
    res.json(data.rows[0]);
  } catch (err) {
    res.status(400).json(err);
  } finally {
    client.release;
  }
};
