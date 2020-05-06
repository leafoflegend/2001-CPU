# Terminal Commands and Keyboard Shortcuts

## Basic Terminal Commands
- Command line
  - See where I am `pwd`
  - list files `ls`
  - list hidden files `ls -a`
  - change directory `cd <directory-name>`
  - Open whole directory in VS Code `code .`
  - shorthand for current and previous folder
    - `ls .` lists current folder
    - `ls ..` lists previous folder
    - `cd ..` moves up a folder
  - home vs root
    - `~` is short for home
    - `cd ~` brings you home
    - `/` is short for root
    - `cd /` brings to you root
  - absolute vs relative paths
    - **Absolute**: `touch /folder-name/file-name.txt` goes to the root folder, into `folder-name`, makes a file inside of that folder
    - **Relative**: `touch ./folder-name/file-name.txt` goes into `folder-name` from current level, makes a file inside of that folder
    - `touch ~/folder-name/file-name.txt` goes into your home directory (usually looks like `/home/username`)
  - Files
    - create files `touch file-name.txt`
    - remove a file `rm file-name.txt`
    - rename a file `mv file-name.txt new-file-name.txt`
    - move a file `mv this.txt target-folder/`
  - Folders
    - create folders `mkdir folder-name`
    - remove a folder `rm folder-name -R`
    - rename a folder `mv folder-name new-folder-name`
    - move a folder `mv folder-name ../../target-folder`

## Git
- Cloning and remotes
  - Clone `git clone <url>`
  - Check where cloning from and committing to `git remote -v`
  - Add a remote repository  `git remote add <remote-name> https://remote-url/repo-name.git`
- Committing
  - See status of staging area etc `git status`
  - Add all files in the repo to staging area `git add -A`
  - Add just one file to the staging area `git add <filename>`
  - Commit `git commit -m "my-message"`
  - Push `git push`
- logs
  - See log of activity (commits) `git log`
  - See log with limited info (easier to read) `git log --oneline`
- configs
  - Change git email locally: `git config user.email example@email.com`
  - See git repo config settings (i.e. email username etc): `git config --list`
- Diffs
  - See what is changed currently compared to the most recent commit `git diff`
  - See what has changed in the current working tree vs a specific branch `git diff <branch-name> --`
- Removing changes
  - Remove uncommitted changes (but save them for later, just in case) `git stash`
  - Remove last commit `git reset --hard HEAD^`

## ports/processes
- Show list of ports running `lsof -i:<port-number>`
- Kill a port `kill <port-number>`
- Show list of all node processes `ps -ef | grep node`
- Kill all node processes `pkill -f node`

## heroku
- Create a new app `heroku create`
- Create a named app `heroku apps:create <app-name>`
- Push code to heroku `git push heroku master`
- Set an environment variable `heroku config:set VAR_NAME="variable-value"`
- Open the heroku app from the current project `heroku open`
