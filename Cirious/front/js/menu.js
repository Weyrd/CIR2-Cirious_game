let sanshandicap = document.getElementById("sanshandicap");
let myope = document.getElementById("myopie");
let aveugle = document.getElementById("cecite");
let parkinson = document.getElementById("parkinson");

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
    document.getElementById("desc").innerText = "Devenez aveugle et apprenez a vous reperer sans vos yeux pour vous guider. Les sons deviendront alors d'une extreme importance."
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