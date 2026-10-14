#!/usr/bin/env bash
# Creates the 4 issues on GitHub. Run from the repo root after `gh auth login`.
# Put each teammate's GitHub username below (leave blank to skip assigning).
REPO="TheLoreBore/Cardinal-Ecommerce"
declare -A USERS=( [nathan]="" [sophia]="" [maria]="" [isabella]="" )
for who in nathan sophia maria isabella; do
  args=(--repo "$REPO" --title "$(cat issues/$who.title)" --body-file "issues/$who.md")
  [ -n "${USERS[$who]}" ] && args+=(--assignee "${USERS[$who]}")
  gh issue create "${args[@]}"
done
