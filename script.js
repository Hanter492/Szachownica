//####################################
//#                                  #
//#   SKRYPT NAPISANY PRZEZ HANTER   #
//#                                  #
//####################################

let tura=0;   //tura %2 biały - !%2 czarny
let wiezaB=[false,false]; //ruch białej wieży
let wiezaC=[false,false]; //ruch czarnej wieży
let krol=[false,false];   //ruch białego - czarnego króla
let turn=false,turn2=false;
let zmia=false,mat=false;
let wypisanie="",koni=false;
let admin=false;
let przelot=0;
let theend=false;
let ruchy=[];
let pola_cerw=[64,64,0];
const p=[{"BP": "p", "BW": "r", "BS": "h", "BG": "b", "BH": "q", "BK": "k", "CP": "o", "CW": "t", "CS": "j", "CG": "n", "CH": "w", "CK": "l"}, "BP", "BW", "BS", "BG", "BH", "BK", "CP", "CW", "CS", "CG", "CH", "CK"];
//0-biały 1-czarny
function go() {
  document.getElementById("Pole_sz").innerHTML="";
  Dodaj_styl();
  create_sz();
  pocz_ulozenie();
  dod_przy();
}
//funkcja rozpoczynająca
function create_sz() {
  const litery=["A","B","C","D","E","F","G","H"];
  document.getElementById("Pole_sz").innerHTML += "<div id=\"opis1\"></div>";
  document.getElementById("Pole_sz").innerHTML += "<div id=\"zmiana_p\">Zmień pionek na:<br><a id=\"pi_k0\"></a><a id=\"pi_k1\"></a><a id=\"pi_k2\"></a><a id=\"pi_k3\"></a></div>";
  document.getElementById("Pole_sz").innerHTML += "<div id=\"koniec\"></div>";
  for (var i = 8; i > 0; i--) {
    document.getElementById("opis1").innerHTML += "<div id=\"liczba"+i+"\">"+i+"</div>";
  }
  document.getElementById("Pole_sz").innerHTML += "<div id=\"lewy\"></div>";
  document.getElementById("Pole_sz").innerHTML += "<div id=\"prawy\"></div>";
  document.getElementById("prawy").innerHTML += "<div id=\"reset\" onclick=\"reset();\">Reset</div>";
  document.getElementById("prawy").innerHTML += "<div id=\"poprzedni\" onclick=\"cofnij();\">&#9194;</div>";
  document.getElementById("prawy").innerHTML += "<div id=\"ruchy_w\" style=\"resize: none;\"></div>";
  document.getElementById("lewy").innerHTML += "<div id=\"naglowek\"><div style=\"display: block; float: left; margin-top: 4px;\"><b>Teraz gra:&nbsp;</b></div></div>";
  document.getElementById("naglowek").innerHTML += "<div id=\"kto\"></div>";
  document.getElementById("lewy").innerHTML += "<div id=\"Szachownica\"></div>";
  var t=0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if(i%2==0){
        if(j%2==0){document.getElementById("Szachownica").innerHTML += "<div id=\"pole"+t+"\" style=\"background-color: #EEEED2;\">&nbsp;</div>"}
        else {document.getElementById("Szachownica").innerHTML += "<div id=\"pole"+t+"\" style=\"background-color: #769656;\">&nbsp;</div>"}}
      else {
        if(j%2==0){document.getElementById("Szachownica").innerHTML += "<div id=\"pole"+t+"\" style=\"background-color: #769656;\">&nbsp;</div>"}
        else {document.getElementById("Szachownica").innerHTML += "<div id=\"pole"+t+"\" style=\"background-color: #EEEED2;\">&nbsp;</div>"}}
    t++;}
    document.getElementById("Szachownica").innerHTML += "<div class=\"endl\"></div>";
  }
  document.getElementById("lewy").innerHTML += "<div class=\"endl\"></div>";
  document.getElementById("lewy").innerHTML += "<div id=\"opisA\"></div>";
  for (var i = 0; i < 8; i++) {
    document.getElementById("opisA").innerHTML += "<div id=\"litera"+i+"\">"+litery[i]+"</div>";
  }
}
//tworzenie szachownicy
function num_pol(zmiana) {
  const lit=["A","B","C","D","E","F","G","H"]
  var a=[];
  var t=8;
  if ((0>zmiana)||(zmiana>=64)) {return false;}
  for (var i = 0; i < 8; i++) {
    if (zmiana%8==i) {
      a[0]=lit[i];
    }
  }
  for (var i = 0; i < 64; i=i+8) {
  if((i<=zmiana)&&(zmiana<=i+7))
    a[1]=t;
    t--;
  }
  return a[0]+a[1];
}
//zmiana numer na kod
function kod_pion(kod) {
  if(kod=="&nbsp;") return "&nbsp;";
  for (var i = 0; i <= 6; i++) {
    if(kod==p[i+1])
    return p[0][p[i+1]];
    if(kod==p[i+7])
    return p[0][p[i+7]];
  }
  return "";
}
//kod pionka na pionek
function pion_kod(kod) {
  
  for (var i = 0; i < 12; i++) {
    if(kod==p[0][p[i+1]])
    {return p[i+1];}
  }
  return "&nbsp;";
}
//pionek na kod pionka
function pocz_ulozenie() {
  for (var i = 0; i < 64; i++) {
    if(i==0||i==7) a=p[0]["CW"];
    if(i==1||i==6) a=p[0]["CS"];
    if(i==2||i==5) a=p[0]["CG"];
    if(i==3) a=p[0]["CH"];
    if(i==4) a=p[0]["CK"];
    if(i>=8&&i<=15) a=p[0]["CP"];
    if(i==56||i==63) a=p[0]["BW"];
    if(i==57||i==62) a=p[0]["BS"];
    if(i==58||i==61) a=p[0]["BG"];
    if(i==59) a=p[0]["BH"];
    if(i==60) a=p[0]["BK"];
    if(i>=48&&i<=55) a=p[0]["BP"];
    document.getElementById("pole"+i).innerHTML = a;
    a="&nbsp;";
  }
}
//układa pionki na początkowych stanowiskach
function start(polozenie_k,cel_k) {
  if(pola_cerw[2]!=tura-1) pola_cerw=[64,64,tura];
  var polozenie, cel;
  if(polozenie_k.length==5)
  polozenie=polozenie_k[4];
  else
  polozenie=polozenie_k[4]+polozenie_k[5];
  if(cel_k.length==5)
  cel=cel_k[4];
  else
  cel=cel_k[4]+cel_k[5];
  polozenie=Number(polozenie);
  cel=Number(cel);
  //zmiana id pola na zmienną liczbową
  let cel_przy_zmianie=document.getElementById("pole"+cel).innerHTML;
  if(sprawdz_(polozenie,cel)==true)
  {
    ruchy[tura]=[(document.getElementById("pole"+polozenie).innerHTML), polozenie, (document.getElementById("pole"+cel).innerHTML), cel, przelot, [wiezaB[0], wiezaB[1]], [wiezaC[0], wiezaC[1]], [krol[0],krol[1]], theend, (document.getElementById("ruchy_w").innerHTML), pola_cerw];
    if((document.getElementById("pole"+cel).innerHTML=="O")||(document.getElementById("pole"+cel).innerHTML=="P")){
       document.getElementById("pole"+polozenie).innerHTML="&nbsp;";
       ruchy[tura][2]=cel_przy_zmianie;
    }
    if(zmia==false) {
//  for (var i = 0; i < 6; i++) {
      document.getElementById("pole"+cel).innerHTML=document.getElementById("pole"+polozenie).innerHTML;
      if((polozenie==56)&&(document.getElementById("pole"+polozenie).innerHTML=="r")){wiezaB[0]=true; ruchy[tura][5][0]=true;}
      if(document.getElementById("pole56").innerHTML!="r"){wiezaB[0]=true; ruchy[tura][5][0]=true;}
      if((polozenie==63)&&(document.getElementById("pole"+polozenie).innerHTML=="r")){wiezaB[1]=true; ruchy[tura][5][1]=true;}
      if(document.getElementById("pole63").innerHTML!="r"){wiezaB[1]=true; ruchy[tura][5][1]=true;}
      if((polozenie==0)&&(document.getElementById("pole"+polozenie).innerHTML=="t")){wiezaC[0]=true; ruchy[tura][6][0]=true;}
      if(document.getElementById("pole0").innerHTML!="t"){wiezaC[0]=true; ruchy[tura][6][0]=true;}
      if((polozenie==7)&&(document.getElementById("pole"+polozenie).innerHTML=="t")){wiezaC[1]=true; ruchy[tura][6][1]=true;}
      if(document.getElementById("pole7").innerHTML!="t"){wiezaC[1]=true; ruchy[tura][6][1]=true;}
      if((polozenie==60)&&(document.getElementById("pole"+polozenie).innerHTML=="k")){krol[0]=true; ruchy[tura][7][0]=true;}
      if(document.getElementById("pole60").innerHTML!="k"){krol[0]=true; ruchy[tura][7][0]=true;}
      if((polozenie==4)&&(document.getElementById("pole"+polozenie).innerHTML=="l")){krol[1]=true; ruchy[tura][7][1]=true;}
      if(document.getElementById("pole4").innerHTML!="l"){krol[1]=true; ruchy[tura][7][1]=true;}

      document.getElementById("pole"+polozenie).innerHTML="&nbsp;";

      if((przelot!=0)&&(cel==przelot)&&(pion_kod(document.getElementById("pole"+cel).innerHTML)[1]=="P")){
        if((tura%2==0)&&((przelot>=16)&&(przelot<=23)))
        {document.getElementById("pole"+(przelot+8)).innerHTML="&nbsp;"; wypisanie+=" P"}
        if((tura%2==1)&&((przelot>=40)&&(przelot<=47)))
        {document.getElementById("pole"+(przelot-8)).innerHTML="&nbsp;"; wypisanie+=" P"}
      }
    wypisz();
    }
    tura++;
  }
  else
  {
    console.log("zły ruch");
  }
  if(tura%2==0) {
    document.getElementById("kto").style = "background-color: white; border-color: black;";
    if((przelot>=40)&&(przelot<=47)){przelot=0;}
  }
  else {
    document.getElementById("kto").style = "background-color: black; border-color: white;";
    if((przelot>=16)&&(przelot<=23)){przelot=0;}
  }

  if (pat_mate()==false) {
    if(pola_cerw[2]!=tura-1) pola_cerw=[64,64,tura];
    dod_przy();
  }
  else {
    odkolor();
  }
}
function dod_przy() {
  odkolor();
  if(theend==true)return false;
  for (var i = 0; i < 64; i++) {
    document.getElementById("pole"+i).onclick="";
  }
  if (tura%2==0) {
    for (var i = 0; i < 64; i++) {
      for (var j = 0; j < 6; j++) {
        if(document.getElementById("pole"+i).innerHTML==p[0][p[j+1]])
        {
          document.getElementById("pole"+i).onclick= function() {odkolor();pol_(this.id);}
        }
      }
    }
  }
  else {
    for (var i = 0; i < 64; i++) {
      for (var j = 0; j < 6; j++) {
        if(document.getElementById("pole"+i).innerHTML==p[0][p[j+7]])
        {
          document.getElementById("pole"+i).onclick= function() {odkolor();pol_(this.id);}
        }
      }
    }
  }
}
//wczytaj przyciski położenie
function pol_(a) {
  if(theend==true)return false;
  let g=true;
  
  var e;
  if(a.length==5)
  e=a[4];
  else
  e=a[4]+a[5];
  e=Number(e);
  
  kolorkuj(e);
  // for (var i = 0; i < 64; i++) {
  //   document.getElementById("pole"+i).onclick="";
  // }
  if (tura%2==0) {
    for (var i = 0; i < 64; i++) {
      for (var j = 0; j < 6; j++) {
        if(document.getElementById("pole"+i).innerHTML==p[0][p[j+1]])
        {
          g=false;
        }
      }if(g!=false){document.getElementById("pole"+i).onclick= function() {start(a,this.id);}}
      g=true;
    }
  }
  else {
    for (var i = 0; i < 64; i++) {
      for (var j = 0; j < 6; j++) {
        if(document.getElementById("pole"+i).innerHTML==p[0][p[j+7]])
        {
          g=false;
        }
      }if(g!=false){document.getElementById("pole"+i).onclick= function() {start(a,this.id);}}
      g=true;
    }
  }
}
//wczytaj przyciski cel
function sprawdz_(polozenieX,celX) {
  let krolB,krolC;
  let rosz="";
  let grom=[];
  for (var i = 0; i < 64; i++) {
    grom[i]=document.getElementById("pole"+i).innerHTML;
    if(grom[i]==p[0][p[6]]) krolB=i;
    if(grom[i]==p[0][p[12]]) krolC=i;
  }
  function wewnatrz_(polozenie,cel) {
    
    var pionekP="&nbsp;";
    var pionekC="&nbsp;";
    
    pionekP=pion_kod(grom[polozenie]);
    pionekC=pion_kod(grom[cel]);
    
    if((turn==false)&&(turn2==false)){wypisanie = "<b>"+num_pol(polozenie)+"</b><i>"+kod_pion(pionekP)+"</i><u>→</u><i>"+kod_pion(pionekC)+"</i><b>"+ num_pol(cel) +"</b>";}
    if(((cel<0)||(cel>=64))||(polozenie==cel)||(pionekC[0]==pionekP[0])||(zmia==true))
    return false;
    switch (pionekP) {
      case "BP":
        if((cel==polozenie-8)&&(pionekC=="&nbsp;"))
          {if((0<=cel)&&(cel<8)) {zmien_pion(cel,pionekP[0]);}
          return true;}
        if((polozenie%8!=0)&&(cel==polozenie-9)&&((pionekC[0]=="C")||(cel==przelot)))
          {if((0<=cel)&&(cel<8)) {zmien_pion(cel,pionekP[0]);}
          return true;}
        if(((polozenie+1)%8!=0)&&(cel==polozenie-7)&&((pionekC[0]=="C")||(cel==przelot)))
          {if((0<=cel)&&(cel<8)) {zmien_pion(cel,pionekP[0]);}
          return true;}
        if(((48<=polozenie)&&(polozenie<=55))&&(grom[polozenie-8]=="&nbsp;")&&(pionekC=="&nbsp;")&&(cel==polozenie-16))
          {if((turn==false)&&(turn2==false)){przelot=polozenie-8;} return true;}
        return false;
        break;
      case "CP":
        if((cel==polozenie+8)&&(pionekC=="&nbsp;"))
          {if((56<=cel)&&(cel<64)) {zmien_pion(cel,pionekP[0]);}
          return true;}
        if((polozenie%8!=0)&&(cel==polozenie+7)&&((pionekC[0]=="B")||(cel==przelot)))
          {if((56<=cel)&&(cel<64)) {zmien_pion(cel,pionekP[0]);}
          return true;}
        if(((polozenie+1)%8!=0)&&(cel==polozenie+9)&&((pionekC[0]=="B")||(cel==przelot)))
          {if((56<=cel)&&(cel<64)) {zmien_pion(cel,pionekP[0]);}
          return true;}
        if(((8<=polozenie)&&(polozenie<=15))&&(grom[polozenie+8]=="&nbsp;")&&(pionekC=="&nbsp;")&&(cel==polozenie+16))
          {if((turn==false)&&(turn2==false)){przelot=polozenie+8} return true;}
        return false;
        break;
      case "BW":
      case "CW":
        var bool=true;
        if((((0<=polozenie)&&(polozenie<=7))&&((0<=cel)&&(cel<=7)))||(((8<=polozenie)&&(polozenie<=15))&&((8<=cel)&&(cel<=15)))||(((16<=polozenie)&&(polozenie<=23))&&((16<=cel)&&(cel<=23)))||(((24<=polozenie)&&(polozenie<=31))&&((24<=cel)&&(cel<=31)))||
          (((32<=polozenie)&&(polozenie<=39))&&((32<=cel)&&(cel<=39)))||(((40<=polozenie)&&(polozenie<=47))&&((40<=cel)&&(cel<=47)))||(((48<=polozenie)&&(polozenie<=55))&&((48<=cel)&&(cel<=55)))||(((56<=polozenie)&&(polozenie<=63))&&((56<=cel)&&(cel<=63))))
        {
          // return true;
          if(polozenie<cel)
          {for (var i = polozenie+1; i <= cel-1 ; i++) {
              if(grom[i]!="&nbsp;")
                bool=false;
            }if(bool==true) {return true;}
          }
          if(cel<polozenie)
          {for (var i = polozenie-1; i >= cel+1 ; i--) {
              if(grom[i]!="&nbsp;")
                bool=false;
            }if(bool==true) {return true;}
          }
        }
        if(((polozenie%8==0)&&(cel%8==0))||(((polozenie-1)%8==0)&&((cel-1)%8==0))||(((polozenie-2)%8==0)&&((cel-2)%8==0))||(((polozenie-3)%8==0)&&((cel-3)%8==0))||
          (((polozenie-4)%8==0)&&((cel-4)%8==0))||(((polozenie-5)%8==0)&&((cel-5)%8==0))||(((polozenie-6)%8==0)&&((cel-6)%8==0))||(((polozenie-7)%8==0)&&((cel-7)%8==0)))
        {
          // return true;
          if(polozenie<cel)
          {for (var i = polozenie+8; i <= cel-8 ; i=i+8) {
              if(grom[i]!="&nbsp;")
                bool=false;
            }if(bool==true) {return true;}
          }
          if(cel<polozenie)
          {for (var i = polozenie-8; i >= cel+8 ; i=i-8) {
              if(grom[i]!="&nbsp;")
                bool=false;
            }if(bool==true) {return true;}
          }
        }
        return false;
        break;
      case "BS":
      case "CS":
        if((polozenie%8!=0)&&((polozenie-1)%8!=0)&&((cel==polozenie-17)||(cel==polozenie-10)||(cel==polozenie+6)||(cel==polozenie+15))) return true;
        if((polozenie%8!=0)&&((cel==polozenie-17)||(cel==polozenie+15))) return true;
        if(((polozenie+1)%8!=0)&&((polozenie+2)%8!=0)&&((cel==polozenie-15)||(cel==polozenie-6)||(cel==polozenie+10)||(cel==polozenie+17))) return true;
        if(((polozenie+1)%8!=0)&&((cel==polozenie-15)||(cel==polozenie+17))) return true;
        return false;
        break;
      case "BG":
      case "CG":
        var bool=true;
        var wyn=false;
          if(polozenie>cel) {
            for (var i = polozenie-7; i >= cel ; i=i-7) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if(i%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;
            for (var i = polozenie-9; i >= cel ; i=i-9) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if((i+1)%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;}
          else {
            for (var i = polozenie+7; i <= cel ; i=i+7) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if((i+1)%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;
            for (var i = polozenie+9; i <= cel ; i=i+9) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if(i%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;}
        return false;
        break;
      case "BH":
      case "CH":
        var boola=true;
        if((((0<=polozenie)&&(polozenie<=7))&&((0<=cel)&&(cel<=7)))||(((8<=polozenie)&&(polozenie<=15))&&((8<=cel)&&(cel<=15)))||(((16<=polozenie)&&(polozenie<=23))&&((16<=cel)&&(cel<=23)))||(((24<=polozenie)&&(polozenie<=31))&&((24<=cel)&&(cel<=31)))||
          (((32<=polozenie)&&(polozenie<=39))&&((32<=cel)&&(cel<=39)))||(((40<=polozenie)&&(polozenie<=47))&&((40<=cel)&&(cel<=47)))||(((48<=polozenie)&&(polozenie<=55))&&((48<=cel)&&(cel<=55)))||(((56<=polozenie)&&(polozenie<=63))&&((56<=cel)&&(cel<=63))))
        {
          // return true;
          if(polozenie<cel)
          {for (var i = polozenie+1; i <= cel-1 ; i++) {
              if(grom[i]!="&nbsp;")
                boola=false;
            }if(boola==true) {return true;}
          }
          if(cel<polozenie)
          {for (var i = polozenie-1; i >= cel+1 ; i--) {
              if(grom[i]!="&nbsp;")
                boola=false;
            }if(boola==true) {return true;}
          }
        }
        if(((polozenie%8==0)&&(cel%8==0))||(((polozenie-1)%8==0)&&((cel-1)%8==0))||(((polozenie-2)%8==0)&&((cel-2)%8==0))||(((polozenie-3)%8==0)&&((cel-3)%8==0))||
          (((polozenie-4)%8==0)&&((cel-4)%8==0))||(((polozenie-5)%8==0)&&((cel-5)%8==0))||(((polozenie-6)%8==0)&&((cel-6)%8==0))||(((polozenie-7)%8==0)&&((cel-7)%8==0)))
        {
          // return true;
          if(polozenie<cel)
          {for (var i = polozenie+8; i <= cel-8 ; i=i+8) {
              if(grom[i]!="&nbsp;")
                boola=false;
            }if(boola==true) {return true;}
          }
          if(cel<polozenie)
          {for (var i = polozenie-8; i >= cel+8 ; i=i-8) {
              if(grom[i]!="&nbsp;")
                boola=false;
            }if(boola==true) {return true;}
          }
        }
        var bool=true;
        var wyn=false;
          if(polozenie>cel) {
            for (var i = polozenie-7; i >= cel ; i=i-7) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if(i%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;
            for (var i = polozenie-9; i >= cel ; i=i-9) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if((i+1)%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;}
          else {
            for (var i = polozenie+7; i <= cel ; i=i+7) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if((i+1)%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;
            for (var i = polozenie+9; i <= cel ; i=i+9) {
              if((grom[i]!="&nbsp;")&&(i!=cel)) bool=false;
              if(i%8==0) break;
              if((i==cel)&&(bool==true)) {wyn=true;break;}
            }if(wyn==true) return true; bool=true;wyn=false;}
        return false;
        break;
      case "BK":
        if((polozenie%8!=0)&&((cel==polozenie-9)||(cel==polozenie-1)||(cel==polozenie+7))) return true;
        if(((polozenie+1)%8!=0)&&((cel==polozenie-7)||(cel==polozenie+1)||(cel==polozenie+9))) return true;
        if((cel==polozenie-8)||(cel==polozenie+8)) return true;
        if((krol[0]==false)&&(cel==58)&&(polozenie==60)&&(wiezaB[0]==false)&&(grom[57]=="&nbsp;")&&(grom[58]=="&nbsp;")&&(grom[59]=="&nbsp;"))
        {rosz="B1"; return true;}
        if((krol[0]==false)&&(cel==62)&&(polozenie==60)&&(wiezaB[1]==false)&&(grom[61]=="&nbsp;")&&(grom[62]=="&nbsp;"))
        {rosz="B2"; return true;}
        return false;
        break;
      case "CK":
        if((polozenie%8!=0)&&((cel==polozenie-9)||(cel==polozenie-1)||(cel==polozenie+7))) return true;
        if(((polozenie+1)%8!=0)&&((cel==polozenie-7)||(cel==polozenie+1)||(cel==polozenie+9))) return true;
        if((cel==polozenie-8)||(cel==polozenie+8)) return true;
        if((krol[1]==false)&&(cel==2)&&(polozenie==4)&&(wiezaC[0]==false)&&(grom[1]=="&nbsp;")&&(grom[2]=="&nbsp;")&&(grom[3]=="&nbsp;"))
        {rosz="C1"; return true;}
        if((krol[1]==false)&&(cel==6)&&(polozenie==4)&&(wiezaC[1]==false)&&(grom[5]=="&nbsp;")&&(grom[6]=="&nbsp;"))
        {rosz="C2"; return true;}
        return false;
        break;
      default:
        return false;
    }

    return true;
  }
  function zmien_pion(nr,kol) {
    if((turn==true)||(turn2==true)) return false;
    document.getElementById("zmiana_p").style="z-index: 0; visibility: visible;";
    zmia=true;
    //tura++;
    if(kol=="B")
    {document.getElementById("pole"+nr).innerHTML="P";
    for (var i = 0; i < 4; i++) {
      document.getElementById("pi_k"+i).innerHTML=p[0][p[i+2]];
      document.getElementById("pi_k"+i).onclick = function() {
        document.getElementById("pole"+nr).innerHTML=this.innerHTML;
        grom[nr]=this.innerHTML;
        wypisanie = wypisanie+"↾<i>"+this.innerHTML+"</i>";
        turn2=true;zmia=false;
        if(wewnatrz_(nr,krolC)==true)
        {wypisanie+=" C"; if(turn==false){pola_cerw=[nr,krolC,tura];}}
        turn2=false;zmia=true;
        wypisz();
        document.getElementById("zmiana_p").style="z-index: -5;";document.getElementById("zmiana_p").style.visibility="hidden;";
        zmia=false; if(pat_mate()==true){koni=true;}}
    }}
    else if (kol=="C")
    {document.getElementById("pole"+nr).innerHTML="O";
    for (var i = 0; i < 4; i++) {
      document.getElementById("pi_k"+i).innerHTML=p[0][p[i+8]];
      document.getElementById("pi_k"+i).onclick = function() {
        document.getElementById("pole"+nr).innerHTML=this.innerHTML;
        grom[nr]=this.innerHTML;
        wypisanie = wypisanie+"↾<i>"+this.innerHTML+"</i>";
        turn2=true;zmia=false;
        if(wewnatrz_(nr,krolB)==true)
        {wypisanie+=" C"; if(turn==false){pola_cerw=[nr,krolB,tura];}}
        turn2=false;zmia=true;
        wypisz();
        document.getElementById("zmiana_p").style="z-index: -5;";document.getElementById("zmiana_p").style.visibility="hidden;";
        zmia=false; if(pat_mate()==true){koni=true;}}
    }}
  }
  function roszada(ktory) {
    if((turn==true)||(turn2==true)) return false;
    switch (ktory) {
      case "B1":
        document.getElementById("pole59").innerHTML="r";
        grom[59]="r";
        document.getElementById("pole56").innerHTML="&nbsp;";
        grom[56]="&nbsp;"
        wypisanie+=" R<br><b>"+num_pol(56)+"</b><i>"+kod_pion("BW")+"</i><u>→</u><i>"+kod_pion("&nbsp;")+"</i><b>"+ num_pol(59) +"</b>";
        turn2=true;
        if(wewnatrz_(59,krolC)==true)
        {wypisanie+=" C"; if(turn==false){pola_cerw=[59,krolC,tura];}}
        turn2=false;
        break;
      case "B2":
        document.getElementById("pole61").innerHTML="r";
        grom[61]="r";
        document.getElementById("pole63").innerHTML="&nbsp;";
        grom[63]="&nbsp;";
        wypisanie+=" R<br><b>"+num_pol(63)+"</b><i>"+kod_pion("BW")+"</i><u>→</u><i>"+kod_pion("&nbsp;")+"</i><b>"+ num_pol(61) +"</b>";
        turn2=true;
        if(wewnatrz_(61,krolC)==true)
        {wypisanie+=" C"; if(turn==false){pola_cerw=[61,krolC,tura];}}
        turn2=false;
        break;
      case "C1":
        document.getElementById("pole3").innerHTML="t";
        grom[3]="t";
        document.getElementById("pole0").innerHTML="&nbsp;";
        grom[0]="&nbsp;";
        wypisanie+=" R<br><b>"+num_pol(0)+"</b><i>"+kod_pion("CW")+"</i><u>→</u><i>"+kod_pion("&nbsp;")+"</i><b>"+ num_pol(3) +"</b>";
        turn2=true;
        if(wewnatrz_(3,krolB)==true)
        {wypisanie+=" C"; if(turn==false){pola_cerw=[3,krolB,tura];}}
        turn2=false;
        break;
      case "C2":
        document.getElementById("pole5").innerHTML="t";
        grom[5]="t";
        document.getElementById("pole7").innerHTML="&nbsp;";
        grom[7]="&nbsp;";
        wypisanie+=" R<br><b>"+num_pol(7)+"</b><i>"+kod_pion("CW")+"</i><u>→</u><i>"+kod_pion("&nbsp;")+"</i><b>"+ num_pol(5) +"</b>";
        turn2=true;
        if(wewnatrz_(5,krolB)==true)
        {wypisanie+=" C"; if(turn==false){pola_cerw=[5,krolB,tura];}}
        turn2=false;
        break;
      default:
        console.log("Alert roszady: "+ktory);
    }
  }
  function dozwolenie() {
    if (wewnatrz_(polozenieX,celX)==true) {
      mat=true;
      grom[celX]=grom[polozenieX];
      grom[polozenieX]="&nbsp;";
      if(((document.getElementById("pole"+polozenieX).innerHTML!=p[0][p[6]]))&&(document.getElementById("pole"+polozenieX).innerHTML!=p[0][p[12]])) {
        for (var i = 0; i < 64; i++) {
        turn2=true;
        if(wewnatrz_(i,krolB)==true)
        {
          //console.log("krolB ma szach");
          if (tura%2==0) {
            //console.log("OK już koniec krolB");
            turn2=false; return false;
          }
          if (tura%2==1) {
            wypisanie+=" C";
            if(turn==false){pola_cerw=[i,krolB,tura];}
          }
        }
        if(wewnatrz_(i,krolC)==true)
        {
          //console.log("krolC ma szach");
          if (tura%2==1) {
            //console.log("OK już koniec krolC");
            turn2=false; return false;
          }
          if (tura%2==0) {
            wypisanie+=" C";
            if(turn==false){pola_cerw=[i,krolC,tura];}
          }
        }
        turn2=false;
        }
      }
      else {
        for (var j = 0; j < 64; j++) {
          turn2=true;
          if(wewnatrz_(j,celX)==true)
          {
            turn2=false; return false;
          }
          if(pion_kod(document.getElementById("pole"+j).innerHTML)[0]=="C"){
          if(((celX==58)&&((wewnatrz_(j,59)==true)||(wewnatrz_(j,60)))))
          {
            turn2=false; return false;
          }
          if(((celX==62)&&((wewnatrz_(j,61)==true)||(wewnatrz_(j,60)))))
          {
            turn2=false; return false;
          }
          }
          if(pion_kod(document.getElementById("pole"+j).innerHTML)[0]=="B"){
          if(((celX==2)&&((wewnatrz_(j,3)==true)||(wewnatrz_(j,4)))))
          {
            turn2=false; return false;
          }
          if(((celX==6)&&((wewnatrz_(j,5)==true)||(wewnatrz_(j,4)))))
          {
            turn2=false; return false;
          }
          }
        }
        turn2=false;
      }
      if(rosz!="")
      {roszada(rosz); rosz="";}
      return true;
    }
    else {
      return false;
    }
  }

  if(admin==true) return true;//-----------------------------------------------------
  if (dozwolenie()==true) {
    return true;
  }
  else {
    return false;
  }
}
//serce :-)
function kolorkuj(pol) {
  turn=true;
  var t=0;
  for (var i = 0; i < 8; i++)
  for (var j = 0; j < 8; j++) {
    if((sprawdz_(pol,t)==true)&&((document.getElementById("pole"+t).innerHTML!=p[0]["BK"])&&(document.getElementById("pole"+t).innerHTML!=p[0]["CK"])))
      if(i%2==0)
      if(j%2!=0)
      document.getElementById("pole"+t).style.background = "#5e7a42";
      else
      document.getElementById("pole"+t).style.background = "#b8b881";
      else
      if(j%2==0)
      document.getElementById("pole"+t).style.background = "#5e7a42";
      else
      document.getElementById("pole"+t).style.background = "#b8b881";
    //console.log("Kolorkuje");
    t++;
  }
  turn=false;
}
function odkolor() {
  var t=0;
  for (var i = 0; i < 8; i++)
  for (var j = 0; j < 8; j++) {
    if(i%2==0)
      if(j%2!=0)
      document.getElementById("pole"+t).style = "height: 50px; width: 50px; border: 0px; background-color: #769656;";
      else
      document.getElementById("pole"+t).style = "height: 50px; width: 50px; border: 0px; background-color:#EEEED2;";
    else
      if(j%2==0)
      document.getElementById("pole"+t).style = "height: 50px; width: 50px; border: 0px; background-color: #769656;";
      else
      document.getElementById("pole"+t).style = "height: 50px; width: 50px; border: 0px; background-color: #EEEED2;";
    //console.log("Kolorkuje");
    t++;
  }
  if(pola_cerw!=[64,64,tura])
  {
    if(kolor(pola_cerw[0])=="C")
    document.getElementById("pole"+pola_cerw[0]).style = "height: 46px; width: 46px; border: Solid 2px red; background-color: #769656;";
    else if(kolor(pola_cerw[0])=="B")
    document.getElementById("pole"+pola_cerw[0]).style = "height: 46px; width: 46px; border: Solid 2px red; background-color: #EEEED2;";
    if(kolor(pola_cerw[1])=="C")
    document.getElementById("pole"+pola_cerw[1]).style = "height: 46px; width: 46px; border: Solid 2px red; background-color: #769656;";
    else if(kolor(pola_cerw[1])=="B")
    document.getElementById("pole"+pola_cerw[1]).style = "height: 46px; width: 46px; border: Solid 2px red; background-color: #EEEED2;";
  }
}
function kolor(_pol) {
  var t=0;
  for (var i = 0; i < 8; i++)
  for (var j = 0; j < 8; j++) {
    if(_pol==t)
    {
      if(i%2==0)
      if(j%2!=0)
      return "C";
      else
      return "B";
      else
      if(j%2==0)
      return "C";
      else
      return "B";
    }
    t++;
}}
//koloruje możliwe ruchy
function wypisz() {
  document.getElementById("ruchy_w").innerHTML=wypisanie+"<br>"+document.getElementById("ruchy_w").innerHTML;
}
//wypisuje ruchy na stronie
function pat_mate() {
  turn=true;
  let krolB,krolC,r;
  for (var i = 0; i < 64; i++) {
    if(document.getElementById("pole"+i).innerHTML==p[0][p[6]]) krolB=i;
    if(document.getElementById("pole"+i).innerHTML==p[0][p[12]]) krolC=i;
  }
  if(zmia==true) return true;
  for (var i = 0; i < 64; i++) {
    if(tura%2==0)
    {
      if(pion_kod(document.getElementById("pole"+i).innerHTML)[0]=="B")
        {
          for (var j = 0; j < 64; j++) {
            if(sprawdz_(i,j)==true)
            {turn=false; return false;}
          }
          r="B";
        }
    }
    else
    {
      if(pion_kod(document.getElementById("pole"+i).innerHTML)[0]=="C")
        {
          for (var j = 0; j < 64; j++) {
            if(sprawdz_(i,j)==true)
            {turn=false; return false;}
          }
          r="C";
        }
    }
  }
  mat=false;
  switch (r) {
    case "B":
      for (var i = 0; i < 64; i++) {
        if((sprawdz_(i,krolB)==true)||(mat==true))
        {theend=true;
          document.getElementById("koniec").style="z-index: 0; visibility: visible;";
          document.getElementById("Szachownica").style="cursor: default;";
          document.getElementById("koniec").innerHTML="Koniec Gry<br>Wygrał Czarny!<br><i>l</i><br><a id=\"schowaj\">X</a>";
          document.getElementById("schowaj").onclick = function() {document.getElementById("koniec").style="z-index: -5;";document.getElementById("koniec").style.visibility="hidden;";}
          console.log("Koniec gry Czarny wygrał!");
          turn=false; return true;}
      }
      break;
    case "C":
      for (var i = 0; i < 64; i++) {
        if((sprawdz_(i,krolC)==true)||(mat==true))
        {theend=true;
          document.getElementById("koniec").style="z-index: 0; visibility: visible;";
          document.getElementById("Szachownica").style="cursor: default;";
          document.getElementById("koniec").innerHTML="Koniec Gry<br>Wygrał Biały!<br><i>k</i><br><a id=\"schowaj\">X</a>";
          document.getElementById("schowaj").onclick = function() {document.getElementById("koniec").style="z-index: -5;";document.getElementById("koniec").style.visibility="hidden;";}
          console.log("Koniec gry Biały wygrał!");
          turn=false; return true;}
      }
      break;
    default:
      console.log("Błąd funkcji \"pat_mate\" "+r);
  }
  theend=true;
  document.getElementById("koniec").style="z-index: 0; visibility: visible;";
  document.getElementById("Szachownica").style="cursor: default;";
  document.getElementById("koniec").innerHTML="Koniec Gry<br>Remis!<br><a id=\"schowaj\">X</a>";
  document.getElementById("schowaj").onclick = function() {document.getElementById("koniec").style="z-index: -5;";document.getElementById("koniec").style.visibility="hidden;";}
  console.log("Pat nikt nie wygrał");
  turn=false;mat=false;
  return true;
}
//sprawdza czy jest pat lub mat i zawiesza gre
function reset() {
  tura=0;
  wiezaB=[false,false];
  wiezaC=[false,false];
  krol=[false,false];
  turn=false; turn2=false;
  zmia=false; mat=false;
  wypisanie=""; koni=false;
  admin=false;
  przelot=0;
  theend=false;
  pola_cerw=[64,64,0];
  document.getElementById("Pole_sz").innerHTML="";
  create_sz();
  pocz_ulozenie();
  dod_przy();
}
//resetuje planszę
function cofnij() {
  if(tura==0) return false;
  pionek_pol=ruchy[tura-1][0];
  _pol=ruchy[tura-1][1];
  pionek_cel=ruchy[tura-1][2];
  _cel=ruchy[tura-1][3];
  _przelot=ruchy[tura-1][4];
  if(tura>=2)_wiezaB=ruchy[tura-2][5];
  if(tura>=2)_wiezaC=ruchy[tura-2][6];
  if(tura>=2)_krol=ruchy[tura-2][7];
  _theend=ruchy[tura-1][8];
  _zapis=ruchy[tura-1][9];
  if(tura>=2)_czerw=ruchy[tura-2][10];
  delete ruchy[tura];
  if(_przelot!=0) {
    if(pion_kod(pionek_pol)=="BP")
    document.getElementById("pole"+(_przelot+8)).innerHTML=kod_pion("CP");
    if(pion_kod(pionek_pol)=="CB")
    document.getElementById("pole"+(_przelot-8)).innerHTML=kod_pion("BP");
  }
  if(pion_kod(pionek_pol)[1]=="K")
  {
    if(pion_kod(pionek_pol)[0]=="B")
    {
      if(_pol+2==_cel)
      {document.getElementById("pole63").innerHTML=kod_pion("BW");
      document.getElementById("pole61").innerHTML=kod_pion("&nbsp;");}
      if(_pol-2==_cel)
      {document.getElementById("pole56").innerHTML=kod_pion("BW");
      document.getElementById("pole59").innerHTML=kod_pion("&nbsp;");}
    }
    if(pion_kod(pionek_pol)[0]=="C")
    {
      if(_pol+2==_cel)
      {document.getElementById("pole7").innerHTML=kod_pion("CW");
      document.getElementById("pole5").innerHTML=kod_pion("&nbsp;");}
      if(_pol-2==_cel)
      {document.getElementById("pole0").innerHTML=kod_pion("CW");
      document.getElementById("pole3").innerHTML=kod_pion("&nbsp;");}
    }
  }
  document.getElementById("pole"+_pol).innerHTML=pionek_pol;
  if((pionek_cel=="P")||(pionek_cel=="O"))
  {document.getElementById("pole"+_cel).innerHTML=pionek_cel;}
  else
  {document.getElementById("pole"+_cel).innerHTML=pionek_cel;}
  przelot=_przelot;
  if(tura>=2) wiezaB=_wiezaB;
  if(tura>=2) wiezaC=_wiezaC;
  if(tura>=2) krol=_krol;
  theend=_theend;
  if(tura>=2)pola_cerw=_czerw;
  document.getElementById("ruchy_w").innerHTML=_zapis;
  tura=tura-1;
  if(tura%2==0) {
    document.getElementById("kto").style = "background-color: white; border-color: black;";
  }
  else {
    document.getElementById("kto").style = "background-color: black; border-color: white;";
  }
  dod_przy();
}
function Dodaj_styl() {
  console.log("Dodaje style...");
  document.head.innerHTML+= "<link rel=\"stylesheet\" type=\"text/css\" href=\"style_chess.css\">";
  console.log("Style dodane");
}
