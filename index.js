// LLAMANDO ELEMENTOS DEL HTML

const img1 = document.getElementById("img1");
const img2 = document.querySelector("#img2");
const errorApi = document.getElementById("Error");
const seccionFavoritos = document.querySelector('.main_seccion_imagen_favorito_contenedor');
const heartFavorito1 = document.getElementById("heart_favorito1");
const heartFavorito2 = document.getElementById("heart_favorito2");
const form = document.getElementById('uploadingForm');

// FIN DE LLAMANDO ELEMENTOS DEL HTML

// URL ENDPOINTS

const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2";
const API_URL_FAVORITIES = "https://api.thedogapi.com/v1/favourites";
const API_URL_DELETE_FAVORITE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_IMAGE_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';

//FIN URL ENDPOINTS


// MOSTRANDO IMAGEN DE PERROS ALEATORIAS

const dogRandom = async()=> {
    try{
        const res = await (fetch(API_URL_RANDOM));
        const data = await(res).json();

        //LIMPIANDO LAS CLASES DE LOS NODOS heartFavorito1, heartFavorito2

        heartFavorito1.classList.remove('contenedor__imagen__favorito-click');
        heartFavorito2.classList.remove('contenedor__imagen__favorito-click');

        // AGREGANDO EL ATRIBUTO SRC A LOS ELEMENTOS img1 img2
        img1.src = data[0].url;
        img2.src = data[1].url;

        // FIN DE AGREGANDO EL ATRIBUTO SRC A LOS ELEMENTOS img1 img2
         
        // AGREGANDO EVENTOS A LOS BOTONES PARA AGREGAR IMAGEN A FAVORITO

        heartFavorito1.onclick = ()=> {
            heartFavorito1.classList.add('contenedor__imagen__favorito-click');
            agregarPerroFavorito(data[0].id);
        };

        heartFavorito2.onclick = ()=> {
            heartFavorito2.classList.add('contenedor__imagen__favorito-click');
            agregarPerroFavorito(data[1].id);
        };

        // FIN DE AGREGANDO EVENTOS A LOS BOTONES PARA AGREGAR IMAGEN A FAVORITO
        
        console.log(res);
        console.log(data);

    }catch(error){

        console.log(`esto es un error ${error}`);
        errorApi.textContent = `Ocurrío un error ${error}`;
    }
}

// FIN DE MOSTRANDO IMAGEN DE PERROS ALEATORIAS

//MOSTRANDO PERROS FAVORITOS

const dogFavorities = async()=> {
    try{
        const res = await (fetch(API_URL_FAVORITIES,{
            method: 'GET',

            headers:{
                'X-API-KEY':'ea854d2a-455c-412a-8806-1bc2ce027e3c',
            }
        }));
        const data = await res.json();

        console.log("favorities");

        //LIMPIADO LA SECCION 
        seccionFavoritos.innerHTML = '';
        //FIN DE LIMPIADO DE SECCION

        data.forEach(element => {
        
            // CREANDO ELEMENTOS HTML

            const article = document.createElement('article');
            const figure = document.createElement('figure');
            const span = document.createElement('span');
            const i = document.createElement('i');
            const img = document.createElement('img');
            

            // LE AÑADIMOS CLASES A LA ETIQUETA span
            span.className = 'contenedor__imagen__delete';

            //LE AÑADIMOS CLASES A LA ETIQUETA i
            i.className = 'bx bxs-trash bx-tada-hover delete';

            //AÑADIMOS EL EVENTO ELIMINAR AL BOTON

            i.addEventListener('click',()=>{
                eliminarFavorito(element.id);
                console.log(element.id);
            });

            // FIN DE AÑADIMOS EL EVENTO ELIMINAR AL BOTON

            //AGREGAMOS EL ELEMENTO i ADENTRO DEL ELEMENTO span
            span.appendChild(i);

            //AÑADIMOS TEXTO AL ELEMENTRO botonEliminalFavorito



            //AÑADIMOS LA URL AL ELEMENTO IMG Y LE AÑADIMOS EL ATRIBUTO ALT

            img.src = element.image.url;
            img.alt = 'imagen perro favorito';
            
            //AGREGAMOS EL ELEMENTOS DENTRO DE FIGURE
            figure.append(img,span);

            //AGREGAMOS EL ELEMENTO FIGURE DENTRO DE ELEMENTO ARTICLE
            article.append(figure);

            //AGREGAMOS ELEMENTO ARTICLE DENTRO DE LA SECCION
            seccionFavoritos.appendChild(article);

        });


    }catch(error){

        console.log(`esto es un error ${error}`);
        errorApi.innerText = `Ocurrío un error ${error}`;
    }
}

// FIN  DE MOSTRANDO PERROS FAVORITOS

//AGREGANDO PERROS A FAVORITOS

const agregarPerroFavorito = async(id) => {

    try{
        const res = await (fetch(API_URL_FAVORITIES,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'X-API-KEY': 'ea854d2a-455c-412a-8806-1bc2ce027e3c',
            },
            body:JSON.stringify(
                {
                    image_id: id,
                }
            ),
        }));

        const data = await res.json();
        console.log("save");
        console.log(res);
        console.log(data);

    }catch(error){
        console.log(error);
        errorApi.innerText = `Ocurrío un error ${error}`;
    }
}

// FIN DE AGREGANDO PERROS A FAVORITOS

// ELIMINAR PERROS DE FAVORITOS

const eliminarFavorito = async(id) => {

    try{
        
        const res = await fetch(API_URL_DELETE_FAVORITE(id),{
            method: 'DELETE',

            headers:{
                'X-API-KEY':'ea854d2a-455c-412a-8806-1bc2ce027e3c',
            }
        });
        
        dogFavorities();

        const data = await res.json();
        console.log("Delete");
        console.log(res);
        console.log(data);
    }catch(error){
        
        console.log(error);
        errorApi.innerText = `Ocurrío un error ${error}`;
    }
}

// FIN DE ELEMINAR PERROS DE FAVORITO

// FUNCION PARA SUBIR FOTOS DE PERROS

const uploadPerro = async() => {
    
    const formData = new FormData(form);
    console.log(formData.get('file'));

    try{

        const res = await fetch(API_URL_IMAGE_UPLOAD ,{

            method: 'POST',
    
            headers:{
                'X-API-KEY':'ea854d2a-455c-412a-8806-1bc2ce027e3c',
            },
            body: formData,
        });
        const data = res.json();
        const resData = await data;

        const mensaje = document.createElement('p');
        
        mensaje.className = 'uploadingForm-mensaje';
        mensaje.textContent = `Su foto se ha subido con exito, Url: ${resData.url}`;
        form.appendChild(mensaje);
        
        console.log('foto subida');
        console.log(data);

    }catch(error){
        console.log(error);
        errorApi.textContent = `Ocurrio un error ${error}`;
    }
}

// FIN DE FUNCION PARA SUBIR FOTOS DE PERROS

dogRandom();