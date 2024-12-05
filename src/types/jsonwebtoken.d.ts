declare module "jsonwebtoken" {
    export interface SignOptions {
      expiresIn?: string | number;
      notBefore?: string | number;
      audience?: string | string[];
      issuer?: string;
      jwtid?: string;
      subject?: string;
      noTimestamp?: boolean;
      header?: object;
      encoding?: string;
    }
  
    export interface VerifyOptions {
      audience?: string | RegExp | Array<string | RegExp>;
      issuer?: string | string[];
      jwtid?: string;
      subject?: string;
      clockTolerance?: number;
      maxAge?: string | number;
      clockTimestamp?: number;
      nonce?: string;
    }
  
    export function sign(
      payload: string | object | Buffer,
      secretOrPrivateKey: string | Buffer,
      options?: SignOptions
    ): string;
  
    export function verify(
      token: string,
      secretOrPublicKey: string | Buffer,
      options?: VerifyOptions
    ): object | string;
  
    export function decode(
      token: string,
      options?: { complete?: boolean }
    ): null | { [key: string]: any };
  }
  