node['devbox']['chef']['repos'].each do |repo|
  repo.each do |reponame, param|
    yum_repository reponame do
      baseurl param['baseurl']
      mirrorlist param['mirrorlist']
      gpgcheck true
      enabled true
      gpgkey param['gpgkey']
    end
  end
end

node['devbox']['chef']['packages'].each do |package_name|
    package package_name
end

if node['devbox']['gui']
  node['devbox']['chef']['apm_packages'].each do |package|
    execute "Install APM package #{package}" do
      command "apm install #{package}"
      user 'vagrant'
      cwd '/home/vagrant'
      environment ({'HOME' => '/home/vagrant', 'USER' => 'vagrant'})
    end
  end
end

template '/home/vagrant/.bashrc' do
  source 'bashrc.erb'
  owner 'vagrant'
  group 'vagrant'
  mode '0644'
end
