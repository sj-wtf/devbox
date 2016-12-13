default['devbox']['base']['repos'] = [
  'epel' => {
    'name' => 'Extra Packages for Enterprise Linux $releasever - $basearch',
    'baseurl' => 'http://download.fedoraproject.org/pub/epel/$releasever/$basearch',
    'mirrorlist' => 'http://mirrors.fedoraproject.org/mirrorlist?repo=epel-$releasever&arch=$basearch',
    'enabled' => true,
    'gpgcheck' => true,
    'gpgkey' => 'https://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-$releasever'
  },
  'virtualbox' => {
    'name' => 'CentOS $releasever ($basearch) VirtualBox',
    'baseurl' => 'http://download.virtualbox.org/virtualbox/rpm/rhel/$releasever/$basearch',
    'enabled' => true,
    'gpgcheck' => true,
    'gpgkey' => 'https://www.virtualbox.org/download/oracle_vbox.asc'
  }
]

default['devbox']['base']['vagrant_version'] = '1.9.1'

default['devbox']['base']['vagrant_url'] = "https://releases.hashicorp.com/vagrant/#{node['devbox']['base']['vagrant_version']}/vagrant_#{node['devbox']['base']['vagrant_version']}_#{node['kernel']['processor']}.rpm"

default['devbox']['base']['packages'] = [
  'open-vm-tools-desktop',
  'VirtualBox-5.1',
  'bind-utils',
  'jq',
  'curl',
  'wget',
  'unzip',
  'gcc',
  'make',
  'libvirt',
  'libvirt-devel',
  'ruby-devel',
  'qemu-kvm'
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
