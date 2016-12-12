Builds a development machine. Unstable.

You can't currently run virtualbox on devbox, since virtualbox doesn't support PV on PV.  Need to add support for another provider, which supports nested virtualization.

Currently only supports Atom. For now, you have to do a `vagrant reload` to get a GUI. There are several other problems, as well:

- [ ] I have to include a resource for package installation, apm package installation, and repo creation in each recipe. It'd be good if the base recipe installed everything in a single go based on node attributes.

- [ ] I have to run apm install <package> for each package we need to install. It'd be good if I had a resource provider which only tried to install packages that weren't already installed.

- [ ] Same thing as the previous, but for pip.

- [ ] Versions are not locked. It'd be good if we locked versions.

- [ ] All recipes depend on the base cookbook. Maybe run it on every recipe? How would I dedupe its work if I want to run more than one recipe?

- [x] ~~Maybe only install virtualenv for each version of python we install?~~ No, I want some standard packages available in the Python repl.

- [ ] No tests. It'd be good if I wrote some tests.
