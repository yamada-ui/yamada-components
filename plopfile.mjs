import { readdirSync } from "fs"

const upperCase = (t) => t.charAt(0).toUpperCase() + t.slice(1)
const camelCase = (t) => t.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())

const categoryGroups = readdirSync("./contents").filter((r) => !r.includes("."))

const categories = categoryGroups.reduce((p, n) => {
  p[n] = readdirSync(`./contents/${n}`).filter((r) => !r.includes("."))

  return p
}, {})

export default function plop(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setHelper("upperCase", (text) => upperCase(camelCase(text)))

  plop.setGenerator("category-group", {
    description: "Generates a category group",
    prompts: [
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        validate: (input) => {
          if (!input) return "category group name is required."

          if (categoryGroups.includes(input)) return `${input} already exist.`

          return true
        },
      },
    ],

    actions: (answers) => {
      const actions = []

      if (!answers) return actions

      actions.push({
        type: "add",
        path: `./contents/{{dashCase newCategoryGroupName}}/metadata.json`,
        templateFile: "plop/category-group/metadata.json.hbs",
      })

      actions.push({
        type: "add",
        path: `./pages/{{dashCase newCategoryGroupName}}/[[...slug]].page.tsx`,
        templateFile: "plop/pages/[[...slug]].page.tsx.hbs",
      })

      return actions
    },
  })

  plop.setGenerator("category", {
    description: "Generates a category",
    prompts: [
      {
        type: "list",
        name: "categoryGroupName",
        message: "Which categoryGroup does this component belong to?:",
        default: categoryGroups[0],
        choices: [...categoryGroups, "Create new category group."],
      },
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        when: ({ categoryGroupName }) =>
          categoryGroupName === "Create new category group.",
        validate: (input) => {
          if (!input) return "category group name is required."

          if (categoryGroups.includes(input)) return `${input} already exist.`

          return true
        },
      },
      {
        type: "input",
        name: "newCategoryName",
        message: "Enter category name:",
        validate: (input, { newCategoryGroupName, categoryGroupName }) => {
          if (!input) return "category name is required."

          const category = categories[newCategoryGroupName ?? categoryGroupName]

          if (category?.includes(input)) return `${input} already exist.`

          return true
        },
      },
    ],

    actions: (answers) => {
      const actions = []

      if (!answers) return actions

      const { newCategoryGroupName, newCategoryName } = answers

      let path =
        "./contents/{{dashCase categoryGroupName}}/{{dashCase categoryName}}/metadata.json"

      if (newCategoryGroupName && newCategoryName) {
        path = `./contents/{{dashCase newCategoryGroupName}}/{{dashCase newCategoryName}}/metadata.json`
      }

      if (newCategoryGroupName && !newCategoryName) {
        path = `./contents/{{dashCase newCategoryGroupName}}/{{dashCase categoryName}}/metadata.json`
      }

      if (!newCategoryGroupName && newCategoryName) {
        path = `./contents/{{dashCase categoryGroupName}}/{{dashCase newCategoryName}}/metadata.json`
      }

      if (newCategoryGroupName) {
        actions.push({
          type: "add",
          path: `./contents/{{dashCase newCategoryGroupName}}/metadata.json`,
          templateFile: "plop/category-group/metadata.json.hbs",
        })

        actions.push({
          type: "add",
          path: `./pages/{{dashCase newCategoryGroupName}}/[[...slug]].page.tsx`,
          templateFile: "plop/pages/[[...slug]].page.tsx.hbs",
        })
      }

      actions.push({
        type: "add",
        path,
        templateFile: "plop/category/metadata.json.hbs",
      })

      return actions
    },
  })

  plop.setGenerator("component", {
    description: "Generates a component",
    prompts: [
      {
        type: "list",
        name: "categoryGroupName",
        message: "Which categoryGroup does this component belong to?:",
        default: categoryGroups[0],
        choices: [...categoryGroups, "Create new category group."],
      },
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        when: ({ categoryGroupName }) =>
          categoryGroupName === "Create new category group.",
        validate: (input) => {
          if (!input) return "category group name is required."

          if (categoryGroups.includes(input)) return `${input} already exist.`

          return true
        },
      },
      {
        type: "list",
        name: "categoryName",
        message: "Which category does this component belong to?:",
        default: categories[0],
        when: ({ categoryGroupName }) =>
          categoryGroupName !== "Create new category group.",
        choices: ({ categoryGroupName }) => [
          ...categories[categoryGroupName],
          "Create new category.",
        ],
      },
      {
        type: "input",
        name: "newCategoryName",
        message: "Enter category name:",
        when: ({ categoryGroupName, categoryName }) =>
          categoryGroupName === "Create new category group." ||
          categoryName === "Create new category.",
        validate: (input, { newCategoryGroupName, categoryGroupName }) => {
          if (!input) return "category name is required."

          const category = categories[newCategoryGroupName ?? categoryGroupName]

          if (category?.includes(input)) return `${input} already exist.`

          return true
        },
      },
      {
        type: "input",
        name: "componentName",
        message: "Enter component name:",
      },
      {
        type: "list",
        name: "theme",
        message: "Does this component need a theme?:",
        default: "No",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: "config",
        message: "Does this component need a config?:",
        default: "No",
        choices: ["Yes", "No"],
      },
    ],

    actions: (answers) => {
      const actions = []

      if (!answers) return actions

      const { theme, config, newCategoryGroupName, newCategoryName } = answers

      let destination = `./contents/{{dashCase categoryGroupName}}/{{dashCase categoryName}}/{{dashCase componentName}}`

      if (newCategoryGroupName && newCategoryName) {
        destination = `./contents/{{dashCase newCategoryGroupName}}/{{dashCase newCategoryName}}/{{dashCase componentName}}`
      }

      if (newCategoryGroupName && !newCategoryName) {
        destination = `./contents/{{dashCase newCategoryGroupName}}/{{dashCase categoryName}}/{{dashCase componentName}}`
      }

      if (!newCategoryGroupName && newCategoryName) {
        destination = `./contents/{{dashCase categoryGroupName}}/{{dashCase newCategoryName}}/{{dashCase componentName}}`
      }

      if (newCategoryGroupName) {
        actions.push({
          type: "add",
          path: `./contents/{{dashCase newCategoryGroupName}}/metadata.json`,
          templateFile: "plop/category-group/metadata.json.hbs",
        })

        actions.push({
          type: "add",
          path: `./pages/{{dashCase newCategoryGroupName}}/[[...slug]].page.tsx`,
          templateFile: "plop/pages/[[...slug]].page.tsx.hbs",
        })
      }

      if (newCategoryName) {
        actions.push({
          type: "add",
          path: `./contents/{{dashCase newCategoryGroupName}}/{{dashCase newCategoryName}}/metadata.json`,
          templateFile: "plop/category/metadata.json.hbs",
        })
      }

      actions.push({
        type: "addMany",
        templateFiles: "plop/component/**",
        destination,
        base: "plop/component",
        abortOnFail: true,
      })

      if (theme === "Yes") {
        actions.push({
          type: "addMany",
          templateFiles: "plop/optional/theme.ts.hbs",
          destination,
          base: "plop/optional",
          abortOnFail: true,
        })
      }

      if (config === "Yes") {
        actions.push({
          type: "addMany",
          templateFiles: "plop/optional/config.ts.hbs",
          destination,
          base: "plop/optional",
          abortOnFail: true,
        })
      }

      return actions
    },
  })
}
