// host-app/next.config.mjs
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "antd",
    "@ant-design/icons",
    "rc-picker",
    "rc-table",
    "rc-tree",
    "rc-cascader",
    "rc-dropdown",
    "rc-menu",
    "rc-notification",
    "rc-pagination",
    "rc-select",
    "rc-steps",
    "rc-tabs",
    "rc-time-picker",
    "rc-tooltip",
    "rc-trigger",
    "rc-upload",
    "rc-virtual-list",
    "rc-input-number",
    "rc-progress",
    "rc-slider",
    "rc-switch",
    "rc-form",
    "rc-checkbox",
    "rc-radio",
    "rc-rate",
    "rc-input",
  ],
};

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    basket: "basket@http://localhost:3001/remote.js",
    products: `products@http://localhost:3002/_next/static/${location}/remote.js`,
  };
};

const config = {
  ...nextConfig,
  webpack(config, options) {
    if (!config.plugins) {
      config.plugins = [];
    }
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: remotes(options.isServer),
          filename: "static/chunks/remote.js",
          exposes: {
            "./store": "./src/stores/index",
            "./selectedProductSlice": "./src/stores/selectedProductSlice",
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion: false },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            antd: { singleton: true, eager: true, requiredVersion: false },
            "@tanstack/react-query": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            "react-redux": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            "@reduxjs/toolkit": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
          },
        })
      );
    }
    return config;
  },
};

export default config;
