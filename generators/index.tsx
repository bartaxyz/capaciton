import { Block } from "./code/Block";
import { Import } from "./code/import";
import { Component } from "./code/component";
import { Concat } from "./code/utils/concat";
import { NewLine } from "./code/utils/newLine";

export const Generators = {
  Code: {
    Block,
    Import,
    Component,
    Utils: {
      Concat,
      NewLine,
    },
  },
};
