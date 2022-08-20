# read data 
file = open('/Applications/MAMP/htdocs/1_adaptLearn_test/data/test_exp1.txt', 'r')
content = str(file.readlines())
corr_resp=str(content.count("true"))

fileOut = open('/Applications/MAMP/htdocs/1_adaptLearn_test/data/test_exp1_corrResp.txt', 'w')
fileOut.write('correct responses = ' + corr_resp)
fileOut.close