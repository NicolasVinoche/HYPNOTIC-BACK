const AWS = require('aws-sdk'); 
const multer = require('multer');
const multerS3 = require('multer-s3'); 
const { uuid } = require('uuidv4'); 
const path = require('path');  
const packDataMapper = require('../dataMappers/packDataMapper'); 

var creds = new AWS.Credentials({
    accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY
    });

    // Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01', 
                    credentials: creds});  

var limits = {
    files: 1, // allow only 1 file per request
    fileSize: 10000 * 1024 * 1024, // (replace MBs allowed with your desires) 
    fieldNameSize: 10000 * 1024 * 1024, 
    fieldSize: 10000 * 1024 * 1024
     };

const upload = multer({ 
    limits: limits,
    storage: multerS3({
        s3, 
        bucket: 'hypnotic-peafowl', 
        acl: 'public-read-write', 
        
        metadata: (req, file, cb) => { 
            console.log('file:', file)
            cb(null, { fieldName: file.fieldname});     
        }, 
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`); 
            console.log(file);
        }, 
        
         location: (req, file, cb) => {
             console.log('file2:', file)
             const url = path.dirname(file.location);
           console.log(file.location);
         }
        
    }) 
 })

module.exports = { 
    
    newPack: upload.single('file'), 

    newTrack: upload.single('file'),

    newAlbum: upload.single('file')
    
}
