Vagrant.configure('2') do |config|
  config.vm.box = 'bento/centos-7.2'
  config.vm.hostname = 'devbox'

  config.vm.provider 'virtualbox' do |v|
    v.gui = true
    v.memory = 8192
    v.cpus = 2
  end

  config.vm.provision :chef_zero do |chef|
    chef.run_list = ['recipe[base::default]']
    chef.cookbooks_path = 'cookbooks'
    chef.nodes_path = 'nodes'
  end
end
