function mostrarDigimon(digimon) {
    var digimonInfo = document.getElementById("digimonInfo");

    // Remover a classe de animação, forçando o reflow, e adicioná-la novamente
    digimonInfo.classList.remove("animate");
    void digimonInfo.offsetWidth;
    digimonInfo.classList.add("animate");

    digimonInfo.innerHTML = `
        <img src="${digimon.img}" alt="${digimon.name}" class="img-fluid">
    `;
}

function nomesPopularesDigimon() {
    var level = document.getElementById("level").value;
    var loading = document.getElementById("loading");
    loading.style.display = "block";
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
            loading.style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = "none";
        });
}

function pegarDigimon() {
    var name = document.getElementById("name").value;
    var loading = document.getElementById("loading");
    var button = document.querySelector("button");
    loading.style.display = "block";
    button.disabled = true;
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
        .then(response => response.json())
        .then(data => {
            mostrarDigimon(data[0]);
            loading.style.display = "none";
            button.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = "none";
            button.disabled = false;
        });
}

// Inicializa a lista de nomes populares ao carregar a página
document.addEventListener('DOMContentLoaded', nomesPopularesDigimon);