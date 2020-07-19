// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Lat4":[function(require,module,exports) {

},{}],"D49k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoAnMoPluginCliV1 = void 0;

var CoAnMoPluginCliV1 =
/** @class */
function () {
  function CoAnMoPluginCliV1(name, version, stdinSelector, stdoutSelector, doc) {
    var _this = this;

    this.name = name;
    this.version = version;
    this.actions = [];
    this.$stdin = doc.querySelector(stdinSelector);
    this.$stdout = doc.querySelector(stdoutSelector);
    this.log("CoAnMoPluginCliV1()");
    if (this.$stdin) this.$stdin.addEventListener("keydown", function (evt) {
      if (_this.$stdin && evt.key === "Enter") _this.run(_this.$stdin.value);
    });
  }

  CoAnMoPluginCliV1.prototype.addActions = function (actions) {
    var _this = this;

    actions.forEach(function (action) {
      return _this.actions.push(action);
    });
  };

  CoAnMoPluginCliV1.prototype.focusOnInput = function () {
    if (this.$stdin) this.$stdin.focus();
  };

  CoAnMoPluginCliV1.prototype.log = function (message) {
    if (!this.$stdout) return;
    this.$stdout.innerHTML += "\n" + message;
    this.$stdout.scroll(0, 999999);
  };

  CoAnMoPluginCliV1.prototype.run = function (command) {
    if (!this.$stdin) return;

    var _a = command.trim().split(/\s+/),
        actionName = _a[0],
        args = _a.slice(1);

    var actionNameLc = actionName.toLowerCase(); // because, iPad keyboard

    if (actionName === "") {
      this.$stdin.value = "";
      return this.log(">");
    }

    var action = this.actions.find(function (actn) {
      return actn.name === actionNameLc;
    });
    if (!action) return this.log("No such action '" + actionNameLc + "' - try 'help'");
    this.log("> " + actionNameLc + " " + args.join(' '));
    this.$stdin.value = "";
    this.log(action.fn(args, {
      actions: this.actions,
      name: this.name,
      version: this.version
    }));
  };

  return CoAnMoPluginCliV1;
}();

exports.CoAnMoPluginCliV1 = CoAnMoPluginCliV1;
},{}],"GH91":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = void 0;
exports.help = {
  name: "help",
  summary: "Shows a help message",
  fn: function fn(args, meta) {
    var actions = meta.actions,
        name = meta.name,
        version = meta.version;
    var longest = actions.reduce(function (longest, action) {
      if (longest === void 0) {
        longest = 0;
      }

      return Math.max(longest, action.name.length);
    }, 0);
    if (args.length === 0) return __spreadArrays([name + " " + version + " Actions:"], actions.map(function (action) {
      return "" + action.name.padEnd(longest + 2, " ") + action.summary;
    })).join("\n");
    if (args.length !== 1) return "'help' got " + args.length + " args, expected 0 or 1 " + args.join();
    var actionNameLc = args[0].toLowerCase();
    var action = actions.find(function (actn) {
      return actn.name === actionNameLc;
    });
    if (!action) return "No such action '" + actionNameLc + "'";
    return action.name + "  " + action.summary;
  }
};
},{}],"mMWp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hue = exports.getCurrentHue = exports.stringToHue = exports.Hue = void 0;
var Hue;

(function (Hue) {
  Hue["red"] = "red";
  Hue["orange"] = "orange";
  Hue["yellow"] = "yellow";
  Hue["green"] = "green";
  Hue["cyan"] = "cyan";
  Hue["blue"] = "blue";
  Hue["magenta"] = "magenta";
  Hue["grey"] = "grey";
})(Hue = exports.Hue || (exports.Hue = {}));

function stringToHue(string) {
  switch (string) {
    case "red":
      return Hue.red;

    case "orange":
      return Hue.orange;

    case "yellow":
      return Hue.yellow;

    case "green":
      return Hue.green;

    case "cyan":
      return Hue.cyan;

    case "blue":
      return Hue.blue;

    case "magenta":
      return Hue.magenta;

    case "grey":
      return Hue.grey;

    default:
      return undefined;
  }
}

exports.stringToHue = stringToHue;

function getCurrentHue(doc) {
  var hueClass = doc.body.className.split(/\s+/).find(function (className) {
    return className.slice(0, 4) === "hue-";
  });
  if (!hueClass) return Hue.blue; // `undefined` defaults to blue, if not found

  var hue = stringToHue(hueClass.slice(4));
  if (!hue) return Hue.blue; // 'hue-nope' defaults to blue

  return hue;
}

exports.getCurrentHue = getCurrentHue;
exports.hue = {
  name: "hue",
  summary: "Gets/sets the color scheme",
  fn: function fn(args, meta) {
    var currentHue = getCurrentHue(document);
    if (args.length === 0) return "" + currentHue;
    if (args.length !== 1) return "'hue' got " + args.length + " args, expected 0 or 1 " + args.join();
    var newHue = stringToHue(args[0]);
    if (!newHue) return "'hue' got unexpected argument '" + args[0] + "' \u2014 try 'green'";
    document.body.classList.remove("hue-" + currentHue);
    document.body.classList.add("hue-" + args[0]);
    return "Was " + currentHue + ", now " + args[0];
  }
};
},{}],"XgvN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = void 0;
exports.random = {
  name: "random",
  summary: "Shows a random number",
  fn: function fn() {
    return ("" + Math.random()).slice(2);
  }
};
},{}],"DkWC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = void 0;
exports.version = {
  name: "version",
  summary: "Shows the CoAnMo’s version",
  fn: function fn(args, meta) {
    var name = meta.name,
        version = meta.version;
    return name + " " + version;
  }
};
},{}],"Dnhn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var help_1 = require("./help");

var hue_1 = require("./hue");

var random_1 = require("./random");

var version_1 = require("./version");

exports.actions = [help_1.help, hue_1.hue, random_1.random, version_1.version];
},{"./help":"GH91","./hue":"mMWp","./random":"XgvN","./version":"DkWC"}],"B6dB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./style");

var coanmo_plugin_cli_1 = require("coanmo-plugin-cli");

var actions_1 = require("./Actions/actions");

var CoAnMoWhichImportsCLI =
/** @class */
function () {
  function CoAnMoWhichImportsCLI(name, version, selector, doc) {
    this.name = name;
    this.version = version;
    this.cli = new coanmo_plugin_cli_1.CoAnMoPluginCliV1(name, version, selector + " .stdin", selector + " .stdout", doc);
    this.cli.addActions(actions_1.actions);
    this.cli.log("Ready");
  }

  CoAnMoWhichImportsCLI.prototype.receiveMessage = function (event) {
    // @TODO add validation and security
    if (typeof event.data === "string") this.cli.run(event.data);
  };

  return CoAnMoWhichImportsCLI;
}();

var coanmo = new CoAnMoWhichImportsCLI("CoAnMo Which Imports CLI", "1.0.7", "#coanmo-which-imports-cli", document);
window.addEventListener("message", function (event) {
  return coanmo.receiveMessage(event);
}, false);
},{"./style":"Lat4","coanmo-plugin-cli":"D49k","./Actions/actions":"Dnhn"}]},{},["B6dB"], null)
//# sourceMappingURL=/CoAnMo-Which-Imports-CLI/src.564b4507.js.map