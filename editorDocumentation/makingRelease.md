# Making a spnr.js release

[Back to README](../README.md)

[Back to editor documentation contents](README.md)

There is no strict release schedule for spnr.js - a new release is made if a critical bug has been fixed, or if there have been a number of modifications since the last release.

## Step 1: Update version number

Choose a new version number according to [Semantic versioning](https://semver.org/). Then insert it into `/package.json`.

## Step 2: Build and minify

This is a brief overview of how to do these tasks. For more detailed instructions, see [utility scripts](utilityScripts.md).

In a terminal, navigate to the root directory of this project. Run `python3 scripts/compile.py` followed by `sh scripts/minifier.sh`.

## Step 3: Update and build HTML reference

Follow the instructions [here](aboutReference.md).

## Step 4: Put in CDN folder

Create a new subdirectory in `/cdn/` with the name of the new spnr.js version (do not put a `v` at the start). Copy `spnr.js` and `spnr.min.js` from the `/build/` directory into the new folder. Also copy those two files into `/cdn/latest/` (overwrite the existing files there).

For more detailed info on the CDN folder, see [cdn](cdn.md).

## Step 5: Commit and push

The previous steps will probably have made some changes to your work tree. You can now commit and push to GitHub.

## Step 6: Make release on GitHub

There should already be a work-in-progress release on GitHub called `[unreleased]`. If there's not a release there, create one from the template below. Document your changes there if you haven't done so already. Set the name and tag to the new version (prefix with `v`). Upload the newly-built `spnr.js` and `spnr.min.js` as attachments. You can now publish the release. Please also create a new `[unreleased]` from the template below.

Release template:
```
Optional note.

API Changes:
None

New Features:
- Use dot points if there's anything to write in these sections.
- Otherwise just write "none", as seen in the API Changes and Bugfixes sections

Bugfixes:
None
```

## Step 7: Publish to NPM

Run `npm publish`.