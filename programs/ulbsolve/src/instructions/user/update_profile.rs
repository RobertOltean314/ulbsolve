use crate::state::User;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        seeds = [b"user", public_key.key().as_ref()],
        bump = user.bump,
        has_one = public_key @ UpdateProfileErrorCode::Unauthorized,
    )]
    pub user: Account<'info, User>,

    #[account(mut)]
    pub public_key: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handle_update_profile(
    ctx: Context<UpdateProfile>,
    username: Option<String>,
    profile_image: Option<String>,
) -> Result<()> {
    let user = &mut ctx.accounts.user;

    if let Some(username_val) = username {
        require!(
            username_val.len() <= 32,
            UpdateProfileErrorCode::UsernameMaxLengthExceeded
        );

        //TODO: Add additional validation
        user.username = username_val;
    }

    if let Some(profile_image_val) = profile_image {
        //TODO: How do we validate the profile image?
        require!(
            profile_image_val.len() <= 32,
            UpdateProfileErrorCode::ProfileImageMaxLengthExceeded
        );

        user.profile_image = profile_image_val;
    }

    Ok(())
}

#[error_code]
pub enum UpdateProfileErrorCode {
    #[msg("You are not authorized to update this profile")]
    Unauthorized,

    #[msg("Username exceeds maximum length of 32 characters")]
    UsernameMaxLengthExceeded,

    #[msg("Profile image exceeds maximum length of 32 characters")]
    ProfileImageMaxLengthExceeded,
}
