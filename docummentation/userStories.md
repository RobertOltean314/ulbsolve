# User Stories

🔐 Authentication & Wallet Connection   
•	As a user, I want to connect my wallet to access the marketplace so that my identity is linked to a crypto address.   
•	As a user, if wallet connection fails, I want to be notified and remain on the landing page.   
________________________________________
🛒 Marketplace Browsing & Discovery
•	As a user, I want to view all open project requests in the marketplace.
•	As a user, I want to sort project requests by date (newest/oldest) or reward value (highest/lowest).
•	As a user, I want to search for project requests using keywords.
•	As a user, I want to access the project creation page from the marketplace.
________________________________________
📤 Creating a Project Request
•	As a requester, I want to create a project request by filling in: title, description, requirements, max reward, and deadline.
•	As a requester, I want to pay a small posting fee to discourage spam or trolling.
•	As a requester, I want the full reward amount to be escrowed upon creation to protect contributors.
•	As a requester, I want my project to appear with the status “Open” and be cancelable while open.
•	As a requester, I want my request to be visible only in my profile after cancellation.
________________________________________
🎯 Bidding & Offer Management
•	As a contributor, I want to submit a proposal to work on a project, including my timeframe and reward percentage.
•	As a requester, I want to see a list of all proposals and select the best contributor.
•	As a requester, when I accept a proposal, the project should change status to “Taken”.
•	As a requester, I want to see all contributors who showed interest, even after selecting someone.
________________________________________
📩 Notifications & Deadlines
•	As a contributor, I want to receive a warning notification 6 days after being accepted for a project if I haven't submitted any update yet, so I know I risk losing the project.
•	As a requester, if no update is received after the first 7 days, I want to be notified and allowed to reassign or cancel the project.
•	As a requester, once the contributor submits the first update, I want the option to set a custom deadline for the next update(s), depending on the project's complexity or progress.
•	As a contributor, I want to receive a notification when the requester sends feedback or a new message.
•	As a requester, I want to be notified when the contributor uploads a new update or final delivery.
________________________________________
📦 Update Delivery & Submission
•	As a contributor, I want to submit updates or final work via the app, optionally using:
o	file uploads pushed to an anonymous GitHub repo
o	IPFS/Arweave hashes stored on-chain
•	As a requester, I want to review submitted work and either accept it or send feedback.
•	As a requester, if the work does not meet requirements, I want to provide detailed suggestions and allow a re-submission.
•	As a contributor, I want to revise and re-submit based on feedback if needed.
________________________________________
🔐 Escrow & Payouts
•	As a requester, I want my reward to be held in escrow and released only if I confirm project completion.
•	As a contributor, I want to receive the agreed portion of the reward once my work is approved.
•	As a requester, I want any unused reward portion (from a partial bid) to be refunded.
________________________________________
🚩 Abuse Reporting & Moderation
•	As a user, I want to report a project or contributor if I believe the process is being abused.
•	As a moderator (or DAO), I want to review flagged projects and decide whether to reassign, cancel, or resolve disputes.
•	As a user, I want the project status to change to “Under Review” while a report is being investigated.
________________________________________
✅ Project Completion & History
•	As a requester, once a project is marked as Completed, I want it to be automatically moved out of the active marketplace and stored in my order history.
•	As a contributor, when a project I worked on is marked as Completed, I want it to be added to my “Finished Projects” list.
•	As a requester, if I cancel a project, I want it to be moved to my “Orders” history with a “Canceled” status.
________________________________________
👤 Profile Page
•	As a user, I want to view my public wallet address and wallet balance.
•	As a user, I want to have the option to disconnect or change my wallet.
•	As a contributor, I want to be able to view my “Finished Projects” section, which shows all projects I’ve successfully delivered.
•	As a requester, I want to be able to view my “Orders” section, which includes all project requests I’ve created, including those that are Open, Taken, Completed, or Canceled.
