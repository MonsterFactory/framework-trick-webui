# encoding=UTF-8
require_relative '../writeCopyFile.rb'

ObjSample = CWriteCopyFile.new
ObjSample.start({"action" => "WriteCopyFile","sourcePath" => "./document","targetPath"=>"./document2"})