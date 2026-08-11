(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports, module) {
      (function(global, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module2) {
        "use strict";
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method, wrapper) => {
              return new Proxy(method, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result;
                try {
                  result = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result = Promise.reject(err);
                }
                const isResultThenable = result !== true && isThenable(result);
                if (result !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module2.exports = wrapAPIs(chrome);
        } else {
          module2.exports = globalThis.browser;
        }
      });
    }
  });

  // src/browser.ts
  var import_webextension_polyfill = __toESM(require_browser_polyfill());
  var browser_default = import_webextension_polyfill.default;

  // src/background.ts
  var ADULT_DOMAINS = [
    "pornhub.com",
    "xvideos.com",
    "xnxx.com",
    "xhamster.com",
    "redtube.com",
    "youporn.com",
    "spankbang.com",
    "brazzers.com",
    "onlyfans.com",
    "fansly.com",
    "chaturbate.com",
    "stripchat.com",
    "livejasmin.com",
    "cam4.com",
    "camsoda.com",
    "bongacams.com",
    "myfreecams.com",
    "rule34.xxx",
    "e621.net"
  ];
  var ADULT_KEYWORDS = [
    "porn",
    "xxx",
    "xvideos",
    "xnxx",
    "xhamster",
    "hentai",
    "nsfw",
    "camgirl",
    "camsex",
    "adultcam",
    "escort",
    "onlyfans",
    "chaturbate",
    "stripchat",
    "livejasmin",
    "deepnude",
    "undress",
    "nudify",
    "rule34",
    "xrated",
    "x-rated",
    "sexcam",
    "camwhore"
  ];
  var DEFAULT_POLICY = {
    capabilities: {
      open_tab: true,
      navigate: true,
      close_tab: true,
      list_tabs: true,
      read_page: true,
      click: true,
      type: true,
      submit: true,
      scroll: true,
      reload: true,
      back: true,
      forward: true,
      find_text: true,
      extract: true,
      links: true,
      speak: true,
      stopspeak: true,
      darkmode: true,
      zoom: true,
      copy: true
    },
    forbiddenDomains: [...ADULT_DOMAINS],
    forbiddenKeywords: [...ADULT_KEYWORDS],
    confirmSites: [
      "chase.com",
      "bankofamerica.com",
      "wellsfargo.com",
      "citi.com",
      "citibank.com",
      "capitalone.com",
      "usbank.com",
      "pnc.com",
      "tdbank.com",
      "discover.com",
      "americanexpress.com",
      "amex.com",
      "fidelity.com",
      "schwab.com",
      "vanguard.com",
      "paypal.com",
      "venmo.com",
      "cash.app",
      "stripe.com",
      "coinbase.com",
      "irs.gov",
      "ssa.gov"
    ].map((host) => ({ host, mode: "ask" })),
    confirmKeywords: ["login", "signin", "sign-in", "logon", "auth", "account", "bank", "billing", "checkout", "payment", "pay", "wallet", "transfer", "invoice", "card"],
    // HARD BLOCKS (never run, not even with confirm): purchases, legal signing, sensitive data entry
    purchaseKeywords: [
      "buy now",
      "buy it now",
      "place order",
      "place your order",
      "complete purchase",
      "complete order",
      "confirm purchase",
      "confirm order",
      "confirm and pay",
      "confirm & pay",
      "pay now",
      "pay $",
      "submit payment",
      "proceed to payment",
      "make payment",
      "subscribe and pay",
      "authorize payment",
      "purchase now",
      "pay and confirm",
      "order now",
      "complete payment"
    ],
    legalDomains: [
      "docusign.com",
      "docusign.net",
      "hellosign.com",
      "dropboxsign.com",
      "adobesign.com",
      "echosign.com",
      "na1.echosign.com",
      "signnow.com",
      "pandadoc.com",
      "signeasy.com",
      "esignlive.com"
    ],
    legalKeywords: [
      "e-sign",
      "esign",
      "electronically sign",
      "sign document",
      "sign & submit",
      "agree and sign",
      "legally binding",
      "accept and sign",
      "sign here",
      "apply for a",
      "submit application",
      "power of attorney",
      "notariz",
      "notaris",
      "adopt signature",
      "apply my signature"
    ],
    sensitiveFieldPatterns: [
      "ssn",
      "social security",
      "credit card",
      "debit card",
      "card number",
      "cardnumber",
      "cc-number",
      "cc-num",
      "cvv",
      "cvc",
      "security code",
      "card verification",
      "routing number",
      "account number",
      "bank account",
      "iban",
      "sort code",
      "passport",
      "driver's license",
      "drivers license",
      "license number",
      "tax id",
      "taxpayer",
      "tin",
      "ein",
      "national id",
      "government id",
      "date of birth",
      "dob",
      "mother's maiden"
    ],
    rules: { forbidPasswordTyping: true, forbidSubmitOnSensitive: false, confirmAllSubmits: true, allowBridge: true, forbidPurchases: true, forbidLegalSigning: true, forbidSensitiveData: true }
  };
  var BRIDGE_URL = "ws://localhost:8787";
  async function getPolicy() {
    const { policy } = await browser_default.storage.local.get("policy");
    const p = policy || {};
    const merged = {
      ...DEFAULT_POLICY,
      ...p,
      capabilities: { ...DEFAULT_POLICY.capabilities, ...p.capabilities || {} },
      rules: { ...DEFAULT_POLICY.rules, ...p.rules || {} },
      confirmSites: p.confirmSites || p.confirmDomains?.map((h) => ({ host: h, mode: "ask" })) || DEFAULT_POLICY.confirmSites
    };
    if (!p.seeded) {
      merged.forbiddenDomains = [.../* @__PURE__ */ new Set([...p.forbiddenDomains || [], ...ADULT_DOMAINS])];
      merged.forbiddenKeywords = [.../* @__PURE__ */ new Set([...p.forbiddenKeywords || [], ...ADULT_KEYWORDS])];
      merged.seeded = true;
    }
    return merged;
  }
  async function seedPolicy() {
    await browser_default.storage.local.set({ policy: await getPolicy() });
  }
  browser_default.runtime.onInstalled.addListener(() => {
    seedPolicy();
    try {
      chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    } catch {
    }
  });
  seedPolicy();
  try {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch {
  }
  var hostOf = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      return "";
    }
  };
  var suffixMatch = (host, list) => (list || []).some((d) => host === d || host.endsWith("." + d));
  function forbiddenReason(host, policy) {
    if (suffixMatch(host, policy.forbiddenDomains)) return `${host} is on the forbidden domains list`;
    const k = (policy.forbiddenKeywords || []).find((w) => host.includes(w));
    if (k) return `${host} matches forbidden keyword "${k}"`;
    return null;
  }
  function searchQueryForbidden(url, policy) {
    try {
      const u = new URL(url);
      const q = (u.searchParams.get("q") || u.searchParams.get("query") || u.searchParams.get("p") || "").toLowerCase();
      const isSearch = /google\.|bing\.|duckduckgo\.|yahoo\.|search\./.test(u.hostname) && q;
      if (isSearch) {
        const k = (policy.forbiddenKeywords || []).find((w) => q.includes(w));
        if (k) return `search query matches forbidden keyword "${k}"`;
      }
    } catch {
    }
    return null;
  }
  async function execTool(tool, args = {}) {
    const policy = await getPolicy();
    if (!policy.capabilities[tool]) return { ok: false, error: `blocked: capability "${tool}" is disabled in policy` };
    if (tool === "open_tab" || tool === "navigate") {
      const why = forbiddenReason(hostOf(args.url), policy) || searchQueryForbidden(args.url, policy);
      if (why) return { ok: false, forbidden: true, error: "blocked: " + why };
    }
    switch (tool) {
      case "open_tab": {
        const t = await browser_default.tabs.create({ url: args.url, active: args.active ?? true });
        return { ok: true, tabId: t.id, url: args.url };
      }
      case "navigate": {
        await browser_default.tabs.update(args.tabId ?? await activeTabId(), { url: args.url });
        return { ok: true };
      }
      case "close_tab":
        await browser_default.tabs.remove(args.tabId);
        return { ok: true };
      case "list_tabs": {
        const tabs = await browser_default.tabs.query({});
        return { ok: true, tabs: tabs.map((t) => ({ id: t.id, url: t.url, title: t.title, active: t.active })) };
      }
      case "reload": {
        const id = args.tabId ?? await activeTabId();
        await browser_default.tabs.reload(id);
        return { ok: true };
      }
      case "back": {
        const id = args.tabId ?? await activeTabId();
        try {
          await browser_default.tabs.goBack(id);
        } catch {
          return { ok: false, error: "can't go back" };
        }
        return { ok: true };
      }
      case "forward": {
        const id = args.tabId ?? await activeTabId();
        try {
          await browser_default.tabs.goForward(id);
        } catch {
          return { ok: false, error: "can't go forward" };
        }
        return { ok: true };
      }
      case "read_page":
      case "click":
      case "type":
      case "submit":
      case "scroll":
      case "find_text":
      case "extract":
      case "links":
      case "speak":
      case "stopspeak":
      case "darkmode":
      case "zoom":
      case "copy": {
        let tabId, tab;
        try {
          tabId = args.tabId ?? await activeTabId();
        } catch {
          return { ok: false, error: "no active tab \u2014 open a normal web page first" };
        }
        try {
          tab = await browser_default.tabs.get(tabId);
        } catch {
          return { ok: false, error: "couldn't access the active tab (open a normal http/https page)" };
        }
        const why = forbiddenReason(hostOf(tab.url), policy);
        if (why) return { ok: false, forbidden: true, error: "blocked: " + why };
        const action = {
          kind: tool === "read_page" ? "read" : tool,
          ref: args.ref,
          selector: args.selector,
          text: args.text,
          direction: args.direction,
          amount: args.amount,
          to: args.to,
          dir: args.dir
        };
        return await sendToTab(tabId, { type: "PAGE_ACTION", action, policy });
      }
      default:
        return { ok: false, error: "unknown tool: " + tool };
    }
  }
  browser_default.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    (async () => {
      try {
        switch (msg?.type) {
          case "GET_POLICY":
            return sendResponse({ ok: true, policy: await getPolicy(), defaults: DEFAULT_POLICY });
          case "SET_POLICY":
            await browser_default.storage.local.set({ policy: msg.policy });
            return sendResponse({ ok: true });
          case "EXEC":
            return sendResponse(await execTool(msg.tool, msg.args || {}));
          case "OPEN_TAB":
            return sendResponse(await execTool("open_tab", { url: msg.url, active: msg.active }));
          case "LIST_TABS":
            return sendResponse(await execTool("list_tabs"));
          case "PAGE_ACTION": {
            const m = { read: "read_page", click: "click", type: "type", submit: "submit" };
            return sendResponse(await execTool(m[msg.action.kind], msg.action));
          }
          case "BRIDGE_STATUS":
            return sendResponse({ ok: true, connected: !!(bridge && bridge.readyState === 1) });
          default:
            sendResponse({ ok: false, error: "unknown: " + msg?.type });
        }
      } catch (e) {
        sendResponse({ ok: false, error: String(e?.message || e) });
      }
    })();
    return true;
  });
  async function activeTabId() {
    const [t] = await browser_default.tabs.query({ active: true, currentWindow: true });
    if (!t) throw new Error("no active tab");
    return t.id;
  }
  function sendToTab(tabId, payload) {
    return browser_default.tabs.sendMessage(tabId, payload).catch((e) => ({ ok: false, error: (e?.message || String(e)) + " (open a normal http/https page and reload it)" }));
  }
  var bridge = null;
  var reconnectTimer = null;
  function connectBridge() {
    try {
      bridge = new WebSocket(BRIDGE_URL);
    } catch {
      return scheduleReconnect();
    }
    bridge.onopen = () => bridge.send(JSON.stringify({ hello: "extension" }));
    bridge.onclose = () => scheduleReconnect();
    bridge.onerror = () => {
      try {
        bridge.close();
      } catch {
      }
    };
    bridge.onmessage = async (ev) => {
      let req;
      try {
        req = JSON.parse(ev.data);
      } catch {
        return;
      }
      if (!req.id || !req.tool) return;
      const policy = await getPolicy();
      const result = policy.rules.allowBridge ? await execTool(req.tool, req.args || {}).catch((e) => ({ ok: false, error: String(e?.message || e) })) : { ok: false, error: "blocked: bridge control is disabled in policy" };
      bridge.send(JSON.stringify({ id: req.id, result }));
    };
  }
  function scheduleReconnect() {
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connectBridge, 3e3);
  }
  connectBridge();
  setInterval(() => {
    if (bridge && bridge.readyState === 1) bridge.send(JSON.stringify({ ping: 1 }));
  }, 2e4);
})();
