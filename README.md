# yarn-upgrade-fuzzy

> Upgrade yarn dependencies to latest with fuzzy matching

[![npm package][npm-badge]][npm-link]
[![license MIT][license-badge]][license-link]

Look at your devDependencies and dependencies fields upgrading all that match the given minimatch pattern.

## Usage
1. Install
```bash
yarn global add yarn-upgrade-fuzzy 
```

2. Run in your project root:
```bash
yuf "jest*"
# Upgrading: jest, jest-circus 
```

---

[LICENSE][license-link] | [ISSUES][issues-link]

[issues-link]: https://github.com/AndrewLeedham/yarn-upgrade-fuzzy/issues

[npm-badge]: https://flat.badgen.net/npm/v/yarn-upgrade-fuzzy?color=cyan
[npm-link]: https://www.npmjs.com/package/yarn-upgrade-fuzzy

[license-link]: ./LICENSE
[license-badge]: https://flat.badgen.net/npm/license/yarn-upgrade-fuzzy