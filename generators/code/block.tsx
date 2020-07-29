export const Block = (lines: string[]) => {
  return lines.map((line) => line.split("\n").map((l) => `\t${l}`)).join("");
};
