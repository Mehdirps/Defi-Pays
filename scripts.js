let datalist = document.querySelector("datalist");
let template = document.querySelector(".pays");

fetch('https://restcountries.com/v3.1/all', {})
    .then(response => response.json())
    .then(country => {
        for (let compteur = 0; compteur < country.length; compteur++) {

            let clone = document.importNode(template.content, true);
            let option = clone.querySelector("option");
            option.value = country[compteur].name['common'];

            datalist.appendChild(clone);

        }

        document.querySelector("button").addEventListener("click", () => {

            nomPays = document.querySelector("input").value;

            if (nomPays !== "") {

                fetch('https://restcountries.com/v3.1/name/' + nomPays + '?fullText=true', {})

                    .then(response => response.json())
                    .then(json => {
                        let capital = document.querySelector(".capital");
                        let population = document.querySelector(".population");
                        let drapeau = document.querySelector(".drapeau");

                        if (!json[0].capital) {
                            capital.textContent = "Ce pays n'a pas de capitale"
                        } else {
                            capital.textContent = "Capital: " + json[0].capital[0];
                            population.textContent = "Population: " + json[0].population;
                            drapeau.textContent = "Flag: " + json[0].flag;
                        }


                    })
                    .catch(error => console.log);
            }
        })
    })
    .catch(error => console.log);