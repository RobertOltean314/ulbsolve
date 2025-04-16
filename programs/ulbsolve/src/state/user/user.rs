use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace, Debug)]
pub struct User {
    // Core identifiers
    pub public_key: Pubkey,
    #[max_len(32)]
    pub username: String,

    // Profile info
    #[max_len(32)]
    pub profile_image: String,
    pub created_commissions: u64,

    // Lists
    #[max_len(32)]
    pub wishlist: Vec<Pubkey>,
    #[max_len(32)]
    pub working_on: Vec<Pubkey>,

    // System info
    pub created_at: i64,
    pub bump: u8,
}

impl User {
    pub fn new(public_key: Pubkey, username: String) -> Self {
        Self {
            public_key,
            username,
            profile_image: String::new(),
            created_commissions: 0,
            wishlist: Vec::new(),
            working_on: Vec::new(),
            created_at: chrono::Utc::now().timestamp(),
            bump: 0,
        }
    }
}
