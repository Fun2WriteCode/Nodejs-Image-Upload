var appVersion = "test"; //live /test 
if (appVersion == "test") {
    var Config = {
        //Global Variables
        MongoDBURL: 'mongodb://saqib:saqib123@ds019633.mlab.com:19633/mytestingapplication',
        fileUploadPath: 'public/uploads/',
        PrivateKey: 'apiKey',
      
    };
} else {
    var Config = {
        //Global Variables
        MongoDBURL: '',
        fileUploadPath: 'public/uploads/',
        PrivateKey: 'myKey',
       
    };
}
module.exports = Config;
