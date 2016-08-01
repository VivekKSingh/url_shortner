# url_shortner
This is an url shortner application.

To install the application:

```
npm install
```

To run the application:

```
node app.js
```

To run jasmine tests:

```
npm test

Note: Please run "node app.js" and run the application first to run the tests. I did not have time to configure a test runner like karma to make this independent. 
```

How to use:

Once you run the application you can access it by entering into your browser the following address:

```
http://localhost:5656
```
You can use home page to enter the url and the platform and generate the short url.

You can also see all the short urls in the system by clicking on the link:

```
See all short urls

OR 

Enter this url: http://localhost:5656/all/shorturls
```

All short urls created inside this system have the following format:

```
http://localhost:5656/<shortId>

eg: http://localhost:5656/cLs
```
Note: The short urls can have any fancy domains once they are hosted on a server and domain registered for this application
But for now this runs on your local machine hence the "localhost" :)
