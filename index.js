#!/usr/bin/env node

const readPkgUp = require("read-pkg-up");
const matcher = require("matcher");
const { spawn } = require("child_process");

const argv = require("yargs").usage(
  "$0 <pattern>",
  "upgrade yarn dependencies to latest with fuzzy matching",
  (yargs) => {
    yargs.positional("pattern", {
      describe: "the pattern to match against your dependencies",
      type: "string",
    }).option('t', {
      alias: 'tag',
      default: 'latest',
      description: 'The version tag to upgrade all the matching packages with.',
      choices: ['latest', 'next', "stable", "beta", "canary", "dev"]
    });
  }
).argv;

const { pattern, tag } = argv;

const { packageJson } = readPkgUp.sync();

if (packageJson) {
  const possible = [
    ...(packageJson.dependencies ? Object.keys(packageJson.dependencies) : []),
    ...(packageJson.devDependencies
      ? Object.keys(packageJson.devDependencies)
      : []),
  ];
  const found = possible.filter((pkg) => matcher.isMatch(pkg, pattern));
  if (found.length) {
    console.log(`Upgrading: ${found.join(", ")} to @${tag}`);
    spawn("yarn", ["upgrade", ...found.map((pkg) => `${pkg}@${tag}`)], {
      stdio: ["inherit", "inherit", "inherit"],
    });
  } else {
    console.log("No matches found");
  }
} else {
  console.error("Could not find package.json");
  process.exit(1);
}
