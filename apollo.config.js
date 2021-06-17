module.exports = {
  client: {
    include: ["./**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://yejiiha-nomadcoffee-backend.herokuapp.com/graphql",
    },
  },
};
