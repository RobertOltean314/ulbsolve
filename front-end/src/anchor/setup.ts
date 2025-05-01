import { IdlAccounts, Program, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Ulbsolve } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

// Program ID from the IDL
const programId = new PublicKey("GsdFK1NysJH9XUY7h8qu25Qt8eF6ADD84djWb6D7HV8J");

// Initialize connection to Solana devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Create a minimal provider (for read-only operations)
const provider = new AnchorProvider(connection);

// Initialize the program interface with the IDL, program ID, and provider
export const program = new Program<Ulbsolve>(IDL, programId, provider);

// Derive PDAs for accounts
export const getUserPDA = (userPublicKey: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("user"), userPublicKey.toBuffer()],
    program.programId
  );
};

export const getCommissionPDA = (
  userPublicKey: PublicKey,
  createdCommissions: number
) => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("commission"),
      userPublicKey.toBuffer(),
      Buffer.from(createdCommissions.toString()),
    ],
    program.programId
  );
};

// TypeScript types for account data structures based on the IDL
export type UserData = IdlAccounts<Ulbsolve>["user"];
export type CommissionData = IdlAccounts<Ulbsolve>["commission"];
