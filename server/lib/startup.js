/*
Para poder añadir automáticamente los usuarios se necesita tener instalado
un paquete de Meteor, ejecutando la siguiente orden: meteor add http
*/
Meteor.startup(function() {
    var users = Meteor.users.find().count();
    if(!users) {
        for(var i = 0; i < 100; i++){
            HTTP.get('https://api.randomuser.me/?nat=es', {
            data: { some: 'json', stuff: 1 }
          }, function(err,res){
                var fields = res.data.results[0];
                delete fields.login.salt;
                delete fields.login.md5;
                delete fields.login.sha1;
                delete fields.login.sha256;
                delete fields.registered;
                delete fields.dob;
                delete fields.login.password;
                fields.firstname = fields.name.first;
                fields.lastname = fields.name.last;
                var user = {
                    username: fields.firstname+fields.lastname,
                    email: fields.email,
                    password:"123456",
                    profile: fields

                }
                delete fields.name.first;
                delete fields.name.last;
                delete fields.login.username;
                Accounts.createUser(user);
                console.log(fields);
              
            })
        }
    }


})
