let sanshandicap = document.getElementById("sanshandicap");
let myope = document.getElementById("myopie");
let aveugle = document.getElementById("cecite");
let parkinson = document.getElementById("parkinson");
let fauteuil = document.getElementById("fauteuil");
let credits = document.getElementById("credits");
let help = document.getElementById("help");

sanshandicap.addEventListener("mouseover", function() {
    sanshandicap.innerText = "< Sans handicap >";
    document.getElementById("desc").innerText = "Une personne lambda, sans aucune difficulte pour communiquer avec les autres ou pour effectuer des taches.";
});

help.addEventListener("mouseover", function() {
    help.innerText = "< Help >";
    //document.getElementById("desc").innerText = "C'est l'aide";
});

help.addEventListener("mouseleave", function() {
    help.innerText = "Help";
    document.getElementById("desc").innerText = "";
});

sanshandicap.addEventListener("mouseleave", function() {
    sanshandicap.innerText = "Sans handicap";
    document.getElementById("desc").innerText = "";
});

myope.addEventListener("mouseover", function() {
    myope.innerText = "< Myopie >";
    document.getElementById("desc").innerText = "Vivez au travers d'une personne ayant oublie sa paire de lunettes et ne pouvant alors voir qu'a une distance reduite.";
});

myope.addEventListener("mouseleave", function() {
    myope.innerText = "Myopie";
    document.getElementById("desc").innerText = "";
});

aveugle.addEventListener("mouseover", function() {
    aveugle.innerText = "< Cecite >";
    document.getElementById("desc").innerText = "Devenez aveugle et apprenez a vous reperer sans vos yeux pour vous guider."
});

aveugle.addEventListener("mouseleave", function() {
    aveugle.innerText = "Cecite";
    document.getElementById("desc").innerText = "";
});

parkinson.addEventListener("mouseover", function() {
    parkinson.innerText = "< Parkinson >";
    document.getElementById("desc").innerText = "Tenir des objets est bien difficile... Vous ne pourrez tenir que deux cles simultanement au maximum."
});

parkinson.addEventListener("mouseleave", function() {
    parkinson.innerText = "Parkinson";
    document.getElementById("desc").innerText = "";
});

fauteuil.addEventListener("mouseover", function() {
    fauteuil.innerText = "< Fauteuil roulant >";
    document.getElementById("desc").innerText = "Un accident physique vous a mis dans l'incapacite de vous deplacer normalement ? Pas de panique ! Les infrastructures ont egalement ete pensees pour vous. Enfin, normalement...";
});

fauteuil.addEventListener("mouseleave", function() {
    fauteuil.innerText = "Fauteuil roulant";
    document.getElementById("desc").innerText = "";
});

credits.addEventListener("mouseover", function() {
    credits.innerText = "< Credits >";
});

credits.addEventListener("mouseleave", function() {
    credits.innerText = "Credits";
    document.getElementById("desc").innerText = "";
});
