const layers = ["application-ui", "blog-ui", "page-sections"]

const upperCase = (t) => t.charAt(0).toUpperCase() + t.slice(1)
const camelCase = (t) => t.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())

export default function plop(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setHelper("upperCase", (text) => upperCase(camelCase(text)))

  plop.setGenerator("component", {
    description: "Generates a component",
    prompts: [
      {
        type: "list",
        name: "layerType",
        message: "Where does this component belong?:",
        default: "application-ui",
        choices: layers,
      },
      {
        type: "input",
        name: "categoryName",
        message: "Enter category name:",
      },
      {
        type: "input",
        name: "componentName",
        message: "Enter component name:",
      },
    ],

    actions: (answers) => {
      const actions = []

      if (!answers) return actions

      actions.push({
        type: "addMany",
        templateFiles: "plop/component/**",
        destination: `./contents/{{layerType}}/{{dashCase categoryName}}/{{dashCase componentName}}`,
        base: "plop/component",
        abortOnFail: true,
      })

      return actions
    },
  })
}
