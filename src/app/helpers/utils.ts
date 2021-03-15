export default class Utils {
    static isNullEmpty(obj: string) {
        return obj == null || obj.trim().length == 0;
    }
    static makeValidURL(url) {
        return url;
    }
}