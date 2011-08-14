require "rake/clean"

CLEAN.include "_site"

def jekyll(opts = "", path = "")
  sh "rm -rf _site"
  sh path + "jekyll " + opts
end

desc "Build site using Jekyll"
task :build do
  jekyll
end

desc "Serve on Localhost with port 4000"
task :default do
  jekyll("--server --auto")
end

task :stable do
  jekyll("--server --auto", "")
end

desc "Deploy to Dev"
task :deploy => :"deploy:live"

namespace :deploy do
  desc "Deploy to Dev"
  task :dev => :build do
    rsync "$HOME/Sites/maddywillyoumarryme.com"
  end
  
  desc "Deploy to Live"
  task :live => :build do
    rsync "ktohg@tritarget.org:maddywillyoumarryme.com"
  end
  
  desc "Deploy to Dev and Live"
  task :all => [:dev, :live]
  
  def rsync(location)
    sh "rsync -rtz --delete _site/ #{location}/"
  end
end

desc "Create a new blog post"
task :post do
  print "Please enter in the title of the blog post: "
  title = $stdin.gets.chomp.strip
  name = title.gsub(/\s+/, '-')
  name = name.gsub(/[^a-zA-Z0-9_-]/, "").downcase
  time = Time.now.strftime("%Y-%m-%d")
  Dir.mkdir("_drafts") unless File::exists?("_drafts")
  File.open("_drafts/#{time}-#{name}.markdown", "w+") do |file|
    file.puts <<-EOF
--- 
layout: post
title: #{title}
author: 
---
    EOF
  end
  puts "Created '_drafts/#{time}-#{name}.markdown'"
end
