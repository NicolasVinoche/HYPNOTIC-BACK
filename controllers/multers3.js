const AWS = require('aws-sdk'); 
const multer = require('multer');
const multerS3 = require('multer-s3'); 
const { uuid } = require('uuidv4'); 
const path = require('path');  

module.exports = { 

  newPack: async function(req, res, next) {
        title = req.body.title;
        description = req.body.description;
        price = req.body.price;
        tag = req.body.tag;
        file = req.file.file;  
        
        console.log(file);

    try {

        var creds = new AWS.Credentials({
            accessKeyId: 'AKIAYDMZRXLLOEPMOD7J', secretAccessKey: '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'
            });
        
            // Create S3 service object
        const s3 = new AWS.S3({apiVersion: '2006-03-01', 
                            credentials: creds}); 
        
        const upload = multer({
            storage: multerS3({
                s3, 
                bucket: 'hypnotic-peafowl', 
                acl: 'public-read-write',
                metadata: (req, file, cb) => { 
                    cb(null, { fieldName: file.fieldname});    
                }, 
                key: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    cb(null, `${uuid()}${ext}`);
                }
            }) 
        }); 
        
        upload.single(file, async function (err, data) {

            if (err) {
                console.log("Error", err);
            } else {
                console.log("Upload Success", data);

                const newpack = await packDataMapper.insertPack(title, description, price, tag, data.Location);
                console.log(newpack);
                return res.status(200).json ({newpack}); 
            }
        })
        
        
        } catch (error) {
            next(error)
        }

    
    }
    
}

