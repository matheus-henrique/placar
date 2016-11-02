from django.shortcuts import render
import json
from django.http import HttpResponse
# Create your views here.
def home(request):
	 return render(request,"index.html",{})

def receberDados(request):
	dados = request.body
	dados =  dados.decode("utf-8") 
	dados = json.loads(dados)
	print(dados)
	arq = open('core/static/placar.txt',"w")
	for i in dados['dados']:
		if('descricao' in i):
			arq.write(i['hora_inicio']+';'+i['datainicio']+';'+i['cronometro']+';'+i['hora']+';'+i['time']+';'+i['descricao']+';')
			arq.write("\n")
		else:
			arq.write(i['hora_inicio']+';'+i['datainicio']+';'+i['cronometro']+';'+i['hora']+';'+i['time']+';'+''+';')
			arq.write("\n")
	return HttpResponse("Done")

