# **Defi France ledger.**
## **About**
This is a production ready architecture, using  the following technologies:
- **axios**: Used in end-to-end testing to make request
- **express**: API server
- **express-winston**: Logging request easily
- **mongodb**: No-SQL database
- **mongodb-memory-server**: In-memory MongoDB (dev and test)
- **spdy**: HTTP2 implementation
- **winston**: Logging mechanism
- **babel**: Transpiler es6
- **chai**: Assertion library
- **cross-env**: Manage environment variable between Linux/Mac/Windows easily
- **eslint**: Code quality
- **flow**: Type checker
- **nodemon**: Hot reloading
- **pm2**: Advanced process manager for production Node.js applications

## **Installation**
`npm install`
(+in production`npm install -g pm2`)
## **Development**
`npm run start:dev`
## **Production**
```
npm run build
npm run start:prod
```
## **Test**
Check code quality with eslint `npm run test:eslint`

Check type with flow `npm run test:flow`

Run end-to-end test(need mongoDB to run database in-memory) `npm run test:e2e`

Eslint + flow `npm run test:light`

Eslint + flow + e2e `npm run test`
(If more time add unit test)
## **Architecture summary**
- **/config** - Configuration files for each env. (you can set dynamically each variable with env var)
- **/dist** - Compilation folder
- **/log** - Log folder (to disable remove LOG_DIR value in config)
- **/postman** - Postman environment and collection of request
- **/src**
	- **/business**
		- **/type** - Flow type that you will use in your use-case controller
		- **/factory** - Manage the creation of object and MongoDB object
		- **/ucc** - Use-Case Controller, where all your business logic will be
	- **/common** - Containing all constants and utils of application (endpoint path, error message, ...)
	- **/endpoint** - All endpoint is split in one folder organize by url path/main object manipulate
	- **/persistance**
		- **/dal** - Data Access Layer, where you connection with database is managed
		- **/query** - Containing your query to persist data and the object definition that will be stored (ensure isolation between business and storage)
		- **/type** - Flow type of object that will be persisted
	- **/service** All code 'utility' (provisioning, logging, hashing, ...)
- **/test**
	- **/{{endpoint}}** - One folder by endpoint folder containing request axios for each endpoint and all test possible
	- **/scenario** - Folder containing each scenario of test end-to-end
