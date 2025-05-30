# Tech Challenge

## About
This is a tech test where the goal is to create a text summarizer using AI.

## Setting up
On the project root folder, create a .env file with the following content:

```
MONGODB_URI=mongodb://localhost:27018/snippet-ai
MONGODB_URI_TEST=mongodb://mongo:27017/snippet-ai-test

OPENAI_API_KEY=[get from Open Ai api portal]
OPENAI_API_MODEL=[optional - by default it uses gpt-3.5-turbo]
```

## How to pick your open AI Key

* Log in to your account at https://platform.openai.com/
* In the top right, click on your profile icon or initials.
* Select "View API keys" from the dropdown menu.
* Click the "Create new secret key" button.
* Copy the key shown—you won’t be able to see it again!

## Building you Docker composer

So after the steps above, run the following command to build your Docker compose:

```docker-compose build```

## Running the app
If the build went well, run the following command to run the tests and run the application:

```docker-compose up```


## Development Reflection
It was a fun activity to thrive against the time compromissing to be close of an MVP.

The following topics should be covered in the future:

* backend
  * Setup eslint
  * Express endpoint payload validation middleware
  * Generic crud boilerplate interface
  * Async snippet generation (not to wait the post response)
  * System log
  * Add transaction datetime
* frontend
  * General frontend improvements:
    * Styles
    * Loaders
    * Responsivity
  * Css in Sass
  * Dynamic server url
  * Implement tests
  * eslint

## Final notes
After all I tried to deliver something that works as its minimum.
I took it not the way I take activities in the daily basis, I did the minimum necessary following a honest development pattern.
I did strugle setting up the docker stuff as it is not that kind of thing that you do often.
To achive that I focused in the backend to guarantee the endpoints were working well. For the frontend there are plenty of possibilities but I mainly did a simple page to call the post endpoint and show its return.
In total, the whole development took me 5 hours considering the envolved study of the things that I had to recap.