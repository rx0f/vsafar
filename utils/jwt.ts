import { SignJWT, jwtVerify, type JWTPayload } from "jose";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "40h",
};

export async function signJwtAccessToken(payload: JWTPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour
  const secret = process.env.SECRET_KEY;
  // const token = jwt.sign(payload, "qioperumciosdpufkwjeropiu", options);
  // return token;
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verifyJwt(token: string): Promise<JWTPayload> {
  const secret = process.env.SECRET_KEY;
  // const decoded = jwt.verify(token, "qioperumciosdpufkwjeropiu");
  // return decoded as JwtPayload;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
