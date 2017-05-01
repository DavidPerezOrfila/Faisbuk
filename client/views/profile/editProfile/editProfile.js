Template.editProfile.helpers({
    'editarPerfil': function() {
        var currentUser = Meteor.user();
        var profile = currentUser.profile;
        return profile;
    }
});


Template.editProfile.events({
            'submit [name=editProfileForm]': function(event) {
                    event.preventDefault();
                    var self = this;
                    var currentUser = Meteor.user();
                    var userId = currentUser._id;

                    var firstname = $('[name="firstname"]').val();
                    var lastname = $('[name="lastname"]').val();
                    var gender = $('[name="gender"]').val();
                    var street = $('[name="street"]').val();
                    var city = $('[name="city"]').val();
                    var state = $('[name="state"]').val();
                    var postalcode = $('[name="postalcode"]').val();

                    Meteor.users.update({
                        "_id": userId
                    }, {
                        $set: {
                            "profile.firstname": firstname,
                            "profile.lastname": lastname,
                            "profile.gender": gender,
                            "profile.location.street": street,
                            "profile.location.city": city,
                            "profile.location.state": state,
                            "profile.location.postcode": postcode,


                        }
                    });
}});
