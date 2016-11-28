import Backbone from 'backbone';
import $ from 'jquery';

import OAuth from '../Oauth';
import Place from '../Models/Place';
import config from '../config';

export default Backbone.Collection.extend({
    model: Place,
    // getToken() {
    //     $.ajax({
    //         type: 'POST',
    //         url: 'https://api.yelp.com/oauth2/token',
    //         header: {
    //             contentType: 'application/x-www-form-urlencoded'
    //         },
    //         data: {
    //             grant_type: 'client_credentials',
    //             client_id: 'i66xSFhQlaXypiKju1sGeg',
    //             client_secret: 'YUy89JQeC1j3tZcTYNZp9gI96uogeoXeNdd9obi3zkPClD6EX2j2XwVk7REkCPYi'
    //         },
    //         dataType: 'jsonp',
    //         success: (response) => {
    //             console.log(response);
    //         }
    //     });
    // },
    searchEvents(term, longitude, latitude) {
            function cb(data) {
                    console.log(data);
            }


                var terms = 'Events',term;
                var near = 'Austin';

                var accessor = {
                    consumerSecret : config.consumerSecret,
                    tokenSecret : config.accessTokenSecret
                };

                var parameters = [];
                parameters.push(['term', terms]);
                parameters.push(['location', near]);
                parameters.push(['callback', 'cb']);
                parameters.push(['oauth_consumer_key', config.consumerKey]);
                parameters.push(['oauth_consumer_secret', config.consumerSecret]);
                parameters.push(['oauth_token', config.accessToken]);
                parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

                var message = {
                    'action' : 'https://api.yelp.com/v2/search',
                    'method' : 'GET',
                    'parameters' : parameters
                };

                OAuth.setTimestampAndNonce(message);
                OAuth.SignatureMethod.sign(message, accessor);

                var parameterMap = OAuth.getParameterMap(message.parameters);

                $.ajax({
                    'url' : message.action,
                    'data' : parameterMap,
                    'dataType' : 'jsonp',
                    'jsonpCallback' : 'cb',
                    'cache': true
                })
                .done(function(data, textStatus, jqXHR) {
                        console.log(data);
                    }
                )
                .fail(function(jqXHR, textStatus, errorThrown) {
                                    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                        }
                );

    }
});
