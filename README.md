# 🤝 Doa Aqui — Mural de Doações Solidárias

Projeto de extensão universitária desenvolvido para o curso de **Análise e Desenvolvimento de Sistemas**, na disciplina **Extensão Universitária III**.

O **Doa Aqui** é uma plataforma web que conecta pessoas que querem doar itens (roupas, móveis, alimentos, eletrônicos, livros e brinquedos) com pessoas da comunidade que precisam desses itens — de forma simples, direta e sem burocracia.

> Protótipo de demonstração, desenvolvido como exercício acadêmico com potencial de gerar impacto social real na comunidade atendida pela equipe.

---

## 📌 Sobre o projeto

Muitas vezes existem, dentro da própria comunidade, itens em bom estado que deixaram de ser úteis para quem os possui — e do outro lado, pessoas que poderiam se beneficiar deles. O Doa Aqui nasce para reduzir esse desencontro, aproximando doador e interessado com o mínimo de atrito possível.

O sistema é dividido em duas áreas:

- **Área Pública** — qualquer pessoa pode navegar pelo mural de doações, filtrar itens por categoria, localização e status, e entrar em contato direto com o doador via WhatsApp.
- **Área Administrativa** — responsável pela moderação dos anúncios (aprovação, rejeição, edição e remoção) e pelo acompanhamento de métricas sociais do projeto.

---

## ✨ Funcionalidades

### Área pública
- 🧵 Mural com listagem de itens disponíveis para doação
- 🔎 Busca e filtros por categoria, localização (bairro) e status
- 📸 Cadastro de item com título, categoria, descrição, bairro e foto
- 💬 Contato direto com o doador via WhatsApp
- 🟢 Status visível do item: **Disponível**, **Reservado** ou **Doado**

### Área administrativa
- ✅ Aprovação, rejeição, edição ou remoção de anúncios
- 🔄 Alteração de status de qualquer item
- 📊 Métricas sociais: total de doações, itens já doados, categorias mais doadas

---

## 🧱 Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Front-end | HTML5, CSS3, JavaScript |
| Back-end (planejado) | PHP |
| Banco de dados | MySQL |
| Modelagem do banco | [dbdiagram.io](https://dbdiagram.io) (DBML) |

> O protótipo atual (`index.html` / `admin.html`) roda inteiramente no navegador, sem envio de dados a um servidor — é uma demonstração de interface e fluxo, servindo de base para a implementação completa com back-end e banco de dados.

---

## 🗄️ Modelagem do banco de dados

O banco foi modelado em **DBML** e é composto por 7 tabelas principais:

| Tabela | Responsabilidade |
|---|---|
| `usuario` | Cadastro de doadores, interessados e administradores |
| `categoria` | Categorias de itens (Roupas, Móveis, Alimentos, Eletrônicos, Livros, Brinquedos) |
| `bairro` | Localizações usadas no filtro de busca |
| `item` | Anúncios de doação publicados |
| `item_foto` | Fotos de cada item (preparado para múltiplas imagens no futuro) |
| `moderacao` | Auditoria das ações do administrador sobre os anúncios |
| `historico_status` | Histórico de mudanças de status de cada item |

Principais decisões de modelagem:
- Uso de **ENUMs** para campos de valores fixos (`status`, `tipo`, `acao`), garantindo integridade no banco
- **Soft delete** em `item` (`removido_em`), preservando o histórico mesmo após remoção pelo admin
- Índices nos campos usados em filtros (`status`, `id_categoria`, `id_bairro`) para manter buscas rápidas
- Métricas sociais (RF10) calculadas via consultas SQL agregadas, sem tabela dedicada

Os arquivos de modelagem estão disponíveis em [`/database`](./database):
- `doaaqui.dbml` — código-fonte do modelo, pronto para importar no dbdiagram.io
- `doaaqui_schema.sql` — script de criação do banco (MySQL 8+), com dados de exemplo

---

## 📋 Requisitos do sistema

O levantamento completo de requisitos funcionais e não funcionais está documentado em [`/docs/Documento_de_Requisitos_DoaAqui.docx`](./docs).

**Principais requisitos funcionais:**
- RF01 — Cadastrar item para doação com foto, descrição e categoria
- RF02/RF03 — Buscar e filtrar itens por categoria e localização
- RF04/RF05 — Exibir e atualizar o status do item
- RF06 — Contato direto entre doador e interessado
- RF07/RF08/RF09 — Moderação e gestão de anúncios pelo administrador
- RF10 — Geração de métricas sobre as doações realizadas

---

## 🚀 Como executar o protótipo

Como o front-end atual não depende de back-end, basta abrir os arquivos localmente:

```bash
git clone https://github.com/seu-usuario/doa-aqui.git
cd doa-aqui
```

Depois, abra o arquivo `index.html` diretamente no navegador (ou use uma extensão como *Live Server* no VS Code).

Para montar o banco de dados:

```bash
mysql -u root -p < database/doaaqui_schema.sql
```

---

## 👥 Equipe

| Nome |
|---|
| André de Castro |
| Arthur Belinato |
| Cloviano Albuini |
| Jhames Paiva |

**Disciplina:** Extensão Universitária III
**Curso:** Análise e Desenvolvimento de Sistemas
**Professor orientador:** Aldecir de Almeida Fonseca

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da disciplina de Extensão Universitária III. Sinta-se livre para estudar, adaptar e reutilizar o código para fins educacionais.
