"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.COLON_REPLACE = '_-_-_-_';
function createProxyName(name) {
    return name.replace(/:/ug, exports.COLON_REPLACE);
}
function revertProxyName(name) {
    const re = new RegExp(exports.COLON_REPLACE, 'ug');
    return name.replace(re, ':');
}
function getDepth(node, parent) {
    let depth = 0;
    while (node !== parent) {
        depth += 1;
        node = node.parentNode;
    }
    return depth;
}
class ProxyHandler {
    constructor(doc, parserOptions) {
        this.doc = doc;
        this.parserOptions = parserOptions;
    }
    addProxies(el) {
        if (!this.parserOptions.handleNamespaces)
            return;
        const toReplace = [];
        var treeWalker = this.doc.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
            const node = treeWalker.currentNode;
            for (const attr of node.attributes) {
                const colonIndex = attr.name.indexOf(':');
                if (colonIndex > 0 &&
                    attr.name.slice(0, colonIndex + 1) !== 'xmlns:') {
                    node.setAttribute(createProxyName(attr.name), node.getAttribute(attr.name));
                    console.log(node.outerHTML);
                }
            }
            if (node.nodeName.indexOf(':') > 0) {
                toReplace.push({
                    depth: getDepth(node, el),
                    node
                });
            }
        }
        toReplace
            .sort((a, b) => b.depth - a.depth)
            .forEach(rep => {
            const proxyElement = utils_1.renameElement(this.doc, rep.node, createProxyName(rep.node.nodeName));
            utils_1.replaceElement(rep.node, proxyElement);
        });
        return el;
    }
    removeProxies(el) {
        const toReplace = [];
        var treeWalker = this.doc.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
            const node = treeWalker.currentNode;
            for (const attr of node.attributes) {
                if (attr.name.indexOf(exports.COLON_REPLACE) > 0) {
                    node.removeAttribute(attr.name);
                }
            }
            if (node.nodeName.indexOf(exports.COLON_REPLACE) > 0) {
                toReplace.push({
                    depth: getDepth(node, el),
                    node
                });
            }
        }
        toReplace
            .sort((a, b) => b.depth - a.depth)
            .forEach(rep => {
            const originalElement = utils_1.renameElement(this.doc, rep.node, revertProxyName(rep.node.nodeName));
            utils_1.replaceElement(rep.node, originalElement);
        });
        return el;
    }
}
exports.default = ProxyHandler;
