import { registerComponent } from "aframe";

registerComponent("change-color-on-hover", {
  schema: {
    color: { default: "red" },
  },
  init: function () {
    const data = this.data;
    const el = this.el; // <a-box>
    const defaultColor = el.getAttribute("material").color;

    el.addEventListener("mouseenter", function () {
      el.setAttribute("color", data.color);
    });

    el.addEventListener("mouseleave", function () {
      el.setAttribute("color", defaultColor);
    });
  },
});
