This document includes:
 - how to make npm, github release of remix-* packages
 - how to update remix.ethereum.org.
 - how to update remix-alpha.ethereum.org.

# remix-* release (npm release, github release) 
   
 For a specifix module (lib/core/debug/ide/solidity/tests)
 
 - Make a new branch, bump the version in package.json, push it and create PR.
 - Wait for the tests to complete.
 - Merge PR
 - Build the branch ( `npm run build` for remix-ide ).
 - Execute `npm publish`.
 - Create new `tag` ( e.g `git tag v0.6.1-alpha.2` ).
 - Push the tag ( `git push --tag` ).
 - Execute `gren changelog --generate -t <new tag>..<previous tag> --data-source=prs`.
 - In `changelog.md` remove the closed and non merged PR.
 - Publish the release in github using the changelog.


# remix.ethereum.org update

This is not strictly speaking a release. Updating the remix site is done through the Travis build:

 - In remix-ide repository
 - Switch to the branch `remix_live`
 - Rebase the branch against master
 - Force push
 - https://travis-ci.org/ethereum/remix-ide
 - Click `More options`
 - Click `Trigger build`
 - Select `remix_live`
 - Click `Trigger custom build`
 - Once the build is finished (can take a while) and successful, check remix.ethereum.org is updated accordingly

# remix-alpha.ethereum.org update

This is not strictly speaking a release. Updating the remix-alpha site is done through the Travis build:

 - https://travis-ci.org/ethereum/remix-ide
 - Click `More options`
 - Click `Trigger build`
 - Select `Master`
 - Click `Trigger custom build`
 - Once the build is finished (can take a while) and successful, check remix-alpha.ethereum.org is updated accordingly
