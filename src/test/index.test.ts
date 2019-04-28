import { BadRequesError, ServerError, HttpErrorCode } from '../utils/http.util';

describe('Testing error classes', () => {
        
    it('Test the ServerError class', () => {

        const serverError = new ServerError();

        expect(serverError).toBeInstanceOf(Error);
        expect(serverError.code).toEqual(HttpErrorCode.internalServerError);
        expect(serverError.status).toEqual(500);
        expect(typeof serverError.message).toEqual('string');
    });

    it('Test the BadRequesError class', () => {

        const serverError = new BadRequesError();

        expect(serverError).toBeInstanceOf(ServerError);
        expect(serverError.code).toEqual(HttpErrorCode.badRequest);
        expect(serverError.status).toEqual(400);
        expect(typeof serverError.message).toEqual('string');
    });

    
    it('Test the ServerError constructor', () => {

        const status = 400;
        const message = "User not found";
        const code = HttpErrorCode.notFound;

        const serverError = new ServerError({ message, status, code });

        expect(serverError).toBeInstanceOf(ServerError);
        expect(serverError.code).toEqual(HttpErrorCode.notFound);
        expect(serverError.status).toEqual(status);
        expect(typeof serverError.message).toEqual('string');

        expect(serverError.message).toEqual(message);
    });

});