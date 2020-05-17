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
  - Change the origin `git remote set-url origin <new-git-repo-url>`
- Committing
  - See status of staging area etc `git status`
  - Add all files in the repo to staging area `git add -A`
  - Add just one file to the staging area `git add <filename>`
  - Commit `git commit -m "my-message"`
  - Push `git push`
- Branching
  - Check out to a new branch `git checkout -b <branchname>`
  - Check out to an existing branch `git checkout <branchname>`
  - Delete a branch (cannot be the branch you're on!) `git branch -D <branchname>`
- logs
  - See log of activity (commits) `git log`
  - See log with limited info (easier to read) `git log --oneline`
- configs
  - Change git email locally: `git config user.email example@email.com`
  - See git repo config settings (i.e. email username etc): `git config --list`
- Diffs
  - See what is changed currently compared to the most recent commit `git diff`
  - See what has changed in the current working tree vs a specific branch `git diff <branch-name> --`
- Removing/rebasing changes - Intermediate to Advanced
  - Remove uncommitted changes (but save them for later, just in case) `git stash`
  - Remove last commit `git reset --hard HEAD^`
  - Squash the last 3 commits into one single commit `git rebase -i HEAD~3`
    - Then in the editor, for any commits you want to keep leave `pick`. For anything you want to "squash" and not include that as a commit, change `pick` to `squash`.
  - Squash everything after <SHA1> `git rebase -i e25340b` where e25340b is the SHA1
    - Repeat next step from above to pick/squash specific  commits.

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

## cURL
- Methods
  - `GET` request: `curl https://www.google.com/`
  - `POST` request: `curl http://localhost:3000/myroute -H "Content-Type: application/json" -X POST -d '{"key1": "val1", "key2": "val2"}'` (`-H` is a header, in this case setting our content type as json. `-X` is setting the method, post in this case. `-d` is the request body in JSON format.)
  - `PATCH` request: `curl http://localhost:3000/myroute -X PATCH -H 'Content-Type: application/json' -d '{"key1": "val1", "key2": "val2"}'`
  - `DELETE` request: `curl http://localhost:3000/myrouote -X DELETE`
- Setting Authorization header: `curl http://localhost:3000/myroute -H 'Authorization: Bearer <myreallylongtoken>'`