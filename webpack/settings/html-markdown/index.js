const prod = {
  module: {
    rules: [{
      test: /\.md$/,
      use: [
        {
          loader: "html-loader"
        },
        {
          loader: "markdown-loader",
          options: {
            /* your options here */
          }
        }
      ]
    }]
  }
};

const dev = {
  module: {
    rules: [{
      test: /\.md$/,
      use: [
        {
          loader: "html-loader"
        },
        {
          loader: "markdown-loader",
          options: {
            /* your options here */
          }
        }
      ]
    }]
  }
}

module.exports = {
  prod: prod,
  dev: dev
};

