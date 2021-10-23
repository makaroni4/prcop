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
        uses: makaroni4/prcop@v1.0.12
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          title-regexp: "^(CK|PAN)-[0-9]+ "
          title-format-error-message: Oops, looks like your PR title does not contain Jira ticket ID.
          description-regexp: "https://org-name.atlassian.net/browse/(CK|PAN)-[0-9]+"
          description-format-error-message: Oops, looks like your PR description does not contain Jira ticket ID.
          description-min-words: 20
          min-comments: 1
          disable-word: prcop:false
```

TEST
