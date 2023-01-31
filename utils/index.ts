import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { Connection, PublicKey } from "@solana/web3.js";

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
