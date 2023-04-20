import { CodegenConfig } from "@graphql-codegen/cli";

console.log("env", process.env.REACT_APP_GITHUB_TOKEN);

const config: CodegenConfig = {
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          "user-agent": "node.js",
        },
      },
    },
  ],
  documents: ["./src/graphql/queries.ts"],
  generates: {
    "./src/graphql/generated/gql/": {
      preset: "client",
      config: {
        skipTypename: true,
      },
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
  },
};

export default config;
