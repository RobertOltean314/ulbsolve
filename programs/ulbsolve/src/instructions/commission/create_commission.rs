use crate::state::{Commission, CommissionStatus, User};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(title: String, description: String, reward: i64, cancellation_fee_percentage: u8)]
pub struct CreateCommission<'info> {
    #[account(
        mut,
        seeds = [b"user", user.key().as_ref()],
        bump = user.bump,
    )]
    pub user: Account<'info, User>,

    #[account(
        init,
        payer = user,
        space = 8 + Commission::INIT_SPACE,
        seeds = [b"commission", user.key().as_ref(), &user.created_commissions.to_le_bytes()],
        bump
    )]
    pub commission: Account<'info, Commission>,

    pub system_program: Program<'info, System>,
}

pub fn handle_create_commission(
    ctx: Context<CreateCommission>,
    title: String,
    description: String,
    reward: i64,
    image: Option<String>,
    deadline: Option<i64>,
) -> Result<()> {
    let commission = &mut ctx.accounts.commission;
    let user = &mut ctx.accounts.user;
    let clock = Clock::get()?;

    require!(title.len() <= 32, CreateCommissionErrorCode::TitleTooLong);
    require!(
        description.len() <= 1000,
        CreateCommissionErrorCode::DescriptionTooLong
    );
    require!(reward > 0, CreateCommissionErrorCode::InvalidReward);

    if let Some(ref img) = image {
        require!(img.len() <= 32, CreateCommissionErrorCode::ImageTooLong);
    }

    commission.request_author = user.key();
    commission.title = title;
    commission.description = description;
    commission.reward = reward;
    commission.reward_escrow_account = Pubkey::default(); //TODO: Come back at this
    commission.escrow_initialized = false;
    commission.created_at = clock.unix_timestamp;
    commission.deadline = deadline;
    commission.commission_status = CommissionStatus::Open;
    commission.commission_participants = Vec::new();
    commission.submissions = Vec::new();
    commission.accepted_submission_index = None;
    commission.cancellation_fee_percentage = 10;
    commission.cancellation_reason = None;
    commission.cancelled_at = None;
    commission.dispute_initiated_at = None;
    commission.dispute_initiated_by = None;
    commission.dispute_resolution_deadline = None;
    commission.image = image.unwrap_or_default();
    commission.bump = ctx.bumps.commission;

    // Update user stats
    user.created_commissions += 1;

    Ok(())
}

#[error_code]
pub enum CreateCommissionErrorCode {
    #[msg("You are not authorized to create a commission")]
    Unauthorized,
    #[msg("Title exceeds maximum length of 32 characters")]
    TitleTooLong,
    #[msg("Description exceeds maximum length of 1000 characters")]
    DescriptionTooLong,
    #[msg("Image reference exceeds maximum length of 32 characters")]
    ImageTooLong,
    #[msg("Reward must be greater than 0")]
    InvalidReward,
}
