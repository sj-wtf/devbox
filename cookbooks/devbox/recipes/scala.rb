node['devbox']['scala']['packages'].each do |package_name|
    package package_name
end

if node['devbox']['gui']
  node['devbox']['scala']['apm_packages'].each do |package|
    execute "Install APM package #{package}" do
      command "apm install #{package}"
      user 'vagrant'
      cwd '/home/vagrant'
      environment ({'HOME' => '/home/vagrant', 'USER' => 'vagrant'})
    end
  end
end

remote_file '/tmp/scala.tgz' do
  source node['devbox']['scala']['download_url']
  not_if { File.directory?("/opt/scala") }
end

execute 'Extract Scala tarball' do
  command 'tar xzvf /tmp/scala.tgz'
  cwd '/opt/'
  not_if {
    File.exists?("/opt/scala-#{node['devbox']['scala']['version']}")
  }
end

link '/opt/scala' do
  to "/opt/scala-#{node['devbox']['scala']['version']}"
end

directory '/opt/scala' do
  owner 'root'
  group 'root'
  mode '0777'
end

link '/bin/scala' do
  to '/opt/scala/bin/scala'
end

link '/bin/fsc' do
  to '/opt/scala/bin/fsc'
end

link '/bin/scalac' do
  to '/opt/scala/bin/scalac'
end

link '/bin/scaladoc' do
  to '/opt/scala/bin/scaladoc'
end

link '/bin/scalap' do
  to 'opt/scala/bin/scalap'
end
