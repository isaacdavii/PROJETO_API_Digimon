function nomesPopularesDigimon() {
    var level = document.getElementById("level").value;
    fetch(`https://digimon-api.vercel.app/api/digimon/level/${level}`)
        .then(response => response.json())
        .then(data => {
            var nameSelect = document.getElementById("name");
            nameSelect.innerHTML = "";
            data.forEach(digimon => {
                var option = document.createElement("option");
                option.text = digimon.name;
                option.value = digimon.name;
                nameSelect.add(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

function pegarDigimon() {
    var level = document.getElementById("level").value;
    var name = document.getElementById("name").value;
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
        .then(response => response.json())
        .then(data => {
            mostrarDigimon(data[0]);
        })
        .catch(error => console.error('Error:', error));
}

function mostrarDigimon(digimon) {
    var digimonInfo = document.getElementById("digimonInfo");
    digimonInfo.innerHTML = `
    <h2>${digimon.name}</h2>
    <p>Level: ${digimon.level}</p>
    <img src="${digimon.img}" alt="${digimon.name}">
`;
}

populateDigimonNames();