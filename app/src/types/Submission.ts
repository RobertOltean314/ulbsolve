import { SubmissionStatus } from "./SubmissionStatus";
import { PublicKey } from "@solana/web3.js";

export interface Submission {
  submitter: PublicKey;
  submittedAt: string;
  deliveryMessage: string;
  deliveryFilepath: string;
  status: SubmissionStatus;
  reviewFeedback?: string;
  reviewedAt?: string;
}
