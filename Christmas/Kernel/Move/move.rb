=begin
 param = {
     "action" => "*",                   //需要调用的动作
 }
=end
# encoding=UTF-8

# require_relative './MoveMakeSpringBoot/moveMakeSpringBoot.rb'
# require_relative './MoveCheckCodeTempl/moveCheckCodeTempl.rb'
require_relative './MoveMakeCodeNormal/moveMakeCodeNormal.rb'
require_relative './MoveMakeEngineeringNormal/moveMakeEngineeringNormal.rb'
require_relative './MoveMakeMenu/moveMakeMenu.rb'

class CMove
    def initialize()
        @MoveMap = {
			"MakeMenu" => CMoveMakeMenu.new,
			"MakeCodeNormal" => CMoveMakeCodeNormal.new,
			"MakeEngineeringNormal" => CMoveMakeEngineeringNormal.new,
			# "MakeSpringBoot" => CMoveMakeSpringBoot.new,
			# "CheckModel" => CMoveCheckCodeTempl.new
		}
	end

	def dealParam(param)
		returnParam = []
		if param.include?'/'
			returnParam = param.split('/')
		elsif param.include?'\\'
			returnParam = param.split('\\')
		end
		returnParam.each do |list|
			if list == $Menu
				returnParam = returnParam-[list]
				break
			else
				returnParam = returnParam-[list]
			end
		end
		return returnParam
	end

	def start(param)
		param = dealParam(param)
		if param[0] == "MakeMenu"
			tempMenu = []
			@MoveMap.each do |key,value|
				tempMenu << key
			end
			@MoveMap[param[0]].start(tempMenu)
		else
			@MoveMap[param[0]].start(param)
		end
	end
end