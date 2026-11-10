# Máquina do tempo computacional — GP05

Hackathon Acadêmico · Arquitetura e Organização de Computadores · Edital Didático 01/2026

> **Para a equipe completar:** os trechos marcados com `[COMPLETAR]` dependem de informações que só vocês têm (nomes, contribuições, uso de IA anterior).

## 1. Desafio e solução

**Desafio (Anexo I, GP05):** mostrar como a arquitetura e os componentes dos computadores evoluíram ao longo das gerações.

**Solução:** uma linha do tempo digital interativa, feita em uma única página web (`index.html`, HTML + CSS + JavaScript puro, sem dependências). Ela tem dois modos:

- **Explorar:** linha do tempo com as cinco gerações. Ao clicar num marcador, ou nos botões "Geração anterior / Próxima geração", aparece uma ficha com sete características da geração escolhida.
- **Comparar:** o usuário escolhe duas gerações e vê uma tabela lado a lado com as mesmas características.

Cada informação traz uma etiqueta **Dado histórico** (registrado em fontes) ou **Estimativa** (ordem de grandeza ou convenção de livro), como pede o edital.

### Atendimento às evidências mínimas do GP05

| Evidência exigida | Onde está |
|---|---|
| Protótipo funcional | `index.html` (abrir no navegador) |
| Fontes históricas | Seção "Fontes" no rodapé da página e item 4 deste relatório |
| Comparações técnicas | Aba **Comparar** e as fichas da aba **Explorar** |
| Distinção entre dado histórico e estimativa | Etiquetas em todos os campos (verificado no teste T4) |
| Testes de navegação ou consulta | `testes.js`, executado em `index.html#testes` (item 5) |

## 2. Como executar

1. Abra `index.html` em qualquer navegador moderno. Funciona sem internet e sem servidor.
2. Para rodar os testes, abra `index.html#testes`. O painel com os resultados aparece no topo da página.
   - Com o XAMPP ligado: `http://localhost/maquinadotempocomputacional/index.html#testes`
   - Ou com Python: `python -m http.server 8765` na pasta do projeto e depois `http://localhost:8765/index.html#testes`
   - Ao abrir pelo `file://`, escreva `#testes` no fim do endereço e recarregue a página.

Repositório: https://github.com/gabiandrade008/maquinadotempocomputacional

## 3. Funcionamento (fluxo)

```
Dados (vetor G: 5 gerações × 7 características, cada uma com etiqueta h/e)
        │
        ├─► buildTrack()  monta os marcadores da linha do tempo
        │                 (posição proporcional ao ano em telas largas,
        │                  espaçamento igual em telas menores que 820px)
        │
        ├─► Clique em marcador / botão ─► go(i) ─► limita i entre 0 e 4 ─► render()
        │                                                   └─ atualiza ficha, marcador ativo e botões
        │
        └─► Aba Comparar ─► troca dos seletores A/B ─► cmp() ─► monta a tabela comparativa
```

As características comparadas são: componente principal, velocidade, memória, armazenamento, porte, programação e período.

## 4. Fundamentação e fontes

| Geração | Tecnologia | Exemplo | Dados de destaque |
|---|---|---|---|
| 1ª (1940–1956) | Válvulas a vácuo | ENIAC (1946) | cerca de 17 mil válvulas, 5.000 somas/s, 30 t, 150 kW |
| 2ª (1956–1963) | Transistores | IBM 7090 (1959) | memória de núcleos com 32 mil palavras de 36 bits; FORTRAN (1957), COBOL (1959) |
| 3ª (1964–1971) | Circuitos integrados | IBM System/360 (1964) | família de máquinas compatíveis, multiprogramação |
| 4ª (1971–anos 1990) | Microprocessadores | Intel 4004 (1971) | 2.300 transistores, 4 bits, 740 kHz |
| 5ª (1980 em diante) | Paralelismo massivo e IA | Apple M1 (2020) | cerca de 16 bilhões de transistores; supercomputadores acima de 1 exaflop |

As datas de início e fim das gerações são **convenção** e variam entre autores. Por isso o campo "Período" está marcado como estimativa em todas as gerações.

**Fontes:**
- Computer History Museum — computerhistory.org (ENIAC, UNIVAC I, IBM 7090, IBM System/360, Intel 4004)
- STALLINGS, W. *Arquitetura e organização de computadores*.
- TANENBAUM, A. S. *Organização estruturada de computadores*.

## 5. Testes e evidências

Os testes ficam em `testes.js`. Eles agem na interface como um usuário faria (clicam em botões e marcadores, trocam os seletores) e conferem o resultado na tela.

| # | Cenário | O que é verificado |
|---|---|---|
| T1 | Navegação sequencial | Começa na 1ª geração com "anterior" desativado; 4 cliques em "próxima" levam à 5ª e desativam o botão; "anterior" volta à 4ª |
| T2 | Navegação direta pela linha do tempo | Clicar no 3º marcador abre "3ª geração: Circuitos integrados" com o exemplo IBM System/360, e só esse marcador fica ativo |
| T3 | Consulta comparativa | Comparar a 2ª com a 4ª mostra os dois nomes no cabeçalho, contrasta "Transistores discretos" com "Processador em um único chip" e traz 8 linhas |
| T4 | Dado histórico × estimativa | Nas 5 gerações, cada uma das 7 características tem exatamente uma etiqueta, e ela bate com a classificação dos dados |
| T5 | Entradas inválidas / limites | Índices -5 e 99 são limitados à 1ª e à 5ª geração; comparar uma geração com ela mesma não quebra a tabela |
| T6 | Layout responsivo | Nenhuma das abas tem rolagem horizontal e os marcadores da linha do tempo não se sobrepõem |

**Resultado registrado em 10/11/2026 (Chromium):**

| Largura da tela | T1 | T2 | T3 | T4 | T5 | T6 |
|---|---|---|---|---|---|---|
| 375 px (celular) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 634 px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

`[COMPLETAR]` Rodem os testes de novo antes da defesa e guardem uma captura de tela do painel "Testes: 6 de 6 passaram". O edital diz que uma falha no dia não dispensa as evidências feitas antes.

## 6. Uso de inteligência artificial

O edital exige que o apoio de IA seja identificado.

- **Claude (Anthropic), via Claude Code**, em 10/11/2026: correção da responsividade (linha do tempo com espaçamento igual em telas pequenas, tabela de comparação empilhada no celular, ajuste dos seletores e espaçamentos), criação dos testes automatizados `testes.js` e rascunho deste relatório.
- `[COMPLETAR]` Informem se foi usada IA na criação da primeira versão de `index.html` (conteúdo, dados ou código) e qual ferramenta.

Todo o conteúdo foi revisado pela equipe, e todos os integrantes devem saber explicar o código e os dados na defesa.

## 7. Anexo II — Integrantes e contribuições

| Integrante | Matrícula | Contribuição |
|---|---|---|
| `[COMPLETAR]` | | |
| `[COMPLETAR]` | | |
| `[COMPLETAR]` | | |
| `[COMPLETAR]` | | |
