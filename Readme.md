# Developer homework submission by András Dániel Tóth
### Hello! General information

This is my solution to the problems in the pdf requirements. Since the requirements were laid out and there was a clear input-output
relationship, I decided to go with the TDD approach which usually excels in these circumstances.

### Approaches taken
I have realized I really _prefer using the simplest JavaScript tools_; therefore you will see a lot of `function`s but no classes. It is a 
conscious decision: if there is no performance issue, the code I write should be like a _simple map_: every non-trivial calculation is moved into a named function, and it is always clear how to find the source - no magic. So it resulted in a very-very simple code even though I'm quite familiar with higher ES6 concepts like `Promise`s, `async/await`, object destructuring, ...

I also used only the standard `Date` object of JavaScript.

### About using TypeScript
I really love **TypeScript** as it gets rid of the usual guesswork associated with exact function parameter count and type. If this task would have had `Promise`s it would have also warned me if I forgot to take care of the returned `Promise`, which can be also a great time-saver. So all-in-all even it is an _overkill_, I just _love_ the productivity TypeScript gives, so I have decided to write this homework in it :).

### Setup
1. Clone this repository
1. run `npm i` to install dependencies
1. run `npm run test` to run the tests
1. run `npm start` if you wish to see the results in a console.log format
