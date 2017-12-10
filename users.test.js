//Inicialización
var Twit = require('twit') //paquete de npm que te permite hacer los Requests de twitter
const expect = require('expect'); // paquete que te permite comparar objectos, arrays, etc
var T = new Twit({
  consumer_key:         'l80xIRZ8xqDSBpoHPjQFxmZ4f', //Tokens y keys que te dan cuando creas una aplicacion en twitter
  consumer_secret:      '2uRoXeWH3HCebsHW8BRSr9bZPprT5HOt2iZwRmZLZ2D1BVcxOP',
  access_token:         '181157950-rT5uWpD5b2giWqjRaBiXXwADv7d3VFavkdyOEj98',
  access_token_secret:  'oTSb1YDAKUOlwdzVQwTdBSEaA22FtHMYq3s1oazT6pdIn',
});
//Caso de Prueba
describe('GET /users/show',() => { //Bloque donde se definen las pruebas sobre la funcionalidad descrita
  it('deberia encontrar un usuario',(done) =>{ //Prueba donde se espera un usuario 
    var username = 'ucabiinf'; // variable donde se guarda el usuario q se desea buscar
    T.get('users/show', {screen_name :username },function (err,data,response){ //'Ejecucion', funcion de Twit que te permite hacer el get de usuario del endpint de Twitter
      expect(data.screen_name).toBe(username); // Aqui hacemos la verificacion donde esperamos que la data que es un JSON con un parametro de scree_name sea igual al username que declaramos
      if (err) done(err); // Si hubo un error lo devolvemos usando la llamada a la funcion done(err)
       else {
         done();
        console.log(data);}// Si no hubo error devolvemos la funcion sin errores, junto a la informacion del usuario 
    });
  });

  it('no deberia encontrar un usuario',(done) =>{ //Prueba donde se espera que no se encuentre el usuario
    var username = 'UsuarioInvalido1234';
    T.get('users/show', {screen_name :username },function (err,data,response){ // Ejecucion
      if (err) done();  //Aqui si hubo un error devolvemos done() la cual significa que la paso la prueba ya que se esperaba un error, el cual era que no se encontro un usuario
      else done(data); // Si existe un usuario se devuelve done con la data del usuario, pero la prueba fallo
    }); //Para saber que err devuelve el error de User not found, eso lo sabemos por el paquete de Twit que lo atrapa
  });

});

//Finalización
after(() => {
  T=null;
})
