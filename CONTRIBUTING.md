## Code of Conduct

We follow [the Contributor's Covenant code-of-conduct](http://contributor-covenant.org/) here.
[Our `CODE_OF_CONDUCT.md` file](./CODE_OF_CONDUCT.md) file should outline the rules
surrounding contributing or interacting with our package and community.

For any questions or complaints, please address [our Discord server](https://discord.gg/FMcvc6T)'s #meta channel and we'll respond as quickly as an admin is available.

## What We're Looking For

We're looking to provide as many users with as many high-quality generic utilities as possible, so long as they're related to JavaScript. While this repo
may not contain any packages for your preferred library or framework yet, do be aware that we always encourage and welcome outside contributions,
even/especially for new framework utilities.

That said, we are wanting to make sure to avoid having code that would actually render to the DOM unless it can be properly abstracted for non-assumptive uses.
We want to ensure that we do not become a UI component library, but rather a set of tools that one may use to build a UI component system.

These rules are, admittedly, somewhat vague. They are so intentionally to allow for flexibility in our management.
That disclosed, we do like to think that we're a friendly bunch. We welcome developers of all skill level and recognize all contributions
(documentation contributions are still of immense value to a project like ours!). We can be reached in [our Discord server](https://discord.gg/FMcvc6T)
and have an active community that would love to help you with any questions or comments surrounding contributions.

## Setup

In order to setup a development environment to help contribute to our codebase, you'll need to clone the repo and install the dependencies of our project
```
git clone https://github.com/unicorn-utterances/batteries-not-included.git
cd batteries-not-included
npm i
```

Then, you're able to edit our codebase with the linting and TypeScript rules enforcing

## Code Rules

All of the packages in our repo should be written in TypeScript and adhere to the linting rules this project has setup.

While all of our package should enforce linting rules and commit naming via Git hooks, the following commands are available to

| Command          | Explanation                                                  |
| ---------------- | ------------------------------------------------------------ |
| `npm run build`  | Will build the project and output the files to `/dist`       |
| `npm run test` | Will run the tests related to a file. We use `jest`, so if you wish to run tests in watch mode you may simply run `npx jest --watch` |
| `npm run lint`   | Will lint all of the code, giving warnings and errors when present |
| `npm run format` | Will lint and attempt to auto-fix as many of the warnings as possible |
|`npm run release`|Will generate a changelog and bump the package number. DO NOT RUN THIS IF YOU ARE NOT AN ADMIN CUTTING A NEW RELEASE|

### Commit Messages

We also utilize a specific set of commit message rules, which allow us to auto-generate a changelog based off of said commit messages.

If you're unfamiliar with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), you can find [a cheat-sheet of the rules for commit naming here](https://www.cheatography.com/albelop/cheat-sheets/conventional-commits/)

### Tests

We will always encourage and want tests for as much of our codebase as possible. As mentioned before, we use `jest` for testing
and have configured various plugins to make `jest --watch` as useful as possible.

We make strong usage out of various of the [Testing Library](https://testing-library.com/) packages in order to make testing as smooth as possible for our developers.

#### React

As mentioned previously, we utilize [the Testing Library's React package](https://testing-library.com/docs/react-testing-library/intro).
We also, in some instances use [an additional testing library package specific to hooks](https://github.com/testing-library/react-hooks-testing-library).
However, be aware that we only use those hook testing libraries for hooks that are too complex to reasonably test using elements.
For all other hooks, ones that may be tested using real-world examples in elements, they should be used instead.
