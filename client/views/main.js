/*import { Collection2 } from 'meteor/aldeed:collection2-core';
import { AutoForm } from 'meteor/aldeed:autoform';

import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
SimpleSchema.extendOptions(['autoform']);
AutoForm.setDefaultTemplate('bootstrap4');
SimpleSchema.debug = true;

export const Schemas = {};
Schemas.UserProfile = new SimpleSchema({
	firstname: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: true
	},
	lastname: {
		type: String,
		regEx: /^[a-zA-Z]{2,25}$/,
		optional: true
	},
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
	birthday: {
		type: Date,
		optional: true
	},
	location:{
		type: Array
	},
    location: {
        type: Object
    },
        'location.$.street': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
    		optional: true
    	},
        'location.$.city': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
    		optional: true
    	},
        'location.$.state': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
    		optional: true
    	},
        'location.$.postcode': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
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
	}

});
Meteor.users.attachSchema(Schemas.User);
Meteor.publish(null, function () {
  return users.find();
});


Meteor.users.allow({
	  insert: function () { return true; },
	  update: function () { return true; },
	  remove: function () { return true; }
});*/
