const soap = require('soap');
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

let soapClient;

const initializeSoapClient = async () => {
	try {
		soapClient = await soap.createClientAsync(url);
		console.log('SOAP Client is ready to be used');
		return soapClient;
	} catch (err) {
		console.error(err);
	}
};

module.exports = initializeSoapClient;