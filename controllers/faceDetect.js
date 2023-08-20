export const faceDetect = async (req, res, pool) => {
  const { id } = req.body;
  const client = await pool.connect();
  try {
    const data = await client.query(
      'UPDATE users SET entries=entries+1 WHERE id=$1 RETURNING entries',
      [id]
    );
    res.json(data.rows[0]);
  } catch {
    res.status(400).json('An error has occured');
  } finally {
    client.release;
  }
};
