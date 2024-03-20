function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
// getRandomInt(1, 151);
// console.log("El numero aleatorio es: " + getRandomInt(1, 151));
// es disparado cuando el elemento html ha sido completamente cargado. Escucha eventos para estar a la espera de algo, luego recibe un parametro que es el evento. Va a guardar el numero aleatorio
document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    // random es el parametro ID
    fetchData(random)
});

//Que se espere y cuando nos traiga la info la muestre
const fetchData = async (id)  => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.species.name,
            id: data.id,
            exp: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            def: data.stats[2].base_stat,
            esp: data.stats[3].base_stat
        }
        //Pintar la card con la data que traemos la info
        pintarCard(pokemon);
        
    } catch (error) {
        console.log(error);
    }
}  
// Pintando en la template
const pintarCard = (pokemon) =>{
    // Pintaremos esto donde va la template, en este caso flex, así que lo seleccionamos
    const flex = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    //con esto vamos a modificar el DOM
    const fragment = document.createDocumentFragment();
    clone.querySelector('.card-body-img')
    .setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title')
    .innerHTML = `${pokemon.nombre} <span> ID: ${pokemon.id} hp:  ${pokemon.hp} </span>` ;

    clone.querySelector('.card-body-text').textContent = pokemon.exp + ' exp';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.esp + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.def + 'K';
    fragment.appendChild(clone);
    flex.appendChild(fragment); 
}