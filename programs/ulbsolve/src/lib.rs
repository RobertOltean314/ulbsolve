use anchor_lang::prelude::*;

declare_id!("GsdFK1NysJH9XUY7h8qu25Qt8eF6ADD84djWb6D7HV8J");

#[program]
pub mod ulbsolve {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
