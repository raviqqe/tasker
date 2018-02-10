task :deps do
  sh 'npm install'
end

task :build do
  sh %w[inkscape
        --export-width 16 --export-height 16
        --export-png public/favicon.png
        images/icon.svg].join ' '
  sh %w[inkscape
        --export-width 192 --export-height 192
        --export-png public/icon.png
        images/icon.svg].join ' '

  sh 'npx react-scripts-ts build'
end

task :run do
  sh 'npx react-scripts-ts start'
end

task :test do
  sh 'npx react-scripts-ts test --env=jsdom'
end

task :clean do
  sh 'git clean -dfx'
end
