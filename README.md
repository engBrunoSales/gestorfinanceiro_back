# Gestor financeiro

## Orientações

O desenvolvedor deve seguir os passos a seguir para a codificação no projeto. É de suma importância que todos os desenvovedores sigam as orientações contidas para um desenvolvimento fluído e organização do projeto.

## Etapas no desenvovimento
1. Criar uma Issue no GitHub
1. Criar uma branch em seu repositório local com o mesmo número de identificação da **issue** criada anteriormente. Segue o exemplo:
>> git checkout -b #1
3. Realizar a codificação na branch criada.
1. Após a codificação, criação e execução dos testes. Realizar o commit das alterações finalizando a **issue** criada no github. Essa finalização pode ser realizada através de referências especificas na mensagem do commit. Segue exemplo:
>> git commit -m "Criada migration: User - closed issue #1"
5. Após o commit das alterações na branch criada, deverá realizar o checkout na branch master:
>> git checkout master
6. Deverá trazer todas as alterações do servidor remoto para a sua máquina:
>> git pull origin master
7. Realizar o merge das alterações entre as branchs
>> git merge #1
8. Tratar todos os possíveis merges gerados.
1. Executar o teste em sua máquina local antes de subir as alterações para o servidor.
>> npm test
10. Pronto! Agora suas alterações estão prontas para subirem ao servidor remoto.
>> git push origin master

## **Observação:** Siga todas as etapas de desenvolvimento do projeto descritas acima. Caso chegue na última parte do desenvolvimento descrita na etapa: 9 e der falha nos testes, não suba as alterações. Siga do inicio criando uma issue no Github descrevendo o erro ocorrido e comece tudo novamente.
