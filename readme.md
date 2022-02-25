# Job-Board APP



this app created with

* APS .Net Core 5
* React <typescript>
* tailwindCss

### pleas note : 

all files (Classes, methods) are documented well,
so you can open any file and read comments if you want to know how things going.



video demo : https://youtu.be/BqPhREAXV2k



## run this app

to run this app on your local environment please follow steps,

### Requirement

to run application without issues make sure you have installed all requirements

please note : when download .Net things make sure the version tab is (5.0.13) not (5.0.14 -default one)

 - [.Net Core 5.0.404 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/5.0).
 - [.NET Core 5.0.13 Runtime](https://dotnet.microsoft.com/en-us/download/dotnet/5.0).
 - [.NET Core 5.0 Hosting Bundle](https://dotnet.microsoft.com/en-us/download/dotnet/5.0) (if you want to host app in IIS).
 - [NodeJs v14.15.4](https://nodejs.org/en/) or higher (only stable versions [LTS]).
 - (optional) Visual studio IDE Or Rider Or VSCode (with .net extensions).

### if you want to run application on DEV-ENV

* clone this repo or download it.
* open project directory in your IDE (visual studio or rider or any favorite one).
* rebuild solution (to install dependencies and compile the project).
* run .net project
*navigate to `/client` directory open `.env.devlopment` 
* change `REACT_APP_API_URL` to correct url (.net app configure to run on http://localhost:5000), and keep the suffix of url `/api/v1` (if you don't change any configuration skip this step)
* open your (CMD/Terminal) and navigate to project directory
* navigate to client directory `cd client`
* run command `npm install`
* after installation complete run command `npm start`
* react app is running now on `http://localhost:3000`
* open http://localhost:3000 in your browser and start testing

### if you want to run application on PRODUCTION-ENV

* clone this repo or download it.
* open project directory in your IDE (visual studio or rider or any favorite one).
* rebuild solution (to install dependencies and compile the project).
 *navigate to `/client` directory open `.env.devlopment` 
* open `.env.production` 
* make sure the variable `REACT_API_URL` is equal  `/api/v1` [if this file is not exists create it with content] `REACT_APP_API_URL=/api/v1`
* open your (CMD/Terminal) and navigate to project directory
* navigate to client directory `cd client`
* run command `npm install`
* after installation complete run command `npm run build`
* now you cant find that, the build generate a directory called `wwwroot` in `API` directory
* now return to .NET IDE and publish project.
* deploy application on IIS or other server (you can run application direct from IDE just make sure the build action is release and click run).
* now go to application using your browser and start testing.

### you don't have IDE and you want to run application ?

* to build .Net project open your (CMD/Terminal) and navigate to project directory
* make sure you run build in every single project (API/Application/Domain/Infrastructure/Persistence)
* Build a project and its dependencies:
  for development

```
dotnet build
```

for production:

```
dotnet build --configuration Release
```

* to run application
* navigate to `API` directory and run `dotnet run`
* or `dotnet run --property:Configuration=Release` for production
* to publish project run `dotnet publish -p:PublishProfile=IISServerProfile`


## What about database ??

don't worry about database, its SQLITE DB
the application will create it in first lunch and it will seed some data

### what the data will be seed ?

 * 2 users (admin and user)
 * to login as admin [email: admin@email.test] [password: P@ssw0rd]
 * to login as user [email: user@email.test] [password: P@ssw0rd]
 * and simply you can register as a new user (all registered users will be [user] not admin).
 * and some fake job posts

and done :)

if you want to see demo please follow the link :
https://youtu.be/BqPhREAXV2k
