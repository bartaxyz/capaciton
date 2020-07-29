import { NewLine } from "./utils/newLine";

/**
 * Generates TypeScript import
 * @param from
 * @param defaultOrModules a string for default import, array of strings for destruct imports
 * @param modules
 */
export const Import = (
  from: string,
  defaultOrModules?: string | string[],
  modules?: string[]
) => {
  // Using default import
  if (typeof defaultOrModules === "string") {
    // No module imports, only default import present
    if (!modules || modules.length === 0) {
      return `import ${defaultOrModules} from '${from}';`;
    }

    // Default import & module import
    return `import ${defaultOrModules}, { ${modules.join(
      ", "
    )} } from '${from}';`;
  }

  // No default import, only module imports
  if (defaultOrModules) {
    return `import { ${defaultOrModules.join(", ")} } from '${from}';`;
  }

  // No specific import
  return `import '${from}';`;
};
