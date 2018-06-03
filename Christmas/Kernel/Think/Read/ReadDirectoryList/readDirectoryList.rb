=begin
 param = {
     "path" => "*",                   	//文件路劲
 }
=end

# encoding=UTF-8
#require 'rubygems'
require  'find'

class CReadDirectoryList
	def initialize()
	end

	def check(param)
		path = param['path']
		tempDirectoryList = []
		Find.find(path) do |filename|
			if File.directory?filename and filename != path
				# tempDirectoryList << "/"+(filename.delete path)
				tempDirectoryList << filename.gsub(/#{path}/,'')
			end
		end
		return tempDirectoryList
	end

	def start(param)
		return check(param)
	end
end