<h1 align="center">Fundação de Comércio Álvares Penteado</h1>

<div align="center">
<a href= "https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" border="0"></a>

<h1>Nome do Projeto: Arkana 📑</h1>
<p>Acesse o app: <a href="https://arkana-projeto1.vercel.app">https://arkana-projeto1.vercel.app</a></p>
</div>
<br/>

## Integrantes do Grupo
[Analice Coimbra Carneiro](https://github.com/AnaliceCoimbra/)  
[Mariah Alice Pimentel Lôbo Pereira](https://github.com/alicelobwp)  
[Sofia Botechia Hernandes](https://github.com/sofiahernandes)  
[Victória Duarte Vieira Azevedo](https://github.com/viick04)  

## Professores Orientadores
[Cristina Machado Correa Leite](https://www.linkedin.com/)  
[David De Oliveira Lemes](https://www.linkedin.com/in/dolemes/)  
[Francisco de Souza Escobar](https://www.linkedin.com/)  
[Leonardo Fabris Lugoboni](https://www.linkedin.com/)  
[Katia Milani Lara Bossi](https://www.linkedin.com/)  
<br/>

# Entregas
- [Banner Apresentação](https://github.com/2025-2-MCC2/Projeto1/blob/main/entregas/Banner_FECAP_CCOMP2MA_Arkana.md)
- [DERS - Documento Especificação de Requisitos](https://github.com/2025-2-MCC2/Projeto1/blob/main/entregas/DERS.md)

| Disciplina | Entrega 1 | Entrega 2 |  
| :-------: | :------: | :-------: |
| web dev fullstack | - | [https://arkana-projeto1.vercel.app/](https://arkana-projeto1.vercel.app/) |   
| calculo II | [/entregas/entrega-1/calculo-2/](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-1/calculo-2) | [/entregas/entrega-2/calculo-2/](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-2/calculo-2) |    
| banco de dados | [/entregas/entrega-1/banco-de-dados/](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-1/banco-de-dados) | [/entregas/entrega-2/banco-de-dados/](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-2/banco-de-dados) |  
| gestao empresarial | [/entregas/entrega-1/gestao-empresarial/](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-1/gestao-empresarial) | [/entregas/entrega-2/gestao-empresarial/](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-2/gestao-empresarial) |  
| projeto interdisciplinar | [/entregas/entrega-1/proj-interdisciplinar/](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-1/proj-interdisciplinar) | [Projeto de Extensão](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-2/proj-interdisciplinar) |   
<br/>

# Descrição
## 🤝 Proposta Principal
Desenvolvimento de uma Aplicação Web para o [Projeto Lideranças Empáticas](https://liderancasempaticas.com/), uma iniciativa do Centro Universitário FECAP que une impacto social e educação empreendedora através da arrecadação de alimentos e recursos financeiros. Essa aplicação objetiva gerenciar as edições deste projeto, incluindo controle de equipes, atividades, metas e resultados.

**Features:**  
- Cadastro e gerenciamento de edições e participantes;
- Observação de relatórios e sua filtragem por time, edição, etc.;
- Criação de equipes por partes autorizadas;
- Registro de atividades por equipe;
- Geração de relatórios.
<br/>

## 🎨 Design Gráfico
Procuramos desenvolver uma interface que traga a identidade visual do Projeto Lideranças Empáticas mas com o toque especial do grupo Arkana! Nossa interface preza o minimalismo sem perder a personalidade e a riqueza gráfica.
<br/><br/>

## 🎥 Trailer do Projeto
<div align="center">
    <a href="https://www.youtube.com/watch?v=OoxkFQGJF7c">
    <img width="1000" alt="Screenshot Aplicação Arkana" src="https://github.com/user-attachments/assets/8257ef05-086a-4f79-a3fe-3158a136262e" />
    </a>
    Amostra do funcionamento da aplicação localmente com Postman (clique aqui ↑)
</div>
<br/><br/>


## 🗂 Estrutura de Pastas
```
|-->backend
    |-->prisma
    |-->src
       |-->controllers
       |-->configs
       |-->middlewares
       |-->services
       |-->uploads
       |app.js
       |db.js
       |routes.js
       |server.js
|-->frontend
    |-->app  
    |-->components  
    |-->hooks  
    |-->lib  
    |-->styles  
|-->entregas
    |-->entrega-1  
       |-->calculo-2  
       |-->banco-de-dados  
       |-->gestao-empresarial
       |-->proj-interdisciplinar
    |-->entrega-2  
       |-->calculo-2  
       |-->banco-de-dados  
       |-->gestao-empresarial
       |-->proj-interdisciplinar
|README.md  
|LICENSE  
```
<br/>

## 🚀 Instalação Local
### Pré-requisitos
- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/lang/en/) ou `npm`
<br/>

1. Clone o Repositório e se direcione à pasta
```
git clone https://github.com/2025-2-MCC2/Projeto1.git  
cd Projeto1
```

2. Instale as Dependências
```
npm install
# ou
yarn install
```

3. Rode o banco de dados SQL (disponível no arquivo [/entregas/entrega-1/banco-de-dados/arkana-database.sql](https://github.com/2025-2-MCC2/Projeto1/tree/main/entregas/entrega-1/banco-de-dados) localmente no Workbench ou interface sa sua preferência. Popule o .env do /backend com as variáveis do seu ambiente.  


4. Entre nas pastas /frontend e /backend e rode o seguinte comando em cada uma delas  
```
npm run dev
# ou
yarn run dev
```

<br/>

## 📋 Licença
<a href="https://www.fecap.br/">FECAP - Fundação de Comércio Álvares Penteado</a> - <a href="https://github.com/2025-1-MCC1/Projeto7">Arkana</a> © 2025 by <a href="https://github.com/analicecoimbra">Analice Coimbra Carneiro</a>, <a href="https://github.com/alicelobwp">Mariah Alice Pimentel Lôbo Pereira</a>, <a href="https://github.com/sofiahernandes">Sofia Botechia Hernandes</a> and <a href="https://github.com/viick04">Victória Duarte Vieira Azevedo</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" height="20" width="20" style="margin-left: 0.2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" height="20" width="20" style="margin-left: 0.2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" height="20" width="20" style="margin-left: 0.2em;">
<br/><br/>

## 🎓 Referências
[Creative Commons](https://creativecommons.org/share-your-work/)  
[Template PI FECAP](https://github.com/fecaphub/Template_PI)  
