const routes = require('next-routes')();


routes

.add('/login', '/login')
.add('/id/:accountInfo', '/onlyCreate')
.add('/it/:accountInfo' , '/middle')
.add('/bit/:accountInfo' , '/middle2')
.add('/ind/:accountInfo' , '/index2')
.add('/index/:accountInfo', '/onlyCreate')
.add('/myCampaigns/:accountInfo' , '/myCampaigns')
.add('/details/:accountInfo/:address', '/onlyView')
.add('/campaigns/:accountInfo' , '/campaigns/new')
.add('/campaigns/:accountInfo/:address' , '/campaigns/show')
.add('/transactions/:accountInfo' , '/transactions' )
.add('/int/:address','/InternalT')
.add('/accessebility/:accountInfo' , '/accessebility' )
.add('/campaigns/:accountInfo/:address/requests' , '/campaigns/requests/index')
.add('/campaigns/:accountInfo/:address/requests/new', '/campaigns/requests/new')
.add('/updates/:accountInfo/:address' , '/campaigns/newUpdate')


module.exports = routes;

