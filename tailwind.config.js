module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" /* src folder, for example */,
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DM: "'DM Sans', sans-serif",
        "DM-display": "'DM Serif Display', serif",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
