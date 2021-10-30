# :police_officer: PRcop

A Github action for linting Pull Requests.

## Available linters

**Title RegExp**. Checks your PR's title against a RegExp. Useful to ensure that title contains a Jira ticket ID.

**Description RegExp**. Checks your PR's description against a RegExp. Useful to ensure that description contains a link, an image, etc.

**Description min words count**. Ensures your PR's description is long enough. Useful to ensure that the author provided enough context and documented the most important decisions.

**Min number of author's comments**. Pull Request is also a tool for sharing knowledge. This linter ensures that the author left enough comments not just for a reviewer, but for the whole team to learn.

## How to install

### Add Github action config

Create a file `.github/workfows/prcop.yml` and paste this YAML there. :point_down:

:warning: Make sure you're using the latest version (line `uses: makaroni4/prcop@v1.0.31`).

```yaml
name: PRcop

on:
  pull_request:
    types:
      - opened
      - reopened
      - edited
      - synchronize
      - ready_for_review
      - review_requested
      - review_request_removed
  pull_request_review_comment:
    types:
      - created
      - deleted

jobs:
  prcop:
    runs-on: ubuntu-latest
    name: PRcop
    steps:
      - name: Linting Pull Request
        uses: makaroni4/prcop@v1.0.31
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          config-file: ".github/workflows/prcop-config.json"
```

### Add PRcop config

Create a file `.github/workfows/prcop-config.json` and paste this JSON there. :point_down:

Customize it according to your needs.

```json
{
  "linters": [
    {
      "name": "titleRegexp",
      "config": {
        "regexp": "^CK-[0-9]+",
        "errorMessage": "PR title does not contain Jira ticket. Add CK-XXXX in the beginning of the PR title."
      }
    },
    {
      "name": "descriptionRegexp",
      "config": {
        "regexp": "CK-[0-9]+",
        "errorMessage": "PR description does not contain a link to a Jira ticket."
      }
    },
    {
      "name": "descriptionMinWords",
      "config": {
        "minWordsCount": 20,
        "errorMessage": "Please, write a meaningful PR description – it'll help your reviewer greatly."
      }
    },
    {
      "name": "minComments",
      "config": {
        "minCommentsCount": 1,
        "errorMessage": "Please, comment on your code. It's a great change to share your knowledge with your team."
      }
    }
  ],
  "disableWord": "prcop:disable"
}
```

TEST
