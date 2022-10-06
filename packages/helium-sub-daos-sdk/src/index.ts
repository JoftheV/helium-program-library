import { HeliumSubDaos } from "../../../target/types/helium_sub_daos";
import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { PROGRAM_ID } from "./constants";
import { heliumSubDaosResolvers } from "./resolvers";

export async function init(
  provider: AnchorProvider, 
  programId: PublicKey = PROGRAM_ID, 
  idl?: any): Promise<Program<HeliumSubDaos>> {
  if (!idl) {
    idl = await Program.fetchIdl(
      programId,
      provider
    );
  }
  const program = new Program<HeliumSubDaos>(
    idl as HeliumSubDaos,
    programId ?? PROGRAM_ID,
    provider,
    undefined,
    () => {
      return heliumSubDaosResolvers;
    }
  ) as Program<HeliumSubDaos>;
  
  return program;
}

export * from "./constants";
export * from "./pdas";
export * from "./resolvers";