use crate::state::{Commission, User};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct AddToWishlist<'info> {
    pub user: Account<'info, User>,
    pub commission: Account<'info, Commission>,
    pub system_program: Program<'info, System>,
}

pub fn handle_add_to_wishlist(ctx: Context<AddToWishlist>) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let commission = &ctx.accounts.commission;

    user.wishlist.push(commission.key());

    Ok(())
}
