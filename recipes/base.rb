node['devbox']['base']['repos'].each do |repo|
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

node['devbox']['base']['packages'].each do |package_name|
    package package_name
end

remote_file '/tmp/vagrant.rpm' do
  source node['devbox']['base']['vagrant_url']
  not_if { ::File.exists?('/usr/bin/vagrant') }
end

yum_package 'vagrant' do
  source '/tmp/vagrant.rpm'
end

if node['devbox']['gui']
  bash 'install atom' do
    code <<-EOH
    wget --quiet https://github.com/atom/atom/releases/download/v1.11.2/atom.x86_64.rpm;
    yum install -y -q atom.x86_64.rpm
    EOH
    not_if { ::File.exists?('/bin/atom') }
  end

  node['devbox']['base']['apm_packages'].each do |package|
    execute "Install APM package #{package}" do
      command "apm install #{package}"
      user 'vagrant'
      cwd '/home/vagrant'
      environment ({'HOME' => '/home/vagrant', 'USER' => 'vagrant'})
    end
  end

  node['devbox']['base']['gui_packages'].each do |package|
    package package
  end
end

link '/etc/systemd/system/default.target' do
  to '/lib/systemd/system/graphical.target'
  link_type :symbolic
end
