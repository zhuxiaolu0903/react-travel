declare module "*.css" {
    const css: { [key: string]: string }
    export default css;
}

interface Window {
    axios: any;
}
