# My Application

Live: https://crazy-alpaca-web-developer-test.netlify.app/

## Get Started

Install: `npm i`

Development: `npm run dev`

Build: `npm run build`

## Which Browsers/Devices or Virtualisation services did you check the application in?

Latest version of Google Chrome, Firefox, Safari and Microsoft Edge on desktop Mac.

Latest version of Google Chrome, Firefox and Safari on iOS.

## Anything you want to tell us?

I know, you asked for MY code, but I decided to use React.js to challenge myself and learn something new. After all, you asked for square pegs...

I decided to not use any ready-made toolchain, to understand better the framework. Moreover, the repository reminded a work on legacy code and I tryed to work on this assumption, mantaining the source and output folder structure, although using webpack instead of Grunt.

### Dependencies

I used React.js as the main framework to render the UI and manage app state. In addition to the basics, I added these dependencies:

- [@react-hook/media-query](https://github.com/jaredLunde/react-hook/tree/master/packages/media-query#readme), to manage easily a MatchMedia callback;
- [react-toastify](https://github.com/fkhadra/react-toastify), as I hade short time and it was too long to develop this kind of component by myself;
- [remove-focus-outline](https://github.com/lindsayevans/outline.js), beacuse it's simple, easy and improve UX and accessibility at almost no cost.

Moreover, I used [sass-mq](https://github.com/sass-mq/sass-mq) to easily manage breakpoints in styles.

## How would you improve this test?

#### 1. Having the courage of changing idea

The legacy scenario was an interesting hook, but if I could go back I'd leave the legacy codebase idea to stand on the shoulders of giants, use create-react-app and focus more on folders structure, a centralized state manager and maybe the built in support for PWA.

#### 2. Getting visual

I'd like the idea to add an effect to show the product image while hovering each row: images can really give a spin to a UI.

#### 3. Testing the test

Moreover, If I had a lot of time, I'd study something about code testing practices to answer to your requests.

### What did you like?

#### 1. The hidden complexities of UI interaction

I liked the fact that an apparently simple page presented a lot of small challenges, not immediately noticeable, that allowed me to test react.js. I wanted to test how difficult would have been to transfer Vue.js concepts to it and I think it was an ideal reduced case.

#### 2. The blooming of UX opportunities

I liked having to think about the UX of a very small part of an hypothetical user flow: it reminded me how many improvement we can think of.

#### 3. The opportunity for gratitude

I liked to work directly with webpack: it reminded me how powerful it is and... How lucky we are for all the open-source tools that save us the time to configure it!
