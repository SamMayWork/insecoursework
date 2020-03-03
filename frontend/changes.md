# Why React?
We've decided to change to React as our inbuilt framework has numerous issues which React addresses directly, including the following highlighted reasons.

## Testing
The boilerplate code our frontend is based of now provides clear examples of testing components, which also integrates with travis-ci, and is essential for making sure our prototype works, and ensures we can complete our project on time as we will avoid running into circular problems such as two team members vaguely guessing that a portion of code works and continuing on only to find that the previously written code doesn't work. This was the case with the early post component for our original framework.

## Re-Inventing the Wheel
Every time we wanted to add a new component we had to re-implement or re-test parts of our code as the framework is completely brand new. This was completely pointless and lead to many hours of development time being lost for no gain. This is the main reason we've switched to React.

## Seperation of Concerns
Our code directly edited styling, HTML elements, and behaviour but as it expanded, was also going to affect components outside of it's reponsibility to achieve the desired behaviour, which meant that our frontend code was becoming needlessly coupled and far more difficult to debug.

## Syntax
JSX is far more appropriate for creating components with mixed styling, HTML elements and scripting than directly manipulating the innerHTML of elements which is what our own framework was doing.