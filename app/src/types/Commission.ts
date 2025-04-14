import { PublicKey } from "@solana/web3.js";
import { CommissionStatus } from "./CommissionStatus";
import { Submission } from "./Submission";

export interface Commission {
  id: string;
  requestAuthor: PublicKey;
  title: string;
  description: string;
  image?: string;
  reward: number;
  rewardEscrowAccount: PublicKey;
  escrowInitialized: boolean;
  createdAt: string;
  deadline?: string;
  commissionStatus: CommissionStatus;
  commissionParticipants: PublicKey[];
  submissions: Submission[];
  acceptedSubmissionIndex?: number;
  cancellationFeePercentage?: number;
  cancellationReason?: string;
  cancelledAt?: string;
  disputeInitiatedAt?: string;
  disputeInitiatedBy?: PublicKey;
  disputeResolutionDeadline?: string;
  daysLeft?: number;
  participants?: number;
}
