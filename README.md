# Testing an Angular application with Jest

## Comments appreciated

I've created this repository to learn how to use Jest and to collect best practices. At the time of writing, I'm a rookie, and you - dear reader - are probably more expert than me. In other words: I'm open to suggestions on how to improve the demo and the corresponding article on https://www.beyondjava.net/jest-mocks-and-spies.

## Setup

There are excellent tutorials out there (think of https://timdeschryver.dev/blog/integrate-jest-into-an-angular-application-and-library), but for some reason, most of them broken at one point or another. 
Usually, they work for older Angular versions, but not for the current version of Angular and Jest.

So take one of the official example projects as a starting point: https://github.com/thymikee/jest-preset-angular/tree/master/examples.

## Key takeaways

- Jest mocks are what other frameworks call "spies."
- If you want to "mock away" a dependency, consider using an empty class instead of trying to use something like `jest.fn()`. In other words, if all you need is a simple stub, using a Jest function is both overkill and unnecessarily lengthy.
- Large parts of your components can be tested as simple classes. You don't always need an Angular `TestBed.` Whenever possible, write tests without `TestBed.` Simple classes need less infrastructure, so tests using simple classes are both faster and simpler.
- `ng-mocks` is a helpful framework simplifying a lot of things.
- https://github.com/testing-library/angular-testing-library also looks promising. I haven't made up my mind about it yet, but it's worth a look.

## State of the art
This repository is still evolving. As mentioned above, I invite you to share your knowledge with me, so this repository and the blog article get better!
