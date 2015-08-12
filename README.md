[![npm](https://nodei.co/npm/github-readme.png)](https://npmjs.com/package/github-readme)

# github-readme

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Fetch README from GitHub.

[travis]: https://travis-ci.org/eush77/github-readme
[travis-badge]: https://travis-ci.org/eush77/github-readme.svg
[david]: https://david-dm.org/eush77/github-readme
[david-badge]: https://david-dm.org/eush77/github-readme.png

## Example

```js
> githubReadme('git', 'git', function (err, readme) {
>   console.log(readme.slice(0, 300));
> })
////////////////////////////////////////////////////////////////

	Git - the stupid content tracker

////////////////////////////////////////////////////////////////

"git" can mean anything, depending on your mood.

 - random three-letter combination that is pronounceable, and not
   actually used
```

## API

### `githubReadme(user, repo, cb(err, readme))`

Fetches README from GitHub and returns it as a string. The filename is detected automatically.

## Install

```
npm install github-readme
```

## License

MIT
