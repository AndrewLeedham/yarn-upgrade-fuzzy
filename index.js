#!/usr/bin/env node

const readPkgUp = require("read-pkg-up");
const minimatch = require("minimatch");
const { spawn } = require("child_process");

const argv = require("yargs").usage(
  "$0 <pattern>",
  "upgrade yarn dependencies to latest with fuzzy matching",
  (yargs) => {
    yargs.positional("pattern", {
      describe: "the pattern to match against your dependencies",
      type: "string",
    });
  }
).argv;

const { pattern } = argv;

const { packageJson } = readPkgUp.sync();

if (packageJson) {
  const possible = [
    ...Object.keys(packageJson.dependencies),
    ...Object.keys(packageJson.devDependencies),
  ];
  const found = possible.filter((pkg) => minimatch(pkg, pattern));
  if (found.length) {
    console.log(`Upgrading: ${found.join(", ")}`);
    spawn("yarn", ["upgrade", ...found.map((pkg) => `${pkg}@latest`)], {
      stdio: ["inherit", "inherit", "inherit"],
    });
  } else {
    console.log("No matches found");
  }
} else {
  console.error("Could not find package.json");
  process.exit(1);
}
