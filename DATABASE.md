## Arkana Database Documentation

### User Table

```sql
create table Usuario(
	RaUsuario int primary key,
	NomeUsuario varchar(250) not null,
	EmailUsuario varchar(250) not null,
	SenhaUsuario varchar(16) not null,
	TelefoneUsuario varchar(250) not null,
  Turma varchar(20) not null
);
```

Prisma Table

```
model Usuario {
  RaUsuario                  Int                          @id
  NomeUsuario                String                       @db.VarChar(250)
  EmailUsuario               String                       @db.VarChar(250)
  SenhaUsuario               String                       @db.VarChar(255)
  TurmaUsuario               String                       @db.VarChar(20)
  TelefoneUsuario            String?                      @db.VarChar(20)

  // Relações
  time_usuarios              Time_Usuario[]
  contribuicoes_financeiras  Contribuicao_Financeira[]
  contribuicoes_alimenticias Contribuicao_Alimenticia[]
}
```

<br/>

### Mentor Table

```sql
create table Mentor(
	IdMentor int primary key auto_increment,
	EmailMentor varchar(250) not null,
	IsAdmin boolean not null,
	SenhaMentor varchar(16) not null
);
```

Prisma Table

```
model Mentor {
  IdMentor    Int      @id @default(autoincrement())
  EmailMentor String  @unique @db.VarChar(250)
  IsAdmin     Boolean?
  SenhaMentor String   @db.VarChar(80)
  times       Time[]   // Relação com Time
}
```

<br/>

### Team Table

```sql
create table Time(
	IdTime int primary key auto_increment,
  NomeTime varchar(250) not null,
  IdMentor int,
  foreign key(IdMentor) references mentor(IdMentor),
);
```

Prisma Table

```
model Time {
  IdTime        Int             @id @default(autoincrement())
  NomeTime      String          @db.VarChar(250)
  IdMentor      Int?
  mentor        Mentor?         @relation(fields: [IdMentor], references: [IdMentor])
  time_usuarios Time_Usuario[]  // Relação com Time_Usuario

  @@index([IdMentor], map: "IdMentor")
}
```

<br/>

### Team-User Table

```sql
model Time_Usuario {
  IdTimeUsuario int,
  IdTime int not null,
  RaUsuario int not null,
  RaAluno2 int not null,
  RaAluno3 int not null,
  RaAluno4 int not null,
  RaAluno5 int not null,
  RaAluno6 int not null,
  RaAluno7 int not null,
  RaAluno8 int not null,
  RaAluno9 int not null,
  RaAluno10 int not null,
  foreign key(RaUsuario) references usuario(RaUsuario),
  foreign key(IdTime) references time(IdTime)
}
```

Prisma Table

```
model Time_Usuario {
  IdTimeUsuario Int      @id @default(autoincrement())
  IdTime        Int?
  RaUsuario     Int?
  RaAluno2      Int
  RaAluno3      Int
  RaAluno4      Int
  RaAluno5      Int
  RaAluno6      Int
  RaAluno7      Int
  RaAluno8      Int
  RaAluno9      Int?
  RaAluno10     Int?

  // Relações
  time          Time?    @relation(fields: [IdTime], references: [IdTime])
  usuario       Usuario? @relation(fields: [RaUsuario], references: [RaUsuario])

  @@index([IdTime], map: "IdTime")
  @@index([RaUsuario], map: "RaUsuario")
}
```

<br/>

### Financial Contribution Table

```sql
create table Contribuicao_Financeira(
  TipoDoacao varchar(100)not null,
	RaUsuario int not null,
	Quantidade decimal(10,2) not null,
	Meta decimal(10,2),
	Gastos decimal(10,2),
	Fonte varchar(200) not null,
	IdComprovante int,
	IdContribuicaoFinanceira int primary key auto_increment,
	DataContribuicao timestamp default current_timestamp,
	foreign key (RaUsuario) references usuario(RaUsuario)
	foreign key (IdComprovante) references comprovante(IdComprovante)
);
```

Prisma Table

