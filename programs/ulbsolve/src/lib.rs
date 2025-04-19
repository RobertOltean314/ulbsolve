#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;

pub use instructions::*;
pub use state::*;

declare_id!("xqoAEhS6WGSpM9PmtbXhk59FK7U8VxFtRmyK7vCRhUN");

#[program]
pub mod ulbsolve {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Program initialized!");
        Ok(())
    }

    //TODO: Do we need create_user?
    pub fn update_profile(
        ctx: Context<UpdateProfile>,
        username: Option<String>,
        profile_image: Option<String>,
    ) -> Result<()> {
        crate::instructions::user::handle_update_profile(ctx, username, profile_image)
    }

    pub fn add_to_wishlist(ctx: Context<AddToWishlist>) -> Result<()> {
        crate::instructions::user::handle_add_to_wishlist(ctx)
    }

    pub fn add_to_working_on(ctx: Context<AddToWorkingOn>) -> Result<()> {
        crate::instructions::user::handle_add_to_working_on(ctx)
    }

    pub fn create_commission(
        ctx: Context<CreateCommission>,
        title: String,
        description: String,
        reward: i64,
        image: Option<String>,
        deadline: Option<i64>,
    ) -> Result<()> {
        crate::instructions::commission::handle_create_commission(
            ctx,
            title,
            description,
            reward,
            image,
            deadline,
        )
    }

    pub fn submit_commission(
        ctx: Context<SubmitCommission>,
        delivery_message: String,
        delivery_filepath: String,
    ) -> Result<()> {
        crate::instructions::commission::handle_submit_commission(
            ctx,
            delivery_message,
            delivery_filepath,
        )
    }
}

#[derive(Accounts)]
pub struct Initialize {}
