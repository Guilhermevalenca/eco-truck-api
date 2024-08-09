export default abstract class Request {
    abstract validation<T>(data: T): {
        success: boolean,
        errors?: T[],
        data?: T
    };
}