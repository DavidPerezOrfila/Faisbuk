/**
 * @isMethod true
 * @memberOf Method
 * @function onCreated
 * @summary método que nos crea los detalles del perfil desde la base de datos
 * @locus profileDetails
 * @param {Object} [username] nombre del usuario creado.
 */
Template.profileDetails.onCreated(function() {
    var self = this;
    var username = Router.current().params.username;
    self.autorun(function() {
      username = Router.current().params.username;
      self.subscribe("userData", username, {
        onReady: function() {
          var user = Meteor.users.findOne({
            username: username
          });
          self.subscribe("userFriendCount", user._id);
          self.subscribe("userNewFriends", user._id);
          Meteor.subscribe("userList");

        }
      });
    })
    /**
     * @isMethod true
     * @memberOf Method
     * @function autorun
     * @summary méodo que iniciará el perfil del usuario
     * @locus profileDetails
     * @param {Object} [user] usuario devuelto de la base de datos
     */
    self.autorun(function() {
      if (Template.instance().subscriptionsReady()) {
        var user = Meteor.users.findOne({
          username: username
        });
        if (!user) {
          Router.go("/");
        }
      }
    })

  }),



  Template.profileDetails.helpers({
    /**
     * @isMethod true
     * @memberOf Method
     * @function fullname
     * @summary funcion que nos da el nombre completo del usuario
     * @locus profileDetails
     * @param {Object} [fullname] nombre completo del usuario:
     * se crea a partir del firstname + lastname
     * @param {Object} [username] nombre del usuario.
     */
    fullname: function() {
      var username = Router.current().params.username;
      var user = Meteor.users.findOne({
        username: username
      });
      return user ? user.profile.firstname + " " + user.profile.lastname : null;
    },
    /**
     * @isMethod true
     * @memberOf Method
     * @function profilePicture
     * @summary funcion que nos suministra la foto de perfil
     * @locus profileDetails
     * @param {Object} [username] nombre del usuario
     * @param {Object} [user] imagen de perfil
     */
    profilePicture: function() {
      var username = Router.current().params.username;
      var user = Meteor.users.findOne({
        username: username
      });
      return user ? user.profile.picture.large : null;
    },
    /**
     * @isMethod true
     * @memberOf Method
     * @function friendCount
     * @summary function que nos proporciona los amigos del usuario
     * @locus profileDetails
     * @param {Object} [count] realiza un conteo de los amigos
     * @param {Object} [username] nombre del usuario
     */
    friendCount: function() {
      var username = Router.current().params.username;
      var user = Meteor.users.findOne({
        username: username
      });
      if (user) {
        var count = Counts.findOne({
          _id: user._id
        });
      }
      return count ? count.count : 0;
    },
    /**
     * @isMethod true
     * @memberOf Method
     * @function newFriends
     * @summary function que nos proporciona los nuevos amigos del usuario
     * @locus profileDetails
     * @param {Object} [user] usuario completo devuelto de la base de datos
     * @param {Object} [username] nombre del usuario
     * @param {userArr} array que contiene los amigos del usuario
     */
    newFriends: function() {
      var username = Router.current().params.username;
      var user = Meteor.users.findOne({
        username: username
      });
      var userArr = [];
      if (user) {
        var edges = UserEdges.find({
          $or: [{
            requester: user._id
          }, {
            requestee: user._id
          }],
          status: "accepted"
        }).fetch();
        var friendEdges = _.filter(edges, function(edge) {
          if (edge.requester === user._id || edge.requestee === user._id) {
            if (edge.requester !== user._id) {
              userArr.push(edge.requester)
            } else {
              userArr.push(edge.requestee);
            }
          }
        })
        return user ? Meteor.users.find({
          _id: {
            $in: userArr
          }
        }) : [];
      }

    },
    /**
     * @isMethod true
     * @memberOf Method
     * @function about
     * @summary funcion que nos dara los detalles sobre el usuario
     * @locus profileDetails
     * @param {Object} [user] usuario devuelto de la base de datos
     * @param {Object} [username] nombre del usuario
     */
    about: function() {
      var username = Router.current().params.username;
      var user = Meteor.users.findOne({
        username: username
      });
      return user ? user.profile.location.street + " " +
        user.profile.location.city + ", " + user.profile.location.state + " " + user.profile.location.postalcode : "";
    },
    storyCount: function() {
      var username = Router.current().params.username;
      var user = Meteor.users.findOne({
        username: username
      });
    },
    /**
     * @isMethod true
     * @memberOf Method
     * @function .checkUser
     * @summary Esta función comprueba si el usuario que está logueado es el propietario del perfil y a su vez cambia el botón
     * añadir amigo por editar perfil
     * @locus profileDetails
     * @return propietario
     */
    checkUser: function() {
      var profileUser = Meteor.users.findOne({
        username: Router.current().params.username
      });
      var currentUser = Meteor.user();
      var propietario = false;
      if (currentUser._id === profileUser._id) {
        propietario = true;
      }
      console.log("prueba");
      return propietario;


    },
    /**
     * @isMethod true
     * @memberOf Method
     * @function .usuarios
     * @summary function que nos muestra todos los usuarios registrados
     * @locus profileDetails
     * @return usuarios
     */
    usuarios: function() {

      var usuarios = Meteor.users.find({});

      return usuarios;
    }
  })


Template.profileDetails.events({
  /**
   * @isMethod true
   * @memberOf Method
   * @function .click .add-friend
   * @summary function al pulsar click con la que se envia la petición
   * de amistad
   * @locus profileDetails
   * @param {Object} [requester._id] usuario que envia la petición de amistad
   * @param {Object} [requestee._id] usuario que recibira la petición de amistad
   * @param {Object} [username] nombre del usuario
   */
  'click .add-friend': function() {
    var profileUser = Router.current().params.username;
    var requester = Meteor.user();
    var requestee = Meteor.users.findOne({
      username: profileUser
    });
    if (requester._id !== requestee._id) {
      Meteor.call("addFriend", requester._id, requestee._id, function(err, res) {});
    }

  },


})
