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
        fullname: function() {
            var username = Router.current().params.username;
            var user = Meteor.users.findOne({
                username: username
            });
            return user ? user.profile.firstname + " " + user.profile.lastname : null;
        },
        profilePicture: function() {
            var username = Router.current().params.username;
            var user = Meteor.users.findOne({
                username: username
            });
            return user ? user.profile.picture.large : null;
        },
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
        /*Esta función comprueba si el usuario que está logueado es el propietario del perfil y a su vez cambia el botón
        añadir amigo por editar perfil*/
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

        usuarios: function() {

            var usuarios = Meteor.users.find({});

            return usuarios;
        }
    })


Template.profileDetails.events({
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
