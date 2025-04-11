use super::submission_status::SubmissionStatus;
use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace, Debug)]

pub struct Submission {
    pub submitter: Pubkey,
    pub submitted_at: i64,
    #[max_len(32)]
    pub delivery_message: String,
    #[max_len(32)]
    pub delivery_filepath: String,
    pub status: SubmissionStatus,
    #[max_len(32)]
    pub review_feedback: Option<String>,
    pub reviewed_at: Option<i64>,
}
