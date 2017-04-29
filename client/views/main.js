import { Collection2 } from 'meteor/aldeed:collection2-core';
import { AutoForm } from 'meteor/aldeed:autoform';

import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
AutoForm.setDefaultTemplate('materialize');
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
    location: {
        type: Object
    },
        'location.street': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
    		optional: true
    	},
        'location.city': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
    		optional: true
    	},
        'location.state': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
    		optional: true
    	},
        'location.postcode': {
    		type: String,
    		regEx: /^[a-zA-Z]{2,25}$/,
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
	  insert: function () { return true; },
	  update: function () { return true; },
	  remove: function () { return true; }
});
