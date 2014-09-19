# Git Hook Modules

A simple git hook module system.

## Install CLI Tool
 
`npm install -g git-hook-modules`

## Add to a repo

`git hooks init`

This will update all your git hook files to use the `git-hook-modules` system and, if it's not present, create a `.githooks`.

## Add to a Node.JS Project

`npm install git-hook-modules --save-dev`

This will run the same process as `git hooks init`. It will also add `git-hook-modules` to your Node project so it will be auto installed when someone run `npm install` 

## Loop a script into the git hook process

Add an executable command to the `.githooks` under the hook you want to trigger the script. The order of these scripts determins the order that they are run when the hook is trigged by git. On [hooks that can be stopped by a non-zero exit]() a non-zero stop will exicution stream.

```
post-commit:
    echo "first command of a post-commit hook"
    echo "secound command of a post-commit hook"
    node third-command.js

pre-commit:
	python it-works-with.py

post-merge:
	go run it-works-with.go
```

## More on the CLI Tool

* `git hooks [hook-name] --ORDER`
* `git hooks [hook-name] add [cmd]`
* `git hooks [hook-name] remove [cmd]`
* `git hooks run [hook-name]`
* `git hooks [hook-name] install [tar-file]`





