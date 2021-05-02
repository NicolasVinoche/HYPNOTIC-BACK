const AWS = require('aws-sdk'); 
const multer = require('multer');
const multerS3 = require('multer-s3'); 
const { uuid } = require('uuidv4'); 
const path = require('path');  
const packDataMapper = require('../dataMappers/packDataMapper');

var creds = new AWS.Credentials({
    accessKeyId: 'AKIAYDMZRXLLOEPMOD7J', secretAccessKey: '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'
    });

    // Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01', 
                    credentials: creds});  

var limits = {
    files: 1, // allow only 1 file per request
    fileSize: 10000 * 1024 * 1024, // (replace MBs allowed with your desires)
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

  
// upload.single('file'), function (req, res, next) {
          
//  title = req.body.title;
//  description = req.body.description;
//  price = req.body.price;
//  tag = req.body.tag;
//  file = req.file;
//  console.log(title)
//  console.log('URL :', file)

module.exports = { 
    
    newPack: upload.single('file'),
    
}
    // , function(req, res, next) {
          
        // addPack: async function (location) {
        
//     //     try {
//     //         const newpack = await packDataMapper.insertPack(title, description, price, tag, data.Location);
//     //             console.log(newpack);
//     //         return res.status(200).json ({newpack}); 
//     //     } catch (error) {
//     //         next(error)
//     //     }
//     // }
// }


    



        // title = req.body.title;
        // description = req.body.description;
        // price = req.body.price;
        // tag = req.body.tag;
    //     file = req.file;
    //     console.log('REQ :', req);
    //     console.log('REQ.BODY :', req.body);
    //    console.log('REQ.FILE :', req.file);


    //    console.log('REQ FILE :', file);
    //    try {
    //     console.log('JE PASSE ICI')

    //     var creds = new AWS.Credentials({
    //         accessKeyId: 'AKIAYDMZRXLLOEPMOD7J', secretAccessKey: '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'
    //         });
        
    //         // Create S3 service object
    //     const s3 = new AWS.S3({apiVersion: '2006-03-01', 
    //                         credentials: creds}); 
        
    //     const upload = multer({
    //         storage: multerS3({
    //             s3, 
    //             bucket: 'hypnotic-peafowl', 
    //             acl: 'public-read-write',
    //             metadata: (req, file, cb) => { 
    //                 cb(null, { fieldName: file.fieldname});  
    //                 console.log(file);   
    //             }, 
    //             key: (req, file, cb) => {
    //                 const ext = path.extname(file.originalname);
    //                 cb(null, `${uuid()}${ext}`); 
    //                 console.log(file);
    //             }
    //         }) 
    //     }); 

    //     console.log ('JAI FAIS CA');
        
    //     upload.single('file'), (req) => { 

    //         file = req.file; 
    //         console.log('uploaded');
        

    //         //if (err) {
    //           //  console.log("Error", err);
    //         //} else {

    //             // const newpack = await packDataMapper.insertPack(title, description, price, tag, data.Location);
    //             // console.log(newpack);
    //             // return res.status(200).json ({newpack}); 
    //        // }
    //     }
        
        
    //     } catch (error) {
    //         next(error)
    //         console.log(error)
    //     }

    
    


