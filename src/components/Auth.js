import axios from "axios";

export const exchangeCodeForToken = async (code) => {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const clientId = ""; // Your Spotify client ID
  const clientSecret = ""; // Your Spotify client secret
  const redirectUri = "http://localhost:3000/callback"; // Your redirect URI

  const generateRandomString = (length) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return result;
  };

  const codeVerifier = generateRandomString(64);
  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hashedBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashedBuffer))
      .map((byte) => String.fromCharCode(byte))
      .join("");
  };

  const base64encode = (input) => {
    return btoa(input)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const requestBody = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
  };

  try {
    const response = await axios.post(tokenUrl, requestBody, { headers });

    if (!response.data) {
      throw new Error("Failed to exchange code for token");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to exchange code for token");
  }
};
