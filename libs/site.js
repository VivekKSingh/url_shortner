/**
 * @param {number} publisherId
 * @param {Client} client
 * @throws {error}
 * @constructor
 */

//Sample placement object.
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

var Site = function(publisher, client) {
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
Site.prototype.getDefaultSite = function(cb) {
    if(! this.id) {
        return cb(Error('You must create a publisher before retrieving its information.'));
    }

    //if we've already requested the info from the API, just return the same result
    if(this.error || this.data) {
        return cb(this.error, this.data);
    }

    var client = this.client;
    var siteInfoRequestUrl = client.options.url + '/site?publisher_id=' + this.id;

    client.request('GET', siteInfoRequestUrl, { token: client.token }, function(err, body) {
        if(err) {
            this.error = err;
            return cb(err);
        }

        this.data = body.sites[0].id;


        return cb(null, body.sites[0].id);
    }.bind(this));
};

module.exports = Site;