```
model Contribuicao_Financeira {
  IdContribuicaoFinanceira Int       @id @default(autoincrement())
  DataContribuicao         DateTime? @default(now()) @db.Timestamp(0)
  Quantidade               Decimal   @db.Decimal(10, 2)
  TipoDoacao               String    @db.VarChar(20)
  Gastos                   Decimal   @db.Decimal(10, 2)
  Meta                     Decimal?  @db.Decimal(10, 2)
  Fonte                    String?   @db.VarChar(200)
  IdComprovante            Int? @unique
  RaUsuario                Int?

  usuario                  Usuario?  @relation(fields: [RaUsuario], references: [RaUsuario])
  comprovante              Comprovante? @relation(fields: [IdComprovante], references: [IdComprovante])
  @@index([IdComprovante], map:"IdComprovante")
  @@index([RaUsuario], map: "RaUsuario")
}
```

<br/>

### Receipts Table

```sql
create table Comprovante (
	IdComprovante int primary key auto_increment,
	Imagem varchar(255) not null
);
```

Prisma Table

```
model Comprovante{
  IdComprovante Int @id @default(autoincrement())
  Imagem String @db.VarChar(255)

  contribuicao_financeira   Contribuicao_Financeira?
}
```

<br/>

### Food Contributions Table

```sql
create table Contribuicao_Alimenticia(
  TipoDoacao varchar(100) not null;
	RaUsuario int not null,
	Quantidade decimal(10,2) not null,
  PesoUnidade float not null,
	Meta decimal(10,2),
	Gastos decimal(10,2),
	Fonte varchar(200) not null,
	Comprovante varchar(200),
	IdContribuicaoAlimenticia int primary key auto_increment,
  IdAlimento int not null,
	DataContribuicao timestamp default current_timestamp,
	foreign key (RaUsuario) references usuario(RaUsuario),
  foreign key (IdAlimento) references alimento(IdAlimento)
);
```

Prisma Table

```
model Contribuicao_Alimenticia {
  IdContribuicaoAlimenticia Int       @id @default(autoincrement())
  DataContribuicao          DateTime? @default(now()) @db.Timestamp(0)
  TipoDoacao                String    @db.VarChar(20)
  Quantidade                Decimal   @db.Decimal(10, 2)
  PesoUnidade               Float
  Gastos                    Decimal   @db.Decimal(10, 2)
  Meta                      Decimal?  @db.Decimal(10, 2)
  Fonte                     String?   @db.VarChar(200)
  Comprovante               String?   @db.VarChar(200)
  RaUsuario                 Int?
  IdAlimento                Int?

  usuario                   Usuario?  @relation(fields: [RaUsuario], references: [RaUsuario])
  alimento                  Alimento? @relation(fields: [IdAlimento], references: [IdAlimento])
  contribuicoes_alimento    Contribuicao_Alimento[]

  @@index([IdAlimento], map: "IdAlimento")
  @@index([RaUsuario], map: "RaUsuario")
}
```

<br/>

### Food Table

```sql
CREATE TABLE Alimento {
  IdAlimento int primary key,
  NomeAlimento varchar(100) not null,
  Pontuacao int not null,
}
```

Prisma Table

```
model Alimento {
  IdAlimento                 Int                        @id @default(autoincrement())
  NomeAlimento               String                     @db.VarChar(100)
  Pontuacao                  Int

  contribuicoes_alimenticias Contribuicao_Alimenticia[]
  contribuicoes_alimento     Contribuicao_Alimento[]
}
```

<br/>

### Contribution-Food Table

```sql
CREATE TABLE Contribuicao_Alimento(
  IdContribuicaoAlimento int primary key auto_increment,
  IdAlimento int not null;
  IdContribuicaoAlimenticia int not null;
  foreign key (IdAlimento) references alimento(IdAlimento),
  foreign key (IdContribuicaoAlimenticia) references contribuicao_alimenticia(IdContribuicaoAlimenticia)
);
```

Prisma Table

```
model Contribuicao_Alimento {
  IdContribuicaoAlimento    Int                       @id @default(autoincrement())
  IdAlimento                Int?
  IdContribuicaoAlimenticia Int?

  alimento                  Alimento?                 @relation(fields: [IdAlimento], references: [IdAlimento])
  contribuicao_alimenticia  Contribuicao_Alimenticia? @relation(fields: [IdContribuicaoAlimenticia], references: [IdContribuicaoAlimenticia])

  @@index([IdAlimento], map: "IdAlimento")
  @@index([IdContribuicaoAlimenticia], map: "IdContribuicaoAlimenticia")
}
```
