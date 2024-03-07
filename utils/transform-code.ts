export const transformCode = (code: string) => {
  const codeLines = code.split("\n")
  let codeSnippet = "" // React Liveで表示させるコード
  let componentName = "" // コンポーネント名

  for (const line of codeLines) {
    // import {} from "" を削除
    if (!line.includes("import")) {
      codeSnippet += line + "\n"
      if (codeSnippet.includes("const")) {
        // const 変数名をcomponentNameに格納
        const match = line.match(
          /const\s+(\w+)\s*:\s*FC\s*=\s*\(\s*\)\s*=>\s*{/,
        )
        if (match && match.length >= 2) {
          componentName = match[1]
        }
      }
    }
  }
  return `${codeSnippet}\nrender(<${componentName}/>)`
}
