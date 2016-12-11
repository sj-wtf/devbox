node['devbox']['python']['packages'].each do |package_name|
    package package_name
end

if node['devbox']['gui']
  node['devbox']['python']['apm_packages'].each do |package|
    execute "Install APM package #{package}" do
      command "apm install #{package}"
      user 'vagrant'
      cwd '/home/vagrant'
      environment ({'HOME' => '/home/vagrant', 'USER' => 'vagrant'})
    end
  end
end

node['devbox']['python']['versions'].each do |version|
  node['devbox']['python']['pip_packages'].each do |pip_package|
    execute "Install pip#{version} package #{pip_package}" do
      command "pip#{version} install -q #{pip_package}"
    end
  end
end
