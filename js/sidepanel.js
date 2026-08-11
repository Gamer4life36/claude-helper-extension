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
                return new Promise((resolve2, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve: resolve2,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve2();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve2();
                  } else {
                    target[name](...args, makeCallback({
                      resolve: resolve2,
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
                let sendResponsePromise = new Promise((resolve2) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve2(response);
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
              resolve: resolve2
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve2();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve2(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve2, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve: resolve2,
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

  // node_modules/fuse.js/dist/fuse.mjs
  function isArray(value) {
    return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
  }
  function baseToString(value) {
    if (typeof value == "string") return value;
    if (typeof value === "bigint") return value.toString();
    const result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isNumber(value) {
    return typeof value === "number";
  }
  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
  }
  function isObject(value) {
    return typeof value === "object";
  }
  function isObjectLike(value) {
    return isObject(value) && value !== null;
  }
  function isDefined(value) {
    return value !== void 0 && value !== null;
  }
  function isBlank(value) {
    return !value.trim().length;
  }
  function getTag(value) {
    return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
  }
  var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
  var INVALID_DOC_INDEX = "Invalid doc index: must be a non-negative integer within the bounds of the docs array";
  var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
  var PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
  var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
  var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
  var FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED = "Fuse.match does not support useTokenSearch: token search requires corpus-level statistics (df, fieldCount) that a one-off string comparison does not have. Use new Fuse(...).search(...) instead.";
  var hasOwn = Object.prototype.hasOwnProperty;
  var KeyStore = class {
    constructor(keys) {
      this._keys = [];
      this._keyMap = {};
      let totalWeight = 0;
      keys.forEach((key) => {
        const obj = createKey(key);
        this._keys.push(obj);
        this._keyMap[obj.id] = obj;
        totalWeight += obj.weight;
      });
      this._keys.forEach((key) => {
        key.weight /= totalWeight;
      });
    }
    get(keyId) {
      return this._keyMap[keyId];
    }
    keys() {
      return this._keys;
    }
    toJSON() {
      return JSON.stringify(this._keys);
    }
  };
  function createKey(key) {
    let path = null;
    let id = null;
    let src = null;
    let weight = 1;
    let getFn = null;
    if (isString(key) || isArray(key)) {
      src = key;
      path = createKeyPath(key);
      id = createKeyId(key);
    } else {
      if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
      const name = key.name;
      src = name;
      if (hasOwn.call(key, "weight") && key.weight !== void 0) {
        weight = key.weight;
        if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(createKeyId(name)));
      }
      path = createKeyPath(name);
      id = createKeyId(name);
      getFn = key.getFn ?? null;
    }
    return {
      path,
      id,
      weight,
      src,
      getFn
    };
  }
  function createKeyPath(key) {
    return isArray(key) ? key : key.split(".");
  }
  function createKeyId(key) {
    return isArray(key) ? key.join(".") : key;
  }
  function get(obj, path) {
    const list = [];
    let arr = false;
    const deepGet = (obj2, path2, index, arrayIndex) => {
      if (!isDefined(obj2)) return;
      if (!path2[index]) list.push(arrayIndex !== void 0 ? {
        v: obj2,
        i: arrayIndex
      } : obj2);
      else {
        const value = obj2[path2[index]];
        if (!isDefined(value)) return;
        if (index === path2.length - 1 && (isString(value) || isNumber(value) || isBoolean(value) || typeof value === "bigint")) list.push(arrayIndex !== void 0 ? {
          v: toString(value),
          i: arrayIndex
        } : toString(value));
        else if (isArray(value)) {
          arr = true;
          for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path2, index + 1, i);
        } else if (path2.length) deepGet(value, path2, index + 1, arrayIndex);
      }
    };
    deepGet(obj, isString(path) ? path.split(".") : path, 0);
    return arr ? list : list[0];
  }
  var MatchOptions = {
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1
  };
  var BasicOptions = {
    isCaseSensitive: false,
    ignoreDiacritics: false,
    includeScore: false,
    keys: [],
    shouldSort: true,
    sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
  };
  var FuzzyOptions = {
    location: 0,
    threshold: 0.6,
    distance: 100
  };
  var AdvancedOptions = {
    useExtendedSearch: false,
    useTokenSearch: false,
    tokenize: void 0,
    tokenMatch: "any",
    getFn: get,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1
  };
  var Config = Object.freeze({
    ...BasicOptions,
    ...MatchOptions,
    ...FuzzyOptions,
    ...AdvancedOptions
  });
  function isWordSeparator(code) {
    return code >= 9 && code <= 13 || code === 32 || code === 160;
  }
  function norm(weight = 1, mantissa = 3) {
    const cache = /* @__PURE__ */ new Map();
    const m = Math.pow(10, mantissa);
    return {
      get(value) {
        let numTokens = 0;
        let inWord = false;
        for (let i = 0; i < value.length; i++) if (!isWordSeparator(value.charCodeAt(i))) {
          if (!inWord) {
            numTokens++;
            inWord = true;
          }
        } else inWord = false;
        if (numTokens === 0) numTokens = 1;
        if (cache.has(numTokens)) return cache.get(numTokens);
        const n = Math.round(m / Math.pow(numTokens, 0.5 * weight)) / m;
        cache.set(numTokens, n);
        return n;
      },
      clear() {
        cache.clear();
      }
    };
  }
  var FuseIndex = class {
    constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
      this.norm = norm(fieldNormWeight, 3);
      this.getFn = getFn;
      this.isCreated = false;
      this.docs = [];
      this.keys = [];
      this._keysMap = {};
      this.setIndexRecords();
    }
    setSources(docs = []) {
      this.docs = docs;
    }
    setIndexRecords(records = []) {
      this.records = records;
    }
    setKeys(keys = []) {
      this.keys = keys;
      this._keysMap = {};
      keys.forEach((key, idx) => {
        this._keysMap[key.id] = idx;
      });
    }
    create() {
      if (this.isCreated || !this.docs.length) return;
      this.isCreated = true;
      const len = this.docs.length;
      this.records = new Array(len);
      let recordCount = 0;
      if (isString(this.docs[0])) for (let i = 0; i < len; i++) {
        const record = this._createStringRecord(this.docs[i], i);
        if (record) this.records[recordCount++] = record;
      }
      else for (let i = 0; i < len; i++) this.records[recordCount++] = this._createObjectRecord(this.docs[i], i);
      this.records.length = recordCount;
      this.norm.clear();
    }
    add(doc, docIndex) {
      if (!Number.isInteger(docIndex) || docIndex < 0) throw new Error(INVALID_DOC_INDEX);
      if (isString(doc)) {
        const record2 = this._createStringRecord(doc, docIndex);
        if (record2) this.records.push(record2);
        return record2;
      }
      const record = this._createObjectRecord(doc, docIndex);
      this.records.push(record);
      return record;
    }
    removeAt(idx) {
      if (!Number.isInteger(idx) || idx < 0) throw new Error(INVALID_DOC_INDEX);
      for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i === idx) {
        this.records.splice(i, 1);
        break;
      }
      for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i > idx) this.records[i].i -= 1;
    }
    removeAll(indices) {
      const toRemove = /* @__PURE__ */ new Set();
      for (const v of indices) if (Number.isInteger(v) && v >= 0) toRemove.add(v);
      if (toRemove.size === 0) return;
      this.records = this.records.filter((r) => !toRemove.has(r.i));
      const sorted = Array.from(toRemove).sort((a, b) => a - b);
      for (const record of this.records) {
        let lo = 0;
        let hi = sorted.length;
        while (lo < hi) {
          const mid = lo + hi >>> 1;
          if (sorted[mid] < record.i) lo = mid + 1;
          else hi = mid;
        }
        record.i -= lo;
      }
    }
    getValueForItemAtKeyId(item, keyId) {
      return item[this._keysMap[keyId]];
    }
    size() {
      return this.records.length;
    }
    _createStringRecord(doc, docIndex) {
      if (!isDefined(doc) || isBlank(doc)) return null;
      return {
        v: doc,
        i: docIndex,
        n: this.norm.get(doc)
      };
    }
    _createObjectRecord(doc, docIndex) {
      const record = {
        i: docIndex,
        $: {}
      };
      for (let keyIndex = 0, keyLen = this.keys.length; keyIndex < keyLen; keyIndex++) {
        const key = this.keys[keyIndex];
        const value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
        if (!isDefined(value)) continue;
        if (isArray(value)) {
          const subRecords = [];
          for (let i = 0, len = value.length; i < len; i += 1) {
            const item = value[i];
            if (!isDefined(item)) continue;
            if (isString(item)) {
              if (!isBlank(item)) {
                const subRecord = {
                  v: item,
                  i,
                  n: this.norm.get(item)
                };
                subRecords.push(subRecord);
              }
            } else if (isDefined(item.v)) {
              const text = isString(item.v) ? item.v : toString(item.v);
              if (!isBlank(text)) {
                const subRecord = {
                  v: text,
                  i: item.i,
                  n: this.norm.get(text)
                };
                subRecords.push(subRecord);
              }
            }
          }
          record.$[keyIndex] = subRecords;
        } else if (isString(value) && !isBlank(value)) {
          const subRecord = {
            v: value,
            n: this.norm.get(value)
          };
          record.$[keyIndex] = subRecord;
        }
      }
      return record;
    }
    toJSON() {
      return {
        keys: this.keys.map(({ getFn, ...key }) => key),
        records: this.records
      };
    }
  };
  function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys.map(createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
  }
  function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
    const { keys, records } = data;
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
  }
  function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
    const indices = [];
    let start = -1;
    let end = -1;
    let i = 0;
    for (let len = matchmask.length; i < len; i += 1) {
      const match = matchmask[i];
      if (match && start === -1) start = i;
      else if (!match && start !== -1) {
        end = i - 1;
        if (end - start + 1 >= minMatchCharLength) indices.push([start, end]);
        start = -1;
      }
    }
    if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([start, i - 1]);
    return indices;
  }
  function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
    if (pattern.length > 32) throw new Error(PATTERN_LENGTH_TOO_LARGE(32));
    const patternLen = pattern.length;
    const textLen = text.length;
    const expectedLocation = Math.max(0, Math.min(location, textLen));
    let currentThreshold = threshold;
    let bestLocation = expectedLocation;
    const calcScore = (errors, currentLocation) => {
      const accuracy = errors / patternLen;
      if (ignoreLocation) return accuracy;
      const proximity = Math.abs(expectedLocation - currentLocation);
      if (!distance) return proximity ? 1 : accuracy;
      return accuracy + proximity / distance;
    };
    const computeMatches = minMatchCharLength > 1 || includeMatches;
    const matchMask = computeMatches ? Array(textLen) : [];
    let index;
    while ((index = text.indexOf(pattern, bestLocation)) > -1) {
      const score = calcScore(0, index);
      currentThreshold = Math.min(score, currentThreshold);
      bestLocation = index + patternLen;
      if (computeMatches) {
        let i = 0;
        while (i < patternLen) {
          matchMask[index + i] = 1;
          i += 1;
        }
      }
    }
    bestLocation = -1;
    let lastBitArr = [];
    let finalScore = 1;
    let bestErrors = 0;
    let binMax = patternLen + textLen;
    const mask = 1 << patternLen - 1;
    for (let i = 0; i < patternLen; i += 1) {
      let binMin = 0;
      let binMid = binMax;
      while (binMin < binMid) {
        if (calcScore(i, expectedLocation + binMid) <= currentThreshold) binMin = binMid;
        else binMax = binMid;
        binMid = Math.floor((binMax - binMin) / 2 + binMin);
      }
      binMax = binMid;
      let start = Math.max(1, expectedLocation - binMid + 1);
      const finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
      const bitArr = Array(finish + 2);
      bitArr[finish + 1] = (1 << i) - 1;
      for (let j = finish; j >= start; j -= 1) {
        const currentLocation = j - 1;
        const charMatch = patternAlphabet[text[currentLocation]];
        bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
        if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
        if (bitArr[j] & mask) {
          finalScore = calcScore(i, currentLocation);
          if (finalScore <= currentThreshold) {
            currentThreshold = finalScore;
            bestLocation = currentLocation;
            bestErrors = i;
            if (bestLocation <= expectedLocation) break;
            start = Math.max(1, 2 * expectedLocation - bestLocation);
          }
        }
      }
      if (calcScore(i + 1, expectedLocation) > currentThreshold) break;
      lastBitArr = bitArr;
    }
    if (computeMatches && bestLocation >= 0) {
      const matchEnd = Math.min(textLen - 1, bestLocation + patternLen - 1 + bestErrors);
      for (let k = bestLocation; k <= matchEnd; k += 1) if (patternAlphabet[text[k]]) matchMask[k] = 1;
    }
    const result = {
      isMatch: bestLocation >= 0,
      score: Math.max(1e-3, finalScore)
    };
    if (computeMatches) {
      const indices = convertMaskToIndices(matchMask, minMatchCharLength);
      if (!indices.length) result.isMatch = false;
      else if (includeMatches) result.indices = indices;
    }
    return result;
  }
  function createPatternAlphabet(pattern) {
    const mask = {};
    for (let i = 0, len = pattern.length; i < len; i += 1) {
      const char = pattern.charAt(i);
      mask[char] = (mask[char] || 0) | 1 << len - i - 1;
    }
    return mask;
  }
  function mergeIndices(indices) {
    if (indices.length <= 1) return indices;
    indices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const merged = [indices[0]];
    for (let i = 1, len = indices.length; i < len; i += 1) {
      const last = merged[merged.length - 1];
      const curr = indices[i];
      if (curr[0] <= last[1] + 1) last[1] = Math.max(last[1], curr[1]);
      else merged.push(curr);
    }
    return merged;
  }
  var NON_DECOMPOSABLE_MAP = {
    "\u0142": "l",
    "\u0141": "L",
    "\u0111": "d",
    "\u0110": "D",
    "\xF8": "o",
    "\xD8": "O",
    "\u0127": "h",
    "\u0126": "H",
    "\u0167": "t",
    "\u0166": "T",
    "\u0131": "i",
    "\xDF": "ss"
  };
  var NON_DECOMPOSABLE_RE = new RegExp("[" + Object.keys(NON_DECOMPOSABLE_MAP).join("") + "]", "g");
  var stripDiacritics = typeof String.prototype.normalize === "function" ? (str) => str.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(NON_DECOMPOSABLE_RE, (ch) => NON_DECOMPOSABLE_MAP[ch]) : (str) => str;
  var BitapSearch = class {
    constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, ignoreLocation = Config.ignoreLocation } = {}) {
      this.options = {
        location,
        threshold,
        distance,
        includeMatches,
        findAllMatches,
        minMatchCharLength,
        isCaseSensitive,
        ignoreDiacritics,
        ignoreLocation
      };
      pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
      this.pattern = pattern;
      this.chunks = [];
      if (!this.pattern.length) return;
      const addChunk = (pattern2, startIndex) => {
        this.chunks.push({
          pattern: pattern2,
          alphabet: createPatternAlphabet(pattern2),
          startIndex
        });
      };
      const len = this.pattern.length;
      if (len > 32) {
        let i = 0;
        const remainder = len % 32;
        const end = len - remainder;
        while (i < end) {
          addChunk(this.pattern.substr(i, 32), i);
          i += 32;
        }
        if (remainder) {
          const startIndex = len - 32;
          addChunk(this.pattern.substr(startIndex), startIndex);
        }
      } else addChunk(this.pattern, 0);
    }
    searchIn(text) {
      const { isCaseSensitive, ignoreDiacritics, includeMatches } = this.options;
      text = isCaseSensitive ? text : text.toLowerCase();
      text = ignoreDiacritics ? stripDiacritics(text) : text;
      if (this.pattern === text) {
        if (text.length < this.options.minMatchCharLength) return {
          isMatch: false,
          score: 1
        };
        const result2 = {
          isMatch: true,
          score: 0
        };
        if (includeMatches) result2.indices = [[0, text.length - 1]];
        return result2;
      }
      const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
      const allIndices = [];
      let totalScore = 0;
      let hasMatches = false;
      this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
        const { isMatch, score, indices } = search(text, pattern, alphabet, {
          location: location + startIndex,
          distance,
          threshold,
          findAllMatches,
          minMatchCharLength,
          includeMatches,
          ignoreLocation
        });
        if (isMatch) hasMatches = true;
        totalScore += score;
        if (isMatch && indices) allIndices.push(...indices);
      });
      const result = {
        isMatch: hasMatches,
        score: hasMatches ? totalScore / this.chunks.length : 1
      };
      if (hasMatches && includeMatches) result.indices = mergeIndices(allIndices);
      return result;
    }
  };
  var MULTI_MATCH_TYPES = /* @__PURE__ */ new Set(["fuzzy", "include"]);
  function isInverse(type) {
    return type.startsWith("inverse");
  }
  var matchers = [
    {
      type: "exact",
      multiRegex: /^="(.*)"$/,
      singleRegex: /^=(.*)$/,
      create: (pattern) => ({
        type: "exact",
        search(text) {
          const isMatch = text === pattern;
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, pattern.length - 1]
          };
        }
      })
    },
    {
      type: "include",
      multiRegex: /^'"(.*)"$/,
      singleRegex: /^'(.*)$/,
      create: (pattern) => ({
        type: "include",
        search(text) {
          let location = 0;
          let index;
          const indices = [];
          const patternLen = pattern.length;
          while ((index = text.indexOf(pattern, location)) > -1) {
            location = index + patternLen;
            indices.push([index, location - 1]);
          }
          const isMatch = !!indices.length;
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices
          };
        }
      })
    },
    {
      type: "prefix-exact",
      multiRegex: /^\^"(.*)"$/,
      singleRegex: /^\^(.*)$/,
      create: (pattern) => ({
        type: "prefix-exact",
        search(text) {
          const isMatch = text.startsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, pattern.length - 1]
          };
        }
      })
    },
    {
      type: "inverse-prefix-exact",
      multiRegex: /^!\^"(.*)"$/,
      singleRegex: /^!\^(.*)$/,
      create: (pattern) => ({
        type: "inverse-prefix-exact",
        search(text) {
          const isMatch = !text.startsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, text.length - 1]
          };
        }
      })
    },
    {
      type: "inverse-suffix-exact",
      multiRegex: /^!"(.*)"\$$/,
      singleRegex: /^!(.*)\$$/,
      create: (pattern) => ({
        type: "inverse-suffix-exact",
        search(text) {
          const isMatch = !text.endsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, text.length - 1]
          };
        }
      })
    },
    {
      type: "suffix-exact",
      multiRegex: /^"(.*)"\$$/,
      singleRegex: /^(.*)\$$/,
      create: (pattern) => ({
        type: "suffix-exact",
        search(text) {
          const isMatch = text.endsWith(pattern);
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [text.length - pattern.length, text.length - 1]
          };
        }
      })
    },
    {
      type: "inverse-exact",
      multiRegex: /^!"(.*)"$/,
      singleRegex: /^!(.*)$/,
      create: (pattern) => ({
        type: "inverse-exact",
        search(text) {
          const isMatch = text.indexOf(pattern) === -1;
          return {
            isMatch,
            score: isMatch ? 0 : 1,
            indices: [0, text.length - 1]
          };
        }
      })
    },
    {
      type: "fuzzy",
      multiRegex: /^"(.*)"$/,
      singleRegex: /^(.*)$/,
      create: (pattern, options = {}) => {
        const bitap = new BitapSearch(pattern, {
          location: options.location ?? Config.location,
          threshold: options.threshold ?? Config.threshold,
          distance: options.distance ?? Config.distance,
          includeMatches: options.includeMatches ?? Config.includeMatches,
          findAllMatches: options.findAllMatches ?? Config.findAllMatches,
          minMatchCharLength: options.minMatchCharLength ?? Config.minMatchCharLength,
          isCaseSensitive: options.isCaseSensitive ?? Config.isCaseSensitive,
          ignoreDiacritics: options.ignoreDiacritics ?? Config.ignoreDiacritics,
          ignoreLocation: options.ignoreLocation ?? Config.ignoreLocation
        });
        return {
          type: "fuzzy",
          search(text) {
            return bitap.searchIn(text);
          }
        };
      }
    }
  ];
  var matchersLen = matchers.length;
  var ESCAPED_PIPE = "\0";
  var OR_TOKEN = "|";
  function tokenize(pattern) {
    const tokens = [];
    const len = pattern.length;
    let i = 0;
    while (i < len) {
      while (i < len && pattern[i] === " ") i++;
      if (i >= len) break;
      let j = i;
      while (j < len && pattern[j] !== " " && pattern[j] !== '"') j++;
      if (j < len && pattern[j] === '"') {
        j++;
        while (j < len) {
          if (pattern[j] === '"') {
            const next2 = j + 1;
            if (next2 >= len || pattern[next2] === " ") {
              j++;
              break;
            }
            if (pattern[next2] === "$" && (next2 + 1 >= len || pattern[next2 + 1] === " ")) {
              j += 2;
              break;
            }
          }
          j++;
        }
        tokens.push(pattern.substring(i, j));
        i = j;
      } else {
        while (j < len && pattern[j] !== " ") j++;
        tokens.push(pattern.substring(i, j));
        i = j;
      }
    }
    return tokens;
  }
  function getMatch(pattern, exp) {
    const matches = pattern.match(exp);
    return matches ? matches[1] : null;
  }
  function parseQuery(pattern, options = {}) {
    return pattern.replace(/\\\|/g, ESCAPED_PIPE).split(OR_TOKEN).map((item) => {
      const query = tokenize(item.replace(/\u0000/g, "|").trim()).filter((item2) => item2 && !!item2.trim());
      const results = [];
      for (let i = 0, len = query.length; i < len; i += 1) {
        const queryItem = query[i];
        let found = false;
        let idx = -1;
        while (!found && ++idx < matchersLen) {
          const def = matchers[idx];
          const token = getMatch(queryItem, def.multiRegex);
          if (token) {
            results.push(def.create(token, options));
            found = true;
          }
        }
        if (found) continue;
        idx = -1;
        while (++idx < matchersLen) {
          const def = matchers[idx];
          const token = getMatch(queryItem, def.singleRegex);
          if (token) {
            results.push(def.create(token, options));
            break;
          }
        }
      }
      return results;
    });
  }
  var ExtendedSearch = class {
    constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
      this.query = null;
      this.options = {
        isCaseSensitive,
        ignoreDiacritics,
        includeMatches,
        minMatchCharLength,
        findAllMatches,
        ignoreLocation,
        location,
        threshold,
        distance
      };
      pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
      this.pattern = pattern;
      this.query = parseQuery(this.pattern, this.options);
    }
    static condition(_, options) {
      return options.useExtendedSearch;
    }
    searchIn(text) {
      const query = this.query;
      if (!query) return {
        isMatch: false,
        score: 1
      };
      const { includeMatches, isCaseSensitive, ignoreDiacritics } = this.options;
      text = isCaseSensitive ? text : text.toLowerCase();
      text = ignoreDiacritics ? stripDiacritics(text) : text;
      let numMatches = 0;
      const allIndices = [];
      let totalScore = 0;
      let hasInverse = false;
      for (let i = 0, qLen = query.length; i < qLen; i += 1) {
        const searchers = query[i];
        allIndices.length = 0;
        numMatches = 0;
        hasInverse = false;
        for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
          const matcher = searchers[j];
          const { isMatch, indices, score } = matcher.search(text);
          if (isMatch) {
            numMatches += 1;
            totalScore += score;
            if (isInverse(matcher.type)) hasInverse = true;
            if (includeMatches) if (MULTI_MATCH_TYPES.has(matcher.type)) allIndices.push(...indices);
            else allIndices.push(indices);
          } else {
            totalScore = 0;
            numMatches = 0;
            allIndices.length = 0;
            hasInverse = false;
            break;
          }
        }
        if (numMatches) {
          const result = {
            isMatch: true,
            score: totalScore / numMatches
          };
          if (hasInverse) result.hasInverse = true;
          if (includeMatches) result.indices = mergeIndices(allIndices);
          return result;
        }
      }
      return {
        isMatch: false,
        score: 1
      };
    }
  };
  var registeredSearchers = [];
  function register(...args) {
    registeredSearchers.push(...args);
  }
  function createSearcher(pattern, options) {
    for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
      const searcherClass = registeredSearchers[i];
      if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
    }
    return new BitapSearch(pattern, options);
  }
  var LogicalOperator = {
    AND: "$and",
    OR: "$or"
  };
  var KeyType = {
    PATH: "$path",
    PATTERN: "$val"
  };
  var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
  var isPath = (query) => !!query[KeyType.PATH];
  var isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
  var convertToExplicit = (query) => ({ [LogicalOperator.AND]: Object.keys(query).map((key) => ({ [key]: query[key] })) });
  function parse(query, options, { auto = true } = {}) {
    const next2 = (query2) => {
      if (isString(query2)) {
        const obj = {
          keyId: null,
          pattern: query2
        };
        if (auto) obj.searcher = createSearcher(query2, options);
        return obj;
      }
      const keys = Object.keys(query2);
      const isQueryPath = isPath(query2);
      if (!isQueryPath && keys.length > 1 && !isExpression(query2)) return next2(convertToExplicit(query2));
      if (isLeaf(query2)) {
        const key = isQueryPath ? query2[KeyType.PATH] : keys[0];
        const pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
        if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
        const obj = {
          keyId: createKeyId(key),
          pattern
        };
        if (auto) obj.searcher = createSearcher(pattern, options);
        return obj;
      }
      const node = {
        children: [],
        operator: keys[0]
      };
      keys.forEach((key) => {
        const value = query2[key];
        if (isArray(value)) value.forEach((item) => {
          node.children.push(next2(item));
        });
      });
      return node;
    };
    if (!isExpression(query)) query = convertToExplicit(query);
    return next2(query);
  }
  function computeScoreSingle(matches, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
    let totalScore = 1;
    matches.forEach(({ key, norm: norm2, score }) => {
      const weight = key ? key.weight : null;
      totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
    });
    return totalScore;
  }
  function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
    results.forEach((result) => {
      result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
    });
  }
  var MaxHeap = class {
    constructor(limit, comparator) {
      this.limit = limit;
      this.heap = [];
      this.comparator = comparator;
    }
    get size() {
      return this.heap.length;
    }
    insert(item) {
      if (this.size < this.limit) {
        this.heap.push(item);
        this._bubbleUp(this.size - 1);
      } else if (this.comparator(item, this.heap[0]) < 0) {
        this.heap[0] = item;
        this._sinkDown(0);
      }
    }
    extractSorted() {
      return this.heap.sort(this.comparator);
    }
    _bubbleUp(i) {
      const heap = this.heap;
      while (i > 0) {
        const parent = i - 1 >> 1;
        if (this.comparator(heap[i], heap[parent]) <= 0) break;
        const tmp = heap[i];
        heap[i] = heap[parent];
        heap[parent] = tmp;
        i = parent;
      }
    }
    _sinkDown(i) {
      const heap = this.heap;
      const len = heap.length;
      let largest = i;
      do {
        i = largest;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < len && this.comparator(heap[left], heap[largest]) > 0) largest = left;
        if (right < len && this.comparator(heap[right], heap[largest]) > 0) largest = right;
        if (largest !== i) {
          const tmp = heap[i];
          heap[i] = heap[largest];
          heap[largest] = tmp;
        }
      } while (largest !== i);
    }
  };
  function formatMatches(result) {
    const matches = [];
    result.matches.forEach((match) => {
      if (!isDefined(match.indices) || !match.indices.length) return;
      const obj = {
        indices: match.indices,
        value: match.value
      };
      if (match.key) obj.key = match.key.id;
      if (match.idx > -1) obj.refIndex = match.idx;
      matches.push(obj);
    });
    return matches;
  }
  function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
    return results.map((result) => {
      const { idx } = result;
      const data = {
        item: docs[idx],
        refIndex: idx
      };
      if (includeMatches) data.matches = formatMatches(result);
      if (includeScore) data.score = result.score;
      return data;
    });
  }
  var DEFAULT_TOKEN = /[\p{L}\p{M}\p{N}_]+/gu;
  var warned = /* @__PURE__ */ new WeakSet();
  function warnNonGlobal(regex) {
    if (!warned.has(regex)) {
      warned.add(regex);
      console.warn(`[Fuse] tokenize regex ${regex} lacks the global flag; only the first match per text will be returned. Add the 'g' flag.`);
    }
  }
  function resolveTokenize(tokenize2) {
    if (typeof tokenize2 === "function") {
      let validated = false;
      return (text) => {
        const result = tokenize2(text);
        if (!validated) {
          validated = true;
          if (!Array.isArray(result) || result.some((t) => typeof t !== "string")) throw new Error(`[Fuse] tokenize function must return string[]; received ${Array.isArray(result) ? "array containing non-strings" : typeof result}.`);
        }
        return result;
      };
    }
    if (tokenize2 instanceof RegExp) {
      if (!tokenize2.global) warnNonGlobal(tokenize2);
      return (text) => text.match(tokenize2) || [];
    }
    return (text) => text.match(DEFAULT_TOKEN) || [];
  }
  function createAnalyzer({ isCaseSensitive = false, ignoreDiacritics = false, tokenize: tokenize2 } = {}) {
    const tokenizeFn = resolveTokenize(tokenize2);
    return { tokenize(text) {
      if (!isCaseSensitive) text = text.toLowerCase();
      if (ignoreDiacritics) text = stripDiacritics(text);
      return tokenizeFn(text);
    } };
  }
  var TokenSearch = class {
    static condition(_, options) {
      return options.useTokenSearch;
    }
    constructor(pattern, options) {
      this.options = options;
      this.analyzer = createAnalyzer({
        isCaseSensitive: options.isCaseSensitive,
        ignoreDiacritics: options.ignoreDiacritics,
        tokenize: options.tokenize
      });
      const queryTerms = this.analyzer.tokenize(pattern);
      const { df, fieldCount } = options._invertedIndex;
      this.termSearchers = [];
      this.idfWeights = [];
      for (const term of queryTerms) {
        this.termSearchers.push(new BitapSearch(term, {
          location: options.location,
          threshold: options.threshold,
          distance: options.distance,
          includeMatches: options.includeMatches,
          findAllMatches: options.findAllMatches,
          minMatchCharLength: options.minMatchCharLength,
          isCaseSensitive: options.isCaseSensitive,
          ignoreDiacritics: options.ignoreDiacritics,
          ignoreLocation: true
        }));
        const docFreq = df.get(term) || 0;
        const idf = Math.log(1 + (fieldCount - docFreq + 0.5) / (docFreq + 0.5));
        this.idfWeights.push(idf);
      }
      this.combineAll = options.tokenMatch === "all";
      this.numTerms = this.termSearchers.length;
      this.useMask = this.numTerms <= 31;
    }
    searchIn(text) {
      if (!this.termSearchers.length) return {
        isMatch: false,
        score: 1
      };
      const allIndices = [];
      let weightedScore = 0;
      let maxPossibleScore = 0;
      let matchedCount = 0;
      let matchedMask = 0;
      const matchedTerms = this.combineAll && !this.useMask ? /* @__PURE__ */ new Set() : null;
      for (let i = 0; i < this.termSearchers.length; i++) {
        const result = this.termSearchers[i].searchIn(text);
        const idf = this.idfWeights[i];
        maxPossibleScore += idf;
        if (result.isMatch) {
          matchedCount++;
          weightedScore += idf * (1 - result.score);
          if (result.indices) allIndices.push(...result.indices);
          if (this.combineAll) if (this.useMask) matchedMask |= 1 << i;
          else matchedTerms.add(i);
        }
      }
      if (matchedCount === 0) return {
        isMatch: false,
        score: 1
      };
      const normalized = maxPossibleScore > 0 ? 1 - weightedScore / maxPossibleScore : 0;
      const searchResult = {
        isMatch: true,
        score: Math.max(1e-3, normalized)
      };
      if (this.options.includeMatches && allIndices.length) searchResult.indices = mergeIndices(allIndices);
      if (this.combineAll) {
        if (this.useMask) searchResult.matchedMask = matchedMask;
        else searchResult.matchedTerms = matchedTerms;
        searchResult.termCount = this.numTerms;
      }
      return searchResult;
    }
  };
  function addField(index, text, docIdx, analyzer) {
    const tokens = analyzer.tokenize(text);
    if (!tokens.length) return;
    index.fieldCount++;
    index.docFieldCount.set(docIdx, (index.docFieldCount.get(docIdx) || 0) + 1);
    const distinctTerms = new Set(tokens);
    let perDocTerms = index.docTermFieldHits.get(docIdx);
    if (!perDocTerms) {
      perDocTerms = /* @__PURE__ */ new Map();
      index.docTermFieldHits.set(docIdx, perDocTerms);
    }
    for (const term of distinctTerms) {
      perDocTerms.set(term, (perDocTerms.get(term) || 0) + 1);
      index.df.set(term, (index.df.get(term) || 0) + 1);
    }
  }
  function ingestRecord(index, record, keyCount, analyzer) {
    const { i: docIdx, v, $: fields } = record;
    if (v !== void 0) {
      addField(index, v, docIdx, analyzer);
      return;
    }
    if (!fields) return;
    for (let keyIdx = 0; keyIdx < keyCount; keyIdx++) {
      const value = fields[keyIdx];
      if (!value) continue;
      if (Array.isArray(value)) for (const sub of value) addField(index, sub.v, docIdx, analyzer);
      else addField(index, value.v, docIdx, analyzer);
    }
  }
  function buildInvertedIndex(records, keyCount, analyzer) {
    const index = {
      fieldCount: 0,
      df: /* @__PURE__ */ new Map(),
      docFieldCount: /* @__PURE__ */ new Map(),
      docTermFieldHits: /* @__PURE__ */ new Map()
    };
    for (const record of records) ingestRecord(index, record, keyCount, analyzer);
    return index;
  }
  function addToInvertedIndex(index, record, keyCount, analyzer) {
    ingestRecord(index, record, keyCount, analyzer);
  }
  function removeFromInvertedIndex(index, docIdx) {
    const fieldCount = index.docFieldCount.get(docIdx);
    if (fieldCount === void 0) return;
    index.fieldCount -= fieldCount;
    index.docFieldCount.delete(docIdx);
    const perDocTerms = index.docTermFieldHits.get(docIdx);
    if (!perDocTerms) return;
    for (const [term, hits] of perDocTerms) {
      const next2 = (index.df.get(term) || 0) - hits;
      if (next2 <= 0) index.df.delete(term);
      else index.df.set(term, next2);
    }
    index.docTermFieldHits.delete(docIdx);
  }
  function removeAndShiftInvertedIndex(index, removedIndices) {
    if (removedIndices.length === 0) return;
    const sorted = Array.from(new Set(removedIndices)).sort((a, b) => a - b);
    for (const idx of sorted) removeFromInvertedIndex(index, idx);
    const shift = (oldIdx) => {
      let lo = 0;
      let hi = sorted.length;
      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (sorted[mid] < oldIdx) lo = mid + 1;
        else hi = mid;
      }
      return oldIdx - lo;
    };
    const firstRemoved = sorted[0];
    const shiftedDocFieldCount = /* @__PURE__ */ new Map();
    for (const [oldKey, count] of index.docFieldCount) shiftedDocFieldCount.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, count);
    index.docFieldCount = shiftedDocFieldCount;
    const shiftedDocTermFieldHits = /* @__PURE__ */ new Map();
    for (const [oldKey, terms] of index.docTermFieldHits) shiftedDocTermFieldHits.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, terms);
    index.docTermFieldHits = shiftedDocTermFieldHits;
  }
  var Fuse = class {
    constructor(docs, options, index) {
      this.options = {
        ...Config,
        ...options
      };
      if (this.options.useExtendedSearch && false) ;
      if (this.options.useTokenSearch && false) ;
      this._keyStore = new KeyStore(this.options.keys);
      this._docs = docs;
      this._myIndex = null;
      this._invertedIndex = null;
      this.setCollection(docs, index);
      this._lastQuery = null;
      this._lastSearcher = null;
    }
    _getSearcher(query) {
      if (this._lastQuery === query) return this._lastSearcher;
      const searcher = createSearcher(query, this._invertedIndex ? {
        ...this.options,
        _invertedIndex: this._invertedIndex
      } : this.options);
      this._lastQuery = query;
      this._lastSearcher = searcher;
      return searcher;
    }
    setCollection(docs, index) {
      this._docs = docs;
      if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
      this._myIndex = index || createIndex(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
      if (this.options.useTokenSearch) {
        const analyzer = createAnalyzer({
          isCaseSensitive: this.options.isCaseSensitive,
          ignoreDiacritics: this.options.ignoreDiacritics,
          tokenize: this.options.tokenize
        });
        this._invertedIndex = buildInvertedIndex(this._myIndex.records, this._myIndex.keys.length, analyzer);
      }
      this._invalidateSearcherCache();
    }
    add(doc) {
      if (!isDefined(doc)) return;
      this._docs.push(doc);
      const record = this._myIndex.add(doc, this._docs.length - 1);
      if (this._invertedIndex && record) {
        const analyzer = createAnalyzer({
          isCaseSensitive: this.options.isCaseSensitive,
          ignoreDiacritics: this.options.ignoreDiacritics,
          tokenize: this.options.tokenize
        });
        addToInvertedIndex(this._invertedIndex, record, this._myIndex.keys.length, analyzer);
      }
      this._invalidateSearcherCache();
    }
    remove(predicate = () => false) {
      const results = [];
      const indicesToRemove = [];
      for (let i = 0, len = this._docs.length; i < len; i += 1) if (predicate(this._docs[i], i)) {
        results.push(this._docs[i]);
        indicesToRemove.push(i);
      }
      if (indicesToRemove.length) {
        if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, indicesToRemove);
        const toRemove = new Set(indicesToRemove);
        this._docs = this._docs.filter((_, i) => !toRemove.has(i));
        this._myIndex.removeAll(indicesToRemove);
        this._invalidateSearcherCache();
      }
      return results;
    }
    removeAt(idx) {
      if (!Number.isInteger(idx) || idx < 0 || idx >= this._docs.length) throw new Error(INVALID_DOC_INDEX);
      if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, [idx]);
      const doc = this._docs.splice(idx, 1)[0];
      this._myIndex.removeAt(idx);
      this._invalidateSearcherCache();
      return doc;
    }
    _invalidateSearcherCache() {
      this._lastQuery = null;
      this._lastSearcher = null;
    }
    getIndex() {
      return this._myIndex;
    }
    _normalizedKeys() {
      return this._myIndex.keys.map((key) => this._keyStore.get(key.id) || key);
    }
    search(query, options) {
      const { limit = -1 } = options || {};
      const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
      if (isString(query) && !query.trim()) {
        let docs = this._docs.map((item, idx) => ({
          item,
          refIndex: idx
        }));
        if (isNumber(limit) && limit > -1) docs = docs.slice(0, limit);
        return docs;
      }
      const useHeap = shouldSort && isNumber(limit) && limit > 0 && isString(query);
      const comparator = sortFn;
      const stable = (a, b) => comparator(a, b) || a.idx - b.idx;
      let results;
      if (useHeap) {
        const heap = new MaxHeap(limit, stable);
        if (isString(this._docs[0])) this._searchStringList(query, {
          heap,
          ignoreFieldNorm
        });
        else this._searchObjectList(query, {
          heap,
          ignoreFieldNorm
        });
        results = heap.extractSorted();
      } else {
        results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
        computeScore(results, { ignoreFieldNorm });
        if (shouldSort) results.sort(isString(query) ? stable : comparator);
        if (isNumber(limit) && limit > -1) results = results.slice(0, limit);
      }
      return format(results, this._docs, {
        includeMatches,
        includeScore
      });
    }
    _searchStringList(query, { heap, ignoreFieldNorm } = {}) {
      const searcher = this._getSearcher(query);
      const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
      const { records } = this._myIndex;
      const results = heap ? null : [];
      records.forEach(({ v: text, i: idx, n: norm2 }) => {
        if (!isDefined(text)) return;
        const searchResult = searcher.searchIn(text);
        if (searchResult.isMatch) {
          const match = {
            score: searchResult.score,
            value: text,
            norm: norm2,
            indices: searchResult.indices
          };
          if (requireAllTokens) {
            match.matchedMask = searchResult.matchedMask;
            match.matchedTerms = searchResult.matchedTerms;
            match.termCount = searchResult.termCount;
          }
          const matches = [match];
          if (!requireAllTokens || this._coversAllTokens(matches)) {
            const result = {
              item: text,
              idx,
              matches
            };
            if (heap) {
              result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
              heap.insert(result);
            } else results.push(result);
          }
        }
      });
      return results;
    }
    _searchLogical(query) {
      const expression = parse(query, this.options);
      const keys = this._normalizedKeys();
      const evaluate = (node, item, idx) => {
        if (!("children" in node)) {
          const { keyId, searcher } = node;
          let matches;
          if (keyId === null) {
            matches = [];
            keys.forEach((key, keyIndex) => {
              matches.push(...this._findMatches({
                key,
                value: item[keyIndex],
                searcher
              }));
            });
          } else matches = this._findMatches({
            key: this._keyStore.get(keyId),
            value: this._myIndex.getValueForItemAtKeyId(item, keyId),
            searcher
          });
          if (matches && matches.length) return [{
            idx,
            item,
            matches
          }];
          return [];
        }
        const { children, operator } = node;
        const res = [];
        for (let i = 0, len = children.length; i < len; i += 1) {
          const child = children[i];
          const result = evaluate(child, item, idx);
          if (result.length) res.push(...result);
          else if (operator === LogicalOperator.AND) return [];
        }
        return res;
      };
      const records = this._myIndex.records;
      const resultMap = /* @__PURE__ */ new Map();
      const results = [];
      records.forEach(({ $: item, i: idx }) => {
        if (isDefined(item)) {
          const expResults = evaluate(expression, item, idx);
          if (expResults.length) {
            if (!resultMap.has(idx)) {
              resultMap.set(idx, {
                idx,
                item,
                matches: []
              });
              results.push(resultMap.get(idx));
            }
            expResults.forEach(({ matches }) => {
              resultMap.get(idx).matches.push(...matches);
            });
          }
        }
      });
      return results;
    }
    _searchObjectList(query, { heap, ignoreFieldNorm } = {}) {
      const searcher = this._getSearcher(query);
      const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
      const { records } = this._myIndex;
      const keys = this._normalizedKeys();
      const results = heap ? null : [];
      records.forEach(({ $: item, i: idx }) => {
        if (!isDefined(item)) return;
        const matches = [];
        let anyKeyFailed = false;
        let hasInverse = false;
        keys.forEach((key, keyIndex) => {
          const keyMatches = this._findMatches({
            key,
            value: item[keyIndex],
            searcher
          });
          if (keyMatches.length) {
            matches.push(...keyMatches);
            if (keyMatches[0].hasInverse) hasInverse = true;
          } else anyKeyFailed = true;
        });
        if (hasInverse && anyKeyFailed) return;
        if (matches.length && (!requireAllTokens || this._coversAllTokens(matches))) {
          const result = {
            idx,
            item,
            matches
          };
          if (heap) {
            result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
            heap.insert(result);
          } else results.push(result);
        }
      });
      return results;
    }
    _findMatches({ key, value, searcher }) {
      if (!isDefined(value)) return [];
      const matches = [];
      if (isArray(value)) value.forEach(({ v: text, i: idx, n: norm2 }) => {
        if (!isDefined(text)) return;
        const searchResult = searcher.searchIn(text);
        if (searchResult.isMatch) {
          const match = {
            score: searchResult.score,
            key,
            value: text,
            idx,
            norm: norm2,
            indices: searchResult.indices,
            hasInverse: searchResult.hasInverse
          };
          if (searchResult.termCount !== void 0) {
            match.matchedMask = searchResult.matchedMask;
            match.matchedTerms = searchResult.matchedTerms;
            match.termCount = searchResult.termCount;
          }
          matches.push(match);
        }
      });
      else {
        const { v: text, n: norm2 } = value;
        const searchResult = searcher.searchIn(text);
        if (searchResult.isMatch) {
          const match = {
            score: searchResult.score,
            key,
            value: text,
            norm: norm2,
            indices: searchResult.indices,
            hasInverse: searchResult.hasInverse
          };
          if (searchResult.termCount !== void 0) {
            match.matchedMask = searchResult.matchedMask;
            match.matchedTerms = searchResult.matchedTerms;
            match.termCount = searchResult.termCount;
          }
          matches.push(match);
        }
      }
      return matches;
    }
    _coversAllTokens(matches) {
      const termCount = matches.length ? matches[0].termCount : void 0;
      if (termCount === void 0) return true;
      if (termCount <= 31) {
        let coverage2 = 0;
        for (let i = 0; i < matches.length; i++) coverage2 |= matches[i].matchedMask || 0;
        return coverage2 === 2 ** termCount - 1;
      }
      const coverage = /* @__PURE__ */ new Set();
      for (let i = 0; i < matches.length; i++) {
        const terms = matches[i].matchedTerms;
        if (terms) for (const t of terms) coverage.add(t);
      }
      return coverage.size === termCount;
    }
  };
  Fuse.version = "7.5.0";
  Fuse.createIndex = createIndex;
  Fuse.parseIndex = parseIndex;
  Fuse.config = Config;
  Fuse.match = function(pattern, text, options) {
    if (options && options.useTokenSearch) throw new Error(FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED);
    return createSearcher(pattern, {
      ...Config,
      ...options
    }).searchIn(text);
  };
  Fuse.parseQuery = parse;
  register(ExtendedSearch);
  register(TokenSearch);
  Fuse.use = function(...plugins) {
    plugins.forEach((plugin) => register(plugin));
  };
  var entry_default = Fuse;

  // node_modules/turndown/lib/turndown.browser.es.js
  function extend(destination) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) destination[key] = source[key];
      }
    }
    return destination;
  }
  function repeat(character, count) {
    return Array(count + 1).join(character);
  }
  function trimLeadingNewlines(string) {
    return string.replace(/^\n*/, "");
  }
  function trimTrailingNewlines(string) {
    var indexEnd = string.length;
    while (indexEnd > 0 && string[indexEnd - 1] === "\n") indexEnd--;
    return string.substring(0, indexEnd);
  }
  function trimNewlines(string) {
    return trimTrailingNewlines(trimLeadingNewlines(string));
  }
  var blockElements = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
  function isBlock(node) {
    return is(node, blockElements);
  }
  var voidElements = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
  function isVoid(node) {
    return is(node, voidElements);
  }
  function hasVoid(node) {
    return has(node, voidElements);
  }
  var meaningfulWhenBlankElements = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
  function isMeaningfulWhenBlank(node) {
    return is(node, meaningfulWhenBlankElements);
  }
  function hasMeaningfulWhenBlank(node) {
    return has(node, meaningfulWhenBlankElements);
  }
  function is(node, tagNames) {
    return tagNames.indexOf(node.nodeName) >= 0;
  }
  function has(node, tagNames) {
    return node.getElementsByTagName && tagNames.some(function(tagName) {
      return node.getElementsByTagName(tagName).length;
    });
  }
  var markdownEscapes = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
  function escapeMarkdown(string) {
    return markdownEscapes.reduce(function(accumulator, escape) {
      return accumulator.replace(escape[0], escape[1]);
    }, string);
  }
  var rules = {};
  rules.paragraph = {
    filter: "p",
    replacement: function(content) {
      return "\n\n" + content + "\n\n";
    }
  };
  rules.lineBreak = {
    filter: "br",
    replacement: function(content, node, options) {
      return options.br + "\n";
    }
  };
  rules.heading = {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement: function(content, node, options) {
      var hLevel = Number(node.nodeName.charAt(1));
      if (options.headingStyle === "setext" && hLevel < 3) {
        var underline = repeat(hLevel === 1 ? "=" : "-", content.length);
        return "\n\n" + content + "\n" + underline + "\n\n";
      } else {
        return "\n\n" + repeat("#", hLevel) + " " + content + "\n\n";
      }
    }
  };
  rules.blockquote = {
    filter: "blockquote",
    replacement: function(content) {
      content = trimNewlines(content).replace(/^/gm, "> ");
      return "\n\n" + content + "\n\n";
    }
  };
  rules.list = {
    filter: ["ul", "ol"],
    replacement: function(content, node) {
      var parent = node.parentNode;
      if (parent.nodeName === "LI" && parent.lastElementChild === node) {
        return "\n" + content;
      } else {
        return "\n\n" + content + "\n\n";
      }
    }
  };
  rules.listItem = {
    filter: "li",
    replacement: function(content, node, options) {
      var prefix = options.bulletListMarker + "   ";
      var parent = node.parentNode;
      if (parent.nodeName === "OL") {
        var start = parent.getAttribute("start");
        var index = Array.prototype.indexOf.call(parent.children, node);
        prefix = (start ? Number(start) + index : index + 1) + ".  ";
      }
      var isParagraph = /\n$/.test(content);
      content = trimNewlines(content) + (isParagraph ? "\n" : "");
      content = content.replace(/\n/gm, "\n" + " ".repeat(prefix.length));
      return prefix + content + (node.nextSibling ? "\n" : "");
    }
  };
  rules.indentedCodeBlock = {
    filter: function(node, options) {
      return options.codeBlockStyle === "indented" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
    },
    replacement: function(content, node, options) {
      return "\n\n    " + node.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
    }
  };
  rules.fencedCodeBlock = {
    filter: function(node, options) {
      return options.codeBlockStyle === "fenced" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
    },
    replacement: function(content, node, options) {
      var className = node.firstChild.getAttribute("class") || "";
      var language = (className.match(/language-(\S+)/) || [null, ""])[1];
      var code = node.firstChild.textContent;
      var fenceChar = options.fence.charAt(0);
      var fenceSize = 3;
      var fenceInCodeRegex = new RegExp("^" + fenceChar + "{3,}", "gm");
      var match;
      while (match = fenceInCodeRegex.exec(code)) {
        if (match[0].length >= fenceSize) {
          fenceSize = match[0].length + 1;
        }
      }
      var fence = repeat(fenceChar, fenceSize);
      return "\n\n" + fence + language + "\n" + code.replace(/\n$/, "") + "\n" + fence + "\n\n";
    }
  };
  rules.horizontalRule = {
    filter: "hr",
    replacement: function(content, node, options) {
      return "\n\n" + options.hr + "\n\n";
    }
  };
  rules.inlineLink = {
    filter: function(node, options) {
      return options.linkStyle === "inlined" && node.nodeName === "A" && node.getAttribute("href");
    },
    replacement: function(content, node) {
      var href = escapeLinkDestination(node.getAttribute("href"));
      var title = escapeLinkTitle(cleanAttribute(node.getAttribute("title")));
      var titlePart = title ? ' "' + title + '"' : "";
      return "[" + content + "](" + href + titlePart + ")";
    }
  };
  rules.referenceLink = {
    filter: function(node, options) {
      return options.linkStyle === "referenced" && node.nodeName === "A" && node.getAttribute("href");
    },
    replacement: function(content, node, options) {
      var href = escapeLinkDestination(node.getAttribute("href"));
      var title = cleanAttribute(node.getAttribute("title"));
      if (title) title = ' "' + escapeLinkTitle(title) + '"';
      var replacement;
      var reference;
      switch (options.linkReferenceStyle) {
        case "collapsed":
          replacement = "[" + content + "][]";
          reference = "[" + content + "]: " + href + title;
          break;
        case "shortcut":
          replacement = "[" + content + "]";
          reference = "[" + content + "]: " + href + title;
          break;
        default:
          var id = this.references.length + 1;
          replacement = "[" + content + "][" + id + "]";
          reference = "[" + id + "]: " + href + title;
      }
      this.references.push(reference);
      return replacement;
    },
    references: [],
    append: function(options) {
      var references = "";
      if (this.references.length) {
        references = "\n\n" + this.references.join("\n") + "\n\n";
        this.references = [];
      }
      return references;
    }
  };
  rules.emphasis = {
    filter: ["em", "i"],
    replacement: function(content, node, options) {
      if (!content.trim()) return "";
      return options.emDelimiter + content + options.emDelimiter;
    }
  };
  rules.strong = {
    filter: ["strong", "b"],
    replacement: function(content, node, options) {
      if (!content.trim()) return "";
      return options.strongDelimiter + content + options.strongDelimiter;
    }
  };
  rules.code = {
    filter: function(node) {
      var hasSiblings = node.previousSibling || node.nextSibling;
      var isCodeBlock = node.parentNode.nodeName === "PRE" && !hasSiblings;
      return node.nodeName === "CODE" && !isCodeBlock;
    },
    replacement: function(content) {
      if (!content) return "";
      content = content.replace(/\r?\n|\r/g, " ");
      var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? " " : "";
      var delimiter = "`";
      var matches = content.match(/`+/gm) || [];
      while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + "`";
      return delimiter + extraSpace + content + extraSpace + delimiter;
    }
  };
  rules.image = {
    filter: "img",
    replacement: function(content, node) {
      var alt = escapeMarkdown(cleanAttribute(node.getAttribute("alt")));
      var src = escapeLinkDestination(node.getAttribute("src") || "");
      var title = cleanAttribute(node.getAttribute("title"));
      var titlePart = title ? ' "' + escapeLinkTitle(title) + '"' : "";
      return src ? "![" + alt + "](" + src + titlePart + ")" : "";
    }
  };
  function cleanAttribute(attribute) {
    return attribute ? attribute.replace(/(\n+\s*)+/g, "\n") : "";
  }
  function escapeLinkDestination(destination) {
    var escaped = destination.replace(/([<>()])/g, "\\$1");
    return escaped.indexOf(" ") >= 0 ? "<" + escaped + ">" : escaped;
  }
  function escapeLinkTitle(title) {
    return title.replace(/"/g, '\\"');
  }
  function Rules(options) {
    this.options = options;
    this._keep = [];
    this._remove = [];
    this.blankRule = {
      replacement: options.blankReplacement
    };
    this.keepReplacement = options.keepReplacement;
    this.defaultRule = {
      replacement: options.defaultReplacement
    };
    this.array = [];
    for (var key in options.rules) this.array.push(options.rules[key]);
  }
  Rules.prototype = {
    add: function(key, rule) {
      this.array.unshift(rule);
    },
    keep: function(filter) {
      this._keep.unshift({
        filter,
        replacement: this.keepReplacement
      });
    },
    remove: function(filter) {
      this._remove.unshift({
        filter,
        replacement: function() {
          return "";
        }
      });
    },
    forNode: function(node) {
      if (node.isBlank) return this.blankRule;
      var rule;
      if (rule = findRule(this.array, node, this.options)) return rule;
      if (rule = findRule(this._keep, node, this.options)) return rule;
      if (rule = findRule(this._remove, node, this.options)) return rule;
      return this.defaultRule;
    },
    forEach: function(fn) {
      for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
    }
  };
  function findRule(rules2, node, options) {
    for (var i = 0; i < rules2.length; i++) {
      var rule = rules2[i];
      if (filterValue(rule, node, options)) return rule;
    }
    return void 0;
  }
  function filterValue(rule, node, options) {
    var filter = rule.filter;
    if (typeof filter === "string") {
      if (filter === node.nodeName.toLowerCase()) return true;
    } else if (Array.isArray(filter)) {
      if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true;
    } else if (typeof filter === "function") {
      if (filter.call(rule, node, options)) return true;
    } else {
      throw new TypeError("`filter` needs to be a string, array, or function");
    }
  }
  function collapseWhitespace(options) {
    var element = options.element;
    var isBlock2 = options.isBlock;
    var isVoid2 = options.isVoid;
    var isPre = options.isPre || function(node2) {
      return node2.nodeName === "PRE";
    };
    if (!element.firstChild || isPre(element)) return;
    var prevText = null;
    var keepLeadingWs = false;
    var prev = null;
    var node = next(prev, element, isPre);
    while (node !== element) {
      if (node.nodeType === 3 || node.nodeType === 4) {
        var text = node.data.replace(/[ \r\n\t]+/g, " ");
        if ((!prevText || / $/.test(prevText.data)) && !keepLeadingWs && text[0] === " ") {
          text = text.substr(1);
        }
        if (!text) {
          node = remove(node);
          continue;
        }
        node.data = text;
        prevText = node;
      } else if (node.nodeType === 1) {
        if (isBlock2(node) || node.nodeName === "BR") {
          if (prevText) {
            prevText.data = prevText.data.replace(/ $/, "");
          }
          prevText = null;
          keepLeadingWs = false;
        } else if (isVoid2(node) || isPre(node)) {
          prevText = null;
          keepLeadingWs = true;
        } else if (prevText) {
          keepLeadingWs = false;
        }
      } else {
        node = remove(node);
        continue;
      }
      var nextNode = next(prev, node, isPre);
      prev = node;
      node = nextNode;
    }
    if (prevText) {
      prevText.data = prevText.data.replace(/ $/, "");
      if (!prevText.data) {
        remove(prevText);
      }
    }
  }
  function remove(node) {
    var next2 = node.nextSibling || node.parentNode;
    node.parentNode.removeChild(node);
    return next2;
  }
  function next(prev, current, isPre) {
    if (prev && prev.parentNode === current || isPre(current)) {
      return current.nextSibling || current.parentNode;
    }
    return current.firstChild || current.nextSibling || current.parentNode;
  }
  var root = typeof window !== "undefined" ? window : {};
  function canParseHTMLNatively() {
    var Parser = root.DOMParser;
    var canParse = false;
    try {
      if (new Parser().parseFromString("", "text/html")) {
        canParse = true;
      }
    } catch (e) {
    }
    return canParse;
  }
  function createHTMLParser() {
    var Parser = function() {
    };
    {
      if (shouldUseActiveX()) {
        Parser.prototype.parseFromString = function(string) {
          var doc = new window.ActiveXObject("htmlfile");
          doc.designMode = "on";
          doc.open();
          doc.write(string);
          doc.close();
          return doc;
        };
      } else {
        Parser.prototype.parseFromString = function(string) {
          var doc = document.implementation.createHTMLDocument("");
          doc.open();
          doc.write(string);
          doc.close();
          return doc;
        };
      }
    }
    return Parser;
  }
  function shouldUseActiveX() {
    var useActiveX = false;
    try {
      document.implementation.createHTMLDocument("").open();
    } catch (e) {
      if (root.ActiveXObject) useActiveX = true;
    }
    return useActiveX;
  }
  var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();
  function RootNode(input, options) {
    var root2;
    if (typeof input === "string") {
      var doc = htmlParser().parseFromString(
        // DOM parsers arrange elements in the <head> and <body>.
        // Wrapping in a custom element ensures elements are reliably arranged in
        // a single element.
        '<x-turndown id="turndown-root">' + input + "</x-turndown>",
        "text/html"
      );
      root2 = doc.getElementById("turndown-root");
    } else {
      root2 = input.cloneNode(true);
    }
    collapseWhitespace({
      element: root2,
      isBlock,
      isVoid,
      isPre: options.preformattedCode ? isPreOrCode : null
    });
    return root2;
  }
  var _htmlParser;
  function htmlParser() {
    _htmlParser = _htmlParser || new HTMLParser();
    return _htmlParser;
  }
  function isPreOrCode(node) {
    return node.nodeName === "PRE" || node.nodeName === "CODE";
  }
  function Node(node, options) {
    node.isBlock = isBlock(node);
    node.isCode = node.nodeName === "CODE" || node.parentNode.isCode;
    node.isBlank = isBlank2(node);
    node.flankingWhitespace = flankingWhitespace(node, options);
    return node;
  }
  function isBlank2(node) {
    return !isVoid(node) && !isMeaningfulWhenBlank(node) && /^\s*$/i.test(node.textContent) && !hasVoid(node) && !hasMeaningfulWhenBlank(node);
  }
  function flankingWhitespace(node, options) {
    if (node.isBlock || options.preformattedCode && node.isCode) {
      return {
        leading: "",
        trailing: ""
      };
    }
    var edges = edgeWhitespace(node.textContent);
    if (edges.leadingAscii && isFlankedByWhitespace("left", node, options)) {
      edges.leading = edges.leadingNonAscii;
    }
    if (edges.trailingAscii && isFlankedByWhitespace("right", node, options)) {
      edges.trailing = edges.trailingNonAscii;
    }
    return {
      leading: edges.leading,
      trailing: edges.trailing
    };
  }
  function edgeWhitespace(string) {
    var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
    return {
      leading: m[1],
      // whole string for whitespace-only strings
      leadingAscii: m[2],
      leadingNonAscii: m[3],
      trailing: m[4],
      // empty for whitespace-only strings
      trailingNonAscii: m[5],
      trailingAscii: m[6]
    };
  }
  function isFlankedByWhitespace(side, node, options) {
    var sibling;
    var regExp;
    var isFlanked;
    if (side === "left") {
      sibling = node.previousSibling;
      regExp = / $/;
    } else {
      sibling = node.nextSibling;
      regExp = /^ /;
    }
    if (sibling) {
      if (sibling.nodeType === 3) {
        isFlanked = regExp.test(sibling.nodeValue);
      } else if (options.preformattedCode && sibling.nodeName === "CODE") {
        isFlanked = false;
      } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
        isFlanked = regExp.test(sibling.textContent);
      }
    }
    return isFlanked;
  }
  var reduce = Array.prototype.reduce;
  function TurndownService(options) {
    if (!(this instanceof TurndownService)) return new TurndownService(options);
    var defaults = {
      rules,
      headingStyle: "setext",
      hr: "* * *",
      bulletListMarker: "*",
      codeBlockStyle: "indented",
      fence: "```",
      emDelimiter: "_",
      strongDelimiter: "**",
      linkStyle: "inlined",
      linkReferenceStyle: "full",
      br: "  ",
      preformattedCode: false,
      blankReplacement: function(content, node) {
        return node.isBlock ? "\n\n" : "";
      },
      keepReplacement: function(content, node) {
        return node.isBlock ? "\n\n" + node.outerHTML + "\n\n" : node.outerHTML;
      },
      defaultReplacement: function(content, node) {
        return node.isBlock ? "\n\n" + content + "\n\n" : content;
      }
    };
    this.options = extend({}, defaults, options);
    this.rules = new Rules(this.options);
  }
  TurndownService.prototype = {
    /**
     * The entry point for converting a string or DOM node to Markdown
     * @public
     * @param {String|HTMLElement} input The string or DOM node to convert
     * @returns A Markdown representation of the input
     * @type String
     */
    turndown: function(input) {
      if (!canConvert(input)) {
        throw new TypeError(input + " is not a string, or an element/document/fragment node.");
      }
      if (input === "") return "";
      var output = process.call(this, new RootNode(input, this.options));
      return postProcess.call(this, output);
    },
    /**
     * Add one or more plugins
     * @public
     * @param {Function|Array} plugin The plugin or array of plugins to add
     * @returns The Turndown instance for chaining
     * @type Object
     */
    use: function(plugin) {
      if (Array.isArray(plugin)) {
        for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
      } else if (typeof plugin === "function") {
        plugin(this);
      } else {
        throw new TypeError("plugin must be a Function or an Array of Functions");
      }
      return this;
    },
    /**
     * Adds a rule
     * @public
     * @param {String} key The unique key of the rule
     * @param {Object} rule The rule
     * @returns The Turndown instance for chaining
     * @type Object
     */
    addRule: function(key, rule) {
      this.rules.add(key, rule);
      return this;
    },
    /**
     * Keep a node (as HTML) that matches the filter
     * @public
     * @param {String|Array|Function} filter The unique key of the rule
     * @returns The Turndown instance for chaining
     * @type Object
     */
    keep: function(filter) {
      this.rules.keep(filter);
      return this;
    },
    /**
     * Remove a node that matches the filter
     * @public
     * @param {String|Array|Function} filter The unique key of the rule
     * @returns The Turndown instance for chaining
     * @type Object
     */
    remove: function(filter) {
      this.rules.remove(filter);
      return this;
    },
    /**
     * Escapes Markdown syntax
     * @public
     * @param {String} string The string to escape
     * @returns A string with Markdown syntax escaped
     * @type String
     */
    escape: function(string) {
      return escapeMarkdown(string);
    }
  };
  function process(parentNode) {
    var self2 = this;
    return reduce.call(parentNode.childNodes, function(output, node) {
      node = new Node(node, self2.options);
      var replacement = "";
      if (node.nodeType === 3) {
        replacement = node.isCode ? node.nodeValue : self2.escape(node.nodeValue);
      } else if (node.nodeType === 1) {
        replacement = replacementForNode.call(self2, node);
      }
      return join(output, replacement);
    }, "");
  }
  function postProcess(output) {
    var self2 = this;
    this.rules.forEach(function(rule) {
      if (typeof rule.append === "function") {
        output = join(output, rule.append(self2.options));
      }
    });
    return output.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
  }
  function replacementForNode(node) {
    var rule = this.rules.forNode(node);
    var content = process.call(this, node);
    var whitespace = node.flankingWhitespace;
    if (whitespace.leading || whitespace.trailing) content = content.trim();
    return whitespace.leading + rule.replacement(content, node, this.options) + whitespace.trailing;
  }
  function join(output, replacement) {
    var s1 = trimTrailingNewlines(output);
    var s2 = trimLeadingNewlines(replacement);
    var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
    var separator = "\n\n".substring(0, nls);
    return s1 + separator + s2;
  }
  function canConvert(input) {
    return input != null && (typeof input === "string" || input.nodeType && (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11));
  }

  // node_modules/chrono-node/dist/esm/types.js
  var Meridiem;
  (function(Meridiem2) {
    Meridiem2[Meridiem2["AM"] = 0] = "AM";
    Meridiem2[Meridiem2["PM"] = 1] = "PM";
  })(Meridiem || (Meridiem = {}));
  var Weekday;
  (function(Weekday2) {
    Weekday2[Weekday2["SUNDAY"] = 0] = "SUNDAY";
    Weekday2[Weekday2["MONDAY"] = 1] = "MONDAY";
    Weekday2[Weekday2["TUESDAY"] = 2] = "TUESDAY";
    Weekday2[Weekday2["WEDNESDAY"] = 3] = "WEDNESDAY";
    Weekday2[Weekday2["THURSDAY"] = 4] = "THURSDAY";
    Weekday2[Weekday2["FRIDAY"] = 5] = "FRIDAY";
    Weekday2[Weekday2["SATURDAY"] = 6] = "SATURDAY";
  })(Weekday || (Weekday = {}));
  var Month;
  (function(Month2) {
    Month2[Month2["JANUARY"] = 1] = "JANUARY";
    Month2[Month2["FEBRUARY"] = 2] = "FEBRUARY";
    Month2[Month2["MARCH"] = 3] = "MARCH";
    Month2[Month2["APRIL"] = 4] = "APRIL";
    Month2[Month2["MAY"] = 5] = "MAY";
    Month2[Month2["JUNE"] = 6] = "JUNE";
    Month2[Month2["JULY"] = 7] = "JULY";
    Month2[Month2["AUGUST"] = 8] = "AUGUST";
    Month2[Month2["SEPTEMBER"] = 9] = "SEPTEMBER";
    Month2[Month2["OCTOBER"] = 10] = "OCTOBER";
    Month2[Month2["NOVEMBER"] = 11] = "NOVEMBER";
    Month2[Month2["DECEMBER"] = 12] = "DECEMBER";
  })(Month || (Month = {}));

  // node_modules/chrono-node/dist/esm/utils/dates.js
  function assignSimilarDate(component, target) {
    component.assign("day", target.getDate());
    component.assign("month", target.getMonth() + 1);
    component.assign("year", target.getFullYear());
  }
  function assignSimilarTime(component, target) {
    component.assign("hour", target.getHours());
    component.assign("minute", target.getMinutes());
    component.assign("second", target.getSeconds());
    component.assign("millisecond", target.getMilliseconds());
    component.assign("meridiem", target.getHours() < 12 ? Meridiem.AM : Meridiem.PM);
  }
  function implySimilarDate(component, target) {
    component.imply("day", target.getDate());
    component.imply("month", target.getMonth() + 1);
    component.imply("year", target.getFullYear());
  }
  function implySimilarTime(component, target) {
    component.imply("hour", target.getHours());
    component.imply("minute", target.getMinutes());
    component.imply("second", target.getSeconds());
    component.imply("millisecond", target.getMilliseconds());
    component.imply("meridiem", target.getHours() < 12 ? Meridiem.AM : Meridiem.PM);
  }

  // node_modules/chrono-node/dist/esm/timezone.js
  var TIMEZONE_ABBR_MAP = {
    ACDT: 630,
    ACST: 570,
    ADT: -180,
    AEDT: 660,
    AEST: 600,
    AFT: 270,
    AKDT: -480,
    AKST: -540,
    ALMT: 360,
    AMST: -180,
    AMT: -240,
    ANAST: 720,
    ANAT: 720,
    AQTT: 300,
    ART: -180,
    AST: -240,
    AWDT: 540,
    AWST: 480,
    AZOST: 0,
    AZOT: -60,
    AZST: 300,
    AZT: 240,
    BNT: 480,
    BOT: -240,
    BRST: -120,
    BRT: -180,
    BST: 60,
    BTT: 360,
    CAST: 480,
    CAT: 120,
    CCT: 390,
    CDT: -300,
    CEST: 120,
    CET: {
      timezoneOffsetDuringDst: 2 * 60,
      timezoneOffsetNonDst: 60,
      dstStart: (year) => getLastWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2),
      dstEnd: (year) => getLastWeekdayOfMonth(year, Month.OCTOBER, Weekday.SUNDAY, 3)
    },
    CHADT: 825,
    CHAST: 765,
    CKT: -600,
    CLST: -180,
    CLT: -240,
    COT: -300,
    CST: -360,
    CT: {
      timezoneOffsetDuringDst: -5 * 60,
      timezoneOffsetNonDst: -6 * 60,
      dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
      dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
    },
    CVT: -60,
    CXT: 420,
    ChST: 600,
    DAVT: 420,
    EASST: -300,
    EAST: -360,
    EAT: 180,
    ECT: -300,
    EDT: -240,
    EEST: 180,
    EET: 120,
    EGST: 0,
    EGT: -60,
    EST: -300,
    ET: {
      timezoneOffsetDuringDst: -4 * 60,
      timezoneOffsetNonDst: -5 * 60,
      dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
      dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
    },
    FJST: 780,
    FJT: 720,
    FKST: -180,
    FKT: -240,
    FNT: -120,
    GALT: -360,
    GAMT: -540,
    GET: 240,
    GFT: -180,
    GILT: 720,
    GMT: 0,
    GST: 240,
    GYT: -240,
    HAA: -180,
    HAC: -300,
    HADT: -540,
    HAE: -240,
    HAP: -420,
    HAR: -360,
    HAST: -600,
    HAT: -90,
    HAY: -480,
    HKT: 480,
    HLV: -210,
    HNA: -240,
    HNC: -360,
    HNE: -300,
    HNP: -480,
    HNR: -420,
    HNT: -150,
    HNY: -540,
    HOVT: 420,
    ICT: 420,
    IDT: 180,
    IOT: 360,
    IRDT: 270,
    IRKST: 540,
    IRKT: 540,
    IRST: 210,
    IST: 330,
    JST: 540,
    KGT: 360,
    KRAST: 480,
    KRAT: 480,
    KST: 540,
    KUYT: 240,
    LHDT: 660,
    LHST: 630,
    LINT: 840,
    MAGST: 720,
    MAGT: 720,
    MART: -510,
    MAWT: 300,
    MDT: -360,
    MESZ: 120,
    MEZ: 60,
    MHT: 720,
    MMT: 390,
    MSD: 240,
    MSK: 180,
    MST: -420,
    MT: {
      timezoneOffsetDuringDst: -6 * 60,
      timezoneOffsetNonDst: -7 * 60,
      dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
      dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
    },
    MUT: 240,
    MVT: 300,
    MYT: 480,
    NCT: 660,
    NDT: -90,
    NFT: 690,
    NOVST: 420,
    NOVT: 360,
    NPT: 345,
    NST: -150,
    NUT: -660,
    NZDT: 780,
    NZST: 720,
    OMSST: 420,
    OMST: 420,
    PDT: -420,
    PET: -300,
    PETST: 720,
    PETT: 720,
    PGT: 600,
    PHOT: 780,
    PHT: 480,
    PKT: 300,
    PMDT: -120,
    PMST: -180,
    PONT: 660,
    PST: -480,
    PT: {
      timezoneOffsetDuringDst: -7 * 60,
      timezoneOffsetNonDst: -8 * 60,
      dstStart: (year) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
      dstEnd: (year) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2)
    },
    PWT: 540,
    PYST: -180,
    PYT: -240,
    RET: 240,
    SAMT: 240,
    SAST: 120,
    SBT: 660,
    SCT: 240,
    SGT: 480,
    SRT: -180,
    SST: -660,
    TAHT: -600,
    TFT: 300,
    TJT: 300,
    TKT: 780,
    TLT: 540,
    TMT: 300,
    TVT: 720,
    ULAT: 480,
    UTC: 0,
    UYST: -120,
    UYT: -180,
    UZT: 300,
    VET: -210,
    VLAST: 660,
    VLAT: 660,
    VUT: 660,
    WAST: 120,
    WAT: 60,
    WEST: 60,
    WESZ: 60,
    WET: 0,
    WEZ: 0,
    WFT: 720,
    WGST: -120,
    WGT: -180,
    WIB: 420,
    WIT: 540,
    WITA: 480,
    WST: 780,
    WT: 0,
    YAKST: 600,
    YAKT: 600,
    YAPT: 600,
    YEKST: 360,
    YEKT: 360
  };
  function getNthWeekdayOfMonth(year, month, weekday, n, hour = 0) {
    let dayOfMonth = 0;
    let i = 0;
    while (i < n) {
      dayOfMonth++;
      const date = new Date(year, month - 1, dayOfMonth);
      if (date.getDay() === weekday)
        i++;
    }
    return new Date(year, month - 1, dayOfMonth, hour);
  }
  function getLastWeekdayOfMonth(year, month, weekday, hour = 0) {
    const oneIndexedWeekday = weekday === 0 ? 7 : weekday;
    const date = new Date(year, month - 1 + 1, 1, 12);
    const firstWeekdayNextMonth = date.getDay() === 0 ? 7 : date.getDay();
    let dayDiff;
    if (firstWeekdayNextMonth === oneIndexedWeekday)
      dayDiff = 7;
    else if (firstWeekdayNextMonth < oneIndexedWeekday)
      dayDiff = 7 + firstWeekdayNextMonth - oneIndexedWeekday;
    else
      dayDiff = firstWeekdayNextMonth - oneIndexedWeekday;
    date.setDate(date.getDate() - dayDiff);
    return new Date(year, month - 1, date.getDate(), hour);
  }
  function toTimezoneOffset(timezoneInput, date, timezoneOverrides = {}) {
    if (timezoneInput == null) {
      return null;
    }
    if (typeof timezoneInput === "number") {
      return timezoneInput;
    }
    const matchedTimezone = timezoneOverrides[timezoneInput] ?? TIMEZONE_ABBR_MAP[timezoneInput];
    if (matchedTimezone == null) {
      return null;
    }
    if (typeof matchedTimezone == "number") {
      return matchedTimezone;
    }
    if (date == null) {
      return null;
    }
    if (date > matchedTimezone.dstStart(date.getFullYear()) && !(date > matchedTimezone.dstEnd(date.getFullYear()))) {
      return matchedTimezone.timezoneOffsetDuringDst;
    }
    return matchedTimezone.timezoneOffsetNonDst;
  }

  // node_modules/chrono-node/dist/esm/calculation/duration.js
  var EmptyDuration = {
    day: 0,
    second: 0,
    millisecond: 0
  };
  function addDuration(ref, duration) {
    let date = new Date(ref);
    if (duration["y"]) {
      duration["year"] = duration["y"];
      delete duration["y"];
    }
    if (duration["mo"]) {
      duration["month"] = duration["mo"];
      delete duration["mo"];
    }
    if (duration["M"]) {
      duration["month"] = duration["M"];
      delete duration["M"];
    }
    if (duration["w"]) {
      duration["week"] = duration["w"];
      delete duration["w"];
    }
    if (duration["d"]) {
      duration["day"] = duration["d"];
      delete duration["d"];
    }
    if (duration["h"]) {
      duration["hour"] = duration["h"];
      delete duration["h"];
    }
    if (duration["m"]) {
      duration["minute"] = duration["m"];
      delete duration["m"];
    }
    if (duration["s"]) {
      duration["second"] = duration["s"];
      delete duration["s"];
    }
    if (duration["ms"]) {
      duration["millisecond"] = duration["ms"];
      delete duration["ms"];
    }
    if ("year" in duration) {
      const floor = Math.floor(duration["year"]);
      date.setFullYear(date.getFullYear() + floor);
      const remainingFraction = duration["year"] - floor;
      if (remainingFraction > 0) {
        duration.month = duration?.month ?? 0;
        duration.month += remainingFraction * 12;
      }
    }
    if ("quarter" in duration) {
      const floor = Math.floor(duration["quarter"]);
      date.setMonth(date.getMonth() + floor * 3);
    }
    if ("month" in duration) {
      const floor = Math.floor(duration["month"]);
      date.setMonth(date.getMonth() + floor);
      const remainingFraction = duration["month"] - floor;
      if (remainingFraction > 0) {
        duration.week = duration?.week ?? 0;
        duration.week += remainingFraction * 4;
      }
    }
    if ("week" in duration) {
      const floor = Math.floor(duration["week"]);
      date.setDate(date.getDate() + floor * 7);
      const remainingFraction = duration["week"] - floor;
      if (remainingFraction > 0) {
        duration.day = duration?.day ?? 0;
        duration.day += Math.round(remainingFraction * 7);
      }
    }
    if ("day" in duration) {
      const floor = Math.floor(duration["day"]);
      date.setDate(date.getDate() + floor);
      const remainingFraction = duration["day"] - floor;
      if (remainingFraction > 0) {
        duration.hour = duration?.hour ?? 0;
        duration.hour += Math.round(remainingFraction * 24);
      }
    }
    if ("hour" in duration) {
      const floor = Math.floor(duration["hour"]);
      date.setHours(date.getHours() + floor);
      const remainingFraction = duration["hour"] - floor;
      if (remainingFraction > 0) {
        duration.minute = duration?.minute ?? 0;
        duration.minute += Math.round(remainingFraction * 60);
      }
    }
    if ("minute" in duration) {
      const floor = Math.floor(duration["minute"]);
      date.setMinutes(date.getMinutes() + floor);
      const remainingFraction = duration["minute"] - floor;
      if (remainingFraction > 0) {
        duration.second = duration?.second ?? 0;
        duration.second += Math.round(remainingFraction * 60);
      }
    }
    if ("second" in duration) {
      const floor = Math.floor(duration["second"]);
      date.setSeconds(date.getSeconds() + floor);
      const remainingFraction = duration["second"] - floor;
      if (remainingFraction > 0) {
        duration.millisecond = duration?.millisecond ?? 0;
        duration.millisecond += Math.round(remainingFraction * 1e3);
      }
    }
    if ("millisecond" in duration) {
      const floor = Math.floor(duration["millisecond"]);
      date.setMilliseconds(date.getMilliseconds() + floor);
    }
    return date;
  }
  function reverseDuration(duration) {
    const reversed = {};
    for (const key in duration) {
      reversed[key] = -duration[key];
    }
    return reversed;
  }

  // node_modules/chrono-node/dist/esm/results.js
  var ReferenceWithTimezone = class _ReferenceWithTimezone {
    instant;
    timezoneOffset;
    constructor(instant, timezoneOffset) {
      this.instant = instant ?? /* @__PURE__ */ new Date();
      this.timezoneOffset = timezoneOffset ?? null;
    }
    static fromDate(date) {
      return new _ReferenceWithTimezone(date);
    }
    static fromInput(input, timezoneOverrides) {
      if (input instanceof Date) {
        return _ReferenceWithTimezone.fromDate(input);
      }
      const instant = input?.instant ?? /* @__PURE__ */ new Date();
      const timezoneOffset = toTimezoneOffset(input?.timezone, instant, timezoneOverrides);
      return new _ReferenceWithTimezone(instant, timezoneOffset);
    }
    getDateWithAdjustedTimezone() {
      const date = new Date(this.instant);
      if (this.timezoneOffset !== null) {
        date.setMinutes(date.getMinutes() - this.getSystemTimezoneAdjustmentMinute(this.instant));
      }
      return date;
    }
    getSystemTimezoneAdjustmentMinute(date, overrideTimezoneOffset) {
      if (!date) {
        date = /* @__PURE__ */ new Date();
      }
      const currentTimezoneOffset = -date.getTimezoneOffset();
      const targetTimezoneOffset = overrideTimezoneOffset ?? this.timezoneOffset ?? currentTimezoneOffset;
      return currentTimezoneOffset - targetTimezoneOffset;
    }
    getTimezoneOffset() {
      return this.timezoneOffset ?? -this.instant.getTimezoneOffset();
    }
  };
  var ParsingComponents = class _ParsingComponents {
    knownValues;
    impliedValues;
    reference;
    _tags = /* @__PURE__ */ new Set();
    constructor(reference, knownComponents) {
      this.reference = reference;
      this.knownValues = {};
      this.impliedValues = {};
      if (knownComponents) {
        for (const key in knownComponents) {
          this.knownValues[key] = knownComponents[key];
        }
      }
      const date = reference.getDateWithAdjustedTimezone();
      this.imply("day", date.getDate());
      this.imply("month", date.getMonth() + 1);
      this.imply("year", date.getFullYear());
      this.imply("hour", 12);
      this.imply("minute", 0);
      this.imply("second", 0);
      this.imply("millisecond", 0);
    }
    static createRelativeFromReference(reference, duration = EmptyDuration) {
      let date = addDuration(reference.getDateWithAdjustedTimezone(), duration);
      const components = new _ParsingComponents(reference);
      components.addTag("result/relativeDate");
      if ("hour" in duration || "minute" in duration || "second" in duration || "millisecond" in duration) {
        components.addTag("result/relativeDateAndTime");
        assignSimilarTime(components, date);
        assignSimilarDate(components, date);
        components.assign("timezoneOffset", reference.getTimezoneOffset());
      } else {
        implySimilarTime(components, date);
        components.imply("timezoneOffset", reference.getTimezoneOffset());
        if ("day" in duration) {
          components.assign("day", date.getDate());
          components.assign("month", date.getMonth() + 1);
          components.assign("year", date.getFullYear());
          components.assign("weekday", date.getDay());
        } else if ("week" in duration) {
          components.assign("day", date.getDate());
          components.assign("month", date.getMonth() + 1);
          components.assign("year", date.getFullYear());
          components.imply("weekday", date.getDay());
        } else {
          components.imply("day", date.getDate());
          if ("month" in duration) {
            components.assign("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
          } else {
            components.imply("month", date.getMonth() + 1);
            if ("year" in duration) {
              components.assign("year", date.getFullYear());
            } else {
              components.imply("year", date.getFullYear());
            }
          }
        }
      }
      return components;
    }
    get(component) {
      if (component in this.knownValues) {
        return this.knownValues[component];
      }
      if (component in this.impliedValues) {
        return this.impliedValues[component];
      }
      return null;
    }
    isCertain(component) {
      return component in this.knownValues;
    }
    getCertainComponents() {
      return Object.keys(this.knownValues);
    }
    imply(component, value) {
      if (component in this.knownValues) {
        return this;
      }
      this.impliedValues[component] = value;
      return this;
    }
    assign(component, value) {
      this.knownValues[component] = value;
      delete this.impliedValues[component];
      return this;
    }
    addDurationAsImplied(duration) {
      const currentDate = this.dateWithoutTimezoneAdjustment();
      const date = addDuration(currentDate, duration);
      if ("day" in duration || "week" in duration || "month" in duration || "year" in duration) {
        this.delete(["day", "weekday", "month", "year"]);
        this.imply("day", date.getDate());
        this.imply("weekday", date.getDay());
        this.imply("month", date.getMonth() + 1);
        this.imply("year", date.getFullYear());
      }
      if ("second" in duration || "minute" in duration || "hour" in duration) {
        this.delete(["second", "minute", "hour"]);
        this.imply("second", date.getSeconds());
        this.imply("minute", date.getMinutes());
        this.imply("hour", date.getHours());
      }
      return this;
    }
    delete(components) {
      if (typeof components === "string") {
        components = [components];
      }
      for (const component of components) {
        delete this.knownValues[component];
        delete this.impliedValues[component];
      }
    }
    clone() {
      const component = new _ParsingComponents(this.reference);
      component.knownValues = {};
      component.impliedValues = {};
      for (const key in this.knownValues) {
        component.knownValues[key] = this.knownValues[key];
      }
      for (const key in this.impliedValues) {
        component.impliedValues[key] = this.impliedValues[key];
      }
      return component;
    }
    isOnlyDate() {
      return !this.isCertain("hour") && !this.isCertain("minute") && !this.isCertain("second");
    }
    isOnlyTime() {
      return !this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month") && !this.isCertain("year");
    }
    isOnlyWeekdayComponent() {
      return this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
    }
    isDateWithUnknownYear() {
      return this.isCertain("month") && !this.isCertain("year");
    }
    isValidDate() {
      const date = new Date(Date.UTC(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond")));
      date.setUTCFullYear(this.get("year"));
      if (date.getUTCFullYear() !== this.get("year"))
        return false;
      if (date.getUTCMonth() !== this.get("month") - 1)
        return false;
      if (date.getUTCDate() !== this.get("day"))
        return false;
      if (this.get("hour") != null && date.getUTCHours() != this.get("hour"))
        return false;
      if (this.get("minute") != null && date.getUTCMinutes() != this.get("minute"))
        return false;
      return true;
    }
    toString() {
      return `[ParsingComponents {
            tags: ${JSON.stringify(Array.from(this._tags).sort())}, 
            knownValues: ${JSON.stringify(this.knownValues)}, 
            impliedValues: ${JSON.stringify(this.impliedValues)}}, 
            reference: ${JSON.stringify(this.reference)}]`;
    }
    date() {
      const timezoneOffset = this.get("timezoneOffset") ?? this.reference.timezoneOffset;
      if (timezoneOffset === null || timezoneOffset === void 0) {
        return this.dateWithoutTimezoneAdjustment();
      }
      const date = new Date(Date.UTC(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond")));
      date.setUTCFullYear(this.get("year"));
      return new Date(date.getTime() - timezoneOffset * 6e4);
    }
    addTag(tag) {
      this._tags.add(tag);
      return this;
    }
    addTags(tags) {
      for (const tag of tags) {
        this._tags.add(tag);
      }
      return this;
    }
    tags() {
      return new Set(this._tags);
    }
    dateWithoutTimezoneAdjustment() {
      const date = new Date(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond"));
      date.setFullYear(this.get("year"));
      return date;
    }
  };
  var ParsingResult = class _ParsingResult {
    refDate;
    index;
    text;
    reference;
    start;
    end;
    constructor(reference, index, text, start, end) {
      this.reference = reference;
      this.refDate = reference.instant;
      this.index = index;
      this.text = text;
      this.start = start || new ParsingComponents(reference);
      this.end = end;
    }
    clone() {
      const result = new _ParsingResult(this.reference, this.index, this.text);
      result.start = this.start ? this.start.clone() : null;
      result.end = this.end ? this.end.clone() : null;
      return result;
    }
    date() {
      return this.start.date();
    }
    addTag(tag) {
      this.start.addTag(tag);
      if (this.end) {
        this.end.addTag(tag);
      }
      return this;
    }
    addTags(tags) {
      this.start.addTags(tags);
      if (this.end) {
        this.end.addTags(tags);
      }
      return this;
    }
    tags() {
      const combinedTags = new Set(this.start.tags());
      if (this.end) {
        for (const tag of this.end.tags()) {
          combinedTags.add(tag);
        }
      }
      return combinedTags;
    }
    toString() {
      const tags = Array.from(this.tags()).sort();
      return `[ParsingResult {index: ${this.index}, text: '${this.text}', tags: ${JSON.stringify(tags)} ...}]`;
    }
  };

  // node_modules/chrono-node/dist/esm/utils/pattern.js
  function repeatedTimeunitPattern(prefix, singleTimeunitPattern, connectorPattern = "\\s{0,5},?\\s{0,5}") {
    const singleTimeunitPatternNoCapture = singleTimeunitPattern.replace(/\((?!\?)/g, "(?:");
    return `${prefix}${singleTimeunitPatternNoCapture}(?:${connectorPattern}${singleTimeunitPatternNoCapture}){0,10}`;
  }
  function extractTerms(dictionary) {
    let keys;
    if (dictionary instanceof Array) {
      keys = [...dictionary];
    } else if (dictionary instanceof Map) {
      keys = Array.from(dictionary.keys());
    } else {
      keys = Object.keys(dictionary);
    }
    return keys;
  }
  function matchAnyPattern(dictionary) {
    const joinedTerms = extractTerms(dictionary).sort((a, b) => b.length - a.length).join("|").replace(/\./g, "\\.");
    return `(?:${joinedTerms})`;
  }

  // node_modules/chrono-node/dist/esm/calculation/years.js
  function findMostLikelyADYear(yearNumber) {
    if (yearNumber < 100) {
      if (yearNumber > 50) {
        yearNumber = yearNumber + 1900;
      } else {
        yearNumber = yearNumber + 2e3;
      }
    }
    return yearNumber;
  }
  function findYearClosestToRef(refDate, day, month) {
    let date = new Date(refDate);
    date.setMonth(month - 1);
    date.setDate(day);
    const nextYear = addDuration(date, { "year": 1 });
    const lastYear = addDuration(date, { "year": -1 });
    if (Math.abs(nextYear.getTime() - refDate.getTime()) < Math.abs(date.getTime() - refDate.getTime())) {
      date = nextYear;
    } else if (Math.abs(lastYear.getTime() - refDate.getTime()) < Math.abs(date.getTime() - refDate.getTime())) {
      date = lastYear;
    }
    return date.getFullYear();
  }

  // node_modules/chrono-node/dist/esm/locales/en/constants.js
  var WEEKDAY_DICTIONARY = {
    sunday: 0,
    sun: 0,
    "sun.": 0,
    monday: 1,
    mon: 1,
    "mon.": 1,
    tuesday: 2,
    tue: 2,
    "tue.": 2,
    wednesday: 3,
    wed: 3,
    "wed.": 3,
    thursday: 4,
    thurs: 4,
    "thurs.": 4,
    thur: 4,
    "thur.": 4,
    thu: 4,
    "thu.": 4,
    friday: 5,
    fri: 5,
    "fri.": 5,
    saturday: 6,
    sat: 6,
    "sat.": 6
  };
  var FULL_MONTH_NAME_DICTIONARY = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12
  };
  var MONTH_DICTIONARY = {
    ...FULL_MONTH_NAME_DICTIONARY,
    jan: 1,
    "jan.": 1,
    feb: 2,
    "feb.": 2,
    mar: 3,
    "mar.": 3,
    apr: 4,
    "apr.": 4,
    jun: 6,
    "jun.": 6,
    jul: 7,
    "jul.": 7,
    aug: 8,
    "aug.": 8,
    sep: 9,
    "sep.": 9,
    sept: 9,
    "sept.": 9,
    oct: 10,
    "oct.": 10,
    nov: 11,
    "nov.": 11,
    dec: 12,
    "dec.": 12
  };
  var INTEGER_WORD_DICTIONARY = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12
  };
  var ORDINAL_WORD_DICTIONARY = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
    eighth: 8,
    ninth: 9,
    tenth: 10,
    eleventh: 11,
    twelfth: 12,
    thirteenth: 13,
    fourteenth: 14,
    fifteenth: 15,
    sixteenth: 16,
    seventeenth: 17,
    eighteenth: 18,
    nineteenth: 19,
    twentieth: 20,
    "twenty first": 21,
    "twenty-first": 21,
    "twenty second": 22,
    "twenty-second": 22,
    "twenty third": 23,
    "twenty-third": 23,
    "twenty fourth": 24,
    "twenty-fourth": 24,
    "twenty fifth": 25,
    "twenty-fifth": 25,
    "twenty sixth": 26,
    "twenty-sixth": 26,
    "twenty seventh": 27,
    "twenty-seventh": 27,
    "twenty eighth": 28,
    "twenty-eighth": 28,
    "twenty ninth": 29,
    "twenty-ninth": 29,
    "thirtieth": 30,
    "thirty first": 31,
    "thirty-first": 31
  };
  var TIME_UNIT_DICTIONARY_NO_ABBR = {
    second: "second",
    seconds: "second",
    minute: "minute",
    minutes: "minute",
    hour: "hour",
    hours: "hour",
    day: "day",
    days: "day",
    week: "week",
    weeks: "week",
    month: "month",
    months: "month",
    quarter: "quarter",
    quarters: "quarter",
    year: "year",
    years: "year"
  };
  var TIME_UNIT_DICTIONARY = {
    s: "second",
    sec: "second",
    second: "second",
    seconds: "second",
    m: "minute",
    min: "minute",
    mins: "minute",
    minute: "minute",
    minutes: "minute",
    h: "hour",
    hr: "hour",
    hrs: "hour",
    hour: "hour",
    hours: "hour",
    d: "day",
    day: "day",
    days: "day",
    w: "week",
    week: "week",
    weeks: "week",
    mo: "month",
    mon: "month",
    mos: "month",
    month: "month",
    months: "month",
    qtr: "quarter",
    quarter: "quarter",
    quarters: "quarter",
    y: "year",
    yr: "year",
    year: "year",
    years: "year",
    ...TIME_UNIT_DICTIONARY_NO_ABBR
  };
  var NUMBER_PATTERN = `(?:${matchAnyPattern(INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
  function parseNumberPattern(match) {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== void 0) {
      return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "a" || num === "an" || num == "the") {
      return 1;
    } else if (num.match(/few/)) {
      return 3;
    } else if (num.match(/half/)) {
      return 0.5;
    } else if (num.match(/couple/)) {
      return 2;
    } else if (num.match(/several/)) {
      return 7;
    }
    return parseFloat(num);
  }
  var ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
  function parseOrdinalNumberPattern(match) {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== void 0) {
      return ORDINAL_WORD_DICTIONARY[num];
    }
    num = num.replace(/(?:st|nd|rd|th)$/i, "");
    return parseInt(num);
  }
  var YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3}|[0-9]{2}(?!\\w|:\\d|\\s+(?:am|pm|o\\s*clock|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)))`;
  function parseYear(match) {
    if (/BE/i.test(match)) {
      match = match.replace(/BE/i, "");
      return parseInt(match) - 543;
    }
    if (/BCE?/i.test(match)) {
      match = match.replace(/BCE?/i, "");
      return -parseInt(match);
    }
    if (/(AD|CE)/i.test(match)) {
      match = match.replace(/(AD|CE)/i, "");
      return parseInt(match);
    }
    const rawYearNumber = parseInt(match);
    return findMostLikelyADYear(rawYearNumber);
  }
  var SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,3}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`;
  var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
  var SINGLE_TIME_UNIT_NO_ABBR_PATTERN = `(${NUMBER_PATTERN})\\s{0,3}(${matchAnyPattern(TIME_UNIT_DICTIONARY_NO_ABBR)})`;
  var TIME_UNIT_CONNECTOR_PATTERN = `\\s{0,5},?(?:\\s*and)?\\s{0,5}`;
  var TIME_UNITS_PATTERN = repeatedTimeunitPattern(`(?:(?:about|around)\\s{0,3})?`, SINGLE_TIME_UNIT_PATTERN, TIME_UNIT_CONNECTOR_PATTERN);
  var TIME_UNITS_NO_ABBR_PATTERN = repeatedTimeunitPattern(`(?:(?:about|around)\\s{0,3})?`, SINGLE_TIME_UNIT_NO_ABBR_PATTERN, TIME_UNIT_CONNECTOR_PATTERN);
  function parseDuration(timeunitText) {
    const fragments = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
      collectDateTimeFragment(fragments, match);
      remainingText = remainingText.substring(match[0].length).trim();
      match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    if (Object.keys(fragments).length == 0) {
      return null;
    }
    return fragments;
  }
  function collectDateTimeFragment(fragments, match) {
    if (match[0].match(/^[a-zA-Z]+$/)) {
      return;
    }
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
  }

  // node_modules/chrono-node/dist/esm/common/parsers/AbstractParserWithWordBoundary.js
  var AbstractParserWithWordBoundaryChecking = class {
    innerPatternHasChange(context, currentInnerPattern) {
      return this.innerPattern(context) !== currentInnerPattern;
    }
    patternLeftBoundary() {
      return `(\\W|^)`;
    }
    cachedInnerPattern = null;
    cachedPattern = null;
    pattern(context) {
      if (this.cachedInnerPattern) {
        if (!this.innerPatternHasChange(context, this.cachedInnerPattern)) {
          return this.cachedPattern;
        }
      }
      this.cachedInnerPattern = this.innerPattern(context);
      this.cachedPattern = new RegExp(`${this.patternLeftBoundary()}${this.cachedInnerPattern.source}`, this.cachedInnerPattern.flags);
      return this.cachedPattern;
    }
    extract(context, match) {
      const header = match[1] ?? "";
      match.index = match.index + header.length;
      match[0] = match[0].substring(header.length);
      for (let i = 2; i < match.length; i++) {
        match[i - 1] = match[i];
      }
      return this.innerExtract(context, match);
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitWithinFormatParser.js
  var PATTERN_WITH_OPTIONAL_PREFIX = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
  var PATTERN_WITH_PREFIX = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
  var PATTERN_WITH_PREFIX_STRICT = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`, "i");
  var ENTimeUnitWithinFormatParser = class extends AbstractParserWithWordBoundaryChecking {
    strictMode;
    constructor(strictMode) {
      super();
      this.strictMode = strictMode;
    }
    innerPattern(context) {
      if (this.strictMode) {
        return PATTERN_WITH_PREFIX_STRICT;
      }
      return context.option.forwardDate ? PATTERN_WITH_OPTIONAL_PREFIX : PATTERN_WITH_PREFIX;
    }
    innerExtract(context, match) {
      if (match[0].match(/^for\s*the\s*\w+/)) {
        return null;
      }
      const timeUnits = parseDuration(match[1]);
      if (!timeUnits) {
        return null;
      }
      return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENMonthNameLittleEndianParser.js
  var PATTERN = new RegExp(`(?:on\\s{0,3})?(${ORDINAL_NUMBER_PATTERN})(?:\\s{0,3}(?:to|\\-|\\\u2013|until|through|till)\\s{0,3}(${ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${matchAnyPattern(MONTH_DICTIONARY)})(?:(?:-|/|,?\\s{0,3})(${YEAR_PATTERN}(?!\\w)))?(?=\\W|$)`, "i");
  var DATE_GROUP = 1;
  var DATE_TO_GROUP = 2;
  var MONTH_NAME_GROUP = 3;
  var YEAR_GROUP = 4;
  var ENMonthNameLittleEndianParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN;
    }
    innerExtract(context, match) {
      const result = context.createParsingResult(match.index, match[0]);
      const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
      const day = parseOrdinalNumberPattern(match[DATE_GROUP]);
      if (day > 31) {
        match.index = match.index + match[DATE_GROUP].length;
        return null;
      }
      result.start.assign("month", month);
      result.start.assign("day", day);
      if (match[YEAR_GROUP]) {
        const yearNumber = parseYear(match[YEAR_GROUP]);
        result.start.assign("year", yearNumber);
      } else {
        const year = findYearClosestToRef(context.refDate, day, month);
        result.start.imply("year", year);
      }
      if (match[DATE_TO_GROUP]) {
        const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
        result.end = result.start.clone();
        result.end.assign("day", endDate);
      }
      return result;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENMonthNameMiddleEndianParser.js
  var PATTERN2 = new RegExp(`(${matchAnyPattern(MONTH_DICTIONARY)})(?:-|/|\\s*,?\\s*)(${ORDINAL_NUMBER_PATTERN})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${ORDINAL_NUMBER_PATTERN})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${YEAR_PATTERN}))?(?=\\W|$)(?!\\:\\d)`, "i");
  var MONTH_NAME_GROUP2 = 1;
  var DATE_GROUP2 = 2;
  var DATE_TO_GROUP2 = 3;
  var YEAR_GROUP2 = 4;
  var ENMonthNameMiddleEndianParser = class extends AbstractParserWithWordBoundaryChecking {
    shouldSkipYearLikeDate;
    constructor(shouldSkipYearLikeDate) {
      super();
      this.shouldSkipYearLikeDate = shouldSkipYearLikeDate;
    }
    innerPattern() {
      return PATTERN2;
    }
    innerExtract(context, match) {
      const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP2].toLowerCase()];
      const day = parseOrdinalNumberPattern(match[DATE_GROUP2]);
      if (day > 31) {
        return null;
      }
      if (this.shouldSkipYearLikeDate) {
        if (!match[DATE_TO_GROUP2] && !match[YEAR_GROUP2] && match[DATE_GROUP2].match(/^\d{2}$/)) {
          return null;
        }
      }
      const components = context.createParsingComponents({
        day,
        month
      }).addTag("parser/ENMonthNameMiddleEndianParser");
      if (match[YEAR_GROUP2]) {
        const year = parseYear(match[YEAR_GROUP2]);
        components.assign("year", year);
      } else {
        const year = findYearClosestToRef(context.refDate, day, month);
        components.imply("year", year);
      }
      if (!match[DATE_TO_GROUP2]) {
        return components;
      }
      const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP2]);
      const result = context.createParsingResult(match.index, match[0]);
      result.start = components;
      result.end = components.clone();
      result.end.assign("day", endDate);
      return result;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENMonthNameParser.js
  var PATTERN3 = new RegExp(`((?:in)\\s*)?(${matchAnyPattern(MONTH_DICTIONARY)})\\s*(?:(?:,|-|of)?\\s*(${YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i");
  var PREFIX_GROUP = 1;
  var MONTH_NAME_GROUP3 = 2;
  var YEAR_GROUP3 = 3;
  var ENMonthNameParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN3;
    }
    innerExtract(context, match) {
      const monthName = match[MONTH_NAME_GROUP3].toLowerCase();
      if (match[0].length <= 3 && !FULL_MONTH_NAME_DICTIONARY[monthName]) {
        return null;
      }
      const result = context.createParsingResult(match.index + (match[PREFIX_GROUP] || "").length, match.index + match[0].length);
      result.start.imply("day", 1);
      result.start.addTag("parser/ENMonthNameParser");
      const month = MONTH_DICTIONARY[monthName];
      result.start.assign("month", month);
      if (match[YEAR_GROUP3]) {
        const year = parseYear(match[YEAR_GROUP3]);
        result.start.assign("year", year);
      } else {
        const year = findYearClosestToRef(context.refDate, 1, month);
        result.start.imply("year", year);
      }
      return result;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENYearMonthDayParser.js
  var PATTERN4 = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${matchAnyPattern(MONTH_DICTIONARY)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i");
  var YEAR_NUMBER_GROUP = 1;
  var MONTH_NAME_GROUP4 = 2;
  var MONTH_NUMBER_GROUP = 3;
  var DATE_NUMBER_GROUP = 4;
  var ENYearMonthDayParser = class extends AbstractParserWithWordBoundaryChecking {
    strictMonthDateOrder;
    constructor(strictMonthDateOrder) {
      super();
      this.strictMonthDateOrder = strictMonthDateOrder;
    }
    innerPattern() {
      return PATTERN4;
    }
    innerExtract(context, match) {
      const year = parseInt(match[YEAR_NUMBER_GROUP]);
      let day = parseInt(match[DATE_NUMBER_GROUP]);
      let month = match[MONTH_NUMBER_GROUP] ? parseInt(match[MONTH_NUMBER_GROUP]) : MONTH_DICTIONARY[match[MONTH_NAME_GROUP4].toLowerCase()];
      if (month < 1 || month > 12) {
        if (this.strictMonthDateOrder) {
          return null;
        }
        if (day >= 1 && day <= 12) {
          [month, day] = [day, month];
        }
      }
      if (day < 1 || day > 31) {
        return null;
      }
      return {
        day,
        month,
        year
      };
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENYearMonthNameParser.js
  var YEAR_PATTERN2 = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3})`;
  var PATTERN5 = new RegExp(`(${YEAR_PATTERN2})(?:\\s*[-.\\/,]?\\s*|\\s+of\\s+)(${matchAnyPattern(MONTH_DICTIONARY)})(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i");
  var YEAR_GROUP4 = 1;
  var MONTH_NAME_GROUP5 = 2;
  var ENYearMonthNameParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN5;
    }
    innerExtract(context, match) {
      const year = parseYear(match[YEAR_GROUP4]);
      const monthName = match[MONTH_NAME_GROUP5].toLowerCase();
      const month = MONTH_DICTIONARY[monthName];
      const result = context.createParsingResult(match.index, match[0]);
      result.start.imply("day", 1);
      result.start.assign("month", month);
      result.start.assign("year", year);
      result.start.addTag("parser/ENYearMonthNameParser");
      return result;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENSlashMonthFormatParser.js
  var PATTERN6 = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i");
  var MONTH_GROUP = 1;
  var YEAR_GROUP5 = 2;
  var ENSlashMonthFormatParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN6;
    }
    innerExtract(context, match) {
      const year = parseInt(match[YEAR_GROUP5]);
      const month = parseInt(match[MONTH_GROUP]);
      return context.createParsingComponents().imply("day", 1).assign("month", month).assign("year", year);
    }
  };

  // node_modules/chrono-node/dist/esm/common/parsers/AbstractTimeExpressionParser.js
  function primaryTimePattern(leftBoundary, primaryPrefix, primarySuffix, flags) {
    return new RegExp(`${leftBoundary}${primaryPrefix}(\\d{1,4})(?:(?:\\.|:|\uFF1A)(\\d{1,2})(?:(?::|\uFF1A)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${primarySuffix}`, flags);
  }
  function followingTimePatten(followingPhase, followingSuffix) {
    return new RegExp(`^(${followingPhase})(\\d{1,4})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${followingSuffix}`, "i");
  }
  var HOUR_GROUP = 2;
  var MINUTE_GROUP = 3;
  var SECOND_GROUP = 4;
  var MILLI_SECOND_GROUP = 5;
  var AM_PM_HOUR_GROUP = 6;
  var AbstractTimeExpressionParser = class {
    strictMode;
    constructor(strictMode = false) {
      this.strictMode = strictMode;
    }
    patternFlags() {
      return "i";
    }
    primaryPatternLeftBoundary() {
      return `(^|\\s|T|\\b)`;
    }
    primarySuffix() {
      return `(?!/)(?=\\W|$)`;
    }
    followingSuffix() {
      return `(?!/)(?=\\W|$)`;
    }
    pattern(context) {
      return this.getPrimaryTimePatternThroughCache();
    }
    extract(context, match) {
      const startComponents = this.extractPrimaryTimeComponents(context, match);
      if (!startComponents) {
        if (match[0].match(/^\d{4}/)) {
          match.index += 4;
          return null;
        }
        match.index += match[0].length;
        return null;
      }
      const index = match.index + match[1].length;
      const text = match[0].substring(match[1].length);
      const result = context.createParsingResult(index, text, startComponents);
      match.index += match[0].length;
      const remainingText = context.text.substring(match.index);
      const followingPattern = this.getFollowingTimePatternThroughCache();
      const followingMatch = followingPattern.exec(remainingText);
      if (text.match(/^\d{3,4}/) && followingMatch) {
        if (followingMatch[0].match(/^\s*([+-])\s*\d{2,4}$/)) {
          return null;
        }
        if (followingMatch[0].match(/^\s*([+-])\s*\d{2}\W\d{2}/)) {
          return null;
        }
      }
      if (!followingMatch || followingMatch[0].match(/^\s*([+-])\s*\d{3,4}$/)) {
        return this.checkAndReturnWithoutFollowingPattern(result);
      }
      result.end = this.extractFollowingTimeComponents(context, followingMatch, result);
      if (result.end) {
        result.text += followingMatch[0];
      }
      return this.checkAndReturnWithFollowingPattern(result);
    }
    extractPrimaryTimeComponents(context, match, strict2 = false) {
      const components = context.createParsingComponents();
      let minute = 0;
      let meridiem = null;
      let hour = parseInt(match[HOUR_GROUP]);
      if (hour > 100) {
        if (match[HOUR_GROUP].length == 4 && match[MINUTE_GROUP] == null && !match[AM_PM_HOUR_GROUP]) {
          return null;
        }
        if (this.strictMode || match[MINUTE_GROUP] != null) {
          return null;
        }
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }
      if (hour > 24) {
        return null;
      }
      if (match[MINUTE_GROUP] != null) {
        if (match[MINUTE_GROUP].length == 1 && !match[AM_PM_HOUR_GROUP]) {
          return null;
        }
        minute = parseInt(match[MINUTE_GROUP]);
      }
      if (minute >= 60) {
        return null;
      }
      if (hour > 12) {
        meridiem = Meridiem.PM;
      }
      if (match[AM_PM_HOUR_GROUP] != null) {
        if (hour > 12)
          return null;
        const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
        if (ampm == "a") {
          meridiem = Meridiem.AM;
          if (hour == 12) {
            hour = 0;
          }
        }
        if (ampm == "p") {
          meridiem = Meridiem.PM;
          if (hour != 12) {
            hour += 12;
          }
        }
      }
      components.assign("hour", hour);
      components.assign("minute", minute);
      if (meridiem !== null) {
        components.assign("meridiem", meridiem);
      } else {
        if (hour < 12) {
          components.imply("meridiem", Meridiem.AM);
        } else {
          components.imply("meridiem", Meridiem.PM);
        }
      }
      if (match[MILLI_SECOND_GROUP] != null) {
        const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
        if (millisecond >= 1e3)
          return null;
        components.assign("millisecond", millisecond);
      }
      if (match[SECOND_GROUP] != null) {
        const second = parseInt(match[SECOND_GROUP]);
        if (second >= 60)
          return null;
        components.assign("second", second);
      }
      return components;
    }
    extractFollowingTimeComponents(context, match, result) {
      const components = context.createParsingComponents();
      if (match[MILLI_SECOND_GROUP] != null) {
        const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
        if (millisecond >= 1e3)
          return null;
        components.assign("millisecond", millisecond);
      }
      if (match[SECOND_GROUP] != null) {
        const second = parseInt(match[SECOND_GROUP]);
        if (second >= 60)
          return null;
        components.assign("second", second);
      }
      let hour = parseInt(match[HOUR_GROUP]);
      let minute = 0;
      let meridiem = -1;
      if (match[MINUTE_GROUP] != null) {
        minute = parseInt(match[MINUTE_GROUP]);
      } else if (hour > 100) {
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }
      if (minute >= 60 || hour > 24) {
        return null;
      }
      if (hour >= 12) {
        meridiem = Meridiem.PM;
      }
      if (match[AM_PM_HOUR_GROUP] != null) {
        if (hour > 12) {
          return null;
        }
        const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
        if (ampm == "a") {
          meridiem = Meridiem.AM;
          if (hour == 12) {
            hour = 0;
            if (!components.isCertain("day")) {
              components.imply("day", components.get("day") + 1);
            }
          }
        }
        if (ampm == "p") {
          meridiem = Meridiem.PM;
          if (hour != 12)
            hour += 12;
        }
        if (!result.start.isCertain("meridiem")) {
          if (meridiem == Meridiem.AM) {
            result.start.imply("meridiem", Meridiem.AM);
            if (result.start.get("hour") == 12) {
              result.start.assign("hour", 0);
            }
          } else {
            result.start.imply("meridiem", Meridiem.PM);
            if (result.start.get("hour") != 12) {
              result.start.assign("hour", result.start.get("hour") + 12);
            }
          }
        }
      }
      components.assign("hour", hour);
      components.assign("minute", minute);
      if (meridiem >= 0) {
        components.assign("meridiem", meridiem);
      } else {
        const startAtPM = result.start.isCertain("meridiem") && result.start.get("hour") > 12;
        if (startAtPM) {
          if (result.start.get("hour") - 12 > hour) {
            components.imply("meridiem", Meridiem.AM);
          } else if (hour <= 12) {
            components.assign("hour", hour + 12);
            components.assign("meridiem", Meridiem.PM);
          }
        } else if (hour > 12) {
          components.imply("meridiem", Meridiem.PM);
        } else if (hour <= 12) {
          components.imply("meridiem", Meridiem.AM);
        }
      }
      if (components.date().getTime() < result.start.date().getTime()) {
        components.imply("day", components.get("day") + 1);
      }
      return components;
    }
    checkAndReturnWithoutFollowingPattern(result) {
      if (result.text.match(/^\d$/)) {
        return null;
      }
      if (result.text.match(/^\d\d\d+$/)) {
        return null;
      }
      if (result.text.match(/\d[apAP]$/)) {
        return null;
      }
      const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)$/);
      if (endingWithNumbers) {
        const endingNumbers = endingWithNumbers[1];
        if (this.strictMode) {
          return null;
        }
        if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
          return null;
        }
        const endingNumberVal = parseInt(endingNumbers);
        if (endingNumberVal > 24) {
          return null;
        }
      }
      return result;
    }
    checkAndReturnWithFollowingPattern(result) {
      if (result.text.match(/^\d+-\d+$/)) {
        return null;
      }
      const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);
      if (endingWithNumbers) {
        if (this.strictMode) {
          return null;
        }
        const startingNumbers = endingWithNumbers[1];
        const endingNumbers = endingWithNumbers[2];
        if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
          return null;
        }
        const endingNumberVal = parseInt(endingNumbers);
        const startingNumberVal = parseInt(startingNumbers);
        if (endingNumberVal > 24 || startingNumberVal > 24) {
          return null;
        }
      }
      return result;
    }
    cachedPrimaryPrefix = null;
    cachedPrimarySuffix = null;
    cachedPrimaryTimePattern = null;
    getPrimaryTimePatternThroughCache() {
      const primaryPrefix = this.primaryPrefix();
      const primarySuffix = this.primarySuffix();
      if (this.cachedPrimaryPrefix === primaryPrefix && this.cachedPrimarySuffix === primarySuffix) {
        return this.cachedPrimaryTimePattern;
      }
      this.cachedPrimaryTimePattern = primaryTimePattern(this.primaryPatternLeftBoundary(), primaryPrefix, primarySuffix, this.patternFlags());
      this.cachedPrimaryPrefix = primaryPrefix;
      this.cachedPrimarySuffix = primarySuffix;
      return this.cachedPrimaryTimePattern;
    }
    cachedFollowingPhase = null;
    cachedFollowingSuffix = null;
    cachedFollowingTimePatten = null;
    getFollowingTimePatternThroughCache() {
      const followingPhase = this.followingPhase();
      const followingSuffix = this.followingSuffix();
      if (this.cachedFollowingPhase === followingPhase && this.cachedFollowingSuffix === followingSuffix) {
        return this.cachedFollowingTimePatten;
      }
      this.cachedFollowingTimePatten = followingTimePatten(followingPhase, followingSuffix);
      this.cachedFollowingPhase = followingPhase;
      this.cachedFollowingSuffix = followingSuffix;
      return this.cachedFollowingTimePatten;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeExpressionParser.js
  var ENTimeExpressionParser = class extends AbstractTimeExpressionParser {
    constructor(strictMode) {
      super(strictMode);
    }
    followingPhase() {
      return "\\s*(?:\\-|\\\u2013|\\~|\\\u301C|to|until|through|till|\\?)\\s*";
    }
    primaryPrefix() {
      return "(?:(?:at|from)\\s*)??";
    }
    primarySuffix() {
      return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)";
    }
    extractPrimaryTimeComponents(context, match) {
      const components = super.extractPrimaryTimeComponents(context, match);
      if (!components) {
        return components;
      }
      if (match[0].endsWith("night")) {
        const hour = components.get("hour");
        if (hour >= 6 && hour < 12) {
          components.assign("hour", components.get("hour") + 12);
          components.assign("meridiem", Meridiem.PM);
        } else if (hour < 6) {
          components.assign("meridiem", Meridiem.AM);
        }
      }
      if (match[0].endsWith("afternoon")) {
        components.assign("meridiem", Meridiem.PM);
        const hour = components.get("hour");
        if (hour >= 0 && hour <= 6) {
          components.assign("hour", components.get("hour") + 12);
        }
      }
      if (match[0].endsWith("morning")) {
        components.assign("meridiem", Meridiem.AM);
        const hour = components.get("hour");
        if (hour < 12) {
          components.assign("hour", components.get("hour"));
        }
      }
      return components.addTag("parser/ENTimeExpressionParser");
    }
    extractFollowingTimeComponents(context, match, result) {
      const followingComponents = super.extractFollowingTimeComponents(context, match, result);
      if (followingComponents) {
        followingComponents.addTag("parser/ENTimeExpressionParser");
      }
      return followingComponents;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitAgoFormatParser.js
  var PATTERN7 = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
  var STRICT_PATTERN = new RegExp(`(${TIME_UNITS_NO_ABBR_PATTERN})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
  var ENTimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundaryChecking {
    strictMode;
    constructor(strictMode) {
      super();
      this.strictMode = strictMode;
    }
    innerPattern() {
      return this.strictMode ? STRICT_PATTERN : PATTERN7;
    }
    innerExtract(context, match) {
      const duration = parseDuration(match[1]);
      if (!duration) {
        return null;
      }
      return ParsingComponents.createRelativeFromReference(context.reference, reverseDuration(duration));
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitLaterFormatParser.js
  var PATTERN8 = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i");
  var STRICT_PATTERN2 = new RegExp(`(${TIME_UNITS_NO_ABBR_PATTERN})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i");
  var GROUP_NUM_TIMEUNITS = 1;
  var ENTimeUnitLaterFormatParser = class extends AbstractParserWithWordBoundaryChecking {
    strictMode;
    constructor(strictMode) {
      super();
      this.strictMode = strictMode;
    }
    innerPattern() {
      return this.strictMode ? STRICT_PATTERN2 : PATTERN8;
    }
    innerExtract(context, match) {
      const timeUnits = parseDuration(match[GROUP_NUM_TIMEUNITS]);
      if (!timeUnits) {
        return null;
      }
      return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
  };

  // node_modules/chrono-node/dist/esm/common/abstractRefiners.js
  var Filter = class {
    refine(context, results) {
      return results.filter((r) => this.isValid(context, r));
    }
  };
  var MergingRefiner = class {
    refine(context, results) {
      if (results.length < 2) {
        return results;
      }
      const mergedResults = [];
      let curResult = results[0];
      let nextResult = null;
      for (let i = 1; i < results.length; i++) {
        nextResult = results[i];
        const textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);
        if (!this.shouldMergeResults(textBetween, curResult, nextResult, context)) {
          mergedResults.push(curResult);
          curResult = nextResult;
        } else {
          const left = curResult;
          const right = nextResult;
          const mergedResult = this.mergeResults(textBetween, left, right, context);
          context.debug(() => {
            console.log(`${this.constructor.name} merged ${left} and ${right} into ${mergedResult}`);
          });
          curResult = mergedResult;
        }
      }
      if (curResult != null) {
        mergedResults.push(curResult);
      }
      return mergedResults;
    }
  };

  // node_modules/chrono-node/dist/esm/common/refiners/AbstractMergeDateRangeRefiner.js
  var AbstractMergeDateRangeRefiner = class extends MergingRefiner {
    shouldMergeResults(textBetween, currentResult, nextResult) {
      return !currentResult.end && !nextResult.end && textBetween.match(this.patternBetween()) != null;
    }
    mergeResults(textBetween, fromResult, toResult) {
      if (!fromResult.start.isOnlyWeekdayComponent() && !toResult.start.isOnlyWeekdayComponent()) {
        toResult.start.getCertainComponents().forEach((key) => {
          if (!fromResult.start.isCertain(key)) {
            fromResult.start.imply(key, toResult.start.get(key));
          }
        });
        fromResult.start.getCertainComponents().forEach((key) => {
          if (!toResult.start.isCertain(key)) {
            toResult.start.imply(key, fromResult.start.get(key));
          }
        });
      }
      if (fromResult.start.date() > toResult.start.date()) {
        let fromDate = fromResult.start.date();
        let toDate = toResult.start.date();
        if (toResult.start.isOnlyWeekdayComponent() && addDuration(toDate, { day: 7 }) > fromDate) {
          toDate = addDuration(toDate, { day: 7 });
          toResult.start.imply("day", toDate.getDate());
          toResult.start.imply("month", toDate.getMonth() + 1);
          toResult.start.imply("year", toDate.getFullYear());
        } else if (fromResult.start.isOnlyWeekdayComponent() && addDuration(fromDate, { day: -7 }) < toDate) {
          fromDate = addDuration(fromDate, { day: -7 });
          fromResult.start.imply("day", fromDate.getDate());
          fromResult.start.imply("month", fromDate.getMonth() + 1);
          fromResult.start.imply("year", fromDate.getFullYear());
        } else if (toResult.start.isDateWithUnknownYear() && addDuration(toDate, { year: 1 }) > fromDate) {
          toDate = addDuration(toDate, { year: 1 });
          toResult.start.imply("year", toDate.getFullYear());
        } else if (fromResult.start.isDateWithUnknownYear() && addDuration(fromDate, { year: -1 }) < toDate) {
          fromDate = addDuration(fromDate, { year: -1 });
          fromResult.start.imply("year", fromDate.getFullYear());
        } else {
          [toResult, fromResult] = [fromResult, toResult];
        }
      }
      const result = fromResult.clone();
      result.start = fromResult.start;
      result.end = toResult.start;
      result.index = Math.min(fromResult.index, toResult.index);
      if (fromResult.index < toResult.index) {
        result.text = fromResult.text + textBetween + toResult.text;
      } else {
        result.text = toResult.text + textBetween + fromResult.text;
      }
      return result;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeDateRangeRefiner.js
  var ENMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner {
    patternBetween() {
      return /^\s*(to|-|–|until|through|till)\s*$/i;
    }
  };

  // node_modules/chrono-node/dist/esm/calculation/mergingCalculation.js
  function mergeDateTimeResult(dateResult, timeResult) {
    const result = dateResult.clone();
    const beginDate = dateResult.start;
    const beginTime = timeResult.start;
    result.start = mergeDateTimeComponent(beginDate, beginTime);
    if (dateResult.end != null || timeResult.end != null) {
      const endDate = dateResult.end == null ? dateResult.start : dateResult.end;
      const endTime = timeResult.end == null ? timeResult.start : timeResult.end;
      const endDateTime = mergeDateTimeComponent(endDate, endTime);
      if (dateResult.end == null && endDateTime.date().getTime() < result.start.date().getTime()) {
        const nextDay = new Date(endDateTime.date().getTime());
        nextDay.setDate(nextDay.getDate() + 1);
        if (endDateTime.isCertain("day")) {
          assignSimilarDate(endDateTime, nextDay);
        } else {
          implySimilarDate(endDateTime, nextDay);
        }
      }
      result.end = endDateTime;
    }
    return result;
  }
  function mergeDateTimeComponent(dateComponent, timeComponent) {
    const dateTimeComponent = dateComponent.clone();
    if (timeComponent.isCertain("hour")) {
      dateTimeComponent.assign("hour", timeComponent.get("hour"));
      dateTimeComponent.assign("minute", timeComponent.get("minute"));
      if (timeComponent.isCertain("second")) {
        dateTimeComponent.assign("second", timeComponent.get("second"));
        if (timeComponent.isCertain("millisecond")) {
          dateTimeComponent.assign("millisecond", timeComponent.get("millisecond"));
        } else {
          dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
        }
      } else {
        dateTimeComponent.imply("second", timeComponent.get("second"));
        dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
      }
    } else {
      dateTimeComponent.imply("hour", timeComponent.get("hour"));
      dateTimeComponent.imply("minute", timeComponent.get("minute"));
      dateTimeComponent.imply("second", timeComponent.get("second"));
      dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
    }
    if (timeComponent.isCertain("timezoneOffset")) {
      dateTimeComponent.assign("timezoneOffset", timeComponent.get("timezoneOffset"));
    }
    const dateHasMeaningfulMeridiem = dateComponent.get("meridiem") != null && (dateComponent.isCertain("meridiem") || Array.from(dateComponent.tags()).some((t) => t.startsWith("casualReference/")));
    if (timeComponent.isCertain("meridiem")) {
      dateTimeComponent.assign("meridiem", timeComponent.get("meridiem"));
    } else if (timeComponent.get("meridiem") != null && !dateHasMeaningfulMeridiem) {
      dateTimeComponent.imply("meridiem", timeComponent.get("meridiem"));
    }
    if (dateTimeComponent.get("meridiem") == Meridiem.PM && dateTimeComponent.get("hour") < 12) {
      if (timeComponent.isCertain("hour")) {
        dateTimeComponent.assign("hour", dateTimeComponent.get("hour") + 12);
      } else {
        dateTimeComponent.imply("hour", dateTimeComponent.get("hour") + 12);
      }
    }
    dateTimeComponent.addTags(dateComponent.tags());
    dateTimeComponent.addTags(timeComponent.tags());
    return dateTimeComponent;
  }

  // node_modules/chrono-node/dist/esm/common/refiners/AbstractMergeDateTimeRefiner.js
  var AbstractMergeDateTimeRefiner = class extends MergingRefiner {
    shouldMergeResults(textBetween, currentResult, nextResult) {
      return (currentResult.start.isOnlyDate() && nextResult.start.isOnlyTime() || nextResult.start.isOnlyDate() && currentResult.start.isOnlyTime()) && textBetween.match(this.patternBetween()) != null;
    }
    mergeResults(textBetween, currentResult, nextResult) {
      const result = currentResult.start.isOnlyDate() ? mergeDateTimeResult(currentResult, nextResult) : mergeDateTimeResult(nextResult, currentResult);
      result.index = currentResult.index;
      result.text = currentResult.text + textBetween + nextResult.text;
      return result;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeDateTimeRefiner.js
  var ENMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner {
    patternBetween() {
      return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|\u2219|:)?\\s*$");
    }
  };

  // node_modules/chrono-node/dist/esm/common/refiners/ExtractTimezoneAbbrRefiner.js
  var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
  var ExtractTimezoneAbbrRefiner = class {
    timezoneOverrides;
    constructor(timezoneOverrides) {
      this.timezoneOverrides = timezoneOverrides;
    }
    refine(context, results) {
      const timezoneOverrides = context.option.timezones ?? {};
      results.forEach((result) => {
        const suffix = context.text.substring(result.index + result.text.length);
        const match = TIMEZONE_NAME_PATTERN.exec(suffix);
        if (!match) {
          return;
        }
        const timezoneAbbr = match[1].toUpperCase();
        const refDate = result.start.date() ?? result.refDate ?? /* @__PURE__ */ new Date();
        const tzOverrides = { ...this.timezoneOverrides, ...timezoneOverrides };
        const extractedTimezoneOffset = toTimezoneOffset(timezoneAbbr, refDate, tzOverrides);
        if (extractedTimezoneOffset == null) {
          return;
        }
        context.debug(() => {
          console.log(`Extracting timezone: '${timezoneAbbr}' into: ${extractedTimezoneOffset} for: ${result.start}`);
        });
        const currentTimezoneOffset = result.start.get("timezoneOffset");
        if (currentTimezoneOffset !== null && extractedTimezoneOffset != currentTimezoneOffset) {
          if (result.start.isCertain("timezoneOffset")) {
            return;
          }
          if (timezoneAbbr != match[1]) {
            return;
          }
        }
        if (result.start.isOnlyDate()) {
          if (timezoneAbbr != match[1]) {
            return;
          }
        }
        result.text += match[0];
        if (!result.start.isCertain("timezoneOffset")) {
          result.start.assign("timezoneOffset", extractedTimezoneOffset);
        }
        if (result.end != null && !result.end.isCertain("timezoneOffset")) {
          result.end.assign("timezoneOffset", extractedTimezoneOffset);
        }
      });
      return results;
    }
  };

  // node_modules/chrono-node/dist/esm/common/refiners/ExtractTimezoneOffsetRefiner.js
  var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i");
  var TIMEZONE_OFFSET_SIGN_GROUP = 1;
  var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 2;
  var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 3;
  var ExtractTimezoneOffsetRefiner = class {
    refine(context, results) {
      results.forEach(function(result) {
        if (result.start.isCertain("timezoneOffset")) {
          return;
        }
        const suffix = context.text.substring(result.index + result.text.length);
        const match = TIMEZONE_OFFSET_PATTERN.exec(suffix);
        if (!match) {
          return;
        }
        context.debug(() => {
          console.log(`Extracting timezone: '${match[0]}' into : ${result}`);
        });
        const hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
        const minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP] || "0");
        let timezoneOffset = hourOffset * 60 + minuteOffset;
        if (timezoneOffset > 14 * 60) {
          return;
        }
        if (match[TIMEZONE_OFFSET_SIGN_GROUP] === "-") {
          timezoneOffset = -timezoneOffset;
        }
        if (result.end != null) {
          result.end.assign("timezoneOffset", timezoneOffset);
        }
        result.start.assign("timezoneOffset", timezoneOffset);
        result.text += match[0];
      });
      return results;
    }
  };

  // node_modules/chrono-node/dist/esm/common/refiners/OverlapRemovalRefiner.js
  var OverlapRemovalRefiner = class {
    refine(context, results) {
      if (results.length < 2) {
        return results;
      }
      const filteredResults = [];
      let prevResult = results[0];
      for (let i = 1; i < results.length; i++) {
        const result = results[i];
        if (result.index >= prevResult.index + prevResult.text.length) {
          filteredResults.push(prevResult);
          prevResult = result;
          continue;
        }
        let kept = null;
        let removed = null;
        if (result.text.length > prevResult.text.length) {
          kept = result;
          removed = prevResult;
        } else {
          kept = prevResult;
          removed = result;
        }
        context.debug(() => {
          console.log(`${this.constructor.name} remove ${removed} by ${kept}`);
        });
        prevResult = kept;
      }
      if (prevResult != null) {
        filteredResults.push(prevResult);
      }
      return filteredResults;
    }
  };

  // node_modules/chrono-node/dist/esm/calculation/weekdays.js
  function createParsingComponentsAtWeekday(reference, weekday, modifier) {
    const refDate = reference.getDateWithAdjustedTimezone();
    const daysToWeekday = getDaysToWeekday(refDate, weekday, modifier);
    let components = new ParsingComponents(reference);
    components = components.addDurationAsImplied({ day: daysToWeekday });
    components.assign("weekday", weekday);
    return components;
  }
  function getDaysToWeekday(refDate, weekday, modifier) {
    const refWeekday = refDate.getDay();
    switch (modifier) {
      case "this":
        return getDaysForwardToWeekday(refDate, weekday);
      case "last":
        return getBackwardDaysToWeekday(refDate, weekday);
      case "next":
        if (refWeekday == Weekday.SUNDAY) {
          return weekday == Weekday.SUNDAY ? 7 : weekday;
        }
        if (refWeekday == Weekday.SATURDAY) {
          if (weekday == Weekday.SATURDAY)
            return 7;
          if (weekday == Weekday.SUNDAY)
            return 8;
          return 1 + weekday;
        }
        if (weekday < refWeekday && weekday != Weekday.SUNDAY) {
          return getDaysForwardToWeekday(refDate, weekday);
        } else {
          return getDaysForwardToWeekday(refDate, weekday) + 7;
        }
    }
    return getDaysToWeekdayClosest(refDate, weekday);
  }
  function getDaysToWeekdayClosest(refDate, weekday) {
    const backward = getBackwardDaysToWeekday(refDate, weekday);
    const forward = getDaysForwardToWeekday(refDate, weekday);
    return forward < -backward ? forward : backward;
  }
  function getDaysForwardToWeekday(refDate, weekday) {
    const refWeekday = refDate.getDay();
    let forwardCount = weekday - refWeekday;
    if (forwardCount < 0) {
      forwardCount += 7;
    }
    return forwardCount;
  }
  function getBackwardDaysToWeekday(refDate, weekday) {
    const refWeekday = refDate.getDay();
    let backwardCount = weekday - refWeekday;
    if (backwardCount >= 0) {
      backwardCount -= 7;
    }
    return backwardCount;
  }

  // node_modules/chrono-node/dist/esm/common/refiners/ForwardDateRefiner.js
  var ForwardDateRefiner = class {
    refine(context, results) {
      if (!context.option.forwardDate) {
        return results;
      }
      results.forEach((result) => {
        let refDate = context.reference.getDateWithAdjustedTimezone();
        if (result.start.isOnlyTime() && context.reference.instant > result.start.date()) {
          const refDate2 = context.reference.getDateWithAdjustedTimezone();
          const refFollowingDay = new Date(refDate2);
          refFollowingDay.setDate(refFollowingDay.getDate() + 1);
          implySimilarDate(result.start, refFollowingDay);
          context.debug(() => {
            console.log(`${this.constructor.name} adjusted ${result} time from the ref date (${refDate2}) to the following day (${refFollowingDay})`);
          });
          if (result.end && result.end.isOnlyTime()) {
            implySimilarDate(result.end, refFollowingDay);
            if (result.start.date() > result.end.date()) {
              refFollowingDay.setDate(refFollowingDay.getDate() + 1);
              implySimilarDate(result.end, refFollowingDay);
            }
          }
        }
        if (result.start.isOnlyWeekdayComponent() && refDate > result.start.date()) {
          let daysToAdd = getDaysForwardToWeekday(refDate, result.start.get("weekday")) || 7;
          const forwardedWeekday = addDuration(refDate, { day: daysToAdd });
          implySimilarDate(result.start, forwardedWeekday);
          context.debug(() => {
            console.log(`${this.constructor.name} adjusted ${result} weekday (${result.start})`);
          });
          if (result.end && result.start.date() > result.end.date()) {
            let daysToAdd2 = getDaysForwardToWeekday(refDate, result.start.get("weekday")) || 7;
            const forwardedWeekday2 = addDuration(refDate, { day: daysToAdd2 });
            implySimilarDate(result.end, forwardedWeekday2);
            context.debug(() => {
              console.log(`${this.constructor.name} adjusted ${result} weekday (${result.end})`);
            });
          }
        }
        if (result.start.isDateWithUnknownYear() && refDate > result.start.date()) {
          for (let i = 0; i < 3 && refDate > result.start.date(); i++) {
            result.start.imply("year", result.start.get("year") + 1);
            context.debug(() => {
              console.log(`${this.constructor.name} adjusted ${result} year (${result.start})`);
            });
            if (result.end && !result.end.isCertain("year")) {
              result.end.imply("year", result.end.get("year") + 1);
              context.debug(() => {
                console.log(`${this.constructor.name} adjusted ${result} month (${result.start})`);
              });
            }
          }
        }
      });
      return results;
    }
  };

  // node_modules/chrono-node/dist/esm/common/refiners/UnlikelyFormatFilter.js
  var UnlikelyFormatFilter = class extends Filter {
    strictMode;
    constructor(strictMode) {
      super();
      this.strictMode = strictMode;
    }
    isValid(context, result) {
      if (result.text.replace(" ", "").match(/^\d*(\.\d*)?$/)) {
        context.debug(() => {
          console.log(`Removing unlikely result '${result.text}'`);
        });
        return false;
      }
      if (!result.start.isValidDate()) {
        context.debug(() => {
          console.log(`Removing invalid result: ${result} (${result.start})`);
        });
        return false;
      }
      if (result.end && !result.end.isValidDate()) {
        context.debug(() => {
          console.log(`Removing invalid result: ${result} (${result.end})`);
        });
        return false;
      }
      if (this.strictMode) {
        return this.isStrictModeValid(context, result);
      }
      return true;
    }
    isStrictModeValid(context, result) {
      if (result.start.isOnlyWeekdayComponent()) {
        context.debug(() => {
          console.log(`(Strict) Removing weekday only component: ${result} (${result.end})`);
        });
        return false;
      }
      return true;
    }
  };

  // node_modules/chrono-node/dist/esm/common/parsers/ISOFormatParser.js
  var PATTERN9 = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i");
  var YEAR_NUMBER_GROUP2 = 1;
  var MONTH_NUMBER_GROUP2 = 2;
  var DATE_NUMBER_GROUP2 = 3;
  var HOUR_NUMBER_GROUP = 4;
  var MINUTE_NUMBER_GROUP = 5;
  var SECOND_NUMBER_GROUP = 6;
  var MILLISECOND_NUMBER_GROUP = 7;
  var TZD_GROUP = 8;
  var TZD_HOUR_OFFSET_GROUP = 9;
  var TZD_MINUTE_OFFSET_GROUP = 10;
  var ISOFormatParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN9;
    }
    innerExtract(context, match) {
      const components = context.createParsingComponents({
        "year": parseInt(match[YEAR_NUMBER_GROUP2]),
        "month": parseInt(match[MONTH_NUMBER_GROUP2]),
        "day": parseInt(match[DATE_NUMBER_GROUP2])
      });
      if (match[HOUR_NUMBER_GROUP] != null) {
        components.assign("hour", parseInt(match[HOUR_NUMBER_GROUP]));
        components.assign("minute", parseInt(match[MINUTE_NUMBER_GROUP]));
        if (match[SECOND_NUMBER_GROUP] != null) {
          components.assign("second", parseInt(match[SECOND_NUMBER_GROUP]));
        }
        if (match[MILLISECOND_NUMBER_GROUP] != null) {
          components.assign("millisecond", parseInt(match[MILLISECOND_NUMBER_GROUP]));
        }
        if (match[TZD_GROUP] != null) {
          let offset = 0;
          if (match[TZD_HOUR_OFFSET_GROUP]) {
            const hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
            let minuteOffset = 0;
            if (match[TZD_MINUTE_OFFSET_GROUP] != null) {
              minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);
            }
            offset = hourOffset * 60;
            if (offset < 0) {
              offset -= minuteOffset;
            } else {
              offset += minuteOffset;
            }
          }
          components.assign("timezoneOffset", offset);
        }
      }
      return components.addTag("parser/ISOFormatParser");
    }
  };

  // node_modules/chrono-node/dist/esm/common/refiners/MergeWeekdayComponentRefiner.js
  var MergeWeekdayComponentRefiner = class extends MergingRefiner {
    mergeResults(textBetween, currentResult, nextResult) {
      const newResult = nextResult.clone();
      newResult.index = currentResult.index;
      newResult.text = currentResult.text + textBetween + newResult.text;
      newResult.start.assign("weekday", currentResult.start.get("weekday"));
      if (newResult.end) {
        newResult.end.assign("weekday", currentResult.start.get("weekday"));
      }
      return newResult;
    }
    shouldMergeResults(textBetween, currentResult, nextResult) {
      const weekdayThenNormalDate = currentResult.start.isOnlyWeekdayComponent() && !currentResult.start.isCertain("hour") && nextResult.start.isCertain("day");
      return weekdayThenNormalDate && textBetween.match(/^,?\s*$/) != null;
    }
  };

  // node_modules/chrono-node/dist/esm/configurations.js
  function includeCommonConfiguration(configuration2, strictMode = false) {
    configuration2.parsers.unshift(new ISOFormatParser());
    configuration2.refiners.unshift(new MergeWeekdayComponentRefiner());
    configuration2.refiners.unshift(new ExtractTimezoneOffsetRefiner());
    configuration2.refiners.unshift(new OverlapRemovalRefiner());
    configuration2.refiners.push(new ExtractTimezoneAbbrRefiner());
    configuration2.refiners.push(new OverlapRemovalRefiner());
    configuration2.refiners.push(new ForwardDateRefiner());
    configuration2.refiners.push(new UnlikelyFormatFilter(strictMode));
    return configuration2;
  }

  // node_modules/chrono-node/dist/esm/common/casualReferences.js
  function now(reference) {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    assignSimilarTime(component, targetDate);
    component.assign("timezoneOffset", reference.getTimezoneOffset());
    component.addTag("casualReference/now");
    return component;
  }
  function today(reference) {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    component.delete("meridiem");
    component.addTag("casualReference/today");
    return component;
  }
  function yesterday(reference) {
    return theDayBefore(reference, 1).addTag("casualReference/yesterday");
  }
  function tomorrow(reference) {
    return theDayAfter(reference, 1).addTag("casualReference/tomorrow");
  }
  function theDayBefore(reference, numDay) {
    return theDayAfter(reference, -numDay);
  }
  function theDayAfter(reference, nDays) {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    const newDate = new Date(targetDate.getTime());
    newDate.setDate(newDate.getDate() + nDays);
    assignSimilarDate(component, newDate);
    implySimilarTime(component, newDate);
    component.delete("meridiem");
    return component;
  }
  function tonight(reference, implyHour = 22) {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    component.addTag("casualReference/tonight");
    return component;
  }
  function evening(reference, implyHour = 20) {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.PM);
    component.imply("hour", implyHour);
    component.addTag("casualReference/evening");
    return component;
  }
  function midnight(reference) {
    const component = new ParsingComponents(reference, {});
    if (reference.getDateWithAdjustedTimezone().getHours() > 2) {
      component.addDurationAsImplied({ day: 1 });
    }
    component.assign("hour", 0);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/midnight");
    return component;
  }
  function morning(reference, implyHour = 6) {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.imply("hour", implyHour);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/morning");
    return component;
  }
  function afternoon(reference, implyHour = 15) {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.PM);
    component.imply("hour", implyHour);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/afternoon");
    return component;
  }
  function noon(reference) {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.assign("hour", 12);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/noon");
    return component;
  }

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENCasualDateParser.js
  var PATTERN10 = /(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
  var ENCasualDateParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context) {
      return PATTERN10;
    }
    innerExtract(context, match) {
      let targetDate = context.refDate;
      const lowerText = match[0].toLowerCase();
      let component = context.createParsingComponents();
      switch (lowerText) {
        case "now":
          component = now(context.reference);
          break;
        case "today":
          component = today(context.reference);
          break;
        case "yesterday":
          component = yesterday(context.reference);
          break;
        case "tomorrow":
        case "tmr":
        case "tmrw":
          component = tomorrow(context.reference);
          break;
        case "tonight":
          component = tonight(context.reference);
          break;
        case "overmorrow":
          component = theDayAfter(context.reference, 2);
          break;
        default:
          if (lowerText.match(/last\s*night/)) {
            if (targetDate.getHours() > 6) {
              const previousDay = new Date(targetDate.getTime());
              previousDay.setDate(previousDay.getDate() - 1);
              targetDate = previousDay;
            }
            assignSimilarDate(component, targetDate);
            component.imply("hour", 0);
          }
          break;
      }
      component.addTag("parser/ENCasualDateParser");
      return component;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENCasualTimeParser.js
  var PATTERN11 = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
  var ENCasualTimeParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN11;
    }
    innerExtract(context, match) {
      let component = null;
      switch (match[1].toLowerCase()) {
        case "afternoon":
          component = afternoon(context.reference);
          break;
        case "evening":
        case "night":
          component = evening(context.reference);
          break;
        case "midnight":
          component = midnight(context.reference);
          break;
        case "morning":
          component = morning(context.reference);
          break;
        case "noon":
        case "midday":
          component = noon(context.reference);
          break;
      }
      if (component) {
        component.addTag("parser/ENCasualTimeParser");
      }
      return component;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENWeekdayParser.js
  var PATTERN12 = new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${matchAnyPattern(WEEKDAY_DICTIONARY)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(?:of\\s*)?(this|last|past|next)\\s*week)?(?=\\W|$)`, "i");
  var PREFIX_GROUP2 = 1;
  var WEEKDAY_GROUP = 2;
  var POSTFIX_GROUP = 3;
  var ENWeekdayParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN12;
    }
    innerExtract(context, match) {
      const prefix = match[PREFIX_GROUP2];
      const postfix = match[POSTFIX_GROUP];
      let modifierWord = prefix || postfix;
      modifierWord = modifierWord || "";
      modifierWord = modifierWord.toLowerCase();
      let modifier = null;
      if (modifierWord == "last" || modifierWord == "past") {
        modifier = "last";
      } else if (modifierWord == "next") {
        modifier = "next";
      } else if (modifierWord == "this") {
        modifier = "this";
      }
      const weekday_word = match[WEEKDAY_GROUP].toLowerCase();
      let weekday;
      if (WEEKDAY_DICTIONARY[weekday_word] !== void 0) {
        weekday = WEEKDAY_DICTIONARY[weekday_word];
      } else if (weekday_word == "weekend") {
        weekday = modifier == "last" ? Weekday.SUNDAY : Weekday.SATURDAY;
      } else if (weekday_word == "weekday") {
        const refWeekday = context.reference.getDateWithAdjustedTimezone().getDay();
        if (refWeekday == Weekday.SUNDAY || refWeekday == Weekday.SATURDAY) {
          weekday = modifier == "last" ? Weekday.FRIDAY : Weekday.MONDAY;
        } else {
          weekday = refWeekday - 1;
          weekday = modifier == "last" ? weekday - 1 : weekday + 1;
          weekday = weekday % 5 + 1;
        }
      } else {
        return null;
      }
      return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENRelativeDateFormatParser.js
  var PATTERN13 = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})(?=\\s*)(?=\\W|$)`, "i");
  var MODIFIER_WORD_GROUP = 1;
  var RELATIVE_WORD_GROUP = 2;
  var ENRelativeDateFormatParser = class extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return PATTERN13;
    }
    innerExtract(context, match) {
      const modifier = match[MODIFIER_WORD_GROUP].toLowerCase();
      const unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();
      const timeunit = TIME_UNIT_DICTIONARY[unitWord];
      if (modifier == "next" || modifier.startsWith("after")) {
        const timeUnits = {};
        timeUnits[timeunit] = 1;
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
      if (modifier == "last" || modifier == "past") {
        const timeUnits = {};
        timeUnits[timeunit] = -1;
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
      const components = context.createParsingComponents();
      let date = new Date(context.reference.instant.getTime());
      if (unitWord.match(/week/i)) {
        date.setDate(date.getDate() - date.getDay());
        components.imply("day", date.getDate());
        components.imply("month", date.getMonth() + 1);
        components.imply("year", date.getFullYear());
      } else if (unitWord.match(/month/i)) {
        date.setDate(1);
        components.imply("day", date.getDate());
        components.assign("year", date.getFullYear());
        components.assign("month", date.getMonth() + 1);
      } else if (unitWord.match(/year/i)) {
        date.setDate(1);
        date.setMonth(0);
        components.imply("day", date.getDate());
        components.imply("month", date.getMonth() + 1);
        components.assign("year", date.getFullYear());
      }
      return components;
    }
  };

  // node_modules/chrono-node/dist/esm/common/parsers/SlashDateFormatParser.js
  var PATTERN14 = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i");
  var OPENING_GROUP = 1;
  var ENDING_GROUP = 5;
  var FIRST_NUMBERS_GROUP = 2;
  var SECOND_NUMBERS_GROUP = 3;
  var YEAR_GROUP6 = 4;
  var SlashDateFormatParser = class {
    groupNumberMonth;
    groupNumberDay;
    constructor(littleEndian) {
      this.groupNumberMonth = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
      this.groupNumberDay = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;
    }
    pattern() {
      return PATTERN14;
    }
    extract(context, match) {
      const index = match.index + match[OPENING_GROUP].length;
      const indexEnd = match.index + match[0].length - match[ENDING_GROUP].length;
      if (index > 0) {
        const textBefore = context.text.substring(0, index);
        if (textBefore.match("\\d/?$")) {
          return;
        }
      }
      if (indexEnd < context.text.length) {
        const textAfter = context.text.substring(indexEnd);
        if (textAfter.match("^/?\\d")) {
          return;
        }
      }
      const text = context.text.substring(index, indexEnd);
      if (text.match(/^\d\.\d$/) || text.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)) {
        return;
      }
      if (!match[YEAR_GROUP6] && text.indexOf("/") < 0) {
        return;
      }
      const result = context.createParsingResult(index, text);
      let month = parseInt(match[this.groupNumberMonth]);
      let day = parseInt(match[this.groupNumberDay]);
      if (month < 1 || month > 12) {
        if (month > 12) {
          if (day >= 1 && day <= 12 && month <= 31) {
            [day, month] = [month, day];
          } else {
            return null;
          }
        }
      }
      if (day < 1 || day > 31) {
        return null;
      }
      result.start.assign("day", day);
      result.start.assign("month", month);
      if (match[YEAR_GROUP6]) {
        const rawYearNumber = parseInt(match[YEAR_GROUP6]);
        const year = findMostLikelyADYear(rawYearNumber);
        result.start.assign("year", year);
      } else {
        const year = findYearClosestToRef(context.refDate, day, month);
        result.start.imply("year", year);
      }
      return result.addTag("parser/SlashDateFormatParser");
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/parsers/ENTimeUnitCasualRelativeFormatParser.js
  var PATTERN15 = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
  var PATTERN_NO_ABBR = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`, "i");
  var ENTimeUnitCasualRelativeFormatParser = class extends AbstractParserWithWordBoundaryChecking {
    allowAbbreviations;
    constructor(allowAbbreviations = true) {
      super();
      this.allowAbbreviations = allowAbbreviations;
    }
    innerPattern() {
      return this.allowAbbreviations ? PATTERN15 : PATTERN_NO_ABBR;
    }
    innerExtract(context, match) {
      const prefix = match[1].toLowerCase();
      let duration = parseDuration(match[2]);
      if (!duration) {
        return null;
      }
      switch (prefix) {
        case "last":
        case "past":
        case "-":
          duration = reverseDuration(duration);
          break;
      }
      return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeRelativeAfterDateRefiner.js
  function IsPositiveFollowingReference(result) {
    return result.text.match(/^[+-]/i) != null;
  }
  function IsNegativeFollowingReference(result) {
    return result.text.match(/^-/i) != null;
  }
  var ENMergeRelativeAfterDateRefiner = class extends MergingRefiner {
    shouldMergeResults(textBetween, currentResult, nextResult) {
      if (!textBetween.match(/^\s*$/i)) {
        return false;
      }
      return IsPositiveFollowingReference(nextResult) || IsNegativeFollowingReference(nextResult);
    }
    mergeResults(textBetween, currentResult, nextResult, context) {
      let timeUnits = parseDuration(nextResult.text);
      if (IsNegativeFollowingReference(nextResult)) {
        timeUnits = reverseDuration(timeUnits);
      }
      const components = ParsingComponents.createRelativeFromReference(ReferenceWithTimezone.fromDate(currentResult.start.date()), timeUnits);
      return new ParsingResult(currentResult.reference, currentResult.index, `${currentResult.text}${textBetween}${nextResult.text}`, components);
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/refiners/ENMergeRelativeFollowByDateRefiner.js
  function hasImpliedEarlierReferenceDate(result) {
    return result.text.match(/\s+(before|from)$/i) != null;
  }
  function hasImpliedLaterReferenceDate(result) {
    return result.text.match(/\s+(after|since)$/i) != null;
  }
  var ENMergeRelativeFollowByDateRefiner = class extends MergingRefiner {
    patternBetween() {
      return /^\s*$/i;
    }
    shouldMergeResults(textBetween, currentResult, nextResult) {
      if (!textBetween.match(this.patternBetween())) {
        return false;
      }
      if (!hasImpliedEarlierReferenceDate(currentResult) && !hasImpliedLaterReferenceDate(currentResult)) {
        return false;
      }
      return !!nextResult.start.get("day") && !!nextResult.start.get("month") && !!nextResult.start.get("year");
    }
    mergeResults(textBetween, currentResult, nextResult) {
      let duration = parseDuration(currentResult.text);
      if (hasImpliedEarlierReferenceDate(currentResult)) {
        duration = reverseDuration(duration);
      }
      const components = ParsingComponents.createRelativeFromReference(ReferenceWithTimezone.fromDate(nextResult.start.date()), duration);
      return new ParsingResult(nextResult.reference, currentResult.index, `${currentResult.text}${textBetween}${nextResult.text}`, components);
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/refiners/ENExtractYearSuffixRefiner.js
  var YEAR_SUFFIX_PATTERN = new RegExp(`^\\s*(${YEAR_PATTERN})`, "i");
  var YEAR_GROUP7 = 1;
  var ENExtractYearSuffixRefiner = class {
    refine(context, results) {
      results.forEach(function(result) {
        if (!result.start.isDateWithUnknownYear()) {
          return;
        }
        const suffix = context.text.substring(result.index + result.text.length);
        const match = YEAR_SUFFIX_PATTERN.exec(suffix);
        if (!match) {
          return;
        }
        if (match[0].trim().length <= 3) {
          return;
        }
        context.debug(() => {
          console.log(`Extracting year: '${match[0]}' into : ${result}`);
        });
        const year = parseYear(match[YEAR_GROUP7]);
        if (result.end != null) {
          result.end.assign("year", year);
        }
        result.start.assign("year", year);
        result.text += match[0];
      });
      return results;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/refiners/ENUnlikelyFormatFilter.js
  var ENUnlikelyFormatFilter = class extends Filter {
    constructor() {
      super();
    }
    isValid(context, result) {
      const text = result.text.trim();
      if (text === context.text.trim()) {
        return true;
      }
      if (text.toLowerCase() === "may") {
        const textBefore = context.text.substring(0, result.index).trim();
        if (!textBefore.match(/\b(in)$/i)) {
          context.debug(() => {
            console.log(`Removing unlikely result: ${result}`);
          });
          return false;
        }
      }
      if (text.toLowerCase().endsWith("the second")) {
        const textAfter = context.text.substring(result.index + result.text.length).trim();
        if (textAfter.length > 0) {
          context.debug(() => {
            console.log(`Removing unlikely result: ${result}`);
          });
        }
        return false;
      }
      return true;
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/configuration.js
  var ENDefaultConfiguration = class {
    createCasualConfiguration(littleEndian = false) {
      const option = this.createConfiguration(false, littleEndian);
      option.parsers.push(new ENCasualDateParser());
      option.parsers.push(new ENCasualTimeParser());
      option.parsers.push(new ENMonthNameParser());
      option.parsers.push(new ENRelativeDateFormatParser());
      option.parsers.push(new ENTimeUnitCasualRelativeFormatParser());
      option.refiners.push(new ENUnlikelyFormatFilter());
      return option;
    }
    createConfiguration(strictMode = true, littleEndian = false) {
      const options = includeCommonConfiguration({
        parsers: [
          new SlashDateFormatParser(littleEndian),
          new ENTimeUnitWithinFormatParser(strictMode),
          new ENMonthNameLittleEndianParser(),
          new ENMonthNameMiddleEndianParser(littleEndian),
          new ENWeekdayParser(),
          new ENSlashMonthFormatParser(),
          new ENTimeExpressionParser(strictMode),
          new ENTimeUnitAgoFormatParser(strictMode),
          new ENTimeUnitLaterFormatParser(strictMode),
          new ENYearMonthNameParser()
        ],
        refiners: [new ENMergeDateTimeRefiner()]
      }, strictMode);
      options.parsers.unshift(new ENYearMonthDayParser(strictMode));
      options.refiners.unshift(new ENMergeRelativeFollowByDateRefiner());
      options.refiners.unshift(new ENMergeRelativeAfterDateRefiner());
      options.refiners.unshift(new OverlapRemovalRefiner());
      options.refiners.push(new ENMergeDateTimeRefiner());
      options.refiners.push(new ENExtractYearSuffixRefiner());
      options.refiners.push(new ENMergeDateRangeRefiner());
      return options;
    }
  };

  // node_modules/chrono-node/dist/esm/chrono.js
  var Chrono = class _Chrono {
    parsers;
    refiners;
    defaultConfig = new ENDefaultConfiguration();
    constructor(configuration2) {
      configuration2 = configuration2 || this.defaultConfig.createCasualConfiguration();
      this.parsers = [...configuration2.parsers];
      this.refiners = [...configuration2.refiners];
    }
    clone() {
      return new _Chrono({
        parsers: [...this.parsers],
        refiners: [...this.refiners]
      });
    }
    parseDate(text, referenceDate, option) {
      const results = this.parse(text, referenceDate, option);
      return results.length > 0 ? results[0].start.date() : null;
    }
    parse(text, referenceDate, option) {
      const context = new ParsingContext(text, referenceDate, option);
      let results = [];
      this.parsers.forEach((parser) => {
        const parsedResults = _Chrono.executeParser(context, parser);
        results = results.concat(parsedResults);
      });
      results.sort((a, b) => {
        return a.index - b.index;
      });
      this.refiners.forEach(function(refiner) {
        results = refiner.refine(context, results);
      });
      return results;
    }
    static executeParser(context, parser) {
      const results = [];
      const pattern = parser.pattern(context);
      const originalText = context.text;
      let remainingText = context.text;
      let match = pattern.exec(remainingText);
      while (match) {
        const index = match.index + originalText.length - remainingText.length;
        match.index = index;
        const result = parser.extract(context, match);
        if (!result) {
          remainingText = originalText.substring(match.index + 1);
          match = pattern.exec(remainingText);
          continue;
        }
        let parsedResult = null;
        if (result instanceof ParsingResult) {
          parsedResult = result;
        } else if (result instanceof ParsingComponents) {
          parsedResult = context.createParsingResult(match.index, match[0]);
          parsedResult.start = result;
        } else {
          parsedResult = context.createParsingResult(match.index, match[0], result);
        }
        const parsedIndex = parsedResult.index;
        const parsedText = parsedResult.text;
        context.debug(() => console.log(`${parser.constructor.name} extracted (at index=${parsedIndex}) '${parsedText}'`));
        results.push(parsedResult);
        remainingText = originalText.substring(parsedIndex + parsedText.length);
        match = pattern.exec(remainingText);
      }
      return results;
    }
  };
  var ParsingContext = class {
    text;
    option;
    reference;
    refDate;
    constructor(text, refDate, option) {
      this.text = text;
      this.option = option ?? {};
      this.reference = ReferenceWithTimezone.fromInput(refDate, this.option.timezones);
      this.refDate = this.reference.instant;
    }
    createParsingComponents(components) {
      if (components instanceof ParsingComponents) {
        return components;
      }
      return new ParsingComponents(this.reference, components);
    }
    createParsingResult(index, textOrEndIndex, startComponents, endComponents) {
      const text = typeof textOrEndIndex === "string" ? textOrEndIndex : this.text.substring(index, textOrEndIndex);
      const start = startComponents ? this.createParsingComponents(startComponents) : null;
      const end = endComponents ? this.createParsingComponents(endComponents) : null;
      return new ParsingResult(this.reference, index, text, start, end);
    }
    debug(block) {
      if (this.option.debug) {
        if (this.option.debug instanceof Function) {
          this.option.debug(block);
        } else {
          const handler = this.option.debug;
          handler.debug(block);
        }
      }
    }
  };

  // node_modules/chrono-node/dist/esm/locales/en/index.js
  var configuration = new ENDefaultConfiguration();
  var casual = new Chrono(configuration.createCasualConfiguration(false));
  var strict = new Chrono(configuration.createConfiguration(true, false));
  var GB = new Chrono(configuration.createCasualConfiguration(true));

  // node_modules/chrono-node/dist/esm/index.js
  var casual2 = casual;
  function parse2(text, ref, option) {
    return casual2.parse(text, ref, option);
  }

  // src/lib.ts
  var SITES = {
    pinterest: "pinterest.com",
    youtube: "youtube.com",
    google: "google.com",
    gmail: "mail.google.com",
    maps: "maps.google.com",
    amazon: "amazon.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
    reddit: "reddit.com",
    twitter: "x.com",
    x: "x.com",
    tiktok: "tiktok.com",
    netflix: "netflix.com",
    wikipedia: "wikipedia.org",
    ebay: "ebay.com",
    etsy: "etsy.com",
    walmart: "walmart.com",
    target: "target.com",
    twitch: "twitch.tv",
    linkedin: "linkedin.com",
    spotify: "open.spotify.com",
    github: "github.com",
    discord: "discord.com",
    whatsapp: "web.whatsapp.com",
    yahoo: "yahoo.com",
    chatgpt: "chatgpt.com",
    claude: "claude.ai",
    imdb: "imdb.com",
    steam: "store.steampowered.com",
    paypal: "paypal.com",
    nexus: "nexusmods.com"
  };
  var SEARCH_URLS = {
    pinterest: "https://www.pinterest.com/search/pins/?q=",
    youtube: "https://www.youtube.com/results?search_query=",
    amazon: "https://www.amazon.com/s?k=",
    google: "https://www.google.com/search?q=",
    reddit: "https://www.reddit.com/search/?q=",
    ebay: "https://www.ebay.com/sch/i.html?_nkw=",
    etsy: "https://www.etsy.com/search?q=",
    github: "https://github.com/search?q=",
    wikipedia: "https://en.wikipedia.org/w/index.php?search=",
    twitter: "https://x.com/search?q=",
    x: "https://x.com/search?q=",
    walmart: "https://www.walmart.com/search?q=",
    target: "https://www.target.com/s?searchTerm=",
    spotify: "https://open.spotify.com/search/",
    imdb: "https://www.imdb.com/find/?q=",
    netflix: "https://www.netflix.com/search?q=",
    nexus: "https://www.nexusmods.com/search/?gsearch=",
    steam: "https://store.steampowered.com/search/?term="
  };
  var SHARE_URLS = {
    facebook: "https://www.facebook.com/sharer/sharer.php?u=",
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
    reddit: "https://www.reddit.com/submit?url=",
    twitter: "https://twitter.com/intent/tweet?url=",
    x: "https://twitter.com/intent/tweet?url="
  };
  function siteSearchUrl(site, q) {
    const k = site.toLowerCase().replace(/\.com$/, "");
    return SEARCH_URLS[k] ? SEARCH_URLS[k] + encodeURIComponent(q) : "https://www.google.com/search?q=" + encodeURIComponent(site + " " + q);
  }
  var looksUrl = (s) => /^https?:\/\//i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s);
  function resolve(s) {
    s = s.trim();
    const key = s.toLowerCase().replace(/\.com$/, "");
    if (SITES[key]) return "https://" + SITES[key];
    const hit = Object.entries(SITES).find(([n, d]) => n.startsWith(s.toLowerCase()) || d.startsWith(s.toLowerCase()));
    if (hit && !s.includes(" ") && !looksUrl(s)) return "https://" + hit[1];
    if (looksUrl(s)) return /^https?:/i.test(s) ? s : "https://" + s;
    return "https://www.google.com/search?q=" + encodeURIComponent(s);
  }
  var FIELD_SYNS = {
    name: ["name", "full name", "your name", "fullname"],
    first: ["first name", "first", "given name", "fname", "firstname"],
    last: ["last name", "last", "surname", "family name", "lname", "lastname"],
    email: ["email", "e-mail", "email address"],
    phone: ["phone", "mobile", "telephone", "phone number", "tel", "cell"],
    address: ["address", "street", "address line 1", "street address"],
    address2: ["address line 2", "apt", "apartment", "suite", "unit"],
    city: ["city", "town"],
    state: ["state", "province", "region"],
    zip: ["zip", "postal", "postcode", "zip code", "postal code"],
    country: ["country"],
    company: ["company", "organization", "organisation", "business"],
    message: ["message", "comment", "comments", "your message", "note"]
  };
  function normKey(k) {
    k = k.toLowerCase().trim();
    for (const [c, syns] of Object.entries(FIELD_SYNS)) {
      if (c === k || syns.includes(k)) return c;
    }
    return k;
  }
  function parsePairs(str) {
    return str.split(/[,;]|\band\b/i).map((s) => s.trim()).filter(Boolean).map((s) => {
      const mm = s.match(/^(.+?)\s*[:=]\s*(.+)$/);
      return mm ? { k: mm[1].trim(), v: mm[2].trim() } : null;
    }).filter(Boolean);
  }
  var enc = encodeURIComponent;
  function intentUrl(t) {
    let m;
    if (m = t.match(/^(?:images?|pictures?|pics?)\s+of\s+(.+)/i)) return "https://www.google.com/search?tbm=isch&q=" + enc(m[1]);
    if (m = t.match(/^(?:videos?|watch|play)\s+(?:of\s+)?(.+)/i)) return SEARCH_URLS.youtube + enc(m[1]);
    if (m = t.match(/^directions?\s+from\s+(.+?)\s+to\s+(.+)$/i)) return "https://www.google.com/maps/dir/" + enc(m[1]) + "/" + enc(m[2]);
    if (m = t.match(/^(?:maps?|directions?(?:\s+to)?|navigate to|where is)\s+(.+)/i)) return "https://www.google.com/maps/search/" + enc(m[1]);
    if (m = t.match(/^(?:wiki|wikipedia)\s+(.+)/i)) return SEARCH_URLS.wikipedia + enc(m[1]);
    if (m = t.match(/^(?:define|definition of|meaning of)\s+(.+)/i)) return "https://www.google.com/search?q=" + enc("define " + m[1]);
    if (m = t.match(/^translate\s+(.+)/i)) return "https://translate.google.com/?sl=auto&tl=en&text=" + enc(m[1]);
    if (m = t.match(/^weather(?:\s+(?:in|for))?\s+(.+)/i)) return "https://www.google.com/search?q=" + enc("weather " + m[1]);
    if (m = t.match(/^(?:buy|shop(?:\s+for)?|order|purchase)\s+(.+)/i)) return SEARCH_URLS.amazon + enc(m[1]);
    if (m = t.match(/^news(?:\s+(?:about|on))?\s+(.+)/i)) return "https://news.google.com/search?q=" + enc(m[1]);
    if (m = t.match(/^(?:tweet|post to (?:twitter|x))\s+(.+)/i)) return "https://twitter.com/intent/tweet?text=" + enc(m[1]);
    if (m = t.match(/^(?:add (?:a )?(?:calendar )?event|schedule|new event|remind me to)\s+(.+)/i)) {
      const raw = m[1];
      try {
        const res = (parse2(raw) || [])[0];
        if (res && res.start) {
          const start = res.start.date();
          const end = res.end ? res.end.date() : new Date(start.getTime() + 36e5);
          const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
          const title = (raw.slice(0, res.index) + raw.slice(res.index + res.text.length)).replace(/\s{2,}/g, " ").trim() || raw;
          return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + enc(title) + "&dates=" + fmt(start) + "/" + fmt(end);
        }
      } catch {
      }
      return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + enc(raw);
    }
    if (m = t.match(/^(?:search (?:my )?(?:e-?mail|gmail|inbox)|find (?:e-?mails?|mail))\s+(?:for\s+|from\s+)?(.+)/i)) return "https://mail.google.com/mail/u/0/#search/" + enc(m[1]);
    if (m = t.match(/^(?:stock|ticker|share price)\s+(?:of\s+|for\s+)?(.+)/i)) return "https://www.google.com/search?q=" + enc(m[1] + " stock");
    if (m = t.match(/^flights?\s+(?:from\s+)?(.+?)\s+to\s+(.+)$/i)) return "https://www.google.com/travel/flights?q=" + enc("flights from " + m[1] + " to " + m[2]);
    if (m = t.match(/^(?:showtimes?|movie times?)\s+(?:for\s+)?(.+)/i)) return "https://www.google.com/search?q=" + enc(m[1] + " showtimes");
    if (m = t.match(/^recipe(?:s)?\s+(?:for\s+)?(.+)/i)) return "https://www.google.com/search?q=" + enc(m[1] + " recipe");
    return null;
  }
  function composeEmailUrl(to, sub, body) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to || "")}&su=${enc(sub || "")}&body=${enc(body || "")}`;
  }
  function summarize(text, n = 6) {
    const clean = text.replace(/\s+/g, " ").trim();
    const sentences = (clean.match(/[^.!?]+[.!?]+(?=\s|$)/g) || [clean]).filter((s) => s.trim().split(/\s+/).length >= 5);
    if (sentences.length <= n) return sentences.map((s) => s.trim());
    const stop = new Set(
      "the a an and or but of to in on at for with is are was were be been by this that it as from your you we our their his her its not can will would should more most than then them they he she into out over about after before also just".split(
        " "
      )
    );
    const freq = {};
    for (const w of clean.toLowerCase().match(/[a-z']{3,}/g) || []) if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1;
    const scored = sentences.map((s, i) => {
      const words = s.toLowerCase().match(/[a-z']{3,}/g) || [];
      let sc = words.reduce((a, w) => a + (freq[w] || 0), 0) / (words.length || 1);
      if (i < 3) sc *= 1.15;
      return { s: s.trim(), sc, i };
    });
    return scored.sort((a, b) => b.sc - a.sc).slice(0, n).sort((a, b) => a.i - b.i).map((o) => o.s);
  }

  // src/browser.ts
  var import_webextension_polyfill = __toESM(require_browser_polyfill());
  var browser_default = import_webextension_polyfill.default;

  // src/sidepanel.ts
  var logEl = document.getElementById("log");
  var modeEl = document.getElementById("mode");
  var inp = document.getElementById("inp");
  var BRIDGE = "http://localhost:8787";
  var exec = (tool, args = {}) => browser_default.runtime.sendMessage({ type: "EXEC", tool, args });
  function addMsg(role, text, cls = "") {
    const d = document.createElement("div");
    d.className = "msg " + (role === "me" ? "me" : role === "sys" ? "sys" : "ai") + (cls ? " " + cls : "");
    d.textContent = text;
    logEl.appendChild(d);
    logEl.scrollTop = logEl.scrollHeight;
    return d;
  }
  var lastEls = [];
  async function ensureRead() {
    const r = await exec("read_page", {});
    if (r.ok) lastEls = r.page.elements;
    return lastEls;
  }
  function scoreEl(x, s, keys) {
    let sc = 0;
    for (const key of keys) {
      const t = (x[key] || "").toLowerCase();
      if (t === s) sc = Math.max(sc, 3);
      else if (t.startsWith(s)) sc = Math.max(sc, 2);
      else if (t.includes(s)) sc = Math.max(sc, 1);
    }
    return sc;
  }
  function fuzzyRef(items, q, keys) {
    try {
      const hit = new entry_default(items, { keys, threshold: 0.4 }).search(q)[0];
      return hit ? { ref: hit.item.ref } : null;
    } catch {
      return null;
    }
  }
  function findEl(q) {
    q = q.trim().replace(/^#/, "");
    if (/^\d+$/.test(q)) return { ref: q };
    const s = q.toLowerCase();
    const best = lastEls.map((x) => ({ x, sc: scoreEl(x, s, ["label", "text", "name", "placeholder", "href"]) })).filter((o) => o.sc > 0).sort((a, b) => b.sc - a.sc)[0];
    if (best) return { ref: best.x.ref };
    return fuzzyRef(lastEls, q, ["label", "text", "name", "placeholder", "href"]);
  }
  function findField(k) {
    const s = k.toLowerCase();
    const inputs = lastEls.filter((x) => ["input", "textarea", "select"].includes(x.tag) && !["submit", "button", "checkbox", "radio", "password"].includes(x.type) && !x.isPassword);
    const best = inputs.map((x) => ({ x, sc: scoreEl(x, s, ["label", "name", "placeholder"]) })).filter((o) => o.sc > 0).sort((a, b) => b.sc - a.sc)[0];
    if (best) return { ref: best.x.ref };
    return fuzzyRef(inputs, k, ["label", "name", "placeholder"]);
  }
  async function autofillProfile(prof) {
    await ensureRead();
    const done = [];
    const used = /* @__PURE__ */ new Set();
    for (const [key, value] of Object.entries(prof)) {
      const syns = FIELD_SYNS[key] || [key];
      let filled = false;
      for (const syn of syns) {
        const tgt = findField(syn);
        if (tgt && !used.has(tgt.ref)) {
          const r = await exec("type", { ...tgt, text: value });
          if (r.ok) {
            used.add(tgt.ref);
            done.push(`\u2022 ${key} \u2192 filled`);
            filled = true;
            break;
          }
        }
      }
      if (!filled) done.push(`\u2022 ${key}: no field`);
    }
    return done;
  }
  var clickByText = async (label) => {
    await ensureRead();
    const tgt = findEl(label);
    if (!tgt) return { ok: false, error: `no \u201C${label}\u201D control found \u2014 try "read" first` };
    return exec("click", tgt);
  };
  function readerPage(title, text, sanitizedHtml = "") {
    const esc = (s) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]);
    const body = sanitizedHtml && sanitizedHtml.trim() ? sanitizedHtml : text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("");
    const html = `<!doctype html><meta charset=utf-8><title>${esc(title)}</title><style>body{max-width:720px;margin:40px auto;padding:0 20px;font:18px/1.7 Georgia,serif;background:#faf9f6;color:#222}h1{font:700 30px/1.3 Segoe UI,Arial,sans-serif;margin-bottom:.6em}p{margin:0 0 1em}img{max-width:100%;height:auto}a{color:#2563eb}@media(prefers-color-scheme:dark){body{background:#16181d;color:#dcdcdc}a{color:#7fb0ff}}</style><h1>${esc(title)}</h1>${body}`;
    return "data:text/html;charset=utf-8," + encodeURIComponent(html);
  }
  var LOGIN_URLS = {
    gmail: "https://accounts.google.com/",
    google: "https://accounts.google.com/",
    github: "https://github.com/login",
    facebook: "https://www.facebook.com/login",
    instagram: "https://www.instagram.com/accounts/login/",
    reddit: "https://www.reddit.com/login",
    twitter: "https://x.com/login",
    x: "https://x.com/login",
    amazon: "https://www.amazon.com/ap/signin",
    netflix: "https://www.netflix.com/login",
    linkedin: "https://www.linkedin.com/login",
    spotify: "https://accounts.spotify.com/en/login",
    discord: "https://discord.com/login",
    twitch: "https://www.twitch.tv/login",
    paypal: "https://www.paypal.com/signin",
    ebay: "https://signin.ebay.com/",
    nexus: "https://users.nexusmods.com/auth/sign_in"
  };
  var getMacros = async () => (await browser_default.storage.local.get("macros")).macros || {};
  var setMacros = async (mac) => browser_default.storage.local.set({ macros: mac });
  var getSkills = async () => (await browser_default.storage.local.get("skills")).skills || {};
  var setSkills = async (s) => browser_default.storage.local.set({ skills: s });
  browser_default.storage.local.get("skillsSeeded").then(async ({ skillsSeeded }) => {
    if (skillsSeeded) return;
    const s = await getSkills();
    if (!s.gamepost)
      s.gamepost = {
        description: "announce or promote a Steam game on social media",
        steps: 'open steam and search $input then ask Write a short, punchy Facebook post announcing my Steam game "$input". Include [STORE LINK] and [RELEASE DATE] placeholders, a one-line hook, 2-3 relevant hashtags, and keep it under 80 words.'
      };
    await setSkills(s);
    await browser_default.storage.local.set({ skillsSeeded: true });
  });
  async function runSkill(name, input, depth = 0) {
    const skills = await getSkills();
    const sk = skills[name];
    if (!sk) return { text: `No skill \u201C${name}\u201D.` };
    if (depth > 4) return { text: "Skill nesting too deep \u2014 stopped.", blocked: true };
    const body = sk.steps.replace(/\$\{?(input|topic|query|q|x)\}?/gi, input || "");
    const steps = body.split(/\s+(?:and then|then)\s+|\s*;\s*/i).map((s) => s.trim()).filter(Boolean);
    addMsg("sys", `\u2733 skill \u201C${name}\u201D${input ? ` \xB7 \u201C${input}\u201D` : ""} (${steps.length} step${steps.length > 1 ? "s" : ""})`);
    for (const step of steps) {
      const r = await interpret(step, depth + 1);
      if (r.nano) {
        await runNano(r.nano);
        continue;
      }
      addMsg("ai", r.text, r.els ? "els" : r.blocked ? "blocked" : "");
      if (r.blocked) return { text: `Skill \u201C${name}\u201D stopped \u2014 a step was blocked.`, blocked: true };
    }
    return { text: `\u2713 Skill \u201C${name}\u201D done.` };
  }
  var _lm = null;
  var nanoPresent = () => typeof LanguageModel !== "undefined";
  async function nanoAvail() {
    try {
      return nanoPresent() ? await LanguageModel.availability() : "unavailable";
    } catch {
      return "unavailable";
    }
  }
  async function nanoReady() {
    const a = await nanoAvail();
    return a === "available" || a === "readily-available";
  }
  async function nanoSession(onProg) {
    if (_lm) return _lm;
    _lm = await LanguageModel.create({
      temperature: 0.7,
      topK: 3,
      initialPrompts: [{ role: "system", content: "You are Claude Companion, a concise, privacy-respecting browser assistant running on-device. Answer briefly and helpfully." }],
      monitor(mn) {
        mn.addEventListener("downloadprogress", (e) => onProg && onProg(e.loaded));
      }
    });
    return _lm;
  }
  async function nanoAsk(prompt, onProg) {
    const s = await nanoSession(onProg);
    return (await s.prompt(prompt)).trim();
  }
  async function nanoSummarize(text, onProg) {
    if (typeof Summarizer !== "undefined") {
      try {
        const a = await Summarizer.availability();
        if (a !== "unavailable") {
          const sm = await Summarizer.create({
            type: "key-points",
            format: "markdown",
            length: "medium",
            monitor(mn) {
              mn.addEventListener("downloadprogress", (e) => onProg && onProg(e.loaded));
            }
          });
          const out = await sm.summarize(text.slice(0, 12e3));
          try {
            sm.destroy();
          } catch {
          }
          return out;
        }
      } catch {
      }
    }
    return nanoAsk("Summarize the following page content in 5 concise bullet points:\n\n" + text.slice(0, 6e3), onProg);
  }
  async function nanoPickSkill(request, skills) {
    const list = Object.entries(skills).map(([n, s]) => `- ${n}: ${s.description}`).join("\n");
    const ans = (await nanoAsk(`Route the request to ONE browser skill or none.
Skills:
${list}

Request: "${request}"

Reply with ONLY the matching skill name, or "none".`)).toLowerCase().replace(/[^a-z0-9-]/g, "");
    return skills[ans] ? ans : null;
  }
  function buildPage(topic) {
    const T = topic.replace(/[<>]/g, "").slice(0, 60);
    const html = `<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>${T}</title>
<style>*{margin:0;box-sizing:border-box}body{font-family:Segoe UI,Arial,sans-serif;background:#0b0e13;color:#e8e8e8}
.hero{padding:90px 24px;text-align:center;background:radial-gradient(circle at 50% -20%,#16324f,#0b0e13)}
.hero h1{font-size:46px;background:linear-gradient(90deg,#5ea0ff,#9b6bff);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{color:#9aa4b2;margin-top:14px;font-size:18px}.btn{display:inline-block;margin-top:26px;padding:12px 26px;border-radius:10px;background:#3b82f6;color:#fff;text-decoration:none}
.wrap{max-width:1000px;margin:0 auto;padding:60px 24px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.card{background:#141a22;border:1px solid #232b36;border-radius:14px;padding:22px}.card h3{color:#7fb0ff;margin-bottom:8px}footer{text-align:center;color:#6b7280;padding:40px}</style></head>
<body><div class=hero><h1>${T}</h1><p>Built for people who love tech \u2014 clean, fast, easy to navigate.</p><a class=btn href="#f">Explore</a></div>
<div class=wrap id=f><div class=grid>
<div class=card><h3>\u26A1 Fast</h3><p>Snappy and modern, zero clutter.</p></div>
<div class=card><h3>\u{1F3A8} Sleek</h3><p>Dark, tech-forward aesthetic.</p></div>
<div class=card><h3>\u{1F9ED} Easy</h3><p>Everything one click away.</p></div></div></div>
<footer>${T} \xB7 starter template</footer></body></html>`;
    return "data:text/html;charset=utf-8," + encodeURIComponent(html);
  }
  var HELP = `Free mode \u2014 a smart pattern-based controller (no API). Try:
OPEN      open pinterest \xB7 google.com \xB7 open youtube, reddit, github (many at once)
SEARCH    search cute cats \xB7 open youtube and search lofi \xB7 images of neon city \xB7 videos of cats
          buy usb-c hub \xB7 map of Tokyo \xB7 directions from LA to Vegas \xB7 wiki quantum \xB7 define entropy
          weather Denver \xB7 translate hola \xB7 news about AI \xB7 stock AAPL \xB7 recipe carbonara \xB7 what is a qubit?
PAGE      read \xB7 click the Sign in button \xB7 type me@x.com into email \xB7 submit \xB7 press enter
          scroll to bottom \xB7 back \xB7 forward \xB7 reload \xB7 find "returns" on the page \xB7 list tabs
READING   summarize \xB7 reader view \xB7 read aloud / stop reading \xB7 translate this page
          word count \xB7 list links \xB7 extract emails \xB7 extract prices \xB7 copy url \xB7 copy page text \xB7 copy as markdown
VIEW      dark mode \xB7 zoom in \xB7 zoom out \xB7 reset zoom
SHOP      add to cart \xB7 buy now \xB7 checkout   (acts on the current page; sensitive steps ask first)
FORMS     fill name=John, email=john@x.com, message: hello
PROFILE   set my info name=Mike, email=me@x.com, phone=555-1234   \u2192  then just say:  fill my info
LOGIN     log into github   (opens the site's real login; passwords never entered)
EMAIL     email jane@x.com about lunch saying are you free at noon?   (opens a Gmail draft \u2014 you send)
EVENTS    add event dentist friday 3pm \xB7 tweet hello world
BUILD     build a landing page for my PC-building business   (a template \u2014 for real design, ask Claude directly)
CHAIN     open youtube then search lofi then scroll down
MACROS    save macro standup = open github then open gmail then open calendar
          run standup \xB7 macros \xB7 delete macro standup     (teach a routine once, replay it forever)
AI        ask what's a good name for a tech blog     (on-device Gemini Nano \u2014 local & free, Chrome 138+)
          switch to \u{1F9E0} On-device AI up top for plain-English chat + smarter "summarize"
SHARE     share to facebook https://store.steampowered.com/app/\u2026   (opens the share dialog \u2014 you click Post)
          also: share this page to reddit \xB7 share <url> to linkedin/x
FILES     files      open a local file manager \u2014 pick a folder to browse, read & edit files (saves on your click)
SKILLS    skill new research: gather info on a topic => open google and search $input then open youtube and search $input
          use research neon cities   \xB7   do gather info on quantum computing   \xB7   skills   \xB7   skill delete research
Sensitive sites ask before acting; adult sites are blocked. Say "help" anytime.`;
  async function interpret(text, depth = 0, opts = {}) {
    const t = text.trim(), l = t.toLowerCase();
    let m;
    if (/^(help|\?|what can you do|commands)\b/.test(l)) return { text: HELP, els: true };
    if (m = t.match(/^(?:ask|chat|hey companion|hey claude)\s+(.+)/i)) return { nano: m[1] };
    if (/^(skills|list skills)$/i.test(l)) {
      const s = await getSkills();
      const keys = Object.keys(s);
      return {
        text: keys.length ? "\u{1F9E9} Skills:\n" + keys.map((k) => `\u2022 ${k} \u2014 ${s[k].description}`).join("\n") : "No skills yet. Create one, e.g.:\n  skill new research: gather info on a topic => open google and search $input then open youtube and search $input",
        els: true
      };
    }
    if (m = t.match(/^skill\s+(?:new|add|create)\s+([\w-]+)\s*:\s*(.+?)\s*=>\s*(.+)$/i)) {
      const s = await getSkills();
      s[m[1].toLowerCase()] = { description: m[2].trim(), steps: m[3].trim() };
      await setSkills(s);
      return { text: `\u{1F9E9} Saved skill \u201C${m[1]}\u201D. Run it:  use ${m[1]} <input>${nanoPresent() ? `   \u2014 or implicitly:  do <request>` : ""}` };
    }
    if (m = t.match(/^skill\s+(?:show|view)\s+([\w-]+)$/i)) {
      const s = await getSkills();
      const sk = s[m[1].toLowerCase()];
      return { text: sk ? `\u{1F9E9} ${m[1]}
when: ${sk.description}
steps: ${sk.steps}` : `No skill \u201C${m[1]}\u201D.` };
    }
    if (m = t.match(/^skill\s+(?:delete|remove|forget)\s+([\w-]+)$/i)) {
      const s = await getSkills();
      const k = m[1].toLowerCase();
      if (!s[k]) return { text: `No skill \u201C${m[1]}\u201D.` };
      delete s[k];
      await setSkills(s);
      return { text: `\u{1F5D1} Deleted skill \u201C${m[1]}\u201D.` };
    }
    if ((m = t.match(/^(?:use|@|\/)\s*([\w-]+)(?:\s+(.+))?$/i)) && (await getSkills())[m[1].toLowerCase()]) return runSkill(m[1].toLowerCase(), (m[2] || "").trim(), depth);
    if (m = t.match(/^do\s+(.+)/i)) {
      const skills = await getSkills();
      if (!Object.keys(skills).length) return { text: 'No skills yet. Create one with "skill new \u2026".' };
      if (!await nanoReady()) return { text: `\u{1F9E0} On-device AI isn\u2019t ready, so I can\u2019t auto-pick a skill. Invoke one directly:  use <name> <input>.
Your skills: ${Object.keys(skills).join(", ")}` };
      const pick = await nanoPickSkill(m[1], skills);
      if (!pick) return { text: `No skill matched \u201C${m[1]}\u201D. Your skills: ${Object.keys(skills).join(", ")}` };
      return runSkill(pick, m[1], depth);
    }
    if (m = t.match(/^(?:save|teach|create|define)\s+macro\s+([\w-]+)\s*(?:=|:|as)\s*(.+)$/i)) {
      const mac = await getMacros();
      mac[m[1].toLowerCase()] = m[2].trim();
      await setMacros(mac);
      return { text: `\u{1F4BE} Saved macro \u201C${m[1]}\u201D. Run it anytime with:  run ${m[1]}` };
    }
    if (/^(list )?macros$/i.test(l)) {
      const mac = await getMacros();
      const keys = Object.keys(mac);
      return {
        text: keys.length ? "Saved macros:\n" + keys.map((k) => `\u2022 ${k} = ${mac[k]}`).join("\n") : "No macros yet. Save one, e.g.:\n  save macro standup = open github then open gmail then open calendar",
        els: true
      };
    }
    if (m = t.match(/^(?:delete|remove|forget)\s+macro\s+([\w-]+)$/i)) {
      const mac = await getMacros();
      const k = m[1].toLowerCase();
      if (!mac[k]) return { text: `No macro \u201C${m[1]}\u201D.` };
      delete mac[k];
      await setMacros(mac);
      return { text: `\u{1F5D1} Deleted macro \u201C${m[1]}\u201D.` };
    }
    if (m = t.match(/^(?:run|play|macro)\s+([\w-]+)$/i)) {
      const mac = await getMacros();
      const body = mac[m[1].toLowerCase()];
      if (!body) return { text: `No macro \u201C${m[1]}\u201D. See yours with:  macros` };
      if (depth > 4) return { text: "Macro nesting too deep \u2014 stopped.", blocked: true };
      const steps = body.split(/\s+(?:and then|then)\s+|\s*;\s*/i).map((s) => s.trim()).filter(Boolean);
      addMsg("sys", `\u25B6 running macro \u201C${m[1]}\u201D (${steps.length} step${steps.length > 1 ? "s" : ""})`);
      for (const step of steps) {
        const r2 = await interpret(step, depth + 1);
        addMsg("ai", r2.text, r2.els ? "els" : r2.blocked ? "blocked" : "");
        if (r2.blocked) return { text: `Macro \u201C${m[1]}\u201D stopped \u2014 a step was blocked.`, blocked: true };
      }
      return { text: `\u2713 Macro \u201C${m[1]}\u201D done.` };
    }
    if (/^scroll( down)?$|^down$/.test(l)) {
      await exec("scroll", { direction: "down" });
      return { text: "Scrolled down." };
    }
    if (/^scroll up$|^up$/.test(l)) {
      await exec("scroll", { direction: "up" });
      return { text: "Scrolled up." };
    }
    if (/^(go )?back$/.test(l)) {
      const r2 = await exec("back", {});
      return { text: r2.ok ? "Went back." : "\u{1F6AB} " + r2.error };
    }
    if (/^(go )?forward$/.test(l)) {
      const r2 = await exec("forward", {});
      return { text: r2.ok ? "Went forward." : "\u{1F6AB} " + r2.error };
    }
    if (/^(reload|refresh)( (the|this) page)?$/.test(l)) {
      await exec("reload", {});
      return { text: "Reloaded." };
    }
    if (/^close( this)?( tab)?$/.test(l)) {
      const [tab] = await browser_default.tabs.query({ active: true, currentWindow: true });
      await exec("close_tab", { tabId: tab.id });
      return { text: "Closed tab." };
    }
    if (/^(new tab|open( a)? new tab)$/.test(l)) {
      await exec("open_tab", { url: "about:blank" });
      return { text: "New tab." };
    }
    if (/^(list )?tabs$/.test(l)) {
      const r2 = await exec("list_tabs", {});
      return { text: r2.ok ? r2.tabs.map((x) => `\u2022 ${x.title || x.url}`).join("\n") : "\u{1F6AB} " + r2.error, els: true };
    }
    if (/^(files|file manager|open files|edit files|browse files|open a file)$/i.test(l)) {
      browser_default.tabs.create({ url: browser_default.runtime.getURL("pages/files.html") });
      return { text: "\u{1F4C1} Opened the file manager. Pick a folder to browse, read, and edit files on this computer \u2014 changes save only when you click Save." };
    }
    if (/^(scroll to |go to )?(the )?bottom$|^scroll bottom$/.test(l)) {
      await exec("scroll", { to: "bottom" });
      return { text: "Scrolled to bottom." };
    }
    if (/^(scroll to |go to )?(the )?top$|^scroll top$/.test(l)) {
      await exec("scroll", { to: "top" });
      return { text: "Scrolled to top." };
    }
    if (/^(press|hit)\s+enter$/.test(l)) {
      const r2 = await exec("submit", {});
      return { text: r2.ok ? "Submitted." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if ((m = t.match(/^(?:find|locate|highlight|jump to)\s+(.+?)\s+on\s+(?:this|the)\s+page$/i)) || (m = t.match(/^find on page\s+(.+)/i)) || (m = t.match(/^(?:find|highlight)\s+"([^"]+)"$/i))) {
      const r2 = await exec("find_text", { text: m[1].replace(/^["'“]|["'”]$/g, "").trim() });
      return { text: r2.ok ? `Found: \u201C${r2.text}\u201D` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (/^(add to cart|add to bag|add to basket|add this to (?:my )?cart)$/i.test(l)) {
      const r2 = await clickByText("add to cart");
      return { text: r2.ok ? "Clicked Add to cart." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (/^(buy now|buy it now)$/i.test(l)) {
      const r2 = await clickByText("buy now");
      return { text: r2.ok ? "Clicked Buy now (confirm if prompted)." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (/^(checkout|check out|proceed to checkout|place order)$/i.test(l)) {
      const r2 = await clickByText("checkout");
      return { text: r2.ok ? "Clicked Checkout (confirm if prompted)." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (/^(sign in|log ?in)$/i.test(l)) {
      const r2 = await clickByText("sign in");
      return { text: r2.ok ? "Clicked Sign in." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (/^translate (this|the) page$|^translate page$/i.test(l)) {
      const [tab] = await browser_default.tabs.query({ active: true, currentWindow: true });
      const u = tab?.url || "";
      if (!/^https?:/.test(u)) return { text: "Open a normal web page first, then say \u201Ctranslate this page\u201D." };
      await exec("open_tab", { url: "https://translate.google.com/translate?sl=auto&tl=en&u=" + enc(u) });
      return { text: "Opened a translated view of this page." };
    }
    if (/^(summari[sz]e|summary|tl;?dr|key points|main points)( (this|the) (page|article)| it)?$/i.test(l)) {
      const r2 = await exec("extract", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error, blocked: true };
      if ((r2.text || "").length < 40) return { text: "Couldn't find readable article text on this page." };
      if (await nanoReady()) {
        try {
          const out = await nanoSummarize(r2.text);
          if (out) return { text: `\u{1F9E0} ${r2.title}

${out}` };
        } catch {
        }
      }
      const pts = summarize(r2.text, 6);
      if (!pts.length) return { text: "Couldn't find readable article text on this page." };
      return { text: `\u{1F4C4} ${r2.title}

\u2022 ${pts.join("\n\u2022 ")}

(Extractive summary. Switch to \u{1F9E0} On-device AI for a smarter, abstractive summary \u2014 free & local.)` };
    }
    if (/^(reader|reader view|read this|clean view|declutter|simplify)( (this|the) page)?$/i.test(l)) {
      const r2 = await exec("extract", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error, blocked: true };
      if ((r2.text || "").length < 40) return { text: "Not enough article text here for a reader view." };
      await exec("open_tab", { url: readerPage(r2.title, r2.text, r2.html || "") });
      return { text: "Opened a clean, distraction-free reader view." };
    }
    if (/^(read (this )?(aloud|to me)|speak|say this|start reading)$/i.test(l)) {
      const r2 = await exec("speak", {});
      return { text: r2.ok ? "\u{1F50A} Reading the page aloud\u2026 say \u201Cstop reading\u201D to stop." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (/^(stop( reading| speaking)?|quiet|shush|be quiet)$/i.test(l)) {
      await exec("stopspeak", {});
      return { text: "Stopped reading." };
    }
    if (/^(list |show |get )?links$/i.test(l)) {
      const r2 = await exec("links", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error, blocked: true };
      const list = r2.links.slice(0, 60).map((x) => `\u2022 ${x.text || x.href}
  ${x.href}`).join("\n");
      return { text: `${r2.links.length} links:
${list}`, els: true };
    }
    if (/^(extract |find |get |list )?e-?mails?$/i.test(l)) {
      const r2 = await exec("extract", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error, blocked: true };
      const em = [...new Set(r2.text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) || [])];
      return { text: em.length ? `${em.length} emails:
` + em.join("\n") : "No email addresses found on this page." };
    }
    if (/^(extract |find |get |list )?prices?$/i.test(l)) {
      const r2 = await exec("extract", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error, blocked: true };
      const pr = [...new Set(r2.text.match(/[$£€]\s?\d[\d,]*(?:\.\d{2})?/g) || [])];
      return { text: pr.length ? `${pr.length} prices:
` + pr.join("  \xB7  ") : "No prices found on this page." };
    }
    if (/^(word count|reading time|how many words|how long)( (is )?(this|the) (page|article))?$/i.test(l)) {
      const r2 = await exec("extract", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error, blocked: true };
      const words = (r2.text.match(/\S+/g) || []).length, mins = Math.max(1, Math.round(words / 220));
      return { text: `\u{1F4C4} ${r2.title}
${words.toLocaleString()} words \xB7 ~${mins} min read` };
    }
    if (/^(dark|night)( mode)?$|^toggle dark( mode)?$/i.test(l)) {
      const r2 = await exec("darkmode", {});
      return { text: r2.ok ? "\u{1F319} " + r2.did + " (run again to toggle)." : "\u{1F6AB} " + r2.error };
    }
    if (/^zoom in$/i.test(l)) {
      const r2 = await exec("zoom", { dir: "in" });
      return { text: r2.ok ? "\u{1F50D} " + r2.did : "\u{1F6AB} " + r2.error };
    }
    if (/^zoom out$/i.test(l)) {
      const r2 = await exec("zoom", { dir: "out" });
      return { text: r2.ok ? "\u{1F50D} " + r2.did : "\u{1F6AB} " + r2.error };
    }
    if (/^(reset zoom|zoom reset|actual size)$/i.test(l)) {
      const r2 = await exec("zoom", { dir: "reset" });
      return { text: r2.ok ? "\u{1F50D} " + r2.did : "\u{1F6AB} " + r2.error };
    }
    if (/^copy (this )?(url|link|address)$/i.test(l)) {
      const r2 = await exec("copy", {});
      return { text: r2.ok ? "\u{1F4CB} Copied the page URL." : "\u{1F6AB} " + r2.error };
    }
    if (/^copy (the )?(page )?text$/i.test(l)) {
      const r2 = await exec("extract", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error };
      const c = await exec("copy", { text: r2.text.slice(0, 1e5) });
      return { text: c.ok ? "\u{1F4CB} Copied the page text." : "\u{1F6AB} " + c.error };
    }
    if (/^copy (the )?(page )?(as )?(markdown|md)$/i.test(l)) {
      const r2 = await exec("extract", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error };
      const md = r2.html && r2.html.trim() ? new TurndownService().turndown(r2.html) : r2.text || "";
      const c = await exec("copy", { text: md.slice(0, 1e5) });
      return { text: c.ok ? "\u{1F4CB} Copied the page as Markdown." : "\u{1F6AB} " + c.error };
    }
    if (m = t.match(/^(?:log ?in(?:to| to)?|sign ?in(?:to| to)?)\s+(.+)$/i)) {
      const site = m[1].trim().toLowerCase().replace(/\.com$/, "");
      const url2 = LOGIN_URLS[site];
      if (url2) {
        await exec("open_tab", { url: url2 });
        const prof = (await browser_default.storage.local.get("profile")).profile || {};
        return { text: `Opened ${site} login.${prof.email ? ` Say \u201Cfill my info\u201D to prefill your email \u2014 passwords are never entered.` : ""}` };
      }
      const r2 = await exec("open_tab", { url: resolve(m[1]) });
      return { text: r2.ok ? `Opened ${m[1]} \u2014 click Sign in there (I never enter passwords).` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (m = t.match(/^(?:share|post)\s+(?:(https?:\/\/\S+)\s+)?(?:this(?:\s+page)?\s+)?(?:to|on)\s+(facebook|fb|linkedin|reddit|twitter|x)(?:\s+(https?:\/\/\S+))?$/i)) {
      const net = { fb: "facebook" }[m[2].toLowerCase()] || m[2].toLowerCase();
      let url2 = m[1] || m[3];
      if (!url2) {
        const [tab] = await browser_default.tabs.query({ active: true, currentWindow: true });
        url2 = tab?.url || "";
      }
      if (!/^https?:/.test(url2)) return { text: `Give a link, e.g. \u201Cshare to ${net} https://store.steampowered.com/app/\u2026\u201D.` };
      await exec("open_tab", { url: SHARE_URLS[net] + enc(url2) });
      return { text: `Opened ${net}'s share dialog for that link. Add your caption and click Post \u2014 I never auto-publish.` };
    }
    if (m = t.match(
      /^(?:email|e-?mail|write (?:an? )?email to|send (?:an? )?email to|compose (?:to|an email to))\s+(\S+@\S+|[\w .'-]+?)(?:\s+(?:about|re:?|subject:?|saying|that says|with subject)\s+(.+))?$/i
    )) {
      const to = m[1].trim();
      let sub = (m[2] || "").trim(), body = "";
      const bm = sub.match(/^(.+?)\s+(?:saying|body:?|message:?)\s+(.+)$/i);
      if (bm) {
        sub = bm[1].trim();
        body = bm[2].trim();
      }
      const r2 = await exec("open_tab", { url: composeEmailUrl(to, sub, body) });
      return { text: r2.ok ? `Opened a Gmail draft to ${to}${sub ? ` \u2014 \u201C${sub}\u201D` : ""}. Review and send it yourself.` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if ((m = t.match(/^(?:set|save|remember|update)\s+my\s+(?:info|profile|details|contact(?:\s+info)?)?\s*(?:to|:|=|with|as)?\s*(.+)$/i)) && /[:=]/.test(m[1])) {
      const pairs = parsePairs(m[1]);
      if (!pairs.length) return { text: 'Say e.g. "set my info name=Mike, email=me@x.com, phone=555-1234".' };
      const prof = (await browser_default.storage.local.get("profile")).profile || {};
      for (const { k, v } of pairs) prof[normKey(k)] = v;
      await browser_default.storage.local.set({ profile: prof });
      return { text: "Saved your profile: " + Object.keys(prof).join(", ") + ".\nNow say \u201Cfill my info\u201D on any form. (Passwords & cards are never stored.)" };
    }
    if (/^(?:fill|autofill|complete)\s+(?:this\s+)?(?:form\s+)?(?:with\s+)?my\s+(?:info|profile|details|contact(?:\s+info)?)$|^autofill$/i.test(l)) {
      const prof = (await browser_default.storage.local.get("profile")).profile || {};
      if (!Object.keys(prof).length) return { text: 'No saved profile yet. First: "set my info name=Mike, email=me@x.com, phone=...".' };
      const done = await autofillProfile(prof);
      return { text: "Autofilled from your profile:\n" + done.join("\n"), els: true };
    }
    if (m = t.match(/^(?:build|make|create|generate)\s+(?:me\s+)?(?:a|an)?\s*[\w ]*?(?:page|site|website|landing[\w ]*)\s+(?:for|about)\s+(.+)/i)) {
      const url2 = buildPage(m[1]);
      const r2 = await exec("open_tab", { url: url2 });
      return { text: r2.ok ? `Built a starter page for \u201C${m[1]}\u201D. (This is a template \u2014 for a real custom design, ask Claude directly.)` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    const known = (n) => SEARCH_URLS[n.toLowerCase().replace(/\.com$/, "")] || SITES[n.toLowerCase()];
    if ((m = t.match(/^(?:open\s+|go to\s+|on\s+)?([a-z0-9.-]+)\s+(?:and\s+)?search(?:\s+for)?\s+(.+)$/i)) && known(m[1])) {
      const r2 = await exec("open_tab", { url: siteSearchUrl(m[1], m[2]) });
      return { text: r2.ok ? `Searching ${m[1]} for \u201C${m[2]}\u201D` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if ((m = t.match(/^search\s+([a-z0-9.-]+)\s+(?:for|:)\s+(.+)$/i)) && known(m[1])) {
      const r2 = await exec("open_tab", { url: siteSearchUrl(m[1], m[2]) });
      return { text: r2.ok ? `Searching ${m[1]} for \u201C${m[2]}\u201D` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    const iu = intentUrl(t);
    if (iu) {
      const r2 = await exec("open_tab", { url: iu });
      return { text: r2.ok ? "Opened." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (m = l.match(/^open\s+(.+,.+)$/)) {
      const sites = m[1].split(/\s*,\s*/).map((s) => s.trim()).filter(Boolean);
      for (const s of sites) await exec("open_tab", { url: resolve(s) });
      return { text: "Opened " + sites.length + " tabs: " + sites.join(", ") };
    }
    if (m = l.match(/^(?:open|go to|goto|visit|launch)\s+(.+)/)) {
      const url2 = resolve(m[1]);
      const r2 = await exec("open_tab", { url: url2 });
      return { text: r2.ok ? "Opened " + url2 : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (m = l.match(/^(?:search|google|find)\s+(.+)/)) {
      const r2 = await exec("open_tab", { url: "https://www.google.com/search?q=" + encodeURIComponent(m[1]) });
      return { text: r2.ok ? "Searched: " + m[1] : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (l === "read" || /^(read|scan)( the)?( page)?$/.test(l) || /what.?s on/.test(l)) {
      const r2 = await exec("read_page", {});
      if (!r2.ok) return { text: "\u{1F6AB} " + r2.error, blocked: true };
      lastEls = r2.page.elements;
      const list = lastEls.slice(0, 60).map((x) => `#${x.ref} <${x.tag}${x.type ? " " + x.type : ""}> ${x.label || x.text || x.placeholder || x.name || x.href}`.trim()).join("\n");
      return { text: `${r2.page.url}
${r2.page.sensitive ? "\u26A0 sensitive \xB7 " : ""}${r2.page.elements.length} elements:
${list}`, els: true };
    }
    if ((m = t.match(/^fill\s+(?:(?:in|out)\s+)?(?:the\s+)?(?:form\s+)?(?:with\s+)?(.+)$/i)) && /[:=]/.test(m[1])) {
      const pairs = parsePairs(m[1]);
      if (!pairs.length) return { text: `Say e.g. "fill name=John, email=john@x.com, message: hello".` };
      await ensureRead();
      const done = [];
      for (const { k, v } of pairs) {
        const tgt = findField(k);
        if (!tgt) {
          done.push(`\u2022 ${k}: no matching field`);
          continue;
        }
        const r2 = await exec("type", { ...tgt, text: v });
        done.push(`\u2022 ${k} \u2192 ${r2.ok ? "filled" : r2.error}`);
      }
      return { text: "Form fill:\n" + done.join("\n"), els: true };
    }
    if (m = t.match(/^type\s+(.+?)\s+(?:into|in)\s+(.+)$/i)) {
      await ensureRead();
      const tgt = findEl(m[2]);
      if (!tgt) return { text: `Read the page first, then e.g. "type ${m[1]} into email".` };
      const r2 = await exec("type", { ...tgt, text: m[1] });
      return { text: r2.ok ? `Typed into ${m[2]}` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (m = l.match(/^click(?:\s+on)?\s+(.+)/)) {
      await ensureRead();
      const q = m[1].replace(/^the\s+/, "").replace(/\s+(button|link|tab|icon|option)$/, "").trim();
      const tgt = findEl(q);
      if (!tgt) return { text: `Couldn't find "${q}". Say "read" first, then click by number or visible text.` };
      const r2 = await exec("click", tgt);
      return { text: r2.ok ? `Clicked ${q}` : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (/^submit\b/.test(l)) {
      const r2 = await exec("submit", {});
      return { text: r2.ok ? "Submitted." : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (!opts.noFallback && (/\?$/.test(t) || /^(what|who|when|where|why|how|is|are|can|does|do|should|which|will|whats|what's)\b/.test(l))) {
      const r2 = await exec("open_tab", { url: "https://www.google.com/search?q=" + enc(t) });
      return { text: r2.ok ? "Searched Google: " + t : "\u{1F6AB} " + r2.error, blocked: !r2.ok };
    }
    if (opts.noFallback) return { fallthrough: true };
    const url = resolve(t);
    const r = await exec("open_tab", { url });
    return { text: r.ok ? "Opened " + url : "\u{1F6AB} " + r.error, blocked: !r.ok };
  }
  var bridgeUp = false;
  var nanoState = "unknown";
  var mode = "free";
  browser_default.storage.local.get("mode").then((v) => {
    if (["free", "nano", "api"].includes(v.mode)) mode = v.mode;
    updateMode();
    refreshNano();
  });
  function setMode(mNew) {
    mode = mNew;
    browser_default.storage.local.set({ mode: mNew });
    updateMode();
  }
  async function refreshNano() {
    nanoState = await nanoAvail();
    updateMode();
  }
  function updateMode() {
    const set = (id, on) => {
      const b = document.getElementById(id);
      if (b) b.classList.toggle("active", on);
    };
    set("mFree", mode === "free");
    set("mNano", mode === "nano");
    set("mApi", mode === "api");
    const ready = nanoState === "available" || nanoState === "readily-available";
    document.getElementById("apiHelp").style.display = mode === "api" && !bridgeUp ? "block" : "none";
    const nh = document.getElementById("nanoHelp");
    if (nh) nh.style.display = mode === "nano" && !ready ? "block" : "none";
    if (mode === "free") modeEl.innerHTML = '<span class="dot b"></span>Free mode \u2014 pattern commands, no AI';
    else if (mode === "nano")
      modeEl.innerHTML = ready ? '<span class="dot g"></span>On-device AI ready \u2014 Gemini Nano, local & free' : nanoState === "downloadable" || nanoState === "after-download" ? '<span class="dot" style="background:#e0a800"></span>On-device AI \u2014 model downloads on first use' : nanoState === "downloading" ? '<span class="dot" style="background:#e0a800"></span>On-device AI \u2014 downloading model\u2026' : '<span class="dot" style="background:#b3261e"></span>On-device AI unavailable (needs Chrome 138+ & capable hardware)';
    else modeEl.innerHTML = bridgeUp ? '<span class="dot g"></span>Claude API \u2014 bridge connected' : '<span class="dot" style="background:#b3261e"></span>Claude API \u2014 start the bridge or add a key';
  }
  async function checkMode() {
    try {
      const r = await (await fetch(BRIDGE + "/log")).json();
      bridgeUp = !!r.connected;
    } catch {
      bridgeUp = false;
    }
    updateMode();
  }
  setInterval(checkMode, 3e3);
  checkMode();
  document.getElementById("mFree").onclick = () => {
    setMode("free");
    addMsg("sys", "\u{1F535} Free mode \u2014 pattern commands (no AI).");
  };
  document.getElementById("mNano").onclick = async () => {
    setMode("nano");
    await refreshNano();
    addMsg("sys", "\u{1F9E0} On-device AI \u2014 local Gemini Nano. Ask in plain English (commands still work). First use downloads the model once.");
  };
  document.getElementById("mApi").onclick = () => {
    setMode("api");
    addMsg("sys", "\u{1F7E2} Claude API \u2014 needs the bridge running with your API key.");
  };
  async function runNano(prompt) {
    const div = addMsg("ai", "\u{1F9E0} thinking\u2026");
    if (!nanoPresent()) {
      div.textContent = "\u{1F9E0} On-device AI (Gemini Nano) needs Chrome 138+ on capable hardware. Use \u{1F535} Free or \u{1F7E2} Claude API instead.";
      div.className += " blocked";
      return;
    }
    try {
      const ans = await nanoAsk(prompt, (frac) => {
        div.textContent = `\u{1F9E0} downloading model\u2026 ${Math.round(frac * 100)}% (one-time)`;
        logEl.scrollTop = logEl.scrollHeight;
      });
      div.textContent = ans;
      logEl.scrollTop = logEl.scrollHeight;
    } catch (e) {
      div.textContent = "\u{1F9E0} on-device AI error: " + (e?.message || e);
      div.className += " blocked";
    }
  }
  async function runViaBridge(text) {
    let before = 0;
    try {
      before = (await (await fetch(BRIDGE + "/log")).json()).log.length;
    } catch {
    }
    await fetch(BRIDGE + "/task", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ task: text }) });
    const div = addMsg("ai", "\u2026thinking\u2026", "els");
    for (let i = 0; i < 200; i++) {
      await new Promise((r2) => setTimeout(r2, 800));
      let r;
      try {
        r = await (await fetch(BRIDGE + "/log")).json();
      } catch {
        break;
      }
      div.textContent = r.log.slice(before).join("\n") || "\u2026";
      logEl.scrollTop = logEl.scrollHeight;
      if (!r.running) break;
    }
  }
  document.getElementById("f").addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = inp.value.trim();
    if (!text) return;
    inp.value = "";
    addMsg("me", text);
    if (mode === "api") {
      if (!bridgeUp) return void addMsg("sys", "\u{1F7E2} Claude API mode is on but the bridge isn\u2019t running. Start it (node server.js with your API key), or switch modes up top.");
      return runViaBridge(text);
    }
    const steps = text.split(/\s+(?:and then|then)\s+|\s*;\s*/i).map((s) => s.trim()).filter(Boolean);
    for (const step of steps) {
      const r = await interpret(step, 0, { noFallback: mode === "nano" });
      if (r.nano) {
        await runNano(r.nano);
        continue;
      }
      if (r.fallthrough) {
        await runNano(step);
        continue;
      }
      addMsg("ai", r.text, r.els ? "els" : r.blocked ? "blocked" : "");
      if (r.blocked) break;
    }
  });
  document.getElementById("policy").onclick = () => browser_default.runtime.openOptionsPage();
  addMsg("sys", "\u{1F535} Free mode. Type a command (say \u201Chelp\u201D). Up top: \u{1F9E0} On-device AI for plain-English chat (local, free), or \u{1F7E2} Claude API with your key.");
})();
