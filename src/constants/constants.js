module.exports = {
    AUTHORIZATION: 'Authorization',
    ACCESS_TOKEN_EXPIRE_TIME: '10m',
    REFRESH_TOKEN_EXPIRE_TIME: '30d',
    DIALECT: 'mysql',
    NOW: 'NOW',
    CASCADE: 'cascade',
    CAR_MODEL: 'carmodels',
    table_names: {
        CARS: 'cars',
        USERS: 'user',
        TOKEN: 'Token',
    },

    foreign_key: {
        USER_ID: 'user_id',
        ID: 'id',
        CAR_FOREIGN_KEY: 'id'
    },
    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    car_files_types: {
        PHOTO: 'photo',
        DOCUMENT: 'document',
    },
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ],
    EMAIL_SERVICE: 'gmail',
    ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
    CRONE_TIME: '0 0 * * *',
};
