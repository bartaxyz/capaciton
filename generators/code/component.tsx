import { NewLine } from "./utils/newLine";

export const Component = (name: string) => {
  const propsVariableName = `${name}Props`;
  return `export interface ${propsVariableName} {};${NewLine()}${NewLine()}export const ${name}: React.FC<${propsVariableName}> = () => {}`;
};
