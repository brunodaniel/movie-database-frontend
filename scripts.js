const lista = document.getElementById('lista')

const apiUrl = 'http://localhost:3000/filmes';

let titulo = document.getElementById('titulo');
let poster = document.getElementById('poster');
let genero = document.getElementById('genero');
let nota = document.getElementById('nota');

let edicao = false;
let idEdicao = 0;






//GET
const getFilmes = async () => {
    
    const response = await fetch(apiUrl)
    
    const filmes = await response.json();

    console.log(filmes);

    
        filmes.map((filme) => {
            lista.insertAdjacentHTML('beforeend', `
            <div class="col">
                <div class="card">
                <img src="${filme.poster}" class="card-img-top" alt="poster do filme">
                <div class="card-body">
                    <h5 class="card-title">${filme.titulo} </h5>
                    <span class="badge bg-primary">${filme.genero}</span>
                    <span class="badge bg-primary">${filme.statusFilme}</span>
                    <span class="badge bg-success">&#9733 ${filme.nota}</span>

                    <div>
                        <button class="btn btn-primary mt-4" onclick="editFilme('${filme.id}')">Editar</button>
                        <button class="btn btn-danger mt-4" onclick="deleteFilme('${filme.id}')">Excluir</button>
                   </div>
                    
                </div>
                </div>
            </div>
            `)
        })
    


}


//POST
const submitForm = async (event) => {
    
    event.preventDefault();

    
    const filme = {
        titulo: titulo.value,
        poster: poster.value,
        genero: genero.value,
        nota: nota.value,
        statusFilme: statusFilme.value
    }
    

    if(edicao) {
        putFilme(filme, idEdicao);
    } else {
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';
}

const createFilme = async(filme) => {
    
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    
    const response = await fetch(request)
        
    ;

    const result = await response.json();
    
    alert(result.message)
    clearFields();
    getFilmes();

}

//PUT
const putFilme = async(filme, id) => {
    
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    
    const response = await fetch(request);

    const result = await response.json();
    
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getFilmes();
}


//DELETE
const deleteFilme = async (id) => {
    
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}

//GET by ID
const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}



const editFilme = async (id) => {
    edicao = true;
    idEdicao = id;

   
    const filme = await getFilmeById(id);

   
    titulo.value = filme.titulo;
    poster.value = filme.poster;
    genero.value = filme.genero;
    nota.value = filme.nota;
    statusFilme.value = filme.statusFilme;
}


const clearFields = () => {
    titulo.value = "";
    poster.value = "";
    genero.value = "";
    nota.value = "";
    statusFilme.value = "";
}

getFilmes();
