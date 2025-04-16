📘 Product Specification: ULBSolve   
Overview   
ULBSolve is a decentralized project request marketplace tailored for students. It enables users to post project requests with crypto rewards and allows others to submit offers to complete those projects. All interactions are handled via wallet authentication and on-chain escrow.   

🎯 Goals   
•	Facilitate trustless collaboration between users   
•	Prevent spam and trolling via fee systems   
•	Use wallet-based identity and on-chain guarantees   
•	Support fair competition via bidding and contributor selection   
•	Enable feedback and conflict resolution mechanisms    
________________________________________
🧑‍💻 User Roles   
1.	Requester – posts project requests and funds them.   
2.	Contributor – applies to take on project requests and deliver work.   
3.	Moderator (optional or DAO-based) – handles disputes and flags.   
________________________________________
🧩 Core Features   
1. Wallet Login   
•	Users connect via wallet (Phantom, Solflare, etc.)   
•	On success → redirect to Marketplace   
•	On failure → stay on Landing Page with error

2. Marketplace View   
•	Shows all open project requests   
•	Filters: sort by date, reward   
•	Search bar by keywords   
•	"Create Project Request" button   
•	"Profile" button in navbar

3. Create Project Request button   
Fields:   
•	Title   
•	Description   
•	Requirements (mandatory)   
•	Maximum reward   
•	Deadline   
Rules:   
•	Small fee required to post (anti-spam)   
•	Reward is escrowed in a smart contract   
•	Initial status: “Open”   
•	Requester can cancel only while status is Open   
•	Project appears in requester’s order history

4. Bidding & Offers   
•	Contributors can submit proposals like:   
o	"I’ll deliver in 2 weeks for 100% reward"   
o	"I’ll deliver in 10 days for 90% of the reward"   
•	Requester selects the best offer → project status becomes “Taken”   
•	If no updates in 7 days → requester can choose another contributor   
•	Once the contributor submits the first update, the requester sets a custom deadline for future updates   
•	Deliverable is submitted (as file or repo)   
•	Requester reviews and can:   
o	Accept → payment is released   
o	Send feedback → contributor revises   
•	Reward is split according to agreement, unused portion is returned

5. File Delivery / Updates   
Options (TBD):   
•	Upload on-site, auto-push to anonymous GitHub repo   
•	Store on IPFS/Arweave with hash logged on-chain   
•	Anonymous contributor IDs
 
6. Reporting & Moderation      
•	"Report" button triggers “Under Review” state   
•	Third-party or DAO moderation reviews the case   
•	Outcome may:   
o	Reassign project   
o	Slash contributor’s reward   
o	Refund requester
 
7. Project Completion   
•	Status: "Completed"   
•	Hidden from active marketplace   
•	Visible on profiles:   
o	Requester → “Orders”   
o	Contributor → “Finished Projects”   

8. Profile Page   
•	Shows:   
o	Public key   
o	Wallet balance   
o	“Disconnect” + “Change Wallet” buttons   
o	Sections:   
	1. Finished Projects
  	2. Orders


