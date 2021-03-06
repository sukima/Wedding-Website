require "rake/clean"

DEVELOPMENT_URI = "$HOME/Sites/maddywillyoumarryme.com"
PRODUCTION_URI = "ktohg@tritarget.org:maddywillyoumarryme.com"

CLEAN.include "_site"
CLOBBER.include "_includes/*.html_frag"

def jekyll(opts = "", path = "")
  sh "rm -rf _site"
  sh path + "jekyll " + opts
end

namespace :build do
  desc "Build markdown include files manually"
  task :includes do
    Dir.glob("_includes/*.md").each do |f|
      sh "maruku --html-frag #{f}"
    end
  end

  desc "Build site using Jekyll"
  task :site do
    jekyll
  end
end

desc "Build both site and includes"
task :build => [:"build:includes", :"build:site"]

desc "Serve on Localhost with port 4000"
task :default => :"build:includes" do
  jekyll("--server --auto")
end

# task :stable => :"build:includes" do
  # jekyll("--server --auto", "")
# end

desc "Deploy to Dev"
task :deploy => :"deploy:live"

namespace :deploy do
  desc "Deploy to Dev"
  task :dev => :build do
    rsync DEVELOPMENT_URI
  end
  
  desc "Deploy to Live"
  task :live => :build do
    rsync PRODUCTION_URI
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
  File.open("_drafts/#{time}-#{name}.md", "w+") do |file|
    file.puts <<-EOF
--- 
layout: post
title: #{title}
author: 
---
    EOF
  end
  puts "Created '_drafts/#{time}-#{name}.md'"
end
