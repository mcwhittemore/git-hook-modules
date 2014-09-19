var helpMsg = function(){/*

Usage:
	git hooks <command>

Commands:
	run: `git hooks run <hook>`
		runs the hook commands for the provided hook.
		
	list: `git hooks list <hook>`
		echoes the hook commands for the provided hook.
		
	init: `git hooks init`
		forwards all git hooks to the git hooks run and creates a Hookfile if one is not present

	--version: `git hooks --version`
		prints out the currently running version of git hooks.

	-h: `git hooks -h`
		displays this help message

Hooks:
	applypatch-msg: description to come

	pre-applypatch: description to come

	post-applypatch: description to come

	pre-commit: description to come

	prepare-commit-msg: description to come

	commit-msg: description to come

	post-commit: description to come

	pre-rebase: description to come

	post-checkout: description to come

	post-merge: description to come

	pre-receive: description to come

	update: description to come

	post-receive: description to come

	post-update: description to come

	pre-auto-gc: description to come

	post-rewrite: description to come

	pre-push: description to come

*/}.toString().split(/\n/).slice(1, -1).join("\n");

console.log(helpMsg)
