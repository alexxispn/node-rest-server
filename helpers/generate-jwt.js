import jwt from 'jsonwebtoken';

export default (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name};
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Could not generate the token');
            } else {
                resolve(token);
            }
        });
    });
}
