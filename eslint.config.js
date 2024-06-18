import antfu from "@antfu/eslint-config"

export default antfu(
  {
    formatters: true,
    react: true,
    unocss: true,
    typescript: true,
    stylistic: {
      quotes: "double",
    },
  },

  // React override
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
  },
)
