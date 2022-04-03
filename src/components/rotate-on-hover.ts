import { registerComponent } from "aframe";

registerComponent("rotate-on-hover", {
  schema: {
    to: { default: "0 0 360" },
    dur: { default: 5000 },
  },
  init: function () {
    const { data, el } = this;
    const { to, dur } = data;
    const animation = `property: rotation; to: ${to}; dur: ${dur};`;
    const reverseAnimation = `property: rotation; to: 0 0 0; dur: ${dur} dir: reverse`;

    el.addEventListener("mouseenter", function () {
      el.setAttribute("animation", animation);
      setTimeout(() => {
        el.setAttribute("animation", reverseAnimation);
      }, dur);
    });
  },
});
