/*import { Index, MongoDBEngine } from 'meteor/easy:search'

// Client and Server
const index = new Index({

  engine: new MongoDBEngine({
    selector(searchDefinition, options, aggregation) {
      // retrieve the default selector
      const selector = this.defaultConfiguration()
        .selector(searchObject, options, aggregation)

      // options.search.userId contains the userId of the logged in user
      selector.owner = options.search.userId

      return selector
    },
    beforePublish: (action, doc) {
      // might be that the field is already published and it's being modified
      if (!doc.owner && doc.ownerId) {
        doc.owner = Meteor.users.findOne({ _id: doc.ownerId })
      }

      // always return the document
      return doc
    },
    transform: (doc) {
      doc.slug = sluggify(doc.awesomeName)

      // always return the document
      return doc
    }
  }),
  permission: (options) => options.userId, // only allow searching when the user is logged in
});

Tracker.autorun(function () {
  // index instanceof EasySearch.Index
  let docs = index.search('angry').fetch()

  if (docs.length) {
    docs.forEach((doc) => {
      // originalId is the _id of the original document
      makeHappy(doc.__originalId)
    })
  }
})*/
