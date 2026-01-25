# Personal Website Project
This project was created to be a digital repository of my acomplishments and skills as a software developer.

## Features
 - Feature complete React front-end being served by a NodeJs Express API back-end.
 - Robust information fetching for resume and blog posts.
 - MongoDb integration for cloud database storage.
 - Amazon EC2 hosted.
 - Github actions CI/CD pipeline integration for automatic deployments.
 - HTTPS certified using certbot.

## Links
 - [jacksonuhl.com ](https://jacksonuhl.com/)
 - [Personal Website Github](https://github.com/JackUhl/Personal_Website)

## Local Installation
This application makes use of a React and a NodeJs back-end and have been organized in to /client and /server directories accordingly. Both the front-end and the back-end make use of the NodeJs package.json standard and contain scripts for running and building. Each application also makes use of certain environment variables injected from .env using [dotenvx](https://dotenvx.com/).

To get started, ensure that [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) are installed.

Clone the repo using Git:
```sh
git clone https://github.com/JackUhl/Personal_Website.git
```

#### Front-end
Access the React application package.json at client/package.json

Install the dependencies
```sh
cd ./client
npm i
```

Create a .env file at the root of the /client directory and populate it with the following environment variables.
| Name | Description |
| ------ | ------ |
| VITE_API_URL | The URL the front-end will be accessed from |
| VITE_PROXY_URL | The URL the front-end will proxy for the back-end requests |

Example values for local development:
```sh
VITE_API_URL=http://localhost:5173
VITE_PROXY_URL=http://localhost:3000
```

Quick note: To take advantage of hotloading the UI for local development you need to make sure that the front-end is running on it's own (http://localhost:5173) and it's proxying its requests to the back-end application (http://localhost:3000). In the normal live hosted version, the back-end is serving the compiled front-end code, so the URLs should be the same value of (https://jacksonuhl.com).

./client/package.json scripts:
| Name | Description |
| ------ | ------ |
| dev | Runs the development version |
| build | Builds the application and places build files at ./client/dist |
| lint | Runs eslint |
| preview | Runs the built application at the preview URL |
| cssModuleGen | Runs the css module generation |

#### Back-end
Access the NodeJs application package.json at server/package.json

Install the dependencies
```sh
cd ./server
npm i
```

Create a .env file at the root of the /server directory and populate it with the following environment variables.
| Name | Description |
| ------ | ------ |
| MONGO_URL | The connection string URL for the MongoDB instance |
| GOOGLE_CLIENT_ID | The client ID for the google client |
| GOOGLE_CLIENT_SECRET | The client secret for the google client |
| GOOGLE_ADMIN_ID | The google account ID which will allow admin capabilities |
| GOOGLE_REDIRECT_URL | The URL to be redirected to after google authorization callback finishes |
| SESSION_SECRET | The secret used to sign the session store |
| NODE_ENV | The environment the application runs in |

./server/package.json scripts:
| Name | Description |
| ------ | ------ |
| dev | Runs the development version |
| build | Builds the back-end application |
| start | Runs the built back-end application |

Quick note: in order to start the back-end application you need to build it first.

#### Root
I've created at package.json file at the root level of the projects responsible for running scripts from the front-end and back-end at the same time.

Install the dependencies
```sh
npm i
```

./package.json scripts
| Name | Description |
| ------ | ------ |
| dev | Concurrently runs the front-end dev script and the back-end dev script |
| build | Runs the front-end build script and back-end build scripts |
| start | Runs the built back-end application which serves the built front-end application |

For local development purposes, running the dev script from the root directory will serve most of your needs.

## CI/CD Pipeline Configuration
This project takes advantage of Github actions to detect when changes are pushed to the a certain branch and kick off a deployment. The pipeline configuration can be found at ./github/workflows/deploy.yml. The pipeline uses some secrets for connection and injecting into .env files like how they were described in the Local Installation step. To edit these secrets navigate to the Personal_Website repository >> Settings >> Secrets and variables >> Actions.

| Name | Description |
| ------ | ------ |
| EC2_HOST | URL for the EC2 Host |
| EC2_SSH_KEY | SSH key for the EC2 instance |
| EC2_USER | User account on the EC2 instance |
| MONGO_URL | The connection string URL for the MongoDB instance |
| VITE_API_URL | The URL the front-end will be accessed from |
| VITE_PROXY_URL | The URL the front-end will proxy for the back-end requests |