Template.topnav.onCreated(function(){
    var self = this;
    self.autorun(function(){
        var subscription = self.subscribe("friendRequests");
        if(subscription.ready()) {
            var userIds = [];
            var users = UserEdges.find({requestee: Meteor.userId()}, {fields:{requester:1}}).fetch();
            users.forEach(function(user){
                userIds.push(user.requester)
            })
            self.subscribe("requestingUsersArray", userIds);
        }
    })
})


Template.topnav.events({
    'click .logout':function(){
        Meteor.logout(function(err){
            if(!err) {
                Router.go("/");
            }
        })
    }
})

Template.topnav.helpers({
    fullname:function(user){
        return user ? user.profile.firstname + " " + user.profile.lastname : null;
        //cambiamos user.profile.name.first por user.profile.firstname
    },
    friendRequestCount:function(){
        var user = Meteor.user();
        if(user) {
            var count = UserEdges.find({requestee: user._id, status:"pending"}).count();
            return count > 0 ? count : null;
        }
    }
})

/*Template.search.helpers({
index: () => index, // instanceof EasySearch.Index
})*/
