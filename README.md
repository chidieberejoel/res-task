# res-task

Solution to Fullstack Developer Application

## Prerequisites

- Node.js installed on your development machine. Get Node.js [here](https://nodejs.org/en/download/).

- Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account. Sign up [here](https://signup.live.com/signup?wa=wsignin1.0&rpsnv=12&ct=1454618383&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https://mail.live.com/default.aspx&id=64855&cbcxt=mai&bk=1454618383&uiflavor=web&uaid=b213a65b4fdc484382b6622b3ecaa547&mkt=E-US&lc=1033&lic=1)

- MongoDB Atlas account. Log In or Sign Up [here](https://www.mongodb.com/cloud/atlas/register)

## Register a web application with the Azure Active Directory admin center

Open a browser and navigate to the [Azure Active Directory admin center](https://aad.portal.azure.com). Login using a **personal account** (aka: Microsoft Account) or Work or School Account.
[Read about Registering an Application with AAD admin center](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

## Generate MongoDB URI String
[Read Here](https://docs.mongodb.com/guides/server/drivers/)

## Configure the sample
1. Navigate to a directory of your choice using a CLI and run the following command:

```
git clone https://github.com/chidieberejoel/res-task.git
```

1. Rename the `env.localhost.temp` file to `.env`.
1. Edit the `.env` file and make the following changes.
    1. Replace `CLIENT_ID_HERE` with the **Application Id** you got from the App Registration Portal.
    1. Replace `SECRET_ID_HERE` with the **Client Secret value** you got from the App Registration Portal.
1. Replace the "DB_URL" variable with your Mongodb URI string.
1. Import open_hours.csv into your Database to a schema titled **restaurants**

## Run the application
In your CLI, run the following commands in the order:
1. Front-end

```
cd client
npm install
npm start
```
1. Server
```
cd server
npm install
npm start
```
1. Open a browser and browse to `http://localhost:3000`.