require('module-alias/register')
const multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')
const response = require('@helpers/http/response')
const { generateUuidV4 } = require('@helpers/string/generate')
require('dotenv').config()

const uploadFile = (folderName, fieldName, isMultiple = false) => (req, res, next) => {
  const fieldArray = Array.isArray(fieldName) ? fieldName : [fieldName]
  const arrayOfObjects = fieldArray.map((fieldName) => ({ name: fieldName }))

  const upload = isMultiple
    ? multer({
      storage: FirebaseStorage({
        bucketName: process.env.FIREBASE_BUCKET_NAME,
        credentials: {
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
          projectId: process.env.FIREBASE_PROJECT_ID
        },
        directoryPath: `images/${folderName}`,
        nameSuffix: `_${generateUuidV4()}`,
        public: true
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

        if (!allowedMimeTypes.includes(file.mimetype))
          return callback(new Error('Invalid file type. Only jpg, png image files are allowed.'))

        callback(null, true)
      },
      limits: {
        fileSize: 3 * 1024 * 1024 // 3 MB (max file size)
      }
    }).fields(arrayOfObjects)
    : multer({
      storage: FirebaseStorage({
        bucketName: process.env.FIREBASE_BUCKET_NAME,
        credentials: {
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
          projectId: process.env.FIREBASE_PROJECT_ID
        },
        directoryPath: `images/${folderName}`,
        nameSuffix: `-${generateUuidV4()}`,
        public: true
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

        if (!allowedMimeTypes.includes(file.mimetype))
          return callback(new Error('Invalid file type. Only jpg, png image files are allowed.'))

        callback(null, true)
      },
      limits: {
        fileSize: 3 * 1024 * 1024 // 3 MB (max file size)
      }
    }).single(fieldArray[0])

  upload(req, res, (error) => {
    if (error) return response.failed(res, 400, error)

    next()
  })
}

module.exports = uploadFile