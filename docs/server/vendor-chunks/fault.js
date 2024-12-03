"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/fault";
exports.ids = ["vendor-chunks/fault"];
exports.modules = {

/***/ "(ssr)/./node_modules/fault/index.js":
/*!*************************************!*\
  !*** ./node_modules/fault/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar formatter = __webpack_require__(/*! format */ \"(ssr)/./node_modules/format/format.js\")\n\nvar fault = create(Error)\n\nmodule.exports = fault\n\nfault.eval = create(EvalError)\nfault.range = create(RangeError)\nfault.reference = create(ReferenceError)\nfault.syntax = create(SyntaxError)\nfault.type = create(TypeError)\nfault.uri = create(URIError)\n\nfault.create = create\n\n// Create a new `EConstructor`, with the formatted `format` as a first argument.\nfunction create(EConstructor) {\n  FormattedError.displayName = EConstructor.displayName || EConstructor.name\n\n  return FormattedError\n\n  function FormattedError(format) {\n    if (format) {\n      format = formatter.apply(null, arguments)\n    }\n\n    return new EConstructor(format)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmF1bHQvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosZ0JBQWdCLG1CQUFPLENBQUMscURBQVE7O0FBRWhDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvYmFuZG8vRG9jdW1lbnRzL0dpdEh1Yi9lYXN5LXRocmVlL2RvY3Mtc3JjL25vZGVfbW9kdWxlcy9mYXVsdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxudmFyIGZvcm1hdHRlciA9IHJlcXVpcmUoJ2Zvcm1hdCcpXG5cbnZhciBmYXVsdCA9IGNyZWF0ZShFcnJvcilcblxubW9kdWxlLmV4cG9ydHMgPSBmYXVsdFxuXG5mYXVsdC5ldmFsID0gY3JlYXRlKEV2YWxFcnJvcilcbmZhdWx0LnJhbmdlID0gY3JlYXRlKFJhbmdlRXJyb3IpXG5mYXVsdC5yZWZlcmVuY2UgPSBjcmVhdGUoUmVmZXJlbmNlRXJyb3IpXG5mYXVsdC5zeW50YXggPSBjcmVhdGUoU3ludGF4RXJyb3IpXG5mYXVsdC50eXBlID0gY3JlYXRlKFR5cGVFcnJvcilcbmZhdWx0LnVyaSA9IGNyZWF0ZShVUklFcnJvcilcblxuZmF1bHQuY3JlYXRlID0gY3JlYXRlXG5cbi8vIENyZWF0ZSBhIG5ldyBgRUNvbnN0cnVjdG9yYCwgd2l0aCB0aGUgZm9ybWF0dGVkIGBmb3JtYXRgIGFzIGEgZmlyc3QgYXJndW1lbnQuXG5mdW5jdGlvbiBjcmVhdGUoRUNvbnN0cnVjdG9yKSB7XG4gIEZvcm1hdHRlZEVycm9yLmRpc3BsYXlOYW1lID0gRUNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IEVDb25zdHJ1Y3Rvci5uYW1lXG5cbiAgcmV0dXJuIEZvcm1hdHRlZEVycm9yXG5cbiAgZnVuY3Rpb24gRm9ybWF0dGVkRXJyb3IoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0dGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEVDb25zdHJ1Y3Rvcihmb3JtYXQpXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/fault/index.js\n");

/***/ })

};
;