gui = true

Vagrant.configure('2') do |config|
  config.vm.box = 'bento/centos-7.2'
  config.vm.hostname = 'devbox'
  config.vm.synced_folder '..',  '/vagrant/repos'
  config.vm.provider 'virtualbox' do |v|
    v.gui = gui
    v.memory = 8192
    v.cpus = 2
  end

  config.vm.provision :chef_zero do |chef|
    chef.run_list = ['recipe[devbox::default]']
    chef.cookbooks_path = 'cookbooks'
    chef.nodes_path = 'nodes'
    chef.json = {
      'devbox' => {
        'gui' => gui
      }
    }
  end
end
