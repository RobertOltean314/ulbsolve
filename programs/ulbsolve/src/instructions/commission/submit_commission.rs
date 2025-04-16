use crate::state::{Commission, CommissionStatus, Submission, SubmissionStatus, User};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct SubmitCommission<'info> {
    #[account(mut)]
    pub submitter: Signer<'info>,

    #[account(
        mut,
        constraint = commission.commission_status == CommissionStatus::Open,
        constraint = submitter.key() != commission.request_author,
    )]
    pub commission: Account<'info, Commission>,

    #[account(
        mut,
        constraint = user.public_key == submitter.key(),
    )]
    pub user: Account<'info, User>,
    pub system_program: Program<'info, System>,
}

pub fn handle_submit_commission(
    ctx: Context<SubmitCommission>,
    delivery_message: String,
    delivery_filepath: String,
) -> Result<()> {
    let commission = &mut ctx.accounts.commission;
    let submitter = &ctx.accounts.submitter;
    let current_time = Clock::get()?.unix_timestamp;
    let user = &mut ctx.accounts.user;

    let submission = Submission {
        submitter: submitter.key(),
        submitted_at: current_time,
        delivery_message,
        delivery_filepath,
        status: SubmissionStatus::Pending,
        review_feedback: None,
        reviewed_at: None,
    };

    commission.submissions.push(submission);

    commission.commission_status = CommissionStatus::UnderReview;

    if !commission
        .commission_participants
        .contains(&submitter.key())
    {
        commission.commission_participants.push(submitter.key());
    }

    if !user.working_on.contains(&ctx.accounts.commission.key()) {
        user.working_on.push(ctx.accounts.commission.key());
    }

    Ok(())
}
