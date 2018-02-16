# Pairing Points

A web-app built around the maths problem:

>There are 2n points in the XY plane, with no 3 points collinear.
>
>Can n lines be drawn between pairs of points so that all points are paired with no lines crossing?

Demo: [here](http://ralphbarton.co.uk/PairingPoints) _(Project incomplete. It's not doing much at the moment.)_

## Further Information

Tools & libraries used:

**[React](https://reactjs.org/)** - A JavaScript library for designing user interfaces, created by Facebook. This whole app is a user interface, and it is broken down into _React Components_. Thus React provides the structure of the project.

**[Create React App](https://github.com/facebook/create-react-app)** - a
command-line build-environment for React websites. Accelerates getting started with React. It's built around [Node JS](https://nodejs.org/en/) and all sorts of open-souce modules can easily be pulled into projects using [npm](https://www.npmjs.com/). Also compiles and bundles your JavaScript, as it uses [Webpack](https://webpack.js.org/), preconfigured, under-the-hood. 

**[D3](https://d3js.org/)** - a powerful library for data visualisation and graphing. I'm using a tiny bit of it here, its ability to draw [axes](https://github.com/d3/d3-axis).

**[Fabric JS](http://fabricjs.com/)** - provides an interactive HTML 5 canvas on which 2D shapes can be moved, dragged, resized and more (its "[interactive object model](http://fabricjs.com/fabric-intro-part-1)"). The library lets you drop in an interface that resembles MS PowerPoint's way of similar interface of laying out slides.

**[react-animation-frame](https://github.com/jamesseanwright/react-animation-frame)** - when using JavaScript to generate individual frames of an animation, the function [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) allows the programmer to take advantage of the browser's specific way of dealing with animation. This includes choosing the frame rate, potentially matching it the refresh rate of the devices's screen and turning off animation when the page is not in view, to save energy. This library integrates `requestAnimationFrame()` with React. It's a [higher-order component](https://reactjs.org/docs/higher-order-components.html) which adds (effectively) an extra lifecycle method to some component for animation - to which it is applied.

**[immutability-helper](https://github.com/kolodny/immutability-helper)** - using *immutable data* can work well with *state updates* to React components. Variables in JavaScript remain mutable, but with this library we treat them as immutable and shift programming style. A practical and value-adding step in the direction of [functional programming](https://en.wikipedia.org/wiki/Functional_programming).

**[math js](http://mathjs.org/)** - extensive maths library for JavaScript. Among other features it provides vectors & matrices (e.g. multiply a vector with a matrix) which will be useful for this app.

### _React Component libraries_

A supply of ready made user-interface components, or "widgets", is useful when building a user interface:

**[rc-slider](https://github.com/react-component/slider)** - sliders provide a quick, easy way to the user for entering or adjusting a numeric input in a range. A slider is a 'pointer' overlayed on a 1D scale. The pointer is dragged with the mouse to change the value.

**[react-select](http://jedwatson.github.io/react-select/)** - A dropdown menu that lists clickable choices. Whilst there is a native DOM element for this, I decided to use someone's React library-component instead. This one actually lets you type text to seach, when there are very many options - though I don't really need this feature in my app.

### _CSS-only Components_

Widgets with more basic function may be nothing more than native DOM elements with a lot of CSS applied to style them. The difference with widgets of this type is that they have no JavaScript customising their function. They will provide less sophisticated interation:

**[Toggle Switch](https://codemyui.com/toggle-switch-with-onoff-state/)** - some nice design went into this.

