// Testes de navegação e consulta da Máquina do tempo computacional.
// Abra index.html#testes para executar; o resultado aparece no topo da página.
(function(){
var res=[];
function $(i){return document.getElementById(i)}
function titulo(){return $("card").querySelector("h2").textContent}
function marcados(){return [].filter.call(document.querySelectorAll(".mk"),function(b){return b.getAttribute("aria-pressed")==="true"}).map(function(b){return +b.dataset.i})}
function teste(nome,fn){
  var falhas=[];
  function ok(cond,msg){if(!cond)falhas.push(msg)}
  try{fn(ok)}catch(e){falhas.push("erro: "+e.message)}
  res.push({nome:nome,ok:falhas.length===0,falhas:falhas});
}
function inicio(){$("t1").click();go(0)}

teste("T1. Navegação sequencial pelos botões",function(ok){
  inicio();
  ok(titulo()==="1ª geração: Válvulas a vácuo","começa na 1ª geração");
  ok($("prev").disabled,"'Geração anterior' desativado na 1ª");
  for(var i=0;i<4;i++)$("next").click();
  ok(titulo()==="5ª geração: Chips massivamente paralelos e IA","chega à 5ª após 4 avanços");
  ok($("next").disabled,"'Próxima geração' desativado na 5ª");
  $("prev").click();
  ok(titulo().indexOf("4ª geração")===0,"volta para a 4ª");
});

teste("T2. Navegação direta pela linha do tempo",function(ok){
  inicio();
  document.querySelector('.mk[data-i="2"]').click();
  ok(titulo()==="3ª geração: Circuitos integrados","abre a 3ª geração");
  ok(/IBM System\/360/.test($("card").textContent),"mostra o exemplo IBM System/360");
  ok(marcados().join()==="2","só o marcador da 3ª fica selecionado");
});

teste("T3. Consulta comparativa entre duas gerações",function(ok){
  $("t2").click();
  ok(!$("compare").hidden&&$("explore").hidden,"aba Comparar visível");
  $("selA").value="1";$("selA").dispatchEvent(new Event("change"));
  $("selB").value="3";$("selB").dispatchEvent(new Event("change"));
  var cab=$("tbl").querySelectorAll("thead th");
  ok(cab[1].textContent==="2ª geração"&&cab[2].textContent==="4ª geração","cabeçalho mostra 2ª e 4ª");
  var linha=$("tbl").querySelectorAll("tbody tr")[1].textContent;
  ok(/Transistores discretos/.test(linha)&&/Processador em um único chip/.test(linha),"linha 'Componente principal' compara transistor e microprocessador");
  ok($("tbl").querySelectorAll("tbody tr").length===L.length+1,"uma linha por característica, mais o exemplo");
});

teste("T4. Distinção entre dado histórico e estimativa",function(ok){
  $("t1").click();
  G.forEach(function(g,i){
    go(i);
    var dds=$("card").querySelectorAll("dd");
    ok(dds.length===L.length,g.n+": "+L.length+" características");
    [].forEach.call(dds,function(dd,k){
      var t=dd.querySelectorAll(".tag");
      var esperado=g.f[k][1]==="h"?"Dado histórico":"Estimativa";
      ok(t.length===1&&t[0].textContent===esperado,g.n+" / "+L[k]+": etiqueta '"+esperado+"'");
    });
  });
});

teste("T5. Entradas fora do limite e consulta repetida",function(ok){
  inicio();
  go(-5);ok(titulo().indexOf("1ª geração")===0,"índice negativo fica na 1ª");
  go(99);ok(titulo().indexOf("5ª geração")===0,"índice acima do máximo fica na 5ª");
  $("t2").click();
  $("selA").value="2";$("selA").dispatchEvent(new Event("change"));
  $("selB").value="2";$("selB").dispatchEvent(new Event("change"));
  var cab=$("tbl").querySelectorAll("thead th");
  ok(cab[1].textContent==="3ª geração"&&cab[2].textContent==="3ª geração","comparar a mesma geração não quebra a tabela");
});

teste("T6. Layout sem rolagem horizontal ("+innerWidth+"px)",function(ok){
  ["t1","t2"].forEach(function(t){
    $(t).click();
    ok(document.documentElement.scrollWidth<=innerWidth,"aba "+$(t).textContent+" cabe na largura");
  });
  $("t1").click();
  var r=[].map.call(document.querySelectorAll(".mk"),function(b){return b.getBoundingClientRect()});
  ok(r.slice(1).every(function(x,i){return x.left>=r[i].right-1}),"marcadores da linha do tempo não se sobrepõem");
});

// Volta ao estado inicial e mostra o relatório
inicio();
$("selA").value="0";$("selB").value=String(G.length-1);cmp();
var passou=res.filter(function(r){return r.ok}).length;
var box=document.createElement("section");
box.id="resultado-testes";
box.style.cssText="background:var(--surface);border:2px solid "+(passou===res.length?"var(--hist)":"#c0392b")+";border-radius:12px;padding:14px 16px;margin:0 0 20px;font-size:14px";
box.innerHTML="<b>Testes: "+passou+" de "+res.length+" passaram</b> <span style='color:var(--muted)'>("+new Date().toLocaleString("pt-BR")+")</span><ul style='margin:8px 0 0;padding-left:20px'>"+
  res.map(function(r){return "<li>"+(r.ok?"✅ ":"❌ ")+r.nome+(r.ok?"":"<ul><li>"+r.falhas.join("</li><li>")+"</li></ul>")+"</li>"}).join("")+"</ul>";
document.querySelector("main").insertBefore(box,document.querySelector("main").firstChild);
window.resultadoTestes=res;
})();
