# Simple Banking Application. That allow users create accounts, make deposits  and withdrawal transactions.

#### Requirements:

##### PART 1:

Problem Statement:  

Build an account management application that supports the creation of a new account, deposit, transaction log, and withdrawal.

Your solution should use in-memory storage to store account information. We do not expect you to use any external library for this feature. 

Operations: (The fields and expected behavior of each operation)

Creation of a new account: Account owner name, phone. This operation should return a unique ten-digit account number.

Deposit: Account number and the amount to deposit. This operation should return the total balance in the account and the amount deposited. 

Withdrawal: Account number and the amount to withdraw. This operation should return the balance amount withdrawn and the account balance.

Transactions: Account number (optional), if given account number, return all transactions related to the account. If there is no account number, return all the transactions in the system. Sort the transactions by the most recent. Write the sorting algorithm to sort the transactions by createdAt (unix timestamp)


>[Link to postman docs](https://documenter.getpostman.com/view/9775449/VUjQo59w)

## QUICK START INSTRUCTIONS

```
** run yarn to install dependences

** add a .env file and provide the details in the .env.example file.

** `yarn compile` to compile

** `yarn dev` to spin up the server.

** `yarn test` to run the required tests

```

##### To build a docker image and run the applicationn on docker.

```
** `docker build -t "your uique iimage name"`

** `docker run -d -p "map your server port to the exposed port on dockerfile which is 4000" "your uique iimage name"`

```

### PART 2: Writing

Kindly respond to the following questions in writing.

Do you have experience in any enterprise software architecture?

###### List your top 5 security best practices.

```
**  Validate all input coming from a user and also use good middlewares e.g helment to prevent SQL injection 

**  Implement rate limiting to regulate the amount of requests hitting your endpoint at a given time and to prevent Denail of Service Attack.

**  When there is an error of any sort, always respond with a clear user friendly message to avoid leaking valuable information from the error. 

**  Delete all logs from the code before pushing to production;

**  Return only what the client needs from every request to an endpoint;

```

###### Do you have experience in any enterprise software architecture?

```
Yes I do have experience with designing High Performance, Consistent scalable and secured system>

I have extensive knowledge of Monolithic architetural design and I also have a good understanding of MicroSerrvice architeture. 

```