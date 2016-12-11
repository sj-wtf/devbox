default['devbox']['base']['repos'] = [
  'epel' => {
    'name' => 'Extra Packages for Enterprise Linux $releasever - $basearch',
    'baseurl' => 'http://download.fedoraproject.org/pub/epel/$releasever/$basearch',
    'mirrorlist' => 'http://mirrors.fedoraproject.org/mirrorlist?repo=epel-$releasever&arch=$basearch',
    'enabled' => true,
    'gpgcheck' => true,
    'gpgkey' => 'https://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-$releasever'
  }
]

default['devbox']['base']['packages'] = [
    'open-vm-tools-desktop',
    'bind-utils',
    'jq',
    'curl',
    'wget',
    'unzip'
]

default['devbox']['base']['apm_packages'] = [
  'linter',
  'file-icons',
  'atom-ctags'
]

default['devbox']['base']['gui_packages'] = [
  'cinnamon',
  'control-center',
  'firefox',
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
