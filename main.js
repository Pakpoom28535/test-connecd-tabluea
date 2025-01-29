const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require('dotenv').config();
const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Token Generation API",
      version: "1.0.0",
      description: "API to generate JWT tokens for Tableau authentication"
    },
  },
  apis: ["./main.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Fixed values
const USER_ID = process.env.USER_ID;
const KID = process.env.KID;
const ISS = process.env.ISS;
const SECRET_KEY = process.env.SECRET_KEY;
const SCOPE = ["tableau:views:embed"]; // Fixed scope value
const AUTH_TOKEN = process.env.AUTH_TOKEN;

/**
 * @swagger
 * /gentoken:
 *   post:
 *     summary: Generate a JWT token
 *     description: Generates a JWT token with fixed scope and allows input for wurl
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wurl:
 *                 type: string
 *                 description: The Dashboard URL
 *     responses:
 *       200:
 *         description: JWT Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing required parameter
 *       401:
 *         description: Unauthorized access
 */
app.post("/gentoken", (req, res) => {
  const { wurl } = req.body;
  const authHeader = req.headers.authorization;
  console.log(USER_ID,authHeader,AUTH_TOKEN);
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  console.log(wurl);
  if (!wurl) {
    return res.status(400).json({ error: "Missing required parameter: wurl" });
  }

  const header = {
    alg: "HS256",
    typ: "JWT",
    kid: KID,
  };

  const claimSet = {
    sub: USER_ID,
    aud: "tableau",
    nbf: Math.floor(Date.now() / 1000) - 100,
    jti: Date.now().toString(),
    iss: ISS,
    scp: SCOPE,
    exp: Math.floor(Date.now() / 1000) + 600, // Token valid for 10 minutes
  };

  // Generate JWT
  const token = jwt.sign(claimSet, SECRET_KEY, {
    algorithm: "HS256",
    header: header,
  });

  res.json({ token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
