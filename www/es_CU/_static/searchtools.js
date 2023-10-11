/*
 * searchtools.js_t (custom)
 * ~~~~~~~~~~~~~~~~
 *
 * Sphinx JavaScript utilities for the full-text search.
 *
 * :copyright: Copyright 2007-2018 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */


/* Non-minified version JS is _stemmer.js if file is provided */ BaseStemmer=function(){this.setCurrent=function(r){this.current=r;this.cursor=0;this.limit=this.current.length;this.limit_backward=0;this.bra=this.cursor;this.ket=this.limit};this.getCurrent=function(){return this.current};this.copy_from=function(r){this.current=r.current;this.cursor=r.cursor;this.limit=r.limit;this.limit_backward=r.limit_backward;this.bra=r.bra;this.ket=r.ket};this.in_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor++;return true};this.in_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor--;return true};this.out_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t){this.cursor++;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor++;return true}return false};this.out_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t){this.cursor--;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor--;return true}return false};this.eq_s=function(r){if(this.limit-this.cursor<r.length)return false;if(this.current.slice(this.cursor,this.cursor+r.length)!=r){return false}this.cursor+=r.length;return true};this.eq_s_b=function(r){if(this.cursor-this.limit_backward<r.length)return false;if(this.current.slice(this.cursor-r.length,this.cursor)!=r){return false}this.cursor-=r.length;return true};this.find_among=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=f;o<l[0].length;o++){if(s+f==e){a=-1;break}a=this.current.charCodeAt(s+f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s+l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s+l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.find_among_b=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit_backward;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=l[0].length-1-f;o>=0;o--){if(s-f==e){a=-1;break}a=this.current.charCodeAt(s-1-f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s-l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s-l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.replace_s=function(r,t,i){var s=i.length-(t-r);this.current=this.current.slice(0,r)+i+this.current.slice(t);this.limit+=s;if(this.cursor>=t)this.cursor+=s;else if(this.cursor>r)this.cursor=r;return s};this.slice_check=function(){if(this.bra<0||this.bra>this.ket||this.ket>this.limit||this.limit>this.current.length){return false}return true};this.slice_from=function(r){var t=false;if(this.slice_check()){this.replace_s(this.bra,this.ket,r);t=true}return t};this.slice_del=function(){return this.slice_from("")};this.insert=function(r,t,i){var s=this.replace_s(r,t,i);if(r<=this.bra)this.bra+=s;if(r<=this.ket)this.ket+=s};this.slice_to=function(){var r="";if(this.slice_check()){r=this.current.slice(this.bra,this.ket)}return r};this.assign_to=function(){return this.current.slice(0,this.limit)}};
SpanishStemmer=function(){var r=new BaseStemmer;var e=[["",-1,6],["á",0,1],["é",0,2],["í",0,3],["ó",0,4],["ú",0,5]];var i=[["la",-1,-1],["sela",0,-1],["le",-1,-1],["me",-1,-1],["se",-1,-1],["lo",-1,-1],["selo",5,-1],["las",-1,-1],["selas",7,-1],["les",-1,-1],["los",-1,-1],["selos",10,-1],["nos",-1,-1]];var a=[["ando",-1,6],["iendo",-1,6],["yendo",-1,7],["ándo",-1,2],["iéndo",-1,1],["ar",-1,6],["er",-1,6],["ir",-1,6],["ár",-1,3],["ér",-1,4],["ír",-1,5]];var s=[["ic",-1,-1],["ad",-1,-1],["os",-1,-1],["iv",-1,1]];var u=[["able",-1,1],["ible",-1,1],["ante",-1,1]];var o=[["ic",-1,1],["abil",-1,1],["iv",-1,1]];var t=[["ica",-1,1],["ancia",-1,2],["encia",-1,5],["adora",-1,2],["osa",-1,1],["ista",-1,1],["iva",-1,9],["anza",-1,1],["logía",-1,3],["idad",-1,8],["able",-1,1],["ible",-1,1],["ante",-1,2],["mente",-1,7],["amente",13,6],["ación",-1,2],["ución",-1,4],["ico",-1,1],["ismo",-1,1],["oso",-1,1],["amiento",-1,1],["imiento",-1,1],["ivo",-1,9],["ador",-1,2],["icas",-1,1],["ancias",-1,2],["encias",-1,5],["adoras",-1,2],["osas",-1,1],["istas",-1,1],["ivas",-1,9],["anzas",-1,1],["logías",-1,3],["idades",-1,8],["ables",-1,1],["ibles",-1,1],["aciones",-1,2],["uciones",-1,4],["adores",-1,2],["antes",-1,2],["icos",-1,1],["ismos",-1,1],["osos",-1,1],["amientos",-1,1],["imientos",-1,1],["ivos",-1,9]];var c=[["ya",-1,1],["ye",-1,1],["yan",-1,1],["yen",-1,1],["yeron",-1,1],["yendo",-1,1],["yo",-1,1],["yas",-1,1],["yes",-1,1],["yais",-1,1],["yamos",-1,1],["yó",-1,1]];var l=[["aba",-1,2],["ada",-1,2],["ida",-1,2],["ara",-1,2],["iera",-1,2],["ía",-1,2],["aría",5,2],["ería",5,2],["iría",5,2],["ad",-1,2],["ed",-1,2],["id",-1,2],["ase",-1,2],["iese",-1,2],["aste",-1,2],["iste",-1,2],["an",-1,2],["aban",16,2],["aran",16,2],["ieran",16,2],["ían",16,2],["arían",20,2],["erían",20,2],["irían",20,2],["en",-1,1],["asen",24,2],["iesen",24,2],["aron",-1,2],["ieron",-1,2],["arán",-1,2],["erán",-1,2],["irán",-1,2],["ado",-1,2],["ido",-1,2],["ando",-1,2],["iendo",-1,2],["ar",-1,2],["er",-1,2],["ir",-1,2],["as",-1,2],["abas",39,2],["adas",39,2],["idas",39,2],["aras",39,2],["ieras",39,2],["ías",39,2],["arías",45,2],["erías",45,2],["irías",45,2],["es",-1,1],["ases",49,2],["ieses",49,2],["abais",-1,2],["arais",-1,2],["ierais",-1,2],["íais",-1,2],["aríais",55,2],["eríais",55,2],["iríais",55,2],["aseis",-1,2],["ieseis",-1,2],["asteis",-1,2],["isteis",-1,2],["áis",-1,2],["éis",-1,1],["aréis",64,2],["eréis",64,2],["iréis",64,2],["ados",-1,2],["idos",-1,2],["amos",-1,2],["ábamos",70,2],["áramos",70,2],["iéramos",70,2],["íamos",70,2],["aríamos",74,2],["eríamos",74,2],["iríamos",74,2],["emos",-1,1],["aremos",78,2],["eremos",78,2],["iremos",78,2],["ásemos",78,2],["iésemos",78,2],["imos",-1,2],["arás",-1,2],["erás",-1,2],["irás",-1,2],["ís",-1,2],["ará",-1,2],["erá",-1,2],["irá",-1,2],["aré",-1,2],["eré",-1,2],["iré",-1,2],["ió",-1,2]];var f=[["a",-1,1],["e",-1,2],["o",-1,1],["os",-1,1],["á",-1,1],["é",-1,2],["í",-1,1],["ó",-1,1]];var n=[17,65,16,0,0,0,0,0,0,0,0,0,0,0,0,0,1,17,4,10];var b=0;var m=0;var k=0;function _(){k=r.limit;m=r.limit;b=r.limit;var e=r.cursor;r:{e:{var i=r.cursor;i:{if(!r.in_grouping(n,97,252)){break i}a:{var a=r.cursor;s:{if(!r.out_grouping(n,97,252)){break s}u:while(true){o:{if(!r.in_grouping(n,97,252)){break o}break u}if(r.cursor>=r.limit){break s}r.cursor++}break a}r.cursor=a;if(!r.in_grouping(n,97,252)){break i}s:while(true){u:{if(!r.out_grouping(n,97,252)){break u}break s}if(r.cursor>=r.limit){break i}r.cursor++}}break e}r.cursor=i;if(!r.out_grouping(n,97,252)){break r}i:{var s=r.cursor;a:{if(!r.out_grouping(n,97,252)){break a}s:while(true){u:{if(!r.in_grouping(n,97,252)){break u}break s}if(r.cursor>=r.limit){break a}r.cursor++}break i}r.cursor=s;if(!r.in_grouping(n,97,252)){break r}if(r.cursor>=r.limit){break r}r.cursor++}}k=r.cursor}r.cursor=e;var u=r.cursor;r:{e:while(true){i:{if(!r.in_grouping(n,97,252)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.out_grouping(n,97,252)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}m=r.cursor;e:while(true){i:{if(!r.in_grouping(n,97,252)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}e:while(true){i:{if(!r.out_grouping(n,97,252)){break i}break e}if(r.cursor>=r.limit){break r}r.cursor++}b=r.cursor}r.cursor=u;return true}function d(){var i;while(true){var a=r.cursor;r:{r.bra=r.cursor;i=r.find_among(e);if(i==0){break r}r.ket=r.cursor;switch(i){case 1:if(!r.slice_from("a")){return false}break;case 2:if(!r.slice_from("e")){return false}break;case 3:if(!r.slice_from("i")){return false}break;case 4:if(!r.slice_from("o")){return false}break;case 5:if(!r.slice_from("u")){return false}break;case 6:if(r.cursor>=r.limit){break r}r.cursor++;break}continue}r.cursor=a;break}return true}function v(){if(!(k<=r.cursor)){return false}return true}function g(){if(!(m<=r.cursor)){return false}return true}function w(){if(!(b<=r.cursor)){return false}return true}function h(){var e;r.ket=r.cursor;if(r.find_among_b(i)==0){return false}r.bra=r.cursor;e=r.find_among_b(a);if(e==0){return false}if(!v()){return false}switch(e){case 1:r.bra=r.cursor;if(!r.slice_from("iendo")){return false}break;case 2:r.bra=r.cursor;if(!r.slice_from("ando")){return false}break;case 3:r.bra=r.cursor;if(!r.slice_from("ar")){return false}break;case 4:r.bra=r.cursor;if(!r.slice_from("er")){return false}break;case 5:r.bra=r.cursor;if(!r.slice_from("ir")){return false}break;case 6:if(!r.slice_del()){return false}break;case 7:if(!r.eq_s_b("u")){return false}if(!r.slice_del()){return false}break}return true}function p(){var e;r.ket=r.cursor;e=r.find_among_b(t);if(e==0){return false}r.bra=r.cursor;switch(e){case 1:if(!w()){return false}if(!r.slice_del()){return false}break;case 2:if(!w()){return false}if(!r.slice_del()){return false}var i=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("ic")){r.cursor=r.limit-i;break r}r.bra=r.cursor;if(!w()){r.cursor=r.limit-i;break r}if(!r.slice_del()){return false}}break;case 3:if(!w()){return false}if(!r.slice_from("log")){return false}break;case 4:if(!w()){return false}if(!r.slice_from("u")){return false}break;case 5:if(!w()){return false}if(!r.slice_from("ente")){return false}break;case 6:if(!g()){return false}if(!r.slice_del()){return false}var a=r.limit-r.cursor;r:{r.ket=r.cursor;e=r.find_among_b(s);if(e==0){r.cursor=r.limit-a;break r}r.bra=r.cursor;if(!w()){r.cursor=r.limit-a;break r}if(!r.slice_del()){return false}switch(e){case 1:r.ket=r.cursor;if(!r.eq_s_b("at")){r.cursor=r.limit-a;break r}r.bra=r.cursor;if(!w()){r.cursor=r.limit-a;break r}if(!r.slice_del()){return false}break}}break;case 7:if(!w()){return false}if(!r.slice_del()){return false}var c=r.limit-r.cursor;r:{r.ket=r.cursor;if(r.find_among_b(u)==0){r.cursor=r.limit-c;break r}r.bra=r.cursor;if(!w()){r.cursor=r.limit-c;break r}if(!r.slice_del()){return false}}break;case 8:if(!w()){return false}if(!r.slice_del()){return false}var l=r.limit-r.cursor;r:{r.ket=r.cursor;if(r.find_among_b(o)==0){r.cursor=r.limit-l;break r}r.bra=r.cursor;if(!w()){r.cursor=r.limit-l;break r}if(!r.slice_del()){return false}}break;case 9:if(!w()){return false}if(!r.slice_del()){return false}var f=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("at")){r.cursor=r.limit-f;break r}r.bra=r.cursor;if(!w()){r.cursor=r.limit-f;break r}if(!r.slice_del()){return false}}break}return true}function y(){if(r.cursor<k){return false}var e=r.limit_backward;r.limit_backward=k;r.ket=r.cursor;if(r.find_among_b(c)==0){r.limit_backward=e;return false}r.bra=r.cursor;r.limit_backward=e;if(!r.eq_s_b("u")){return false}if(!r.slice_del()){return false}return true}function q(){var e;if(r.cursor<k){return false}var i=r.limit_backward;r.limit_backward=k;r.ket=r.cursor;e=r.find_among_b(l);if(e==0){r.limit_backward=i;return false}r.bra=r.cursor;r.limit_backward=i;switch(e){case 1:var a=r.limit-r.cursor;r:{if(!r.eq_s_b("u")){r.cursor=r.limit-a;break r}var s=r.limit-r.cursor;if(!r.eq_s_b("g")){r.cursor=r.limit-a;break r}r.cursor=r.limit-s}r.bra=r.cursor;if(!r.slice_del()){return false}break;case 2:if(!r.slice_del()){return false}break}return true}function S(){var e;r.ket=r.cursor;e=r.find_among_b(f);if(e==0){return false}r.bra=r.cursor;switch(e){case 1:if(!v()){return false}if(!r.slice_del()){return false}break;case 2:if(!v()){return false}if(!r.slice_del()){return false}var i=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("u")){r.cursor=r.limit-i;break r}r.bra=r.cursor;var a=r.limit-r.cursor;if(!r.eq_s_b("g")){r.cursor=r.limit-i;break r}r.cursor=r.limit-a;if(!v()){r.cursor=r.limit-i;break r}if(!r.slice_del()){return false}}break}return true}this.stem=function(){_();r.limit_backward=r.cursor;r.cursor=r.limit;var e=r.limit-r.cursor;h();r.cursor=r.limit-e;var i=r.limit-r.cursor;r:{e:{var a=r.limit-r.cursor;i:{if(!p()){break i}break e}r.cursor=r.limit-a;i:{if(!y()){break i}break e}r.cursor=r.limit-a;if(!q()){break r}}}r.cursor=r.limit-i;var s=r.limit-r.cursor;S();r.cursor=r.limit-s;r.cursor=r.limit_backward;var u=r.cursor;d();r.cursor=u;return true};this["stemWord"]=function(e){r.setCurrent(e);this.stem();return r.getCurrent()}};
Stemmer = SpanishStemmer;


