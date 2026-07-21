import { defineProject } from "vite-plus";

export default defineProject({
  test: {
    includeSource: ["./src/**/*.ts"],
  },
});
