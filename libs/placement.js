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

var Site = require('./site');
var Client = require('./Client');

var Placement = function(placement, publisher, client) {
    //add the client object to the Campaign
    if(! client) {
        throw new Error('You must provide an AppNexus Client to create a new Campaign.');
    }

    this.client = client;
    this.publisher = publisher;
    this.placement = placement;

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
Placement.prototype.create = function(cb) {
    console.log("Adding a placement." + this.publisher.name);

    var client = this.client;
    var publisherId = this.publisher.id;
    var placement = this.placement;

    var appNexusClient = new Client("vsingh", "D3vilM@yCry");
    appNexusClient.getDefaultSite(this.publisher, function(err, publisher){
        publisher.getDefaultSite(function(err, data){

            var createPlacementUrl = client.options.url + '/placement?publisher_id='+ publisherId + '&site_id=' + data;
            placement.site_id = data;

            client.request(
                'POST',
                createPlacementUrl,
                {
                    token: client.token,
                    placement: placement
                },
                function(err, body) {
                    if(err) {
                        this.error = err;
                        return cb(err);
                    }
                    this.data = body;
                    console.log(this.data);
                    return cb(null, body.placement);
                }.bind(this)
            );
        })
    });
};

module.exports = Placement;
