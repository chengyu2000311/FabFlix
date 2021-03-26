# CS122B - Full Stack Website - FabFlix

## Intruduction
+ Term Project Assignment at UC Irvine 2021 Winter.
+ A website for shopping movies.

## Design Structure
  1. Overview: [using microservices architecture and RESTful APIs.](https://blog.dreamfactory.com/restful-api-and-microservices-the-differences-and-how-they-work-together/)
  + Breaking down to 
    + [API Gateway](https://github.com/chengyu2000311/FabFlixGateway)
        + Security and Load Balancing
        + Enable multi-threading
        + Using [HikariCP](https://github.com/brettwooldridge/HikariCP) as JDBC connection pool.
    + [Identity Management (IDM)](https://github.com/chengyu2000311/FabFlixIDM)
        + User authentication and access control
    + [Movies Service](https://github.com/chengyu2000311/FabFlixMovies)
        + Searching/Browsing movies
    + [Billing Service](https://github.com/chengyu2000311/FabFlixBilling)
        + Purchasing, recording transactions, user personal information
        + Using paypal for payment method
  + Technologies used
    + Java8
    + Gradle - Build and dependency management
    + Grizzly - a Java HTTP I/O framework
    + Jersey - a Java RESTful API framework (connects URIs to Java code)
    + JSON -- a language-independent data format derived from JavaScript
    + Jackson -- conversion between JSON and Java Object

  2. [Google Doc](https://docs.google.com/document/d/1yt_3F2Ka9OV3MDTRujEvXzsVgx5XhJJOEirQlSzVoHQ/edit?usp=sharing)
  3. [石墨文档](https://shimo.im/docs/w6cwWGrgkTQDTkkx/)

## Setup instructions

### Frontend:
  1. Download and install node.js - Current version: 13.1.0
  2. Type `npm` in your terminal to ensure you correctly installed node
  3. Type `npm install` within the root of this repo to install all the dependencies (This will take a while)
  4. Type `npm start` to start the server and you should have a window open with the front end
  5. [In case of error] If you run into a missing dependency error try `npm install` again then `npm start` if the problem persists manually install the dependency it is asking for.
### Backend:
  1. a [gateway](https://github.com/chengyu2000311/FabFlixGateway) connecting three parts: [idm(identity management)](https://github.com/chengyu2000311/FabFlixIDM), [movies data](https://github.com/chengyu2000311/FabFlixMovies), [billding data](https://github.com/chengyu2000311/FabFlixBilling)
  2. IDM are used for storing username and password.
  3. Movies are used for storing movie information like overview, directors and image link.
  4. billing data are used for connecting paypal gateway and storing user shopping history and cart.
  5. gateway are used for connecting to three parts and enable multi-threads.


## Demo Video

+ [Final Demo Link at Youtube](https://youtu.be/TU5BG0LFPAQ)

+ [Final Demo Link at Bilibili](https://www.bilibili.com/video/BV17y4y1E7dC)
