default['devbox']['chef']['repos'] = [
  'chef' => {
    'baseurl' => 'https://packages.chef.io/repos/yum/stable/el/$releasever/$basearch/',
    'gpgcheck' => true,
    'enabled' => true,
    'gpgkey' => 'https://packages.chef.io/repos/yum/stable/el/$releasever/$basearch/repodata/repomd.xml.key'
  }
]

default['devbox']['chef']['packages'] = [
  'chefdk'
]

default['devbox']['chef']['apm_packages'] = [
  'linter-rubocop',
  'linter-foodcritic'
]
