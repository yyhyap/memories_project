import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            // 'test' >>> secret key to sign jwt
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
            console.log('req.userId is set as: ', req.userId);
        } else {
            // else is Google OAuth
            decodedData = jwt.decode(token);

            // sub >>> the term Google used to differentiate is it single Google single user
            req.userId = decodedData?.sub;
            console.log('req.userId is set as: ', req.userId);
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;