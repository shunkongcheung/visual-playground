import { registerComponent } from "aframe";

registerComponent("log", {
  schema: { type: "string" },
  init: function () {
    const stringToLog = this.data;
    console.log(stringToLog);
  },
});
