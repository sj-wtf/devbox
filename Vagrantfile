gui = true
chefdk_version = '0.3.6'

Vagrant.configure('2') do |config|
  config.vm.box = 'bento/centos-7.2'
  config.vm.hostname = 'devbox'
  config.vm.synced_folder '.', '/vagrant', disabled: true
  config.vm.synced_folder '..','/home/vagrant/repos'
  config.ssh.forward_agent = true

  config.vm.provider 'virtualbox' do |vb|
    vb.gui = gui
    vb.memory = 8192
    vb.cpus = 2
  end

  config.vm.provider 'libvirt' do |lv|
    lv.cpus = 1
    lv.memory = 2048
    lv.graphics_autoport = 'yes'
    lv.nested = true
  end

  config.vm.provision :chef_zero do |chef|
    chef.run_list = ['recipe[devbox::default]']
    chef.cookbooks_path = '..'
    chef.nodes_path = 'nodes'
    chef.json = {
      'devbox' => {
        'gui' => gui,
        'chef' => {
          'chefdk_version' => chefdk_version
        }
      }
    }
  end
end
