<p align='center'>
  English | <a href='./CONTRIBUTING.ja.md'>日本語</a>
</p>

## Thanks for your interest in contribute to Yamada Components 😎, you are amazing!!!

When it comes to open source, there are different ways you can contribute, all of which are valuable. Here are some guidelines that should help you as you prepare your contribution.

## Setup the Project

The following steps will get you up and running to contribute to Yamada Components:

1. Fork the [repository](https://github.com/yamada-ui/yamada-components).

2. Clone your fork locally.

```sh
git clone https://github.com/<your_github_username>/yamada-components.git

cd yamada-components
```

3. Setup all the dependencies and packages by running `pnpm install`. This command will install dependencies.

4. Run `pnpm dev` to start the local server.

## Development

To improve our development process, we have set up tools and systems.

### Tooling

- [Next.js](https://nextjs.org/) Framework for the website.

### Commands

- **`pnpm install`**: Sets up all dependencies and packages.
- **`pnpm dev`**: Launches the local server.
- **`pnpm start`**: Launches the production server.
- **`pnpm build`**: Builds the site.
- **`pnpm lint`**: Checks for code issues.
- **`pnpm gen:category-group`**: Creates a component category group using [Plop](https://plopjs.com/).
  - Please enter the category group name in kebab-case.
- **`pnpm gen:category`**: Creates a component category using [Plop](https://plopjs.com/).
  - Please enter the category name in kebab-case.
- **`pnpm gen:component`**: Creates a component from a template using [Plop](https://plopjs.com/).
  - Please enter the component name in kebab-case.
  - If [theme](https://yamada-ui.com/styled-system/theming) is `true`, a customized theme will be applied to the component.
  - If [config](https://yamada-ui.com/styled-system/configure) is `true`, a customized config will be applied to the component.
  - If **`ignore`** is `true`, a component will be ignored on the site.

## Making a Pull Request?

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`type(scope or module): message` in your commit message while using one of
the following types:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above categories

> [!TIP]
>
> If you are interested in the detailed specification you can visit [Conventional Commits](https://www.conventionalcommits.org) or check out the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork and clone the [repository](https://github.com/yamada-ui/yamada-components).

2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/buttons/copy-button` or `feat/headers`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make changes and commit according to the [commit convention](#commit-convention).

4. Once you have completed all of the above tasks, please push your changes.
   After pushing, a URL for the pull request will be generated. Follow the template and submit your request accordingly.
   Additionally, check the Checks within the pull request and ensure that the Quality check has successfully completed.
   If there are any issues, this pull request will not be merged.

## License

By contributing code to the `Yamada UI` GitHub repository, you agree that your contributed code will be licensed under the MIT license.

### Thank you for reading till the end. I love you too. 💖