/**
 * Simple result scoring code.
 */
var Scorer = {
  // Implement the following function to further tweak the score for each result
  // The function takes a result array [filename, title, anchor, descr, score]
  // and returns the new score.
  /*
  score: function(result) {
    return result[4];
  },
  */

  // query matches the full name of an object
  objNameMatch: 11,
  // or matches in the last dotted part of the object name
  objPartialMatch: 6,
  // Additive scores depending on the priority of the object
  objPrio: {0:  15,   // used to be importantResults
            1:  5,   // used to be objectResults
            2: -5},  // used to be unimportantResults
  //  Used when the priority is not in the mapping.
  objPrioDefault: 0,

  // query found in title
  title: 15,
  // query found in terms
  term: 5
};



function splitQuery(query) {
    return query.split(/\s+/);
}


/**
 * Search Module
 */
var Search = {

  _index : null,
  _queued_query : null,
  _pulse_status : -1,

  init : function() {
      var params = $.getQueryParameters();
      if (params.q) {
          var query = params.q[0];
          $('input[name="q"]')[0].value = query;
          this.performSearch(query);
      }
  },

  loadIndex : function(url) {
    $.ajax({type: "GET", url: url, data: null,
            dataType: "script", cache: true,
            complete: function(jqxhr, textstatus) {
              if (textstatus != "success") {
                document.getElementById("searchindexloader").src = url;
              }
            }});
  },

  setIndex : function(index) {
    var q;
    this._index = index;
    if ((q = this._queued_query) !== null) {
      this._queued_query = null;
      Search.query(q);
    }
  },

  hasIndex : function() {
      return this._index !== null;
  },

  deferQuery : function(query) {
      this._queued_query = query;
  },

  stopPulse : function() {
      this._pulse_status = 0;
  },

  startPulse : function() {
    if (this._pulse_status >= 0)
        return;
    function pulse() {
      var i;
      Search._pulse_status = (Search._pulse_status + 1) % 4;
      var dotString = '';
      for (i = 0; i < Search._pulse_status; i++)
        dotString += '.';
      Search.dots.text(dotString);
      if (Search._pulse_status > -1)
        window.setTimeout(pulse, 500);
    }
    pulse();
  },

  /**
   * perform a search for something (or wait until index is loaded)
   */
  performSearch : function(query) {
    // create the required interface elements
    this.out = $('#search-results');
    this.title = $('<h2>' + _('Searching') + '</h2>').appendTo(this.out);
    this.dots = $('<span></span>').appendTo(this.title);
    this.status = $('<p style="display: none"></p>').appendTo(this.out);
    this.output = $('<ul class="search"/>').appendTo(this.out);

    $('#search-progress').text(_('Preparing search...'));
    this.startPulse();

    // index already loaded, the browser was quick!
    if (this.hasIndex())
      this.query(query);
    else
      this.deferQuery(query);
  },

  /**
   * execute search (requires search index to be loaded)
   */
  query : function(query) {
    var i;
    var stopwords = ["a", "al", "algo", "algunas", "algunos", "ante", "antes", "como", "con", "contra", "cual", "cuando", "de", "del", "desde", "donde", "durante", "e", "el", "ella", "ellas", "ellos", "en", "entre", "era", "erais", "eran", "eras", "eres", "es", "esa", "esas", "ese", "eso", "esos", "esta", "estaba", "estabais", "estaban", "estabas", "estad", "estada", "estadas", "estado", "estados", "estamos", "estando", "estar", "estaremos", "estar\u00e1", "estar\u00e1n", "estar\u00e1s", "estar\u00e9", "estar\u00e9is", "estar\u00eda", "estar\u00edais", "estar\u00edamos", "estar\u00edan", "estar\u00edas", "estas", "este", "estemos", "esto", "estos", "estoy", "estuve", "estuviera", "estuvierais", "estuvieran", "estuvieras", "estuvieron", "estuviese", "estuvieseis", "estuviesen", "estuvieses", "estuvimos", "estuviste", "estuvisteis", "estuvi\u00e9ramos", "estuvi\u00e9semos", "estuvo", "est\u00e1", "est\u00e1bamos", "est\u00e1is", "est\u00e1n", "est\u00e1s", "est\u00e9", "est\u00e9is", "est\u00e9n", "est\u00e9s", "fue", "fuera", "fuerais", "fueran", "fueras", "fueron", "fuese", "fueseis", "fuesen", "fueses", "fui", "fuimos", "fuiste", "fuisteis", "fu\u00e9ramos", "fu\u00e9semos", "ha", "habida", "habidas", "habido", "habidos", "habiendo", "habremos", "habr\u00e1", "habr\u00e1n", "habr\u00e1s", "habr\u00e9", "habr\u00e9is", "habr\u00eda", "habr\u00edais", "habr\u00edamos", "habr\u00edan", "habr\u00edas", "hab\u00e9is", "hab\u00eda", "hab\u00edais", "hab\u00edamos", "hab\u00edan", "hab\u00edas", "han", "has", "hasta", "hay", "haya", "hayamos", "hayan", "hayas", "hay\u00e1is", "he", "hemos", "hube", "hubiera", "hubierais", "hubieran", "hubieras", "hubieron", "hubiese", "hubieseis", "hubiesen", "hubieses", "hubimos", "hubiste", "hubisteis", "hubi\u00e9ramos", "hubi\u00e9semos", "hubo", "la", "las", "le", "les", "lo", "los", "me", "mi", "mis", "mucho", "muchos", "muy", "m\u00e1s", "m\u00ed", "m\u00eda", "m\u00edas", "m\u00edo", "m\u00edos", "nada", "ni", "no", "nos", "nosotras", "nosotros", "nuestra", "nuestras", "nuestro", "nuestros", "o", "os", "otra", "otras", "otro", "otros", "para", "pero", "poco", "por", "porque", "que", "quien", "quienes", "qu\u00e9", "se", "sea", "seamos", "sean", "seas", "seremos", "ser\u00e1", "ser\u00e1n", "ser\u00e1s", "ser\u00e9", "ser\u00e9is", "ser\u00eda", "ser\u00edais", "ser\u00edamos", "ser\u00edan", "ser\u00edas", "se\u00e1is", "sido", "siendo", "sin", "sobre", "sois", "somos", "son", "soy", "su", "sus", "suya", "suyas", "suyo", "suyos", "s\u00ed", "tambi\u00e9n", "tanto", "te", "tendremos", "tendr\u00e1", "tendr\u00e1n", "tendr\u00e1s", "tendr\u00e9", "tendr\u00e9is", "tendr\u00eda", "tendr\u00edais", "tendr\u00edamos", "tendr\u00edan", "tendr\u00edas", "tened", "tenemos", "tenga", "tengamos", "tengan", "tengas", "tengo", "teng\u00e1is", "tenida", "tenidas", "tenido", "tenidos", "teniendo", "ten\u00e9is", "ten\u00eda", "ten\u00edais", "ten\u00edamos", "ten\u00edan", "ten\u00edas", "ti", "tiene", "tienen", "tienes", "todo", "todos", "tu", "tus", "tuve", "tuviera", "tuvierais", "tuvieran", "tuvieras", "tuvieron", "tuviese", "tuvieseis", "tuviesen", "tuvieses", "tuvimos", "tuviste", "tuvisteis", "tuvi\u00e9ramos", "tuvi\u00e9semos", "tuvo", "tuya", "tuyas", "tuyo", "tuyos", "t\u00fa", "un", "una", "uno", "unos", "vosotras", "vosotros", "vuestra", "vuestras", "vuestro", "vuestros", "y", "ya", "yo", "\u00e9l", "\u00e9ramos"];

    // stem the searchterms and add them to the correct list
    var stemmer = new Stemmer();
    var searchterms = [];
    var excluded = [];
    var hlterms = [];
    var tmp = splitQuery(query);
    var objectterms = [];
    for (i = 0; i < tmp.length; i++) {
      if (tmp[i] !== "") {
          objectterms.push(tmp[i].toLowerCase());
      }

      if ($u.indexOf(stopwords, tmp[i].toLowerCase()) != -1 || tmp[i].match(/^\d+$/) ||
          tmp[i] === "") {
        // skip this "word"
        continue;
      }
      // stem the word
      var word = stemmer.stemWord(tmp[i].toLowerCase());
      // prevent stemmer from cutting word smaller than two chars
      if(word.length < 3 && tmp[i].length >= 3) {
        word = tmp[i];
      }
      var toAppend;
      // select the correct list
      if (word[0] == '-') {
        toAppend = excluded;
        word = word.substr(1);
      }
      else {
        toAppend = searchterms;
        hlterms.push(tmp[i].toLowerCase());
      }
      // only add if not already in the list
      if (!$u.contains(toAppend, word))
        toAppend.push(word);
    }
    var highlightstring = '?highlight=' + $.urlencode(hlterms.join(" "));

    // console.debug('SEARCH: searching for:');
    // console.info('required: ', searchterms);
    // console.info('excluded: ', excluded);

    // prepare search
    var terms = this._index.terms;
    var titleterms = this._index.titleterms;

    // array of [filename, title, anchor, descr, score]
    var results = [];
    $('#search-progress').empty();

    // lookup as object
    for (i = 0; i < objectterms.length; i++) {
      var others = [].concat(objectterms.slice(0, i),
                             objectterms.slice(i+1, objectterms.length));
      results = results.concat(this.performObjectSearch(objectterms[i], others));
    }

    // lookup as search terms in fulltext
    results = results.concat(this.performTermsSearch(searchterms, excluded, terms, titleterms));

    // let the scorer override scores with a custom scoring function
    if (Scorer.score) {
      for (i = 0; i < results.length; i++)
        results[i][4] = Scorer.score(results[i]);
    }

    // now sort the results by score (in opposite order of appearance, since the
    // display function below uses pop() to retrieve items) and then
    // alphabetically
    results.sort(function(a, b) {
      var left = a[4];
      var right = b[4];
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        // same score: sort alphabetically
        left = a[1].toLowerCase();
        right = b[1].toLowerCase();
        return (left > right) ? -1 : ((left < right) ? 1 : 0);
      }
    });

    // for debugging
    //Search.lastresults = results.slice();  // a copy
    //console.info('search results:', Search.lastresults);

    // print the results
    var resultCount = results.length;
    function displayNextItem() {
      // results left, load the summary and display it
      if (results.length) {
        var item = results.pop();

        // black list 404 page from returning from the search results
        if (item[0] == "404") { // item[0] returns the URL for the page
          displayNextItem();
          return;
        }   

        
        var listItem = $('<li style="display:none"></li>');
        if (DOCUMENTATION_OPTIONS.FILE_SUFFIX === '') {
          // dirhtml builder
          var dirname = item[0] + '/';
          if (dirname.match(/\/index\/$/)) {
            dirname = dirname.substring(0, dirname.length-6);
          } else if (dirname == 'index/') {
            dirname = '';
          }
          listItem.append($('<a/>').attr('href',
            DOCUMENTATION_OPTIONS.URL_ROOT + dirname +
            highlightstring + item[2]).html(item[1]));
        } else {
          // normal html builders
          listItem.append($('<a/>').attr('href',
            item[0] + DOCUMENTATION_OPTIONS.FILE_SUFFIX +
            highlightstring + item[2]).html(item[1]));
        }
        if (item[3]) {
          listItem.append($('<span> (' + item[3] + ')</span>'));
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        } else if (DOCUMENTATION_OPTIONS.HAS_SOURCE) {
          var suffix = DOCUMENTATION_OPTIONS.SOURCELINK_SUFFIX;
          if (suffix === undefined) {
            suffix = '.txt';
          }
          $.ajax({url: DOCUMENTATION_OPTIONS.URL_ROOT + '_sources/' + item[5] + (item[5].slice(-suffix.length) === suffix ? '' : suffix),
                  dataType: "text",
                  complete: function(jqxhr, textstatus) {
                    var data = jqxhr.responseText;
                    if (data !== '' && data !== undefined) {
                      listItem.append(Search.makeSearchSummary(data, searchterms, hlterms));
                    }
                    Search.output.append(listItem);
                    listItem.slideDown(5, function() {
                      displayNextItem();
                    });
                  }});
        } else {
          // no source available, just display title
          Search.output.append(listItem);
          listItem.slideDown(5, function() {
            displayNextItem();
          });
        }
      }
      // search finished, update title and status message
      else {
        Search.stopPulse();
        Search.title.text(_('Search Results'));
        if (!resultCount)
          Search.status.text(_('Your search did not match any documents. Please make sure that all words are spelled correctly and that you\'ve selected enough categories.'));
        else
            Search.status.text(_('Search finished, found %s page(s) matching the search query.').replace('%s', resultCount));
        Search.status.fadeIn(500);
      }
    }
    displayNextItem();
  },

  /**
   * search for object names
   */
  performObjectSearch : function(object, otherterms) {
    var filenames = this._index.filenames;
    var docnames = this._index.docnames;
    var objects = this._index.objects;
    var objnames = this._index.objnames;
    var titles = this._index.titles;

    var i;
    var results = [];

    for (var prefix in objects) {
      for (var name in objects[prefix]) {
        var fullname = (prefix ? prefix + '.' : '') + name;
        if (fullname.toLowerCase().indexOf(object) > -1) {
          var score = 0;
          var parts = fullname.split('.');
          // check for different match types: exact matches of full name or
          // "last name" (i.e. last dotted part)
          if (fullname == object || parts[parts.length - 1] == object) {
            score += Scorer.objNameMatch;
          // matches in last name
          } else if (parts[parts.length - 1].indexOf(object) > -1) {
            score += Scorer.objPartialMatch;
          }
          var match = objects[prefix][name];
          var objname = objnames[match[1]][2];
          var title = titles[match[0]];
          // If more than one term searched for, we require other words to be
          // found in the name/title/description
          if (otherterms.length > 0) {
            var haystack = (prefix + ' ' + name + ' ' +
                            objname + ' ' + title).toLowerCase();
            var allfound = true;
            for (i = 0; i < otherterms.length; i++) {
              if (haystack.indexOf(otherterms[i]) == -1) {
                allfound = false;
                break;
              }
            }
            if (!allfound) {
              continue;
            }
          }
          var descr = objname + _(', in ') + title;

          var anchor = match[3];
          if (anchor === '')
            anchor = fullname;
          else if (anchor == '-')
            anchor = objnames[match[1]][1] + '-' + fullname;
          // add custom score for some objects according to scorer
          if (Scorer.objPrio.hasOwnProperty(match[2])) {
            score += Scorer.objPrio[match[2]];
          } else {
            score += Scorer.objPrioDefault;
          }
          results.push([docnames[match[0]], fullname, '#'+anchor, descr, score, filenames[match[0]]]);
        }
      }
    }

    return results;
  },

  /**
   * search for full-text terms in the index
   */
  performTermsSearch : function(searchterms, excluded, terms, titleterms) {
    var docnames = this._index.docnames;
    var filenames = this._index.filenames;
    var titles = this._index.titles;

    var i, j, file;
    var fileMap = {};
    var scoreMap = {};
    var results = [];

    // perform the search on the required terms
    for (i = 0; i < searchterms.length; i++) {
      var word = searchterms[i];
      var files = [];
      var _o = [
        {files: terms[word], score: Scorer.term},
        {files: titleterms[word], score: Scorer.title}
      ];

      // no match but word was a required one
      if ($u.every(_o, function(o){return o.files === undefined;})) {
        break;
      }
      // found search word in contents
      $u.each(_o, function(o) {
        var _files = o.files;
        if (_files === undefined)
          return

        if (_files.length === undefined)
          _files = [_files];
        files = files.concat(_files);

        // set score for the word in each file to Scorer.term
        for (j = 0; j < _files.length; j++) {
          file = _files[j];
          if (!(file in scoreMap))
            scoreMap[file] = {}
          scoreMap[file][word] = o.score;
        }
      });

      // create the mapping
      for (j = 0; j < files.length; j++) {
        file = files[j];
        if (file in fileMap)
          fileMap[file].push(word);
        else
          fileMap[file] = [word];
      }
    }

    // now check if the files don't contain excluded terms
    for (file in fileMap) {
      var valid = true;

      // check if all requirements are matched
      if (fileMap[file].length != searchterms.length)
          continue;

      // ensure that none of the excluded terms is in the search result
      for (i = 0; i < excluded.length; i++) {
        if (terms[excluded[i]] == file ||
            titleterms[excluded[i]] == file ||
            $u.contains(terms[excluded[i]] || [], file) ||
            $u.contains(titleterms[excluded[i]] || [], file)) {
          valid = false;
          break;
        }
      }

      // if we have still a valid result we can add it to the result list
      if (valid) {
        // select one (max) score for the file.
        // for better ranking, we should calculate ranking by using words statistics like basic tf-idf...
        var score = $u.max($u.map(fileMap[file], function(w){return scoreMap[file][w]}));
        results.push([docnames[file], titles[file], '', null, score, filenames[file]]);
      }
    }
    return results;
  },

  /**
   * helper function to return a node containing the
   * search summary for a given text. keywords is a list
   * of stemmed words, hlwords is the list of normal, unstemmed
   * words. the first one is used to find the occurrence, the
   * latter for highlighting it.
   */
  makeSearchSummary : function(text, keywords, hlwords) {
    var textLower = text.toLowerCase();
    var start = 0;
    $.each(keywords, function() {
      var i = textLower.indexOf(this.toLowerCase());
      if (i > -1)
        start = i;
    });
    start = Math.max(start - 120, 0);
    var excerpt = ((start > 0) ? '...' : '') +
      $.trim(text.substr(start, 240)) +
      ((start + 240 - text.length) ? '...' : '');
    var rv = $('<div class="context"></div>').text(excerpt);
    $.each(hlwords, function() {
      rv = rv.highlightText(this, 'highlighted');
    });
    return rv;
  }
};

$(document).ready(function() {
  Search.init();
});