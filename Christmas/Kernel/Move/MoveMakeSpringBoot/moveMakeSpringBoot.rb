# encoding=UTF-8
require_relative '../../Think/think.rb'

class CMoveMakeSpringBoot
	def initialize()
		@ObjThink = CThink.new
		@check = ["document","function","module","param"]
		@dirConfig = {
			"document"=>"./Input/SpringBoot/Template/Document/document.templ",
			"function"=>"./Input/SpringBoot/Template/Function/function.templ",
			"module"=>"./Input/SpringBoot/Template/Module/module.templ",
			"param"=>"./Input/SpringBoot/Template/Module/module.templ"
		}
		@templ = "templ"
		@endTempl = "param_templ"
		today = Time.new;
		@inPutPath = "#{$InPutPath}/SpringBoot/SpringBoot.json"
		@outPutPath = "#{$OutPutPath}/SpringBoot/#{today.strftime("%Y-%m")}/#{today.strftime("%d")}"
	end
	
	def step1()
		@Read = @ObjThink.start({"action" => "ReadJson","path" => @inPutPath})
	end
	
	def step2_ergodicTempl_end(templ, param)
		tempStr = ""
		if param.class == Array
			param.each do |list|
				if list.class == String
					tempStr += @ObjThink.start({"action" => "DealRegExReplace","temlp"=>templ,"substitutionParameter"=>{"value"=>list}})
				elsif list.class == Hash
					list.each do |key_1,value_1|
						tempStr += @ObjThink.start({"action" => "DealRegExReplace","temlp"=>templ,"substitutionParameter"=>{"key"=>key_1,"value"=>value_1}})
					end
				end		
			end
		end
		return tempStr
	end

	def step2_ergodicTempl(param,part)
		if param.class == Array
			tempStr = ""
			param.each do |list|
				tempStr += step2_ergodicTempl(list, part)
			end
			return tempStr
		elsif param.class == Hash
			isIncludeTemp = false
			param.each do |key,value|	
				if key.include?@templ
					param[key] = @ObjThink.start({"action" => "ReadTempl","path" => @dirConfig[part],"templ" => value})
					isIncludeTemp = true
					next
				end
				@check.each do |value_1|
					if(key == @check.last)
						param[key] = step2_ergodicTempl_end(param[@endTempl], param[key])
						temp =  @ObjThink.start({"action" => "DealRegExReplace","temlp"=>param[@templ],"substitutionParameter"=>param})
						return temp
					end
					if key == value_1
						param[key] = step2_ergodicTempl(param[key], key)
						if isIncludeTemp
							return @ObjThink.start({"action" => "DealRegExReplace","temlp"=>param[@templ],"substitutionParameter"=>param})
						end
						break
					end
				end
			end
		end
	end

	def step2()
		@Deal = []
		if @Read.class == Array
			@Read.each do |list|
				step2_ergodicTempl(list,@check[0])
				tempStr = ""
				if list['path']!=nil
					tempStr = list['path']
				end
				@Deal << {"fileName"=>list['fileName'],"text"=>list['document'],"pathAdd"=>tempStr}
			end
		elsif @Read.class == Hash
			step2_ergodicTempl(@Read,@check[0])
			tempStr = ""
			if @Read['path']!=nil
				tempStr = @Read['path']
			end
			@Deal << {"fileName"=>@Read['fileName'],"text"=>@Read['document'],"pathAdd"=>tempStr}
		end
	end
	
	def step3()
		@Deal.each do |list|
			@ObjThink.start({"action" => "WriteCreateFile","path"=>@outPutPath+list["pathAdd"] })
			tmpStr = @outPutPath+list["pathAdd"]+"/"+list['fileName']
			@ObjThink.start({"action" => "WriteFile","path" =>tmpStr,"text"=>list["text"]})
		end
		
	end
	
	def start()
		puts 'Step 1: Read textBook.'
		step1()
		puts 'Step 2: create code.'
		step2()
		puts 'Step 3: Write code.'
		step3()
		puts 'success!'
	end
end
