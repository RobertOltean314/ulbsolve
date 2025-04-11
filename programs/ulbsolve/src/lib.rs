#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;

pub mod state;

pub use state::*;

declare_id!("GsdFK1NysJH9XUY7h8qu25Qt8eF6ADD84djWb6D7HV8J");

#[program]
pub mod ulbsolve {
    use super::*;
}

#[derive(Accounts)]
pub struct Initialize {}
