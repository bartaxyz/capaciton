import { downloadTextFile } from "utils/downloadTextFile";
import { Generators } from "generators";

const { Import, Component, Utils } = Generators.Code;
const { NewLine, Concat } = Utils;

export default () => {
  const onDownloadButtonClick = () =>
    downloadTextFile(
      "Button.tsx",
      Concat([Import("react", "React"), "", Component("Button")], NewLine())
    );

  return (
    <div>
      <h2>This is Capaciton</h2>
      <button onClick={onDownloadButtonClick}>
        Download your React component
      </button>
    </div>
  );
};
