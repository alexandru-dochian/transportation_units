export default class DOMHelper {
    public static getHTMLText(textString: string): Text {
        return <Text>document.createTextNode(textString);
    }
}
