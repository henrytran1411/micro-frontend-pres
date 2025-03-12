// products-remote/next.config.mjs
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
    host: `host@http://localhost:3000/_next/static/chunks/remote.js`,
  };
};

const config = {
  ...nextConfig,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  webpack(config, options) {
    if (!config.plugins) {
      config.plugins = [];
    }

    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "products",
          filename: "static/chunks/remote.js",
          remotes: remotes(options.isServer),
          exposes: {
            "./ProductPage": "./src/components/ProductPage.tsx",
          },
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            recoil: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            "@tanstack/react-query": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            antd: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            "react-redux": {
              singleton: true,
              version: "0",
              requiredVersion: false,
            },
            "@reduxjs/toolkit": {
              singleton: true,
              version: "0",
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
