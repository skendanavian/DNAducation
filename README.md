## Inspiration

In the age of remote learning and online assessments, we saw the need for improved student verification during written exams. This is especially needed in situations where teachers or exam proctors are unable to monitor students through webcam video. We were inspired by the authentication possibilities available through the [TypingDNA](https://www.typingdna.com/) api and set out to create an application that utilizes typing biometrics during online assessments.

## What it does

**DNAducation** is a powerful educational assessment portal that provides valuable tools for educators and students alike while verifying user identity throughout the process.

- Educators can keep track of their classes and sections in one location with the ability to create new classes, sections, and exams. They get updates on exam submissions and can mark the exams within the application.
- Students can view all of their classes, upcoming exams and access their grades for each submission.
- What really makes DNAducation stand out from the crowd is the advanced user verification that takes place under the hood. Students must record a typing profile before they are granted access to any exams. This process records and sends typing biometrics to the [TypingDNA](https://www.typingdna.com/) api a profile is stored for each user.
- Typing biometrics are monitored and recorded for every exam question and are referenced against the student's typing profile to return a user confidence value to educators for each submission.
- Educators have access to these confidence levels during grading and exam review to help flag cases of academic dishonesty and student fraud during visually unmonitored exam settings.

## Try it out

- Visit [the deployed version](https://dnaducation.herokuapp.com/) and click 'Sign Up'.
- Fill in your information, create a random 6-digit student Id and check 'Teacher Account'.
- First click 'Record your typing DNA profile' and follow the prompts. This records your typing patterns, so type as you would normally.
- Back in the account view, click 'Create Section'.
- Add your student id to the textbox or copy it from the box above. Two section icons should now appear in the navigation on the left.
- Select the section icon with the graduation hat.
- Click 'Create Exam' and fill in the form with random data and add at least three questions.
- Now click the other section icon, (the 'student' section).
- From this view, see the exam you created as the teacher, click 'Start Exam'.
- Answer the questions with any text, but answer normally as the typingdna alogrothim is recording your typing pattern.
- Finish the exam and navigate back to the Teacher view.
- Click 'Submissions' on the exam and view the 'Verification Percent'.
- This number represents the certainty the alogrithm is that the same person completed the exam as recorded their profile.

## How we built it

We built DNAducation using React on the frontend and Node / Express on the backend. We used PostgreSQL and Knex for our database management. The majority of our react components are made from the Material-Ui library and the typing biometrics are provided via the [TypingDNA](https://www.typingdna.com/) api.

## Challenges we ran into

-This was our first time using Knex with PostgreSQL which had a bit of a learning curve at the beginning of the project.

- It was also our first time using Material-UI which similarly took some adapting to fully manipulate their api and customize components and styling as we needed.
- The initial setup for our jwt and TypingDNA config gave us some issues but once those were sorted out, both worked great.
- One of our ongoing challenges throughout the project was handling complex React state updates during asynchronous data fetching from our server and the TypeDNA api.

## Accomplishments that we're proud of

- This was our first hackathon which was a great accomplishment in itself.
- We were able to learn Knex, Material-UI, Jwt, and TypingDNA for the first time while building the project.
- We are proud of how much we were able to complete in 10 days and we made it to our MVP, if not slightly further.

## What we learned

- New Technologies (Material-UI, Knex, TypingDNA, Jwt)
- A much greater understanding of how to handle complex state and handling async behaviours in react.
- Debugging is extra tricky when you are sleep deprived.

## What's next for DNAducation

We hope to continue adding features and functionality that we were unable to get to in the short timeframe of the hackathon. This includes the ability for teachers to edit exams, and for students to save partial exam attempts and return later. We weren't able to refactor much of our codebase and would like to do this to boost performance, readability and maintainability.
