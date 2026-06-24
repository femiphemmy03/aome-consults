import jwt from 'jsonwebtoken';

export async function loginAdmin(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '12h'
    });

    res.json({ token, username });
  } catch (err) {
    next(err);
  }
}
