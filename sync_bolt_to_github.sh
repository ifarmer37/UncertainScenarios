#!/bin/bash

# Navigate to the Bolt project directory
cd "$(dirname "$0")"

# Repository details
REPO_URL="https://github.com/ifarmer37/UncertainScenarios.git"
BRANCH="main"

# Check if the directory is a Git repository
if [[ ! -d ".git" ]]; then
    echo "Initializing Git repository..."
    git init
    git remote add origin $REPO_URL
    git branch -M $BRANCH
fi

# Fetch the latest changes to avoid merge conflicts
git fetch origin $BRANCH
git reset --soft origin/$BRANCH

# Add and commit changes
git add .
COMMIT_MSG="Auto-sync update on $(date)"
git commit -m "$COMMIT_MSG"

# Push updates to GitHub
git push origin $BRANCH

echo "✅ Sync complete: $COMMIT_MSG"
