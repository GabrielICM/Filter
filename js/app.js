const resultados = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const busqueda = [marca,year,minimo,maximo,puertas,transmision,color];

const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : ''   ,
}

document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos();
    llenarSelect(); //años
    busquedaRapida();
})

function mostrarAutos() {
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} - ${transmision }- ${precio} - ${color}
        `;
        resultados.appendChild(autoHTML);
    });
}

function llenarSelect(){
    const añosSelect = autos.reduce((acc,auto) => {
        if(!acc.includes(auto.year)){
            acc.push(auto.year);
        }
        return acc;
    },[]);

    añosSelect.sort();

    añosSelect.forEach(años =>{
        yearHTML = document.createElement('option');
        yearHTML.textContent = `${años}`;
        year.appendChild(yearHTML);
    });
}

function busquedaRapida() {
    busqueda.forEach(select => {
        select.addEventListener('change', (e) =>{
            datosBusqueda[e.target.id] = e.target.value;

            filtrarAutos();
        });
    });
}

function filtrarAutos() {

    const resultado = autos.filter(filtrarMarca).filter(filtrarYear)
                            .filter(filtrarPMinimo).filter(filtrarPMaximo)
                            .filter(filtrarPuertas).filter(filtrarTransmision)
                            .filter(filtrarColor);

    eliminarHTML();

    mostrarFiltrado(resultado);

}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarPMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= parseInt(minimo);
    }
    return auto;
}

function filtrarPMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= parseInt(maximo);
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;    
    }
    return auto;
}

function mostrarFiltrado(resultado) {
    if(resultado.length === 0){
        const sinResultadoHTML = document.createElement('div');
        sinResultadoHTML.classList.add('alerta','error');
        sinResultadoHTML.textContent = 'Sin resultados';
        resultados.appendChild(sinResultadoHTML);

        console.log(resultado);
    }
    else{
        resultado.forEach(auto => {
            const {marca, modelo, year, puertas, transmision, precio, color} = auto;
            const autoHTML = document.createElement('p');
            autoHTML.textContent = `
                ${marca} ${modelo} - ${year} - ${puertas} - ${transmision }- ${precio} - ${color}
            `;
            resultados.appendChild(autoHTML);
        });
    }
}

function eliminarHTML(){
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild);
    }
}