export const codeGenerator = (): number[] => {
  const code: number[] = []
  for (let i = 0; i < 6; i++) {
    const number = Math.floor(Math.random() * 9)
    code.push(number)
  }

  return code
}
