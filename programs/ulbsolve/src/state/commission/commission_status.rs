use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace, Debug)]
pub enum CommissionStatus {
    Open,
    UnderReview,
    Completed,
    Cancelled,
}
