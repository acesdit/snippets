---
extension: sh
author: Teddy K
category: Bash
layout: '../../layouts/SubmissionLayout.astro'
title: Install Environment Mac
---
```sh
#!/bin/sh

# ======================== 
# Readme
# this script is for installing some basic tools on mac
# package list:
#  - Homebrew
#  - git
#  - github desktop
# ======================== 


log_file=~/install_progress_log.txt

header_echo() {
    printf "\n============================\n"
    printf "\n$1\n" "$@"
    printf "\n============================\n"
}

# Brew
# ===========
header_echo "Installing Homebrew ..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update

# Git
# ===========
header_echo "Installing git with Homebrew ..."
brew install git
brew install gnupg
brew tap caskroom/cask
brew cask install github-desktop

header_echo "Setting up Github SSH key pairs and Global config"
echo "Please enter your github email:"
read github_email
ssh-keygen -t ed25519 -C $github_email
git config --global user.email $github_email
echo "Please enter your name:"
read github_name
git config --global user.name $github_name```
