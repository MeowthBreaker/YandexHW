import { color } from './colors';
import { markdown, mdOptionsList, ColorOptions } from './md';
import { colors } from './model';
function isMarkdownOptions(options: ColorOptions) {
    return mdOptionsList.some(key => key in options);
}
function styleImpl(text: string, options: ColorOptions) {
    if (text.length === 0) {
        return text;
    }
    if ('font' in options || 'background' in options || 'effects' in options) {
        return color(text, options);
    }
    if (isMarkdownOptions(options)) {
        return markdown(text, options);
    }
    return text;
}
const colorsObj = new Map(colors.map((color: string) => [color, (text: string) => console.log(style(text, { font: color }))]));
export const style = Object.assign(styleImpl, {
    log: (text: string, options: ColorOptions) => {
        console.log(style(text, options));
    },
    color: (x: string) => {
        const log = colorsObj.get(x);
        return log || console.log;
    },
});
