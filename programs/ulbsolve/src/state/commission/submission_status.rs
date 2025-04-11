use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace, Debug)]
pub enum SubmissionStatus {
    Pending,
    Accepted,
    Rejected,
    PendingRevision,
}
