https://github.com/Dissonant101/robotany/assets/39448504/a07b76f8-04e5-417d-a8c9-fd22152eb2d6

## Inspiration
One issue that we all seem to face is interpreting large sensor-based datasets. Whether it be financial or environmental data, we saw an opportunity to use LLMs to allow for better understanding of big data. As a proof of concept, taking care of a house plant or gardens was interesting because we could collect data and take actions based on physical metrics like soil moisture and sunlight. We were then inspired to take managing plants to the next level by being able to talk to the data you just collected in a fun way, like asking how each of your plants are doing. This is how RoBotany came to be.

## What it does
Through our web app, you can ask RoBotamy about how your plants are doing - whether they need more water, have been overwatered, need to be in the shade, and many more questions. Each of your plants has a name, and you can ask specifically how your plant Jerry is faring for example. When you ask for a status update on your plants, our web app fetches data stored in our database, which gets a constant feed of information from the light and soil moisture sensors. If your plants are in need of water, you can even ask Robotamy to water your plants autonomously!

## How we built it
**Hardware**
The hardware portion uses an Arduino, a photoresistor, and a soil moisture sensor to measure the quintessential environmental conditions of any indoor or outdoor plants. We even 3D-printed a flower pot specially made to hold a small plant and the Arduino system!

**Frontend**
Our frontend was built with React and uses the Chat UI Kit from chatscope. 

**Backend**
Our project requires the use of two CockroachDBs. One of the databases is continuously read and updated for the soil moisture and light level, while the other database is updated less frequently to toggle the plant sprinkler system. Our simple yet practical endpoints allow us to seamlessly send information back and forth between our arduino and AWS EC2 instance, using technologies such as pm2 and nginx to keep the API up and running.

**NLP**
To process user requests via our chatbot, we used a combination of a classification model on *BentoML* to categorize requests, as well as Cohere Generation for entity extraction and responding to more generic requests.

The process goes as follows:
1. The user enters a prompt.
2. The prompt gets sent to be categorized via BentoML.
3. The input and category get sent to Cohere Generation, along with some training datasets, to extract entities.
4. The category and entity get sent to a small class that processes and queries our CockroachDB via a Flask mini api.
5. The response gets forwarded back to the user that sent the initial prompt.

## Challenges we ran into
One of the main challenges that we struggled with was working with LLMs, something none of our team was very familiar with. Despite being extremely challenging, we were glad we dove into the subject as deep as we did because it was equally rewarding to finally get it working.

In addition, given that our electronic system was handling water, we wanted to make sure that our packaging protected our ESP32 and sensor boards. We started by designing a 3D printed compartment that would house everything from the electronics, to the Motor, to the plant itself. We quickly discovered a compartment that size would take well over 12 hours (we are at T-10 hours at that point). We modified our design to make it more compact, and were able to get a beautiful packaging done in time!

Finally, from CockroachDB to Cohere, our group was managing a couple different authentication systems. Between refreshing tokens, as well as group members constantly hopping on and off different components, we ran into an issue quickly in terms of how to share the tokens. The solution - was to use Syro’s secret management software.

## Accomplishments that we're proud of
Our project had over a dozen unique technologies as our team looked to develop new skills and use new tech stacks during this hackathon.

## What we learned
- Large Language Models (LLMs)
- How to connect multiple distinct technologies together in a single project
- Using a strongly-consistent database in CockroachDB for the first time
- Using object-relational mapping

## What's next for RoBotany
Some possible next steps include diversifying our plant sensor data, as well as making it more scalable, allowing users to potentially talk to an entire crop field!

In addition, our system was designed with modularity in mind. Expanding to new, very different avenues of monitoring, shouldn’t be complex tasks. RoBotany lays the groundwork for a smart platform to talk to variable sensor data.
