#! /bin/bash

# Because I'm the worst at shell scripting, explicitly creating links for every file

case $0 in
    /*|~*)
        SCRIPT_INDIRECT="`dirname $0`"
        ;;
    *)
        PWD="`pwd`"
        SCRIPT_INDIRECT="`dirname $PWD/$0`"
        ;;
esac

BASEDIR="`(cd \"$SCRIPT_INDIRECT\"; pwd -P)`"

rm -rf $HOME/.atom
rm -rf $HOME/.bashrc
rm -rf $HOME/.screenrc
rm -rf $HOME/.bash_profile

ln -s $BASEDIR/atom $HOME/.atom
ln -s $BASEDIR/bash/bashrc $HOME/.bashrc
ln -s $BASEDIR/bash/screenrc $HOME/.screenrc
ln -s $BASEDIR/bash/bash_profile $HOME/.bash_profile

apm install --packages-file $BASEDIR/atom/package-list.txt
