default['base']['user']['username'] = 'steve'
default['base']['user']['password'] = 'vagrant'

default['base']['default_packages'] = [
    'epel-release',
    'cinnamon',
    'chefdk',
    'open-vm-tools-desktop'
]

default['base']['apm_packages'] = [
  'language-scala',
  'linter',
  'linter-flake8',
  'file-icons',
  'linter-rubocop',
  'linter-foodcritic'
]

default['base']['gui_packages'] = [
  'control-center',
  'gnome-classic-session',
  'gnome-terminal',
  'glx-utils',
  'liberation-mono-fonts',
  'mesa-dri-drivers',
  'nautilus-open-terminal',
  'plymouth-system-theme',
  'spice-vdagent',
  'tigervnc-server',
  'xorg-x11-drv-keyboard',
  'xorg-x11-drv-mouse',
  'xorg-x11-drv-openchrome',
  'xorg-x11-drivers',
  'xorg-x11-server-Xorg',
  'xorg-x11-utils',
  'xorg-x11-xauth',
  'xorg-x11-xinit',
  'xvattr'
]
