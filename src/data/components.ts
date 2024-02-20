import { lstatSync, readFileSync, readdirSync } from "fs";
import path from "path";

interface ComponentInfo {
    component: string;
    slug: string;
    // code: { fileName: string; language: string; code: string }[];
    attributes: any;
  }

const convertCase = (string: string) => {
  const splitted = string
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(" ");
  return splitted.join("-");
};

const getComponentCode = (componentFolder: string, componentName: string) => {
  const componentContents = readdirSync(componentFolder).filter(
    (item) =>
      (item.endsWith(".tsx") && !item.endsWith(".story.tsx")) ||
      item.endsWith(".ts") ||
      item.endsWith(".css")
  );

  const mainFileContent = readFileSync(
    path.join(componentFolder, `${componentName}.tsx`),
    "utf-8"
  );
  const otherFilesContent = componentContents
    .filter((file) => file !== `${componentName}.tsx`)
    .map((file) => ({
      name: file,
      content: readFileSync(path.join(componentFolder, file), "utf-8"),
    }));

  return [
    {
      fileName: `${componentName}.tsx`,
      language: "tsx",
      code: mainFileContent,
    },
    ...otherFilesContent.map(({ name, content }) => ({
      fileName: name,
      language: name.endsWith(".css") ? "scss" : "tsx",
      code: content,
    })),
  ];
};

export const getAllComponents = (): ComponentInfo[] => {
  const rootFolder = path.join(process.cwd(), "src", "contents");
  const paths = readdirSync(rootFolder);

  return paths
    .map((componentName) => {
      const componentDirectory = path.join(rootFolder, componentName);
      const componentAttributes = path.join(
        componentDirectory,
        "attributes.json"
      );

      if (lstatSync(componentDirectory).isDirectory()) {
        // const code = getComponentCode(componentDirectory, componentName);
        const attributes = JSON.parse(
          readFileSync(componentAttributes, "utf8")
        );
        return {
          component: componentName,
          slug: convertCase(componentName),
        //   code,
          attributes,
        };
      }

      return null;
    })
    .filter((c) => c) as ComponentInfo[];
};
