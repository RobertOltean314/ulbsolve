import { PublicKey } from "@solana/web3.js";
// import { Commission } from "./Commission";

export interface User {
  publicKey: PublicKey;
  username: string;
  profileImage?: string;
  createdAt: string;
  // createdCommissions: Commission[];
  // workingOn: Commission[];
}
