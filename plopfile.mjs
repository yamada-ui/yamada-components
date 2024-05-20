import fs from "fs"

const upperCase = (t) => t.charAt(0).toUpperCase() + t.slice(1)
const camelCase = (t) => t.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())

const categoryGroup = fs
  .readdirSync("./contents")
  .filter((r) => !r.includes("."))

const category = {}
categoryGroup.forEach((r) => {
  category[r] = fs
    .readdirSync(`./contents/${r}`)
    .filter((rr) => !rr.includes("."))
})

export default function plop(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setHelper("upperCase", (text) => upperCase(camelCase(text)))

  plop.setGenerator("category-group", {
    description: "Generates a category group",
    prompts: [
      {
        type: "list",
        name: "categoryGroupName",
        message: "Which categoryGroup does this component belong to?:",
        default: categoryGroup[0],
        choices: [...categoryGroup, "none"],
      },
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        when: (answers) => answers.categoryGroupName === "none",
      },
    ],

    actions: (answers) => {
      const result = []

      if (!answers) return result

      const { newCategoryGroupName } = answers

      result.push({
        type: "add",
        path: newCategoryGroupName
          ? `./contents/{{newCategoryGroupName}}/metajson.ts`
          : `./contents/{{categoryGroupName}}/metadata.json`,
        templateFile: "plop/component/metadata.json.hbs",
      })

      return result
    },
  })

  plop.setGenerator("category", {
    description: "Generates a category",
    prompts: [
      {
        type: "list",
        name: "categoryGroupName",
        message: "Which categoryGroup does this component belong to?:",
        default: categoryGroup[0],
        choices: [...categoryGroup, "none"],
      },
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        when: (answers) => answers.categoryGroupName === "none",
      },
      {
        type: "list",
        name: "category",
        message: "Which category does this component belong to?:",
        default: categoryGroup[0],
        choices: [...categoryGroup, "none"],
      },
      {
        type: "input",
        name: "newCategoryName",
        message: "Enter category name:",
        when: (answers) => answers.categoryName === "none",
      },
    ],

    actions: (answers) => {
      const result = []

      if (!answers) return result

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

      result.push({
        type: "add",
        path,
        templateFile: "plop/component/metadata.json.hbs",
      })

      return result
    },
  })

  plop.setGenerator("component", {
    description: "Generates a component",
    prompts: [
      {
        type: "list",
        name: "categoryGroupName",
        message: "Which categoryGroup does this component belong to?:",
        default: categoryGroup[0],
        choices: [...categoryGroup, "none"],
      },
      {
        type: "input",
        name: "newCategoryGroupName",
        message: "Enter category group name:",
        when: (answers) => answers.categoryGroupName === "none",
      },
      {
        type: "list",
        name: "categoryName",
        message: "Which category does this component belong to?:",
        default: category[0],
        when: (answers) => answers.categoryGroupName !== "none",
        choices: (answers) => category[answers.categoryGroupName],
      },
      {
        type: "input",
        name: "newCategoryName",
        message: "Enter category name:",
        when: (answers) => answers.categoryName === "none",
      },
      {
        type: "input",
        name: "newCategoryName",
        message: "Enter category name:",
        when: (answers) => answers.categoryName === "none",
      },
      {
        type: "input",
        name: "componentName",
        message: "Enter component name:",
      },
      {
        type: "list",
        name: "theme",
        message: "Does this component need a theme?",
        default: "Yes",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: "config",
        message: "Does this component need a config?",
        default: "Yes",
        choices: ["Yes", "No"],
      },
    ],

    actions: (answers) => {
      const result = []

      if (!answers) return result

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

      result.push({
        type: "addMany",
        templateFiles: "plop/component/**",
        destination,
        base: "plop/component",
        abortOnFail: true,
      })

      if (theme === "Yes") {
        result.push({
          type: "addMany",
          templateFiles: "plop/addition/theme.ts.hbs",
          destination,
          base: "plop/addition",
          abortOnFail: true,
        })
      }

      if (config === "Yes") {
        result.push({
          type: "addMany",
          templateFiles: "plop/addition/config.ts.hbs",
          destination,
          base: "plop/addition",
          abortOnFail: true,
        })
      }

      return result
    },
  })
}
