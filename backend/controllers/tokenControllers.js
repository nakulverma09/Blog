const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid or expired token" });

      res.json({ user: decoded });
  });
}

exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ error: "Refresh token missing" });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid refresh token" });

    const user = { id: decoded.id, username: decoded.username }; // include any payload you use
    const newAccessToken = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: "7d" });
    const newRefreshToken = jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    res.json({ accessToken: newAccessToken,refreshToken: newRefreshToken, user }); // optional: return user info too
  });
}