# Winter Way
## Elle-Hacks-2024

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/yi6ymWK7IaA/0.jpg)](https://youtu.be/yi6ymWK7IaA)

## Inspiration
How many times have you stood standing at the ttc bus stop, in snow and without a shed? Hands aching by the weight of groceries, making it even tougher for the elderly to travel, and the specially abled to take buses. Winter Way is a web application designed to assist users in finding safe routes during inclement weather, particularly in extremely cold conditions when waiting at exposed bus stops can pose risks to health. The app leverages information about shelter locations to suggest alternative routes that prioritize staying indoors or minimizing exposure to harsh weather conditions. Many of our team members are commuters, often having to brave the frigid Canadian winters.


## What it does
This application is particularly useful for individuals navigating urban environments where public transportation is a primary mode of travel, and where extreme weather events such as snowstorms or freezing temperatures can disrupt regular commuting patterns. By integrating real-time data on shelter availability and bus schedules, Winter Way dynamically generates routes that optimize safety and comfort for users, reducing the risk of exposure to dangerous weather conditions.

## How we built it
This application was built with a combination of React, Next.js, JavaScript, HTML, CSS, Bootstrap, Python, Flask, and HTML requests! Our initial wireframing was completed using Figma to guide our development.

The application uses an independently developed algorithm to compute the appropriate transit routes from bus shelter to bus shelter, ensuring the user is protected for the duration of their journey. If there is no appropriate shelter where the user is intended to transfer, the algorithm will have the user continue on their current route until there is a viable shelter to transfer at.  This makes use of a combination of geocoding, Routes and Directions APIs from Google, and was made through a lot of trial and error.  Both a recursive and iterative solution were considered

## Challenges we ran into

With the inception of the project, we swiftly grasped the concept and delved into its implementation. However, as it marked the inaugural collaboration for our team, we encountered inevitable hiccups due to the learning curve. Additionally, we faced challenges in rendering the parsed data retrieved from the backend, further contributing to our learning process. This was the first hackathon for half of our team, and naturally, we encountered timing issues because we were not accustomed to rapid implementation. It was intriguing to exchange experiences and acquire new knowledge from fellow participants, as well as to observe and engage in the collaborative development of a project. For the newcomers, it was particularly enlightening to gain insight into the process of passing laws. Each member of our team made an invaluable contribution to the idea, applying their expertise to bring the project to life.

We were quickly able to come up with a concept and begin on initial implementation, but this was the first time we as a group have collaborated.  The learning curve associated with a new team and new tech stack was challenging to overcome.  We had difficulty rendering the data retrieved from the backend in our react components.  We encountered some integration issues due to the short turnaround time and this team not being used to rapid implementation together.  Ultimately, we were able to exchange experiences and acquire a ton of new knowledge from workshops and 

## Accomplishments that we're proud of

This was the first hackathon for half of our team! The motivation and passion to hope on never-used-before technologies was phenomenal, and we ended up pulling multiple all-nighters (we are very tired). Every member brought with themselves tons of motivation and encouragement to try out something different. The division of roles came very naturally to all of us. We took every part of development (brainstorming, designing, front-end, back-end, debugging) very seriously. We can say this hackathon was totally a success!

## What we learned
Integration is really, really hard!  We will definitely attempt to have our frontend render the components from the backend earlier in the process, as we realized only an hour before the deadline it wasn’t going to work and had to quickly pivot.

## What's next for Winter Way
Further enhancements to the utilities available in the APIs will allow for improvements to the algorithm, as currently there is no support for waypoints or intermediate steps – requiring the transit routes to be calculated from scratch each time.
Our next development would be to introduce adaptive design that easily adapts to different screen sizes and orientations, as well as improve the visual design: increase the attractiveness of the user interface through aesthetic improvements. To boost the consistency of the display, we need to test the design of the user interface in different web browsers and versions.
Rendering data using google-maps APIs was quite tricky due to the limited time and documentation. The next step would be to properly manipulate data received by the back end, in a more user friendly manner.
