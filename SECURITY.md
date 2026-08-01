# Política de segurança

## Relato responsável

Não publique em uma issue detalhes de vulnerabilidades, credenciais expostas, caminhos privados ou dados pessoais. Use o recurso privado **Report a vulnerability** da aba Security do GitHub, quando habilitado, ou contate os mantenedores por um canal privado indicado no perfil do repositório.

Inclua somente as informações necessárias para reproduzir o problema. Remova tokens, cookies, dados pessoais e conteúdo de arquivos locais antes de anexar evidências.

## Escopo

São considerados problemas de segurança deste projeto:

- credenciais, chaves, tokens ou cookies versionados;
- caminhos locais que revelem usuários ou estrutura privada da máquina;
- dados pessoais não públicos incluídos nas matrizes ou relatórios;
- execução insegura no motor de cálculo;
- dependência ou instrução que permita execução de código não confiável.

Erros de classificação de cidades ou fontes desatualizadas devem ser relatados como problemas de dados, não como vulnerabilidades.

## Práticas para contribuidores

- nunca envie arquivos `.env`, chaves privadas ou registros de execução de agentes;
- use dados sintéticos em exemplos e testes;
- confira URLs para remover parâmetros de sessão, tokens e assinaturas;
- execute uma varredura de segredos antes de cada publicação;
- preserve os marcadores de procedência e explicite qualquer falha de verificação.
