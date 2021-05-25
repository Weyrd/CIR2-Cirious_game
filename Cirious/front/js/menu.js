let sanshandicap = document.getElementById("sanshandicap");
let myope = document.getElementById("myopie");
let aveugle = document.getElementById("cecite");
let parkinson = document.getElementById("parkinson");
let fauteuil = document.getElementById("fauteuil");

sanshandicap.addEventListener("mouseover", function() {
    sanshandicap.innerText = "< Sans handicap >";
    document.getElementById("desc").innerText = "Une personne lambda, sans aucune difficulte pour communiquer avec les autres ou pour effectuer des taches.";
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
    document.getElementById("desc").innerText = "Inserer ici une courte description du mode de jeu"
});

parkinson.addEventListener("mouseleave", function() {
    parkinson.innerText = "Parkinson";
    document.getElementById("desc").innerText = "";
});

fauteuil.addEventListener("mouseover", function() {
    fauteuil.innerText = "< Fauteuil roulant >";
    document.getElementById("desc").innerText = "Un accident physique vous a mis dans l'incapacite de vous deplacer normalement ? Pas de panique ! Les infrastructures ont également été pensées pour vous. Enfin, normalement...";
});

fauteuil.addEventListener("mouseleave", function() {
    fauteuil.innerText = "Fauteuil roulant";
    document.getElementById("desc").innerText = "";
});