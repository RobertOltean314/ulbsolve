use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace, Debug)]
pub enum CommissionStatus {
    Open,
    InProgress,
    UnderReview,
    Completed,
    PendingCancellation,
    Cancelled,
    Disputed,
}
