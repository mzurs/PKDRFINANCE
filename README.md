
***ALL APIS and Components must using error handling to display messages to user using toastify react library

User:

1. SetUserName Component (mandatory for every user otherwise not allowing any operation -can be popup after successfull registration or when user didn't set the name, make an hook to check everytime for userName)

2. Page to list contacts for user By userName 

3. Search api by userName

4. Withdraw page(where user add IBAN number to withdraw the amount, always check for sufficient balance)

5. Deposit page where latest USD/PKR(conversion calculator) rate listed and on bottom there is a buy PKDR button given to direct to Stripe page.

6. User Transactions page

7. Purchase and withdraw page(inflow and outflow)

8. Approve component(button)

9. User Account Balance- api will used Subscripton from GraphQL to get real-time data

10. Level II verification component for zero knowledge profile



Admin:


1. All Transaction data page from PKDR Users (with Chart)

2. Transaction fee component graph add to dashboard with subscription GraphQL

3. page to set user config (retain(Level II verification and Multisig), revoke(Level II verification and Multisig), delete, update) User

4. Total money inflow and outflow chart from PKDR

5. on-chain components

6. gas price component

7. transfer activity component by userAddress

8. set Profile Address API component

9. Set platform fee api page

10. List users component

11. Burn-and Burm From PKDR component apis

12. topUp API to user account component API

Remember all apis have their view to integrate with (pages or components) the above  I listed is the most major ones other are also included and I didn't listed due to their obvious naming 
