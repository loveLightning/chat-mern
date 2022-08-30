const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
        cb(null, 'images/')
    },
    filename(req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
})

const types = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req: any, file: any, cb: any) => {
        if (types.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
        }
}

export const uploadFile = multer({
    storage,
    fileFilter
})