default['devbox']['scala']['packages'] = [
  'java-1.7.0-openjdk' # Scala doesn't work with Java 8 yet
]

default['devbox']['scala']['version'] = '2.11.6'

default['devbox']['scala']['download_url'] = "http://downloads.lightbend.com/scala/#{node['devbox']['scala']['version']}/scala-#{node['devbox']['scala']['version']}.tgz"

default['devbox']['scala']['apm_packages'] = [
  'linter-scalac',
  'language-scala',
  'ensime'
]
