function setUp(){
    var jq = document.createElement('script');
    jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    jQuery.noConflict();
}
setUp();
function download(filename) {
    let content = $(".leaderboard tr");
    var element = document.createElement('a');
    element.classList.add("download");
    let text = "";
    content.each((i,e)=>{
        let runner = "";
        for (let elem of e.cells){
            if(elem.innerText.includes("km")){
                runner = runner + "," + strip(elem.innerText.slice(0,-3));
            }else{
                runner = runner + "," + strip(elem.innerText);
            }
        }
        let line = runner.split(",");
        let name = line[2];
        let found = false;
        for( let home of homes){
            let homeName = Object.keys(home)[0];
            let names = Object.values(home)[0];
            names = names.map(function(x){return strip(x.toLowerCase())})
            if(names.includes(strip(name.toLowerCase()))){
                runner = runner + "," + homeName + ",";
                found = true;
            }
            
        }
        runner = runner.slice(1,-1) + "\n";
        if(!found){
            console.log("cant find match for " + name);
        }
        text = text + runner;
    })
    text = text + "\n" + sortTop10(text);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,'+ encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};
function strip(str) {
    return str.toString().replace(/^\s+|\s+$/g, '');
}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;
download(today + '_strava.csv');
function sortTop10(text){
    let top = ""
    let lines = text.split("\n");
    let totals = {};
    for(let home of homes){
        let counter = 0;
        let total = 0;
        let homeName = Object.keys(home)[0];
        top = top + homeName + "\n";
        for(let i=0;i<lines.length;i++){
            if(lines[i].includes(homeName) && counter < 10){
                counter++;
                top = top + lines[i] + "\n";
                total = total + ((parseFloat(lines[i].split(",")[2]*10)/10));
            }
        }
        totals[homeName] = total;
        top = top + "\n";
    }
    let totalLine = "";
    for (let home of homes){
        let homeName = Object.keys(home)[0];
        totalLine = totalLine + homeName + " : " + totals[homeName] + "km\n";
    }
    top = totalLine + "\n" + top;
    return top;
}
var Astrid = {"Astrid":['Robbe Adriaens','Joeri Verschoren','Bart van Balkom','Elien Verbrugge','Isaline Rubens','Hannelore Ohnmacht','Minne De Clercq','Isabelle Loof','Lisa Dangreau','Heike Krenn','Borra Michelle','Michiel van Gendt','Lemmy De Wolf','Emily Ruilova','Brend Buyl','Matthias Scherpereel','Raven Brackx','Kylian Decroix','Jori Van Hove ','Joran Maes','Rien Boete','Jordan Peeters','Michiel Demeyere','Ward Bogaerts ','Pauline Dournez','Juan Gil Ramos','Eliza Bogaert','Jennifer Bosseloirs','Thierry Masure','Ryan Bosseloirs','Axin Van de Maele','Kato Lauwers','Madeleine Hellemans','Tinne Clijmans ','Wouter Depaepe','Thibeau Margo','Merel Verminck','Roxanne Vander Straeten','Julie Van Esbroeck']}
var Bertha = {"Bertha":['Pepijn Warlop','Wim Devis','Ina Beausaert','Kevin Dequirez','Lisa Lambrechts','Britt Dangreau','Robin Dirckx','Amber Van daele','Calvin Chen','Lore Speybroeck 2090204639302']}
var Boudewijn = {"Boudewijn":['Sylas Bridoux','Eva Pyfferoen','Sarah Lavaert','Iebel Crutelle','Joke Pattyn','Hadewig Claeys','Jana Vanhooren','Noa Schoonbaert','Sander M','Michiel Van de Vliet','Sander Van Eenoo','Skyler Geijsen','Alegria Ferri Perez','Lisa Bintein','Hien Lam','Lieselot Lannoo','Jonas Cam','Lore Opgenhaffen','Bo Van Durme','Jenna Klijn','Seppe Lyssens','Byrthe Bomans','Rhandy Delefortrie','Shawn Muller','Lore Vernijns','Rob Canters','Mies Lepla','Lowie Vandyck','Janne Wyseur','Stijn Luchie','Maxim Desmet','Ines Boeckxstaens','Yasmine Dilles','Nio De Backer','Laura Vansteenkiste','Emma Soudant','Michèle Swennen','Dore Lepla','Pauline Storme','Laura Storme','Sander Vanfleteren','Sarah Awad','Jessie Nantongo','Jordy Delvaeye','Joni Mariman','Cindy Buyle','Seppe Van Calster ','Chiara Kerckhof','Vangelis Huyghebaert','Olivia Diopere','Hanne Van Cauwenberghe','Janne Igodt','Timon Gryson','Lennaert Sanders','Wannes Decavel','Wout Baeckelandt','Milan Vrielynck','Yasmine Azzouz','Axelle Vanhaecke','Joran Dorssemont','Thijs Maertens','Sander Van Hauwe','Delphine Hallaert','Moad Liou','Gabriël Cantaert','Gwen Bernaert','Brecht Soulliaert','Lynn Deckmyn','Silke Van Craeyenest','Karo Van Lil','Dries Van Horenbeeck ','Robbe Vandenbussche','Silke Vankeirsbilck','Tine Evens','Zenton Ramos','Febe Vertriest ','Daan Vanhaecke']}
var Fabiola = {"Fabiola":['Elien Cambie','Jenthe De Roover','Robbe Doeven','Ilke Galloo','Jeroen Van Braeckel','Shauni Bernau','Andrea Maelfait','Lotte Van Gool ','Joke Geeraert','Felien Boone','Karine Xian','Clara Van Isterdael','Eefje Raskin','Robbe Devos','Inez Deraedt','Hendrik Van Kerckhoven','Mo Amraia','Sander Van Lippevelde','Lore Tans','Jordi Jaenen ','Julie Joos','Thibaut Allaert','Sam Lambin','Sam De Sutter','Mara Verhaert','Kaat Emmery','Margot Degraeve','Lotte De Cock','Yanena Van Kerckhove','Liam Stappers','Aïsha Deman','Mo Pauwels','Leyna de Vos','Emilie Paice','Jolien Schelstraete','Isa Van Renterghem ','Mike Brants','Tom Willemen ','Kevin Van Lierop','Jil De Deyn','Moyra Van de Velde','Senne Adam','Tim Desmet']}
var Mercator = {"Mercator":['Imen Dakhlaoui','Nienke Demuynck','Cheyenne Peynsaert','Kaat VdH','Michèle Grymonprez','Lore Herremans','Janne Uhawha','Boj_D .','Line Depoortere']}
var Vermeylen = {"Vermeylen":['Joren Verleyen','Laurens Hillaert','Paulien Custers','Bram Broothaers','Tine Blomme','Linde Suchel','Alexander Libeer','Femke Viaene','Xi Wang','Mandy Brants','Guillaume Van Buynder ','Merlijn Paelinck','Melanie Van Sanden','Ben Gyselinck','Milan Felix','Femke De Bolle','Mathijs Vansieleghem','Kato Van Baelen','Jonathan Verheye','Ellen Van Moere',"Tinne D'Ardenne",'Giorgi Chimakadze','Sjoukje Custers','Marie De Groeve','Amelie De Nobele','Liselotte Awouters','Helena Vergauwen','Sara Helsen','Seppe De Schepper','Olivier Dedrie','Miguel Vervacke','Evelien Verellen','Andes Heesterbeek','Anouk DVis','Bram Hofkens','Tessa Behaeghe','Lies De Coen','Thibo Verheyde','Axelle Favril','Evelyne Van Vlasselaer','Teuta Hoxha','Alexander Van de Weghe','Babs Isenbaert','Justine Vandewiele','Wilge De Cneef','Kaat Bottu','Ine Vermander','Dennis Dol','Elena De Roeck','Brecht Reyniers','Alejandro Toledo Polo','Valerie Vervaet','Karel Vansteenhuyse','Cedric Tassenon','Rani Bockstaele','Bieke Clijmans','Justine Janssens','Margo Devos']}
var Savania = {"Savania" :['Amber Moreels','Miranda De Kegel','Jasper Stekelorum','Andreas Vanlerberghe','Marie Meert','Mattis Bouchet','Anna Hendrickx','Geneviève Vaillemans','Brent Vansteenkiste','Hanne Van Puyvelde','Elize Polfliet ','Jolien De Ridder','Gerlinde Claeys','Lander Callens','Wout Robert','Silke Bearelle','Sybilline Deroo','Francis Pauwels']}
var Confabula = {"Confabula":['Gilles Vandewalle','Jonas Veryser','Willem Vandaele','Filip Braet','Nele Haenen','Milan Demaître','Christine Swan','Björn boon','Delphine Monballyu','Koen Breugelmans','Niels Dejonckheere ','Bess Pauwels','Lotte De Bruyn','Lena Vervaet','Florian Dehaene','Frauke Van Kerckhove ','Kelly Bulteel','Joris Guffens ','Laura De Donder','Shania Pinsard','Sean Mylle','Anthony Goemaere','Axelle Gregoire ','Pieter Vandenberghe ','Gill Salu','Hendrik Quintyn','Lies De Man','Liam Viaene','Chayen Fabre','Jasmijn Sluys','Guylian Weverbergh','Wolf De Smet','Laura Huyghe ','Kevin Mylle','Nicky De Waegeneer']}
var homes = [Astrid,Bertha,Boudewijn,Fabiola,Mercator,Vermeylen,Savania,Confabula]