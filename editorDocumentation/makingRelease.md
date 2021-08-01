# Making a spnr.js release

[Back to README](../README.md)

[Back to editor documentation contents](README.md)

There is no strict release schedule for spnr.js - a new release is made if a critical bug has been fixed, or if there have been a number of modifications since the last release.

## Step 1: Update version number

Choose a new version number according to [Semantic versioning](https://semver.org/). Then insert it into the following files:
- `/src/core.js` (there are two places this it is used in this file - in the license comment and in defining `spnr.VERSION`).
- `/userReference/htmlContentsTemplate.html`.
- `/package.json`.

## Step 2: Build and minify

This is a brief overview of how to do these tasks. For more detailed instructions, see [utility scripts](utilityScripts.md).

In a terminal, navigate to the root directory of this project. Run `python3 scripts/compiler.py` followed by `python3 scripts/minifier.py`.

## Step 3: Put in CDN folder

Create a new subdirectory in `/cdn/` with the name of the new spnr.js version (do not put a `v` at the start). Copy `spnr.js` and `spnr.min.js` from the `/build/` directory into the new folder. Also copy those two files into `/cdn/latest/` (overwrite the existing files there).

For more detailed info on the CDN folder, see [cdn](#cdn.md).

## Step 4: Commit and push

The previous steps will probably have made some changes to your work tree. You can now commit and push to GitHub.

## Step 5: Make release on GitHub

There should already be a work-in-progress release on GitHub called `[unreleased]`. If there's not a release there, create one from the template below. Document your changes there if you haven't done so already. Set the name and tag to the new version (prefix with `v`). Upload the newly-built `spnr.js` and `spnr.min.js` as attachments. You can now publish the release. Please also create a new `[unreleased]` from the template below.

Release template:
```
Optional note.

API Changes:
None

New Features:
- Use dot points if there's anything to write in these sections.
- Otherwise just write "none".

Bugfixes:
None
```

## Step 6: Publish to NPM

I don't actually remember how to do this. I think it might just involve running `npm publish`.