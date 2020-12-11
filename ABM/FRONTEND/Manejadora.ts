/// <reference path="Perro.ts"/>

namespace PrimerParcial
{

export class Manejadora
    {

// RECORDA ESCRIBIR:: tsc -outFile Manejadora2.js Manejadora.ts Mascota.ts Perro.ts

            public static AgregarPerroJSON()
            {
                // Esto es para el XMLHTTPREQUEST.
                let xhr : XMLHttpRequest = new XMLHttpRequest();

                let tamaño : string =(<HTMLInputElement> document.getElementById("tamaño")).value;
                let edad : string = (<HTMLInputElement> document.getElementById("edad")).value;
                let precio : string = (<HTMLInputElement> document.getElementById("precio")).value;
                let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
                let raza : string = (<HTMLInputElement> document.getElementById("raza")).value;
            
                let foto : any = (<HTMLInputElement> document.getElementById("foto"));
                let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
                let pathFoto : string = (path.split('\\'))[2];


                let direccion: string = './BACKEND/agregar_json.php';
                    
                //  creará un objeto de tipo Perro
                let perro = new Entidades.Perro(tamaño,parseInt(edad),parseFloat(precio),nombre,raza,pathFoto);


                // Creo un nuevo form para enviarlo por AJAX.
                let form : FormData = new FormData();

                form.append('foto',foto.files[0]);
                form.append('cadenaJson',perro.ToJson());

                    xhr.open('POST', direccion, true);
                    xhr.setRequestHeader("enctype", "multipart/form-data");
                    xhr.send(form);


                // Comienzo a verificar / validar los estados.
                    xhr.onreadystatechange = () => 
                    {

                        if (xhr.readyState == 4 && xhr.status == 200) 
                        {
                            let retJSON = JSON.parse(xhr.responseText);

                            if(!retJSON.Ok)
                            {
                                console.error("NO se subió la foto!!!");
                            }
                            
                            else
                            {
                                //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                                console.info("Foto subida OK!!!");
                                
                                //direccion de donde se encuentra la foto
                                let path :string="./BACKEND/"+retJSON.pathFoto;

                                //hay que cambiar el "src" para que sepa donde buscar la foto 
                                (<HTMLImageElement> document.getElementById("imgFoto")).src = path;

                                console.log(path);
                            }
                        }
                    }
            }


        public static MostrarPerrosJSON()
        {
                let xhr : XMLHttpRequest = new XMLHttpRequest();

                let form : FormData = new FormData();
    
                form.append('op', "traer");
    
                xhr.open('POST', './BACKEND/traer_json.php', true);
    
                xhr.setRequestHeader("enctype", "multipart/form-data");
    
                xhr.send(form);
    
                xhr.onreadystatechange = () => {
    
                if (xhr.readyState == 4 && xhr.status == 200) 
                {

                //recupero la cadena y convierto a array de json
                let arrayJson =JSON.parse(xhr.responseText) ;
    
                let tabla:string ="";
                tabla+= "<table border=1>";
                tabla+= "<thead>";
                tabla+= "<tr>";
                tabla+= "<td>Tamaño</td>";
                tabla+= "<td>Edad</td>";
                tabla+= "<td>Precio</td>";
                tabla+= "<td>Nombre</td>";
                tabla+= "<td>Raza</td>";
                tabla+= "<td>Foto</td>";
                tabla+= "</tr>";
                tabla+= "</thead>";
    
    
                for(let i=0 ;i<arrayJson.length ;i++ )
                {          
                    tabla+= "<tr>";
    
                    tabla+= "<td>";
                    tabla+= arrayJson[i].tamanio;
                    tabla+= "</td>";
    
                    tabla+= "<td>";
                    tabla+= arrayJson[i].edad;
                    tabla+= "</td>";
    
                    tabla+= "<td>";
                    tabla+= arrayJson[i].precio;
                    tabla+= "</td>";
    
                    tabla+= "<td>";
                    tabla+= arrayJson[i].nombre;
                    tabla+= "</td>";
    
                    tabla+= "<td>";
                    tabla+= arrayJson[i].raza;
                    tabla+= "</td>";
    
                    tabla+="<td>";
    

    
                    //compruebo si existe la imagen
                    var img = new Image();
                    let path : string = arrayJson[i].pathFoto ; 
                    img.src ="./BACKEND/fotos/"+ path ; 
    
            
                    tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";

                    tabla+="</td>";


                    tabla+="</tr>"; 
    
                }

                tabla+="</table>";
    
                (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=tabla;

                }
            }
 
     }

        
        
    }

}