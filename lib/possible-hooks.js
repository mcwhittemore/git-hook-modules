var path = require("path");

//this is a list of all the possible git-hooks. If one is missing, please issue a pull request ASAP
module.exports = [
    "applypatch-msg",
    "pre-applypatch",
    "post-applypatch",
    "pre-commit",
    "prepare-commit-msg",
    "commit-msg",
    "post-commit",
    "pre-rebase",
    "post-checkout",
    "post-merge",
    "pre-receive",
    "update",
    "post-receive",
    "post-update",
    "pre-auto-gc",
    "post-rewrite",
    "pre-push"
]

module.exports.baseFilesByHookName = {
    "applypatch-msg":       path.join(__dirname, "../base-files/", "test"),
    "pre-applypatch":       path.join(__dirname, "../base-files/", "test"),
    "post-applypatch":      path.join(__dirname, "../base-files/", "test"),
    "pre-commit":           path.join(__dirname, "../base-files/", "test"),
    "prepare-commit-msg":   path.join(__dirname, "../base-files/", "test"),
    "commit-msg":           path.join(__dirname, "../base-files/", "test"),
    "post-commit":          path.join(__dirname, "../base-files/", "test"),
    "pre-rebase":           path.join(__dirname, "../base-files/", "test"),
    "post-checkout":        path.join(__dirname, "../base-files/", "test"),
    "post-merge":           path.join(__dirname, "../base-files/", "test"),
    "pre-receive":          path.join(__dirname, "../base-files/", "test"),
    "update":               path.join(__dirname, "../base-files/", "test"),
    "post-receive":         path.join(__dirname, "../base-files/", "test"),
    "post-update":          path.join(__dirname, "../base-files/", "test"),
    "pre-auto-gc":          path.join(__dirname, "../base-files/", "test"),
    "post-rewrite":         path.join(__dirname, "../base-files/", "test"),
    "pre-push":             path.join(__dirname, "../base-files/", "test")
}