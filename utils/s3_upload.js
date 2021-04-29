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

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: 'hypnotic-peafowl', Key: 'Pandoras Box_Full_Layer', Body: ''};
var file = '/home/etudiant/Bureau/Pandoras Box_Full_Layer.png'; process.argv[3];
'Upload Success https://hypnotic-peafowl.s3.amazonaws.com/Pandoras%20Box_Full_Layer.png Key: Pandoras Box_Full_Layer.png Bucket: hypnotic-peafowl'
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});