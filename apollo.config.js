module.exports = {
  client: {
    includes: ["./components/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://yejiiha-nomadcoffee-backend.herokuapp.com/graphql",
    },
  },
};
