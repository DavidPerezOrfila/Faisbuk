export const Schemas={};
	Schemas.UserProfile = new SimpleSchema({
	    firstName: {
	        type: String,
	        regEx: /^[a-zA-Z-]{2,25}$/,
	        optional: true
	    },
	    lastName: {
	        type: String,
	        regEx: /^[a-zA-Z]{2,25}$/,
	        optional: true
	    },
	    birthday: {
	        type: Date,
	        optional: true
	    },
	    website: {
	        type: String,
	        regEx: SimpleSchema.RegEx.Url,
	        optional: true
	    },
	    bio: {
	        type: String,
	        optional: true
	    }
	});

	Schemas.User = new SimpleSchema({
	    username: {
	        type: String,
	        regEx: /^[a-z0-9A-Z_]{3,15}$/
	    },
	    emails: {
	        type: [Object],
	        optional: true
	    },
	    "emails.$.address": {
	        type: String,
	        regEx: SimpleSchema.RegEx.Email
	    },
	    "emails.$.verified": {
	        type: Boolean
	    },
	    createdAt: {
	        type: Date
	    },
	    profile: {
	        type: Schemas.UserProfile,
	        optional: true
	    },
	    services: {
	        type: Object,
	        optional: true,
	        blackbox: true
	    }
	});
	Meteor.users.attachSchema(Schemas.User);


	Meteor.users.allow({
	    insert: function() {
	        return true;
	    },
	    update: function() {
	        return true;
	    },
	    remove: function() {
	        return true;
	    }
	});
