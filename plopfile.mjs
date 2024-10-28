import { readdirSync } from "fs"

const upperCase = (t) => t.charAt(0).toUpperCase() + t.slice(1)
const camelCase = (t) => t.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
const validateDashCase = (i) => !/[A-Z]/.test(i) && !/_/.test(i)

const categoryGroups = readdirSync("./contents").filter((n) => !n.includes("."))

const categories = categoryGroups.reduce((p, n) => {
  p[n] = readdirSync(`./contents/${n}`).filter((n) => !n.includes("."))

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

          if (!validateDashCase(input))
            return `Please enter the category group name in kebab case.`

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
        choices: [...categoryGroups, "Create new category group."],
        default: categoryGroups[0],
        message: "Which categoryGroup does this component belong to?:",
      },
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        validate: (input) => {
          if (!input) return "category group name is required."

          if (!validateDashCase(input))
            return `Please enter the category group name in kebab case.`

          if (categoryGroups.includes(input)) return `${input} already exist.`

          return true
        },
        when: ({ categoryGroupName }) =>
          categoryGroupName === "Create new category group.",
      },
      {
        type: "input",
        name: "newCategoryName",
        message: "Enter category name:",
        validate: (input, { categoryGroupName, newCategoryGroupName }) => {
          if (!input) return "category name is required."

          if (!validateDashCase(input))
            return `Please enter the category name in kebab case.`

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
        choices: [...categoryGroups, "Create new category group."],
        default: categoryGroups[0],
        message: "Which categoryGroup does this component belong to?:",
      },
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        validate: (input) => {
          if (!input) return "category group name is required."

          if (!validateDashCase(input))
            return `Please enter the category group name in kebab case.`

          if (categoryGroups.includes(input)) return `${input} already exist.`

          return true
        },
        when: ({ categoryGroupName }) =>
          categoryGroupName === "Create new category group.",
      },
      {
        type: "list",
        name: "categoryName",
        choices: ({ categoryGroupName }) => [
          ...categories[categoryGroupName],
          "Create new category.",
        ],
        default: categories[0],
        message: "Which category does this component belong to?:",
        when: ({ categoryGroupName }) =>
          categoryGroupName !== "Create new category group.",
      },
      {
        type: "input",
        name: "newCategoryName",
        message: "Enter category name:",
        validate: (input, { categoryGroupName, newCategoryGroupName }) => {
          if (!input) return "category name is required."

          if (!validateDashCase(input))
            return `Please enter the category name in kebab case.`

          const category = categories[newCategoryGroupName ?? categoryGroupName]

          if (category?.includes(input)) return `${input} already exist.`

          return true
        },
        when: ({ categoryGroupName, categoryName }) =>
          categoryGroupName === "Create new category group." ||
          categoryName === "Create new category.",
      },
      {
        type: "input",
        name: "componentName",
        message: "Enter component name:",
        validate: (input, { categoryGroupName, newCategoryGroupName }) => {
          if (!input) return "component name is required."

          if (!validateDashCase(input))
            return `Please enter the component name in kebab case.`

          const category = categories[newCategoryGroupName ?? categoryGroupName]

          if (category?.includes(input)) return `${input} already exist.`

          return true
        },
      },
      {
        type: "list",
        name: "theme",
        choices: ["Yes", "No"],
        default: "No",
        message: "Does this component need a theme?:",
      },
      {
        type: "list",
        name: "config",
        choices: ["Yes", "No"],
        default: "No",
        message: "Does this component need a config?:",
      },
      {
        type: "list",
        name: "ignore",
        choices: ["Yes", "No"],
        default: "Yes",
        message: "Does this component need to be ignored?:",
      },
    ],

    actions: (answers) => {
      const actions = []

      if (!answers) return actions

      const { config, ignore, newCategoryGroupName, newCategoryName, theme } =
        answers

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
          path: `./contents/{{dashCase ${newCategoryGroupName ? `newCategoryGroupName` : `categoryGroupName`}}}/{{dashCase newCategoryName}}/metadata.json`,
          templateFile: "plop/category/metadata.json.hbs",
        })
      }

      actions.push({
        type: "addMany",
        base: "plop/component",
        abortOnFail: true,
        destination,
        templateFiles: "plop/component/**",
      })

      if (theme === "Yes") {
        actions.push({
          type: "addMany",
          base: "plop/optional",
          abortOnFail: true,
          destination,
          templateFiles: "plop/optional/theme.ts.hbs",
        })
      }

      if (config === "Yes") {
        actions.push({
          type: "addMany",
          base: "plop/optional",
          abortOnFail: true,
          destination,
          templateFiles: "plop/optional/config.ts.hbs",
        })
      }

      if (ignore === "Yes") {
        actions.push({
          type: "append",
          path: destination + "/metadata.json",
          pattern: /"options": {/,
          template: `  "ignore": true,`,
        })
      }

      return actions
    },
  })
}
