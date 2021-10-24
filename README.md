# prcop

A Github action for linting Pull Requests.

## Example usage

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
        uses: makaroni4/prcop@v1.0.29
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          config-file: ".github/prcop-config.json"
```

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
