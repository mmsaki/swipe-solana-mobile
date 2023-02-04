import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { Connection, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { PROGRAM_ID } from "../constants";

export const getProgram = (connection: Connection, wallet: Wallet) => {
  const IDL = require("./idl.json");
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  const program = new Program(IDL, PROGRAM_ID, provider);
  return program;
};

export const getUserAccountPk = async (owner: { toBuffer: () => Buffer | Uint8Array; }) => {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("user"), owner.toBuffer()],
      PROGRAM_ID
    )
  )[0];
};

export const getPostAccountPk = async (owner: { toBuffer: () => Buffer | Uint8Array; }, id: any) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from("post"),
        owner.toBuffer(),
        new BN(id).toArrayLike(Buffer, "le", 8),
      ],
      PROGRAM_ID
    )
  )[0];
};

export const getLikeAccountPk = async (owner: { toBuffer: () => Buffer | Uint8Array; }, user: { toBuffer: () => Buffer | Uint8Array; }) => {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("match"), owner.toBuffer(), user.toBuffer()],
      PROGRAM_ID
    )
  )[0];
};


export const encryptPayload = (payload: any, sharedSecret?: Uint8Array) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const nonce = nacl.randomBytes(24);

  const encryptedPayload = nacl.box.after(
    Buffer.from(JSON.stringify(payload)),
    nonce,
    sharedSecret
  );

  return [nonce, encryptedPayload];
};

export const decryptPayload = (
  data: string,
  nonce: string,
  sharedSecret?: Uint8Array
) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const decryptedData = nacl.box.open.after(
    bs58.decode(data),
    bs58.decode(nonce),
    sharedSecret
  );
  if (!decryptedData) {
    throw new Error("Unable to decrypt data");
  }
  return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};
