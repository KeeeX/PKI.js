"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.setEngine=setEngine;exports.getEngine=getEngine;exports.getCrypto=getCrypto;exports.getRandomValues=getRandomValues;exports.getOIDByAlgorithm=getOIDByAlgorithm;exports.getAlgorithmParameters=getAlgorithmParameters;exports.createCMSECDSASignature=createCMSECDSASignature;exports.stringPrep=stringPrep;exports.createECDSASignatureFromCMS=createECDSASignatureFromCMS;exports.getAlgorithmByOID=getAlgorithmByOID;exports.getHashAlgorithm=getHashAlgorithm;exports.kdfWithCounter=kdfWithCounter;exports.kdf=kdf;require("core-js/modules/es7.symbol.async-iterator");require("core-js/modules/es6.symbol");require("core-js/modules/web.dom.iterable");require("core-js/modules/es6.array.iterator");require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.promise");require("core-js/modules/es6.typed.uint8-array");require("core-js/modules/es6.function.name");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _CryptoEngine=_interopRequireDefault(require("./CryptoEngine.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}//**************************************************************************************
//region Crypto engine related function
//**************************************************************************************
var engine={name:"none",crypto:null,subtle:null};//**************************************************************************************
function setEngine(name,crypto,subtle){//region We are in Node
// noinspection JSUnresolvedVariable
if(typeof process!=="undefined"&&"pid"in process&&typeof global!=="undefined"&&typeof window==="undefined"){// noinspection ES6ModulesDependencies, JSUnresolvedVariable
if(typeof global[process.pid]==="undefined"){// noinspection JSUnresolvedVariable
global[process.pid]={};}else{// noinspection JSUnresolvedVariable
if(_typeof(global[process.pid])!=="object"){// noinspection JSUnresolvedVariable
throw new Error("Name global.".concat(process.pid," already exists and it is not an object"));}}// noinspection JSUnresolvedVariable
if(typeof global[process.pid].pkijs==="undefined"){// noinspection JSUnresolvedVariable
global[process.pid].pkijs={};}else{// noinspection JSUnresolvedVariable
if(_typeof(global[process.pid].pkijs)!=="object"){// noinspection JSUnresolvedVariable
throw new Error("Name global.".concat(process.pid,".pkijs already exists and it is not an object"));}}// noinspection JSUnresolvedVariable
global[process.pid].pkijs.engine={name:name,crypto:crypto,subtle:subtle};}//endregion
//region We are in browser
else{engine={name:name,crypto:crypto,subtle:subtle};}//endregion
}//**************************************************************************************
function getEngine(){//region We are in Node
// noinspection JSUnresolvedVariable
if(typeof process!=="undefined"&&"pid"in process&&typeof global!=="undefined"&&typeof window==="undefined"){var _engine;try{// noinspection JSUnresolvedVariable
_engine=global[process.pid].pkijs.engine;}catch(ex){throw new Error("Please call \"setEngine\" before call to \"getEngine\"");}return _engine;}//endregion
return engine;}//**************************************************************************************
(function initCryptoEngine(){if(typeof self!=="undefined"){if("crypto"in self){var engineName="webcrypto";/**
			 * Standard crypto object
			 * @type {Object}
			 * @property {Object} [webkitSubtle] Subtle object from Apple
			 */var cryptoObject=self.crypto;var subtleObject;// Apple Safari support
if("webkitSubtle"in self.crypto){try{subtleObject=self.crypto.webkitSubtle;}catch(ex){subtleObject=self.crypto.subtle;}engineName="safari";}if("subtle"in self.crypto)subtleObject=self.crypto.subtle;if(typeof subtleObject==="undefined"){engine={name:engineName,crypto:cryptoObject,subtle:null};}else{engine={name:engineName,crypto:cryptoObject,subtle:new _CryptoEngine.default({name:engineName,crypto:self.crypto,subtle:subtleObject})};}}}setEngine(engine.name,engine.crypto,engine.subtle);})();//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of common functions
//**************************************************************************************
/**
 * Get crypto subtle from current "crypto engine" or "undefined"
 * @returns {({decrypt, deriveKey, digest, encrypt, exportKey, generateKey, importKey, sign, unwrapKey, verify, wrapKey}|null)}
 */function getCrypto(){var _engine=getEngine();if(_engine.subtle!==null)return _engine.subtle;return undefined;}//**************************************************************************************
/**
 * Initialize input Uint8Array by random values (with help from current "crypto engine")
 * @param {!Uint8Array} view
 * @returns {*}
 */function getRandomValues(view){return getEngine().subtle.getRandomValues(view);}//**************************************************************************************
/**
 * Get OID for each specific algorithm
 * @param {Object} algorithm
 * @returns {string}
 */function getOIDByAlgorithm(algorithm){return getEngine().subtle.getOIDByAlgorithm(algorithm);}//**************************************************************************************
/**
 * Get default algorithm parameters for each kind of operation
 * @param {string} algorithmName Algorithm name to get common parameters for
 * @param {string} operation Kind of operation: "sign", "encrypt", "generatekey", "importkey", "exportkey", "verify"
 * @returns {*}
 */function getAlgorithmParameters(algorithmName,operation){return getEngine().subtle.getAlgorithmParameters(algorithmName,operation);}//**************************************************************************************
/**
 * Create CMS ECDSA signature from WebCrypto ECDSA signature
 * @param {ArrayBuffer} signatureBuffer WebCrypto result of "sign" function
 * @returns {ArrayBuffer}
 */function createCMSECDSASignature(signatureBuffer){//region Initial check for correct length
if(signatureBuffer.byteLength%2!==0)return new ArrayBuffer(0);//endregion
//region Initial variables
var length=signatureBuffer.byteLength/2;// There are two equal parts inside incoming ArrayBuffer
var rBuffer=new ArrayBuffer(length);var rView=new Uint8Array(rBuffer);rView.set(new Uint8Array(signatureBuffer,0,length));var rInteger=new asn1js.Integer({valueHex:rBuffer});var sBuffer=new ArrayBuffer(length);var sView=new Uint8Array(sBuffer);sView.set(new Uint8Array(signatureBuffer,length,length));var sInteger=new asn1js.Integer({valueHex:sBuffer});//endregion
return new asn1js.Sequence({value:[rInteger.convertToDER(),sInteger.convertToDER()]}).toBER(false);}//**************************************************************************************
/**
 * String preparation function. In a future here will be realization of algorithm from RFC4518
 * @param {string} inputString JavaScript string. As soon as for each ASN.1 string type we have a specific transformation function here we will work with pure JavaScript string
 * @returns {string} Formated string
 */function stringPrep(inputString){//region Initial variables
var isSpace=false;var cuttedResult="";//endregion
var result=inputString.trim();// Trim input string
//region Change all sequence of SPACE down to SPACE char
for(var i=0;i<result.length;i++){if(result.charCodeAt(i)===32){if(isSpace===false)isSpace=true;}else{if(isSpace){cuttedResult+=" ";isSpace=false;}cuttedResult+=result[i];}}//endregion
return cuttedResult.toLowerCase();}//**************************************************************************************
/**
 * Create a single ArrayBuffer from CMS ECDSA signature
 * @param {Sequence} cmsSignature ASN.1 SEQUENCE contains CMS ECDSA signature
 * @returns {ArrayBuffer}
 */function createECDSASignatureFromCMS(cmsSignature){//region Check input variables
if(cmsSignature instanceof asn1js.Sequence===false)return new ArrayBuffer(0);if(cmsSignature.valueBlock.value.length!==2)return new ArrayBuffer(0);if(cmsSignature.valueBlock.value[0]instanceof asn1js.Integer===false)return new ArrayBuffer(0);if(cmsSignature.valueBlock.value[1]instanceof asn1js.Integer===false)return new ArrayBuffer(0);//endregion
var rValue=cmsSignature.valueBlock.value[0].convertFromDER();var sValue=cmsSignature.valueBlock.value[1].convertFromDER();//region Check the lengths of two parts are equal
switch(true){case rValue.valueBlock.valueHex.byteLength<sValue.valueBlock.valueHex.byteLength:{if(sValue.valueBlock.valueHex.byteLength-rValue.valueBlock.valueHex.byteLength!==1)throw new Error("Incorrect DER integer decoding");var correctedLength=sValue.valueBlock.valueHex.byteLength;var rValueView=new Uint8Array(rValue.valueBlock.valueHex);var rValueBufferCorrected=new ArrayBuffer(correctedLength);var rValueViewCorrected=new Uint8Array(rValueBufferCorrected);rValueViewCorrected.set(rValueView,1);rValueViewCorrected[0]=0x00;// In order to be sure we do not have any garbage here
return(0,_pvutils.utilConcatBuf)(rValueBufferCorrected,sValue.valueBlock.valueHex);}case rValue.valueBlock.valueHex.byteLength>sValue.valueBlock.valueHex.byteLength:{if(rValue.valueBlock.valueHex.byteLength-sValue.valueBlock.valueHex.byteLength!==1)throw new Error("Incorrect DER integer decoding");var _correctedLength=rValue.valueBlock.valueHex.byteLength;var sValueView=new Uint8Array(sValue.valueBlock.valueHex);var sValueBufferCorrected=new ArrayBuffer(_correctedLength);var sValueViewCorrected=new Uint8Array(sValueBufferCorrected);sValueViewCorrected.set(sValueView,1);sValueViewCorrected[0]=0x00;// In order to be sure we do not have any garbage here
return(0,_pvutils.utilConcatBuf)(rValue.valueBlock.valueHex,sValueBufferCorrected);}default:{//region In case we have equal length and the length is not even with 2
if(rValue.valueBlock.valueHex.byteLength%2){var _correctedLength2=rValue.valueBlock.valueHex.byteLength+1;var _rValueView=new Uint8Array(rValue.valueBlock.valueHex);var _rValueBufferCorrected=new ArrayBuffer(_correctedLength2);var _rValueViewCorrected=new Uint8Array(_rValueBufferCorrected);_rValueViewCorrected.set(_rValueView,1);_rValueViewCorrected[0]=0x00;// In order to be sure we do not have any garbage here
var _sValueView=new Uint8Array(sValue.valueBlock.valueHex);var _sValueBufferCorrected=new ArrayBuffer(_correctedLength2);var _sValueViewCorrected=new Uint8Array(_sValueBufferCorrected);_sValueViewCorrected.set(_sValueView,1);_sValueViewCorrected[0]=0x00;// In order to be sure we do not have any garbage here
return(0,_pvutils.utilConcatBuf)(_rValueBufferCorrected,_sValueBufferCorrected);}//endregion
}}//endregion
return(0,_pvutils.utilConcatBuf)(rValue.valueBlock.valueHex,sValue.valueBlock.valueHex);}//**************************************************************************************
/**
 * Get WebCrypto algorithm by wel-known OID
 * @param {string} oid well-known OID to search for
 * @returns {Object}
 */function getAlgorithmByOID(oid){return getEngine().subtle.getAlgorithmByOID(oid);}//**************************************************************************************
/**
 * Getting hash algorithm by signature algorithm
 * @param {AlgorithmIdentifier} signatureAlgorithm Signature algorithm
 * @returns {string}
 */function getHashAlgorithm(signatureAlgorithm){return getEngine().subtle.getHashAlgorithm(signatureAlgorithm);}//**************************************************************************************
/**
 * ANS X9.63 Key Derivation Function having a "Counter" as a parameter
 * @param {string} hashFunction Used hash function
 * @param {ArrayBuffer} Zbuffer ArrayBuffer containing ECDH shared secret to derive from
 * @param {number} Counter
 * @param {ArrayBuffer} SharedInfo Usually DER encoded "ECC_CMS_SharedInfo" structure
 */function kdfWithCounter(hashFunction,Zbuffer,Counter,SharedInfo){//region Check of input parameters
switch(hashFunction.toUpperCase()){case"SHA-1":case"SHA-256":case"SHA-384":case"SHA-512":break;default:return Promise.reject("Unknown hash function: ".concat(hashFunction));}if(Zbuffer instanceof ArrayBuffer===false)return Promise.reject("Please set \"Zbuffer\" as \"ArrayBuffer\"");if(Zbuffer.byteLength===0)return Promise.reject("\"Zbuffer\" has zero length, error");if(SharedInfo instanceof ArrayBuffer===false)return Promise.reject("Please set \"SharedInfo\" as \"ArrayBuffer\"");if(Counter>255)return Promise.reject("Please set \"Counter\" variable to value less or equal to 255");//endregion
//region Initial variables
var counterBuffer=new ArrayBuffer(4);var counterView=new Uint8Array(counterBuffer);counterView[0]=0x00;counterView[1]=0x00;counterView[2]=0x00;counterView[3]=Counter;var combinedBuffer=new ArrayBuffer(0);//endregion
//region Get a "crypto" extension
var crypto=getCrypto();if(typeof crypto==="undefined")return Promise.reject("Unable to create WebCrypto object");//endregion
//region Create a combined ArrayBuffer for digesting
combinedBuffer=(0,_pvutils.utilConcatBuf)(combinedBuffer,Zbuffer);combinedBuffer=(0,_pvutils.utilConcatBuf)(combinedBuffer,counterBuffer);combinedBuffer=(0,_pvutils.utilConcatBuf)(combinedBuffer,SharedInfo);//endregion
//region Return digest of combined ArrayBuffer and information about current counter
return crypto.digest({name:hashFunction},combinedBuffer).then(function(result){return{counter:Counter,result:result};});//endregion
}//**************************************************************************************
/**
 * ANS X9.63 Key Derivation Function
 * @param {string} hashFunction Used hash function
 * @param {ArrayBuffer} Zbuffer ArrayBuffer containing ECDH shared secret to derive from
 * @param {number} keydatalen Length (!!! in BITS !!!) of used kew derivation function
 * @param {ArrayBuffer} SharedInfo Usually DER encoded "ECC_CMS_SharedInfo" structure
 */function kdf(hashFunction,Zbuffer,keydatalen,SharedInfo){//region Initial variables
var hashLength=0;var maxCounter=1;var kdfArray=[];//endregion
//region Check of input parameters
switch(hashFunction.toUpperCase()){case"SHA-1":hashLength=160;// In bits
break;case"SHA-256":hashLength=256;// In bits
break;case"SHA-384":hashLength=384;// In bits
break;case"SHA-512":hashLength=512;// In bits
break;default:return Promise.reject("Unknown hash function: ".concat(hashFunction));}if(Zbuffer instanceof ArrayBuffer===false)return Promise.reject("Please set \"Zbuffer\" as \"ArrayBuffer\"");if(Zbuffer.byteLength===0)return Promise.reject("\"Zbuffer\" has zero length, error");if(SharedInfo instanceof ArrayBuffer===false)return Promise.reject("Please set \"SharedInfo\" as \"ArrayBuffer\"");//endregion
//region Calculated maximum value of "Counter" variable
var quotient=keydatalen/hashLength;if(Math.floor(quotient)>0){maxCounter=Math.floor(quotient);if(quotient-maxCounter>0)maxCounter++;}//endregion
//region Create an array of "kdfWithCounter"
for(var i=1;i<=maxCounter;i++){kdfArray.push(kdfWithCounter(hashFunction,Zbuffer,i,SharedInfo));}//endregion
//region Return combined digest with specified length
return Promise.all(kdfArray).then(function(incomingResult){//region Initial variables
var combinedBuffer=new ArrayBuffer(0);var currentCounter=1;var found=true;//endregion
//region Combine all buffer together
while(found){found=false;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=incomingResult[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var result=_step.value;if(result.counter===currentCounter){combinedBuffer=(0,_pvutils.utilConcatBuf)(combinedBuffer,result.result);found=true;break;}}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}currentCounter++;}//endregion
//region Create output buffer with specified length
keydatalen>>=3;// Divide by 8 since "keydatalen" is in bits
if(combinedBuffer.byteLength>keydatalen){var newBuffer=new ArrayBuffer(keydatalen);var newView=new Uint8Array(newBuffer);var combinedView=new Uint8Array(combinedBuffer);for(var _i=0;_i<keydatalen;_i++){newView[_i]=combinedView[_i];}return newBuffer;}return combinedBuffer;// Since the situation when "combinedBuffer.byteLength < keydatalen" here we have only "combinedBuffer.byteLength === keydatalen"
//endregion
});//endregion
}//**************************************************************************************
//endregion
//**************************************************************************************
//# sourceMappingURL=common.js.map