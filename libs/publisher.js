/*global module */

/**
 * @param {number} publisherId
 * @param {Client} client
 * @throws {error}
 * @constructor
 */

 //Sample publisher object.
 // publisher: {
 //   name: this.name,
 //   currency: "USD",
 //   code: "20123",
 //   expose_domains: true,
 //   reselling_exposure: "public",
 //   ad_quality_advanced_mode_enabled: true,
 //   managed_cpc_bias_pct: 100,
 //   managed_cpa_bias_pct: 100
 // }

var Publisher = function(publisher, client) {
  //add the client object to the Campaign
  if(! client) {
    throw new Error('You must provide an AppNexus Client to create a new Campaign.');
  }

  this.client = client;
  this.publisher = publisher;

  //if we're retrieving an existing campaign, then store the ID and grab its data from AppNexus
  if(this.publisher) {
    this.id = this.publisher.id;
  }

  if(this.publisher.name) {
    this.name = this.publisher.name;
  }
};

/**
 * retrieves the publisher's data from teh AppNexus API
 *
 * @param {function({Error}, {Publisher})} cb
 */
Publisher.prototype.getInfo = function(cb) {
  if(! this.id) {
    return cb(Error('You must create a publisher before retrieving its information.'));
  }

  //if we've already requested the info from the API, just return the same result
  if(this.error || this.data) {
    return cb(this.error, this.data);
  }

  var client = this.client;
  var publisherInfoRequestUrl = client.options.url + '/publisher?id=' + this.id;

  client.request('GET', publisherInfoRequestUrl, { token: client.token }, function(err, body) {
    if(err) {
      this.error = err;
      return cb(err);
    }

    this.data = body.publisher;

    return cb(null, body.publisher);
  }.bind(this));
};

/**
 * retrieves the publisher's data from teh AppNexus API
 *
 * @param {function({Error}, {Publisher})} cb
 */
Publisher.prototype.addPublisher = function(cb) {
  console.log("Adding a publisher." + this.publisher.name);
  // if(! this.id) {
  //   return cb(Error('You must create a publisher before retrieving its information.'));
  // }

  //if we've already requested the info from the API, just return the same result
  // if(this.error || this.data) {
  //   return cb(this.error, this.data);
  // }

  var client = this.client;
  var name = this.name;
  var publisherInfoRequestUrl = client.options.url + '/publisher';

  client.request('POST', 'http://api-console.client-testing.adnxs.net/publisher',
  {
    token: client.token,
    publisher: this.publisher
  },
  function(err, body) {
    if(err) {
      this.error = err;
      return cb(err);
    }
    this.data = body;
    console.log(this.data);
    return cb(null, body.publisher);
  }.bind(this));
};

module.exports = Publisher;
