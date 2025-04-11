use super::commission_status::CommissionStatus;
use super::submission::Submission;
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace, Debug)]
pub struct Commission {
    // Basic information
    pub request_author: Pubkey,
    #[max_len(32)]
    pub title: String,
    #[max_len(32)]
    pub description: String,
    #[max_len(32)]
    pub image: String,

    // Financial details
    pub reward: i64,
    pub reward_escrow_account: Pubkey,
    pub escrow_initialized: bool,

    // Timeframe
    pub created_at: i64,
    pub deadline: Option<i64>,

    // Status tracking
    pub commission_status: CommissionStatus,

    // Participants
    #[max_len(32)]
    pub commission_participants: Vec<Pubkey>,

    // Submissions tracking (replacing single fulfillment fields)
    #[max_len(32)]
    pub submissions: Vec<Submission>,
    pub accepted_submission_index: Option<u8>,

    // Cancellation policy
    pub cancellation_fee_percentage: u8,
    #[max_len(32)]
    pub cancellation_reason: Option<String>,
    pub cancelled_at: Option<i64>,

    // Dispute handling
    pub dispute_initiated_at: Option<i64>,
    pub dispute_initiated_by: Option<Pubkey>,
    pub dispute_resolution_deadline: Option<i64>,

    // For PDA derivation
    pub bump: u8,
}
