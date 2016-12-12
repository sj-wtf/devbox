default['devbox']['chef']['repos'] = [
  'chef' => {
    'baseurl' => 'https://packages.chef.io/repos/yum/stable/el/$releasever/$basearch/',
    'gpgcheck' => true,
    'enabled' => true,
    'gpgkey' => 'https://packages.chef.io/repos/yum/stable/el/$releasever/$basearch/repodata/repomd.xml.key'
  }
]

default['devbox']['chef']['chefdk_version'] = '1.0.3'

default['devbox']['chef']['packages'] = [
  'chefdk' => node['devbox']['chef']['chefdk_version']
]

default['devbox']['chef']['apm_packages'] = [
  'linter-rubocop',
  'linter-foodcritic'
]
