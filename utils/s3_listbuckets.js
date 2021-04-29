// Load the Kit SDK pour JavaScript
var AWS = require('aws-sdk'); 

var creds = new AWS.Credentials({
  accessKeyId: 'AKIAYDMZRXLLOEPMOD7J', secretAccessKey: '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'
});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01', 
                  credentials: creds});
   var bucketParams = {
  Bucket : 'hypnotic-peafowl',
   //Key: 'téléchargements/pack-sample/HYPNOTIC PEAFOWL - Archive Vol 1.zip'
       };

// Call S3 to list the buckets
module.exports = {

  getObject: async function(req, res, next){

    const list = s3.listObjects(bucketParams, function(err, data, res) {
      if (err) {
        console.log("Error", err);
      } else {
          for (const element of data.Contents) {
          const key = element.Key;
          s3 = new AWS.S3({apiVersion: '2006-03-01', 
                            credentials: creds});
             var bucketParams = {
            Bucket : 'hypnotic-peafowl',
            Key: key
          };
         var name = element.Key
         
          var name = name.split('.');
          var name = name[0]
    
        // console.log("Name :", name);
    
        var url = s3.getSignedUrl('getObject', bucketParams);
        
          
          var url = url.split('?');
          var url = url[0]
    
        //   console.log('URL :', url);
          
          console.log(({url, name}))
          
        //   return res.status(400).json({url, name});
        

    }
}
}); 
}()

}