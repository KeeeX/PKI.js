"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.regexp.to-string");require("core-js/modules/es7.symbol.async-iterator");require("core-js/modules/es6.symbol");require("core-js/modules/web.dom.iterable");require("core-js/modules/es6.array.iterator");require("core-js/modules/es6.object.keys");require("core-js/modules/es6.function.name");require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");require("core-js/modules/es6.promise");require("core-js/modules/es6.typed.uint8-array");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _common=require("./common.js");var _PublicKeyInfo=_interopRequireDefault(require("./PublicKeyInfo.js"));var _PrivateKeyInfo=_interopRequireDefault(require("./PrivateKeyInfo.js"));var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));var _EncryptedContentInfo=_interopRequireDefault(require("./EncryptedContentInfo.js"));var _RSASSAPSSParams=_interopRequireDefault(require("./RSASSAPSSParams.js"));var _PBKDF2Params=_interopRequireDefault(require("./PBKDF2Params.js"));var _PBES2Params=_interopRequireDefault(require("./PBES2Params.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}//**************************************************************************************
/**
 * Making MAC key using algorithm described in B.2 of PKCS#12 standard.
 */function makePKCS12B2Key(cryptoEngine,hashAlgorithm,keyLength,password,salt,iterationCount){//region Initial variables
var u;var v;var result=[];//endregion
//region Get "u" and "v" values
switch(hashAlgorithm.toUpperCase()){case"SHA-1":u=20;// 160
v=64;// 512
break;case"SHA-256":u=32;// 256
v=64;// 512
break;case"SHA-384":u=48;// 384
v=128;// 1024
break;case"SHA-512":u=64;// 512
v=128;// 1024
break;default:throw new Error("Unsupported hashing algorithm");}//endregion
//region Main algorithm making key
//region Transform password to UTF-8 like string
var passwordViewInitial=new Uint8Array(password);var passwordTransformed=new ArrayBuffer(password.byteLength*2+2);var passwordTransformedView=new Uint8Array(passwordTransformed);for(var i=0;i<passwordViewInitial.length;i++){passwordTransformedView[i*2]=0x00;passwordTransformedView[i*2+1]=passwordViewInitial[i];}passwordTransformedView[passwordTransformedView.length-2]=0x00;passwordTransformedView[passwordTransformedView.length-1]=0x00;password=passwordTransformed.slice(0);//endregion
//region Construct a string D (the "diversifier") by concatenating v/8 copies of ID
var D=new ArrayBuffer(v);var dView=new Uint8Array(D);for(var _i=0;_i<D.byteLength;_i++){dView[_i]=3;}// The ID value equal to "3" for MACing (see B.3 of standard)
//endregion
//region Concatenate copies of the salt together to create a string S of length v * ceil(s / v) bytes (the final copy of the salt may be trunacted to create S)
var saltLength=salt.byteLength;var sLen=v*Math.ceil(saltLength/v);var S=new ArrayBuffer(sLen);var sView=new Uint8Array(S);var saltView=new Uint8Array(salt);for(var _i2=0;_i2<sLen;_i2++){sView[_i2]=saltView[_i2%saltLength];}//endregion
//region Concatenate copies of the password together to create a string P of length v * ceil(p / v) bytes (the final copy of the password may be truncated to create P)
var passwordLength=password.byteLength;var pLen=v*Math.ceil(passwordLength/v);var P=new ArrayBuffer(pLen);var pView=new Uint8Array(P);var passwordView=new Uint8Array(password);for(var _i3=0;_i3<pLen;_i3++){pView[_i3]=passwordView[_i3%passwordLength];}//endregion
//region Set I=S||P to be the concatenation of S and P
var sPlusPLength=S.byteLength+P.byteLength;var I=new ArrayBuffer(sPlusPLength);var iView=new Uint8Array(I);iView.set(sView);iView.set(pView,sView.length);//endregion
//region Set c=ceil(n / u)
var c=Math.ceil((keyLength>>3)/u);//endregion
//region Initial variables
var internalSequence=Promise.resolve(I);//endregion
//region For i=1, 2, ..., c, do the following:
for(var _i4=0;_i4<=c;_i4++){internalSequence=internalSequence.then(function(_I){//region Create contecanetion of D and I
var dAndI=new ArrayBuffer(D.byteLength+_I.byteLength);var dAndIView=new Uint8Array(dAndI);dAndIView.set(dView);dAndIView.set(iView,dView.length);//endregion
return dAndI;});//region Make "iterationCount" rounds of hashing
for(var j=0;j<iterationCount;j++){internalSequence=internalSequence.then(function(roundBuffer){return cryptoEngine.digest({name:hashAlgorithm},new Uint8Array(roundBuffer));});}//endregion
internalSequence=internalSequence.then(function(roundBuffer){//region Concatenate copies of Ai to create a string B of length v bits (the final copy of Ai may be truncated to create B)
var B=new ArrayBuffer(v);var bView=new Uint8Array(B);for(var _j=0;_j<B.byteLength;_j++){bView[_j]=roundBuffer[_j%roundBuffer.length];}//endregion
//region Make new I value
var k=Math.ceil(saltLength/v)+Math.ceil(passwordLength/v);var iRound=[];var sliceStart=0;var sliceLength=v;for(var _j2=0;_j2<k;_j2++){var chunk=Array.from(new Uint8Array(I.slice(sliceStart,sliceStart+sliceLength)));sliceStart+=v;if(sliceStart+v>I.byteLength)sliceLength=I.byteLength-sliceStart;var x=0x1ff;for(var l=B.byteLength-1;l>=0;l--){x>>=8;x+=bView[l]+chunk[l];chunk[l]=x&0xff;}iRound.push.apply(iRound,_toConsumableArray(chunk));}I=new ArrayBuffer(iRound.length);iView=new Uint8Array(I);iView.set(iRound);//endregion
result.push.apply(result,_toConsumableArray(new Uint8Array(roundBuffer)));return I;});}//endregion
//region Initialize final key
internalSequence=internalSequence.then(function(){var resultBuffer=new ArrayBuffer(keyLength>>3);var resultView=new Uint8Array(resultBuffer);resultView.set(new Uint8Array(result).slice(0,keyLength>>3));return resultBuffer;});//endregion
//endregion
return internalSequence;}//**************************************************************************************
/**
 * Default cryptographic engine for Web Cryptography API
 */var CryptoEngine=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for CryptoEngine class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function CryptoEngine(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,CryptoEngine);//region Internal properties of the object
/**
		 * @type {Object}
		 * @desc Usually here we are expecting "window.crypto" or an equivalent from custom "crypto engine"
		 */this.crypto=(0,_pvutils.getParametersValue)(parameters,"crypto",{});/**
		 * @type {Object}
		 * @desc Usually here we are expecting "window.crypto.subtle" or an equivalent from custom "crypto engine"
		 */this.subtle=(0,_pvutils.getParametersValue)(parameters,"subtle",{});/**
		 * @type {string}
		 * @desc Name of the "crypto engine"
		 */this.name=(0,_pvutils.getParametersValue)(parameters,"name","");//endregion
}//**********************************************************************************
/**
	 * Import WebCrypto keys from different formats
	 * @param {string} format
	 * @param {ArrayBuffer|Uint8Array} keyData
	 * @param {Object} algorithm
	 * @param {boolean} extractable
	 * @param {Array} keyUsages
	 * @returns {Promise}
	 */_createClass(CryptoEngine,[{key:"importKey",value:function importKey(format,keyData,algorithm,extractable,keyUsages){var _this=this;//region Initial variables
var jwk={};//endregion
//region Change "keyData" type if needed
if(keyData instanceof Uint8Array)keyData=keyData.buffer;//endregion
switch(format.toLowerCase()){case"raw":return this.subtle.importKey("raw",keyData,algorithm,extractable,keyUsages);case"spki":{var asn1=asn1js.fromBER(keyData);if(asn1.offset===-1)return Promise.reject("Incorrect keyData");var publicKeyInfo=new _PublicKeyInfo.default();try{publicKeyInfo.fromSchema(asn1.result);}catch(ex){return Promise.reject("Incorrect keyData");}// noinspection FallThroughInSwitchStatementJS
switch(algorithm.name.toUpperCase()){case"RSA-PSS":{//region Get information about used hash function
switch(algorithm.hash.name.toUpperCase()){case"SHA-1":jwk.alg="PS1";break;case"SHA-256":jwk.alg="PS256";break;case"SHA-384":jwk.alg="PS384";break;case"SHA-512":jwk.alg="PS512";break;default:return Promise.reject("Incorrect hash algorithm: ".concat(algorithm.hash.name.toUpperCase()));}//endregion
}// break omitted
case"RSASSA-PKCS1-V1_5":{keyUsages=["verify"];// Override existing keyUsages value since the key is a public key
jwk.kty="RSA";jwk.ext=extractable;jwk.key_ops=keyUsages;if(publicKeyInfo.algorithm.algorithmId!=="1.2.840.113549.1.1.1")return Promise.reject("Incorrect public key algorithm: ".concat(publicKeyInfo.algorithm.algorithmId));//region Get information about used hash function
if("alg"in jwk===false){switch(algorithm.hash.name.toUpperCase()){case"SHA-1":jwk.alg="RS1";break;case"SHA-256":jwk.alg="RS256";break;case"SHA-384":jwk.alg="RS384";break;case"SHA-512":jwk.alg="RS512";break;default:return Promise.reject("Incorrect public key algorithm: ".concat(publicKeyInfo.algorithm.algorithmId));}}//endregion
//region Create RSA Public Key elements
var publicKeyJSON=publicKeyInfo.toJSON();var _arr=Object.keys(publicKeyJSON);for(var _i5=0;_i5<_arr.length;_i5++){var key=_arr[_i5];jwk[key]=publicKeyJSON[key];}//endregion
}break;case"ECDSA":keyUsages=["verify"];// Override existing keyUsages value since the key is a public key
// break omitted
case"ECDH":{//region Initial variables
jwk={kty:"EC",ext:extractable,key_ops:keyUsages};//endregion
//region Get information about algorithm
if(publicKeyInfo.algorithm.algorithmId!=="1.2.840.10045.2.1")return Promise.reject("Incorrect public key algorithm: ".concat(publicKeyInfo.algorithm.algorithmId));//endregion
//region Create ECDSA Public Key elements
var _publicKeyJSON=publicKeyInfo.toJSON();var _arr2=Object.keys(_publicKeyJSON);for(var _i6=0;_i6<_arr2.length;_i6++){var _key=_arr2[_i6];jwk[_key]=_publicKeyJSON[_key];}//endregion
}break;case"RSA-OAEP":{jwk.kty="RSA";jwk.ext=extractable;jwk.key_ops=keyUsages;if(this.name.toLowerCase()==="safari")jwk.alg="RSA-OAEP";else{switch(algorithm.hash.name.toUpperCase()){case"SHA-1":jwk.alg="RSA-OAEP";break;case"SHA-256":jwk.alg="RSA-OAEP-256";break;case"SHA-384":jwk.alg="RSA-OAEP-384";break;case"SHA-512":jwk.alg="RSA-OAEP-512";break;default:return Promise.reject("Incorrect public key algorithm: ".concat(publicKeyInfo.algorithm.algorithmId));}}//region Create ECDSA Public Key elements
var _publicKeyJSON2=publicKeyInfo.toJSON();var _arr3=Object.keys(_publicKeyJSON2);for(var _i7=0;_i7<_arr3.length;_i7++){var _key2=_arr3[_i7];jwk[_key2]=_publicKeyJSON2[_key2];}//endregion
}break;default:return Promise.reject("Incorrect algorithm name: ".concat(algorithm.name.toUpperCase()));}}break;case"pkcs8":{var privateKeyInfo=new _PrivateKeyInfo.default();//region Parse "PrivateKeyInfo" object
var _asn=asn1js.fromBER(keyData);if(_asn.offset===-1)return Promise.reject("Incorrect keyData");try{privateKeyInfo.fromSchema(_asn.result);}catch(ex){return Promise.reject("Incorrect keyData");}if("parsedKey"in privateKeyInfo===false)return Promise.reject("Incorrect keyData");//endregion
// noinspection FallThroughInSwitchStatementJS
// noinspection FallThroughInSwitchStatementJS
switch(algorithm.name.toUpperCase()){case"RSA-PSS":{//region Get information about used hash function
switch(algorithm.hash.name.toUpperCase()){case"SHA-1":jwk.alg="PS1";break;case"SHA-256":jwk.alg="PS256";break;case"SHA-384":jwk.alg="PS384";break;case"SHA-512":jwk.alg="PS512";break;default:return Promise.reject("Incorrect hash algorithm: ".concat(algorithm.hash.name.toUpperCase()));}//endregion
}// break omitted
case"RSASSA-PKCS1-V1_5":{keyUsages=["sign"];// Override existing keyUsages value since the key is a private key
jwk.kty="RSA";jwk.ext=extractable;jwk.key_ops=keyUsages;//region Get information about used hash function
if(privateKeyInfo.privateKeyAlgorithm.algorithmId!=="1.2.840.113549.1.1.1")return Promise.reject("Incorrect private key algorithm: ".concat(privateKeyInfo.privateKeyAlgorithm.algorithmId));//endregion
//region Get information about used hash function
if("alg"in jwk===false){switch(algorithm.hash.name.toUpperCase()){case"SHA-1":jwk.alg="RS1";break;case"SHA-256":jwk.alg="RS256";break;case"SHA-384":jwk.alg="RS384";break;case"SHA-512":jwk.alg="RS512";break;default:return Promise.reject("Incorrect hash algorithm: ".concat(algorithm.hash.name.toUpperCase()));}}//endregion
//region Create RSA Private Key elements
var privateKeyJSON=privateKeyInfo.toJSON();var _arr4=Object.keys(privateKeyJSON);for(var _i8=0;_i8<_arr4.length;_i8++){var _key3=_arr4[_i8];jwk[_key3]=privateKeyJSON[_key3];}//endregion
}break;case"ECDSA":keyUsages=["sign"];// Override existing keyUsages value since the key is a private key
// break omitted
case"ECDH":{//region Initial variables
jwk={kty:"EC",ext:extractable,key_ops:keyUsages};//endregion
//region Get information about used hash function
if(privateKeyInfo.privateKeyAlgorithm.algorithmId!=="1.2.840.10045.2.1")return Promise.reject("Incorrect algorithm: ".concat(privateKeyInfo.privateKeyAlgorithm.algorithmId));//endregion
//region Create ECDSA Private Key elements
var _privateKeyJSON=privateKeyInfo.toJSON();var _arr5=Object.keys(_privateKeyJSON);for(var _i9=0;_i9<_arr5.length;_i9++){var _key4=_arr5[_i9];jwk[_key4]=_privateKeyJSON[_key4];}//endregion
}break;case"RSA-OAEP":{jwk.kty="RSA";jwk.ext=extractable;jwk.key_ops=keyUsages;//region Get information about used hash function
if(this.name.toLowerCase()==="safari")jwk.alg="RSA-OAEP";else{switch(algorithm.hash.name.toUpperCase()){case"SHA-1":jwk.alg="RSA-OAEP";break;case"SHA-256":jwk.alg="RSA-OAEP-256";break;case"SHA-384":jwk.alg="RSA-OAEP-384";break;case"SHA-512":jwk.alg="RSA-OAEP-512";break;default:return Promise.reject("Incorrect hash algorithm: ".concat(algorithm.hash.name.toUpperCase()));}}//endregion
//region Create RSA Private Key elements
var _privateKeyJSON2=privateKeyInfo.toJSON();var _arr6=Object.keys(_privateKeyJSON2);for(var _i10=0;_i10<_arr6.length;_i10++){var _key5=_arr6[_i10];jwk[_key5]=_privateKeyJSON2[_key5];}//endregion
}break;default:return Promise.reject("Incorrect algorithm name: ".concat(algorithm.name.toUpperCase()));}}break;case"jwk":jwk=keyData;break;default:return Promise.reject("Incorrect format: ".concat(format));}//region Special case for Safari browser (since its acting not as WebCrypto standard describes)
if(this.name.toLowerCase()==="safari"){// Try to use both ways - import using ArrayBuffer and pure JWK (for Safari Technology Preview)
return Promise.resolve().then(function(){return _this.subtle.importKey("jwk",(0,_pvutils.stringToArrayBuffer)(JSON.stringify(jwk)),algorithm,extractable,keyUsages);}).then(function(result){return result;},function(){return _this.subtle.importKey("jwk",jwk,algorithm,extractable,keyUsages);});}//endregion
return this.subtle.importKey("jwk",jwk,algorithm,extractable,keyUsages);}//**********************************************************************************
/**
	 * Export WebCrypto keys to different formats
	 * @param {string} format
	 * @param {Object} key
	 * @returns {Promise}
	 */},{key:"exportKey",value:function exportKey(format,key){var sequence=this.subtle.exportKey("jwk",key);//region Currently Safari returns ArrayBuffer as JWK thus we need an additional transformation
if(this.name.toLowerCase()==="safari"){sequence=sequence.then(function(result){// Some additional checks for Safari Technology Preview
if(result instanceof ArrayBuffer)return JSON.parse((0,_pvutils.arrayBufferToString)(result));return result;});}//endregion
switch(format.toLowerCase()){case"raw":return this.subtle.exportKey("raw",key);case"spki":sequence=sequence.then(function(result){var publicKeyInfo=new _PublicKeyInfo.default();try{publicKeyInfo.fromJSON(result);}catch(ex){return Promise.reject("Incorrect key data");}return publicKeyInfo.toSchema().toBER(false);});break;case"pkcs8":sequence=sequence.then(function(result){var privateKeyInfo=new _PrivateKeyInfo.default();try{privateKeyInfo.fromJSON(result);}catch(ex){return Promise.reject("Incorrect key data");}return privateKeyInfo.toSchema().toBER(false);});break;case"jwk":break;default:return Promise.reject("Incorrect format: ".concat(format));}return sequence;}//**********************************************************************************
/**
	 * Convert WebCrypto keys between different export formats
	 * @param {string} inputFormat
	 * @param {string} outputFormat
	 * @param {ArrayBuffer|Object} keyData
	 * @param {Object} algorithm
	 * @param {boolean} extractable
	 * @param {Array} keyUsages
	 * @returns {Promise}
	 */},{key:"convert",value:function convert(inputFormat,outputFormat,keyData,algorithm,extractable,keyUsages){var _this2=this;switch(inputFormat.toLowerCase()){case"raw":switch(outputFormat.toLowerCase()){case"raw":return Promise.resolve(keyData);case"spki":return Promise.resolve().then(function(){return _this2.importKey("raw",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("spki",result);});case"pkcs8":return Promise.resolve().then(function(){return _this2.importKey("raw",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("pkcs8",result);});case"jwk":return Promise.resolve().then(function(){return _this2.importKey("raw",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("jwk",result);});default:return Promise.reject("Incorrect outputFormat: ".concat(outputFormat));}case"spki":switch(outputFormat.toLowerCase()){case"raw":return Promise.resolve().then(function(){return _this2.importKey("spki",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("raw",result);});case"spki":return Promise.resolve(keyData);case"pkcs8":return Promise.reject("Impossible to convert between SPKI/PKCS8");case"jwk":return Promise.resolve().then(function(){return _this2.importKey("spki",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("jwk",result);});default:return Promise.reject("Incorrect outputFormat: ".concat(outputFormat));}case"pkcs8":switch(outputFormat.toLowerCase()){case"raw":return Promise.resolve().then(function(){return _this2.importKey("pkcs8",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("raw",result);});case"spki":return Promise.reject("Impossible to convert between SPKI/PKCS8");case"pkcs8":return Promise.resolve(keyData);case"jwk":return Promise.resolve().then(function(){return _this2.importKey("pkcs8",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("jwk",result);});default:return Promise.reject("Incorrect outputFormat: ".concat(outputFormat));}case"jwk":switch(outputFormat.toLowerCase()){case"raw":return Promise.resolve().then(function(){return _this2.importKey("jwk",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("raw",result);});case"spki":return Promise.resolve().then(function(){return _this2.importKey("jwk",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("spki",result);});case"pkcs8":return Promise.resolve().then(function(){return _this2.importKey("jwk",keyData,algorithm,extractable,keyUsages);}).then(function(result){return _this2.exportKey("pkcs8",result);});case"jwk":return Promise.resolve(keyData);default:return Promise.reject("Incorrect outputFormat: ".concat(outputFormat));}default:return Promise.reject("Incorrect inputFormat: ".concat(inputFormat));}}//**********************************************************************************
/**
	 * Wrapper for standard function "encrypt"
	 * @param args
	 * @returns {Promise}
	 */},{key:"encrypt",value:function encrypt(){var _this$subtle;return(_this$subtle=this.subtle).encrypt.apply(_this$subtle,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "decrypt"
	 * @param args
	 * @returns {Promise}
	 */},{key:"decrypt",value:function decrypt(){var _this$subtle2;return(_this$subtle2=this.subtle).decrypt.apply(_this$subtle2,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "sign"
	 * @param args
	 * @returns {Promise}
	 */},{key:"sign",value:function sign(){var _this$subtle3;return(_this$subtle3=this.subtle).sign.apply(_this$subtle3,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "verify"
	 * @param args
	 * @returns {Promise}
	 */},{key:"verify",value:function verify(){var _this$subtle4;return(_this$subtle4=this.subtle).verify.apply(_this$subtle4,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "digest"
	 * @param args
	 * @returns {Promise}
	 */},{key:"digest",value:function digest(){var _this$subtle5;return(_this$subtle5=this.subtle).digest.apply(_this$subtle5,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "generateKey"
	 * @param args
	 * @returns {Promise}
	 */},{key:"generateKey",value:function generateKey(){var _this$subtle6;return(_this$subtle6=this.subtle).generateKey.apply(_this$subtle6,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "deriveKey"
	 * @param args
	 * @returns {Promise}
	 */},{key:"deriveKey",value:function deriveKey(){var _this$subtle7;return(_this$subtle7=this.subtle).deriveKey.apply(_this$subtle7,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "deriveBits"
	 * @param args
	 * @returns {Promise}
	 */},{key:"deriveBits",value:function deriveBits(){var _this$subtle8;return(_this$subtle8=this.subtle).deriveBits.apply(_this$subtle8,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "wrapKey"
	 * @param args
	 * @returns {Promise}
	 */},{key:"wrapKey",value:function wrapKey(){var _this$subtle9;return(_this$subtle9=this.subtle).wrapKey.apply(_this$subtle9,arguments);}//**********************************************************************************
/**
	 * Wrapper for standard function "unwrapKey"
	 * @param args
	 * @returns {Promise}
	 */},{key:"unwrapKey",value:function unwrapKey(){var _this$subtle10;return(_this$subtle10=this.subtle).unwrapKey.apply(_this$subtle10,arguments);}//**********************************************************************************
/**
	 * Initialize input Uint8Array by random values (with help from current "crypto engine")
	 * @param {!Uint8Array} view
	 * @returns {*}
	 */},{key:"getRandomValues",value:function getRandomValues(view){if("getRandomValues"in this.crypto===false)throw new Error("No support for getRandomValues");return this.crypto.getRandomValues(view);}//**********************************************************************************
/**
	 * Get WebCrypto algorithm by wel-known OID
	 * @param {string} oid well-known OID to search for
	 * @returns {Object}
	 */},{key:"getAlgorithmByOID",value:function getAlgorithmByOID(oid){switch(oid){case"1.2.840.113549.1.1.1":case"1.2.840.113549.1.1.5":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-1"}};case"1.2.840.113549.1.1.11":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"1.2.840.113549.1.1.12":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-384"}};case"1.2.840.113549.1.1.13":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-512"}};case"1.2.840.113549.1.1.10":return{name:"RSA-PSS"};case"1.2.840.113549.1.1.7":return{name:"RSA-OAEP"};case"1.2.840.10045.2.1":case"1.2.840.10045.4.1":return{name:"ECDSA",hash:{name:"SHA-1"}};case"1.2.840.10045.4.3.2":return{name:"ECDSA",hash:{name:"SHA-256"}};case"1.2.840.10045.4.3.3":return{name:"ECDSA",hash:{name:"SHA-384"}};case"1.2.840.10045.4.3.4":return{name:"ECDSA",hash:{name:"SHA-512"}};case"1.3.133.16.840.63.0.2":return{name:"ECDH",kdf:"SHA-1"};case"1.3.132.1.11.1":return{name:"ECDH",kdf:"SHA-256"};case"1.3.132.1.11.2":return{name:"ECDH",kdf:"SHA-384"};case"1.3.132.1.11.3":return{name:"ECDH",kdf:"SHA-512"};case"2.16.840.1.101.3.4.1.2":return{name:"AES-CBC",length:128};case"2.16.840.1.101.3.4.1.22":return{name:"AES-CBC",length:192};case"2.16.840.1.101.3.4.1.42":return{name:"AES-CBC",length:256};case"2.16.840.1.101.3.4.1.6":return{name:"AES-GCM",length:128};case"2.16.840.1.101.3.4.1.26":return{name:"AES-GCM",length:192};case"2.16.840.1.101.3.4.1.46":return{name:"AES-GCM",length:256};case"2.16.840.1.101.3.4.1.4":return{name:"AES-CFB",length:128};case"2.16.840.1.101.3.4.1.24":return{name:"AES-CFB",length:192};case"2.16.840.1.101.3.4.1.44":return{name:"AES-CFB",length:256};case"2.16.840.1.101.3.4.1.5":return{name:"AES-KW",length:128};case"2.16.840.1.101.3.4.1.25":return{name:"AES-KW",length:192};case"2.16.840.1.101.3.4.1.45":return{name:"AES-KW",length:256};case"1.2.840.113549.2.7":return{name:"HMAC",hash:{name:"SHA-1"}};case"1.2.840.113549.2.9":return{name:"HMAC",hash:{name:"SHA-256"}};case"1.2.840.113549.2.10":return{name:"HMAC",hash:{name:"SHA-384"}};case"1.2.840.113549.2.11":return{name:"HMAC",hash:{name:"SHA-512"}};case"1.2.840.113549.1.9.16.3.5":return{name:"DH"};case"1.3.14.3.2.26":return{name:"SHA-1"};case"2.16.840.1.101.3.4.2.1":return{name:"SHA-256"};case"2.16.840.1.101.3.4.2.2":return{name:"SHA-384"};case"2.16.840.1.101.3.4.2.3":return{name:"SHA-512"};case"1.2.840.113549.1.5.12":return{name:"PBKDF2"};//region Special case - OIDs for ECC curves
case"1.2.840.10045.3.1.7":return{name:"P-256"};case"1.3.132.0.34":return{name:"P-384"};case"1.3.132.0.35":return{name:"P-521"};//endregion
default:}return{};}//**********************************************************************************
/**
	 * Get OID for each specific algorithm
	 * @param {Object} algorithm
	 * @returns {string}
	 */},{key:"getOIDByAlgorithm",value:function getOIDByAlgorithm(algorithm){var result="";switch(algorithm.name.toUpperCase()){case"RSASSA-PKCS1-V1_5":switch(algorithm.hash.name.toUpperCase()){case"SHA-1":result="1.2.840.113549.1.1.5";break;case"SHA-256":result="1.2.840.113549.1.1.11";break;case"SHA-384":result="1.2.840.113549.1.1.12";break;case"SHA-512":result="1.2.840.113549.1.1.13";break;default:}break;case"RSA-PSS":result="1.2.840.113549.1.1.10";break;case"RSA-OAEP":result="1.2.840.113549.1.1.7";break;case"ECDSA":switch(algorithm.hash.name.toUpperCase()){case"SHA-1":result="1.2.840.10045.4.1";break;case"SHA-256":result="1.2.840.10045.4.3.2";break;case"SHA-384":result="1.2.840.10045.4.3.3";break;case"SHA-512":result="1.2.840.10045.4.3.4";break;default:}break;case"ECDH":switch(algorithm.kdf.toUpperCase()){// Non-standard addition - hash algorithm of KDF function
case"SHA-1":result="1.3.133.16.840.63.0.2";// dhSinglePass-stdDH-sha1kdf-scheme
break;case"SHA-256":result="1.3.132.1.11.1";// dhSinglePass-stdDH-sha256kdf-scheme
break;case"SHA-384":result="1.3.132.1.11.2";// dhSinglePass-stdDH-sha384kdf-scheme
break;case"SHA-512":result="1.3.132.1.11.3";// dhSinglePass-stdDH-sha512kdf-scheme
break;default:}break;case"AES-CTR":break;case"AES-CBC":switch(algorithm.length){case 128:result="2.16.840.1.101.3.4.1.2";break;case 192:result="2.16.840.1.101.3.4.1.22";break;case 256:result="2.16.840.1.101.3.4.1.42";break;default:}break;case"AES-CMAC":break;case"AES-GCM":switch(algorithm.length){case 128:result="2.16.840.1.101.3.4.1.6";break;case 192:result="2.16.840.1.101.3.4.1.26";break;case 256:result="2.16.840.1.101.3.4.1.46";break;default:}break;case"AES-CFB":switch(algorithm.length){case 128:result="2.16.840.1.101.3.4.1.4";break;case 192:result="2.16.840.1.101.3.4.1.24";break;case 256:result="2.16.840.1.101.3.4.1.44";break;default:}break;case"AES-KW":switch(algorithm.length){case 128:result="2.16.840.1.101.3.4.1.5";break;case 192:result="2.16.840.1.101.3.4.1.25";break;case 256:result="2.16.840.1.101.3.4.1.45";break;default:}break;case"HMAC":switch(algorithm.hash.name.toUpperCase()){case"SHA-1":result="1.2.840.113549.2.7";break;case"SHA-256":result="1.2.840.113549.2.9";break;case"SHA-384":result="1.2.840.113549.2.10";break;case"SHA-512":result="1.2.840.113549.2.11";break;default:}break;case"DH":result="1.2.840.113549.1.9.16.3.5";break;case"SHA-1":result="1.3.14.3.2.26";break;case"SHA-256":result="2.16.840.1.101.3.4.2.1";break;case"SHA-384":result="2.16.840.1.101.3.4.2.2";break;case"SHA-512":result="2.16.840.1.101.3.4.2.3";break;case"CONCAT":break;case"HKDF":break;case"PBKDF2":result="1.2.840.113549.1.5.12";break;//region Special case - OIDs for ECC curves
case"P-256":result="1.2.840.10045.3.1.7";break;case"P-384":result="1.3.132.0.34";break;case"P-521":result="1.3.132.0.35";break;//endregion
default:}return result;}//**********************************************************************************
/**
	 * Get default algorithm parameters for each kind of operation
	 * @param {string} algorithmName Algorithm name to get common parameters for
	 * @param {string} operation Kind of operation: "sign", "encrypt", "generatekey", "importkey", "exportkey", "verify"
	 * @returns {*}
	 */},{key:"getAlgorithmParameters",value:function getAlgorithmParameters(algorithmName,operation){var result={algorithm:{},usages:[]};switch(algorithmName.toUpperCase()){case"RSASSA-PKCS1-V1_5":switch(operation.toLowerCase()){case"generatekey":result={algorithm:{name:"RSASSA-PKCS1-v1_5",modulusLength:2048,publicExponent:new Uint8Array([0x01,0x00,0x01]),hash:{name:"SHA-256"}},usages:["sign","verify"]};break;case"verify":case"sign":case"importkey":result={algorithm:{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}},usages:["verify"]// For importKey("pkcs8") usage must be "sign" only
};break;case"exportkey":default:return{algorithm:{name:"RSASSA-PKCS1-v1_5"},usages:[]};}break;case"RSA-PSS":switch(operation.toLowerCase()){case"sign":case"verify":result={algorithm:{name:"RSA-PSS",hash:{name:"SHA-1"},saltLength:20},usages:["sign","verify"]};break;case"generatekey":result={algorithm:{name:"RSA-PSS",modulusLength:2048,publicExponent:new Uint8Array([0x01,0x00,0x01]),hash:{name:"SHA-1"}},usages:["sign","verify"]};break;case"importkey":result={algorithm:{name:"RSA-PSS",hash:{name:"SHA-1"}},usages:["verify"]// For importKey("pkcs8") usage must be "sign" only
};break;case"exportkey":default:return{algorithm:{name:"RSA-PSS"},usages:[]};}break;case"RSA-OAEP":switch(operation.toLowerCase()){case"encrypt":case"decrypt":result={algorithm:{name:"RSA-OAEP"},usages:["encrypt","decrypt"]};break;case"generatekey":result={algorithm:{name:"RSA-OAEP",modulusLength:2048,publicExponent:new Uint8Array([0x01,0x00,0x01]),hash:{name:"SHA-256"}},usages:["encrypt","decrypt","wrapKey","unwrapKey"]};break;case"importkey":result={algorithm:{name:"RSA-OAEP",hash:{name:"SHA-256"}},usages:["encrypt"]// encrypt for "spki" and decrypt for "pkcs8"
};break;case"exportkey":default:return{algorithm:{name:"RSA-OAEP"},usages:[]};}break;case"ECDSA":switch(operation.toLowerCase()){case"generatekey":result={algorithm:{name:"ECDSA",namedCurve:"P-256"},usages:["sign","verify"]};break;case"importkey":result={algorithm:{name:"ECDSA",namedCurve:"P-256"},usages:["verify"]// "sign" for "pkcs8"
};break;case"verify":case"sign":result={algorithm:{name:"ECDSA",hash:{name:"SHA-256"}},usages:["sign"]};break;default:return{algorithm:{name:"ECDSA"},usages:[]};}break;case"ECDH":switch(operation.toLowerCase()){case"exportkey":case"importkey":case"generatekey":result={algorithm:{name:"ECDH",namedCurve:"P-256"},usages:["deriveKey","deriveBits"]};break;case"derivekey":case"derivebits":result={algorithm:{name:"ECDH",namedCurve:"P-256",public:[]// Must be a "publicKey"
},usages:["encrypt","decrypt"]};break;default:return{algorithm:{name:"ECDH"},usages:[]};}break;case"AES-CTR":switch(operation.toLowerCase()){case"importkey":case"exportkey":case"generatekey":result={algorithm:{name:"AES-CTR",length:256},usages:["encrypt","decrypt","wrapKey","unwrapKey"]};break;case"decrypt":case"encrypt":result={algorithm:{name:"AES-CTR",counter:new Uint8Array(16),length:10},usages:["encrypt","decrypt","wrapKey","unwrapKey"]};break;default:return{algorithm:{name:"AES-CTR"},usages:[]};}break;case"AES-CBC":switch(operation.toLowerCase()){case"importkey":case"exportkey":case"generatekey":result={algorithm:{name:"AES-CBC",length:256},usages:["encrypt","decrypt","wrapKey","unwrapKey"]};break;case"decrypt":case"encrypt":result={algorithm:{name:"AES-CBC",iv:this.getRandomValues(new Uint8Array(16))// For "decrypt" the value should be replaced with value got on "encrypt" step
},usages:["encrypt","decrypt","wrapKey","unwrapKey"]};break;default:return{algorithm:{name:"AES-CBC"},usages:[]};}break;case"AES-GCM":switch(operation.toLowerCase()){case"importkey":case"exportkey":case"generatekey":result={algorithm:{name:"AES-GCM",length:256},usages:["encrypt","decrypt","wrapKey","unwrapKey"]};break;case"decrypt":case"encrypt":result={algorithm:{name:"AES-GCM",iv:this.getRandomValues(new Uint8Array(16))// For "decrypt" the value should be replaced with value got on "encrypt" step
},usages:["encrypt","decrypt","wrapKey","unwrapKey"]};break;default:return{algorithm:{name:"AES-GCM"},usages:[]};}break;case"AES-KW":switch(operation.toLowerCase()){case"importkey":case"exportkey":case"generatekey":case"wrapkey":case"unwrapkey":result={algorithm:{name:"AES-KW",length:256},usages:["wrapKey","unwrapKey"]};break;default:return{algorithm:{name:"AES-KW"},usages:[]};}break;case"HMAC":switch(operation.toLowerCase()){case"sign":case"verify":result={algorithm:{name:"HMAC"},usages:["sign","verify"]};break;case"importkey":case"exportkey":case"generatekey":result={algorithm:{name:"HMAC",length:32,hash:{name:"SHA-256"}},usages:["sign","verify"]};break;default:return{algorithm:{name:"HMAC"},usages:[]};}break;case"HKDF":switch(operation.toLowerCase()){case"derivekey":result={algorithm:{name:"HKDF",hash:"SHA-256",salt:new Uint8Array([]),info:new Uint8Array([])},usages:["encrypt","decrypt"]};break;default:return{algorithm:{name:"HKDF"},usages:[]};}break;case"PBKDF2":switch(operation.toLowerCase()){case"derivekey":result={algorithm:{name:"PBKDF2",hash:{name:"SHA-256"},salt:new Uint8Array([]),iterations:10000},usages:["encrypt","decrypt"]};break;default:return{algorithm:{name:"PBKDF2"},usages:[]};}break;default:}return result;}//**********************************************************************************
/**
	 * Getting hash algorithm by signature algorithm
	 * @param {AlgorithmIdentifier} signatureAlgorithm Signature algorithm
	 * @returns {string}
	 */},{key:"getHashAlgorithm",value:function getHashAlgorithm(signatureAlgorithm){var result="";switch(signatureAlgorithm.algorithmId){case"1.2.840.10045.4.1":// ecdsa-with-SHA1
case"1.2.840.113549.1.1.5":result="SHA-1";break;case"1.2.840.10045.4.3.2":// ecdsa-with-SHA256
case"1.2.840.113549.1.1.11":result="SHA-256";break;case"1.2.840.10045.4.3.3":// ecdsa-with-SHA384
case"1.2.840.113549.1.1.12":result="SHA-384";break;case"1.2.840.10045.4.3.4":// ecdsa-with-SHA512
case"1.2.840.113549.1.1.13":result="SHA-512";break;case"1.2.840.113549.1.1.10":// RSA-PSS
{try{var params=new _RSASSAPSSParams.default({schema:signatureAlgorithm.algorithmParams});if("hashAlgorithm"in params){var algorithm=this.getAlgorithmByOID(params.hashAlgorithm.algorithmId);if("name"in algorithm===false)return"";result=algorithm.name;}else result="SHA-1";}catch(ex){}}break;default:}return result;}//**********************************************************************************
/**
	 * Specialized function encrypting "EncryptedContentInfo" object using parameters
	 * @param {Object} parameters
	 * @returns {Promise}
	 */},{key:"encryptEncryptedContentInfo",value:function encryptEncryptedContentInfo(parameters){var _this3=this;//region Check for input parameters
if(parameters instanceof Object===false)return Promise.reject("Parameters must have type \"Object\"");if("password"in parameters===false)return Promise.reject("Absent mandatory parameter \"password\"");if("contentEncryptionAlgorithm"in parameters===false)return Promise.reject("Absent mandatory parameter \"contentEncryptionAlgorithm\"");if("hmacHashAlgorithm"in parameters===false)return Promise.reject("Absent mandatory parameter \"hmacHashAlgorithm\"");if("iterationCount"in parameters===false)return Promise.reject("Absent mandatory parameter \"iterationCount\"");if("contentToEncrypt"in parameters===false)return Promise.reject("Absent mandatory parameter \"contentToEncrypt\"");if("contentType"in parameters===false)return Promise.reject("Absent mandatory parameter \"contentType\"");var contentEncryptionOID=this.getOIDByAlgorithm(parameters.contentEncryptionAlgorithm);if(contentEncryptionOID==="")return Promise.reject("Wrong \"contentEncryptionAlgorithm\" value");var pbkdf2OID=this.getOIDByAlgorithm({name:"PBKDF2"});if(pbkdf2OID==="")return Promise.reject("Can not find OID for PBKDF2");var hmacOID=this.getOIDByAlgorithm({name:"HMAC",hash:{name:parameters.hmacHashAlgorithm}});if(hmacOID==="")return Promise.reject("Incorrect value for \"hmacHashAlgorithm\": ".concat(parameters.hmacHashAlgorithm));//endregion
//region Initial variables
var sequence=Promise.resolve();var ivBuffer=new ArrayBuffer(16);// For AES we need IV 16 bytes long
var ivView=new Uint8Array(ivBuffer);this.getRandomValues(ivView);var saltBuffer=new ArrayBuffer(64);var saltView=new Uint8Array(saltBuffer);this.getRandomValues(saltView);var contentView=new Uint8Array(parameters.contentToEncrypt);var pbkdf2Params=new _PBKDF2Params.default({salt:new asn1js.OctetString({valueHex:saltBuffer}),iterationCount:parameters.iterationCount,prf:new _AlgorithmIdentifier.default({algorithmId:hmacOID,algorithmParams:new asn1js.Null()})});//endregion
//region Derive PBKDF2 key from "password" buffer
sequence=sequence.then(function(){var passwordView=new Uint8Array(parameters.password);return _this3.importKey("raw",passwordView,"PBKDF2",false,["deriveKey"]);},function(error){return Promise.reject(error);});//endregion
//region Derive key for "contentEncryptionAlgorithm"
sequence=sequence.then(function(result){return _this3.deriveKey({name:"PBKDF2",hash:{name:parameters.hmacHashAlgorithm},salt:saltView,iterations:parameters.iterationCount},result,parameters.contentEncryptionAlgorithm,false,["encrypt"]);},function(error){return Promise.reject(error);});//endregion
//region Encrypt content
sequence=sequence.then(function(result){return _this3.encrypt({name:parameters.contentEncryptionAlgorithm.name,iv:ivView},result,contentView);},function(error){return Promise.reject(error);});//endregion
//region Store all parameters in EncryptedData object
sequence=sequence.then(function(result){var pbes2Parameters=new _PBES2Params.default({keyDerivationFunc:new _AlgorithmIdentifier.default({algorithmId:pbkdf2OID,algorithmParams:pbkdf2Params.toSchema()}),encryptionScheme:new _AlgorithmIdentifier.default({algorithmId:contentEncryptionOID,algorithmParams:new asn1js.OctetString({valueHex:ivBuffer})})});return new _EncryptedContentInfo.default({contentType:parameters.contentType,contentEncryptionAlgorithm:new _AlgorithmIdentifier.default({algorithmId:"1.2.840.113549.1.5.13",// pkcs5PBES2
algorithmParams:pbes2Parameters.toSchema()}),encryptedContent:new asn1js.OctetString({valueHex:result})});},function(error){return Promise.reject(error);});//endregion
return sequence;}//**********************************************************************************
/**
	 * Decrypt data stored in "EncryptedContentInfo" object using parameters
	 * @param parameters
	 * @return {Promise}
	 */},{key:"decryptEncryptedContentInfo",value:function decryptEncryptedContentInfo(parameters){var _this4=this;//region Check for input parameters
if(parameters instanceof Object===false)return Promise.reject("Parameters must have type \"Object\"");if("password"in parameters===false)return Promise.reject("Absent mandatory parameter \"password\"");if("encryptedContentInfo"in parameters===false)return Promise.reject("Absent mandatory parameter \"encryptedContentInfo\"");if(parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId!=="1.2.840.113549.1.5.13")// pkcs5PBES2
return Promise.reject("Unknown \"contentEncryptionAlgorithm\": ".concat(parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId));//endregion
//region Initial variables
var sequence=Promise.resolve();var pbes2Parameters;try{pbes2Parameters=new _PBES2Params.default({schema:parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmParams});}catch(ex){return Promise.reject("Incorrectly encoded \"pbes2Parameters\"");}var pbkdf2Params;try{pbkdf2Params=new _PBKDF2Params.default({schema:pbes2Parameters.keyDerivationFunc.algorithmParams});}catch(ex){return Promise.reject("Incorrectly encoded \"pbkdf2Params\"");}var contentEncryptionAlgorithm=this.getAlgorithmByOID(pbes2Parameters.encryptionScheme.algorithmId);if("name"in contentEncryptionAlgorithm===false)return Promise.reject("Incorrect OID for \"contentEncryptionAlgorithm\": ".concat(pbes2Parameters.encryptionScheme.algorithmId));var ivBuffer=pbes2Parameters.encryptionScheme.algorithmParams.valueBlock.valueHex;var ivView=new Uint8Array(ivBuffer);var saltBuffer=pbkdf2Params.salt.valueBlock.valueHex;var saltView=new Uint8Array(saltBuffer);var iterationCount=pbkdf2Params.iterationCount;var hmacHashAlgorithm="SHA-1";if("prf"in pbkdf2Params){var algorithm=this.getAlgorithmByOID(pbkdf2Params.prf.algorithmId);if("name"in algorithm===false)return Promise.reject("Incorrect OID for HMAC hash algorithm");hmacHashAlgorithm=algorithm.hash.name;}//endregion
//region Derive PBKDF2 key from "password" buffer
sequence=sequence.then(function(){return _this4.importKey("raw",parameters.password,"PBKDF2",false,["deriveKey"]);},function(error){return Promise.reject(error);});//endregion
//region Derive key for "contentEncryptionAlgorithm"
sequence=sequence.then(function(result){return _this4.deriveKey({name:"PBKDF2",hash:{name:hmacHashAlgorithm},salt:saltView,iterations:iterationCount},result,contentEncryptionAlgorithm,false,["decrypt"]);},function(error){return Promise.reject(error);});//endregion
//region Decrypt internal content using derived key
sequence=sequence.then(function(result){//region Create correct data block for decryption
var dataBuffer=new ArrayBuffer(0);if(parameters.encryptedContentInfo.encryptedContent.idBlock.isConstructed===false)dataBuffer=parameters.encryptedContentInfo.encryptedContent.valueBlock.valueHex;else{var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=parameters.encryptedContentInfo.encryptedContent.valueBlock.value[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var content=_step.value;dataBuffer=(0,_pvutils.utilConcatBuf)(dataBuffer,content.valueBlock.valueHex);}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}//endregion
return _this4.decrypt({name:contentEncryptionAlgorithm.name,iv:ivView},result,dataBuffer);},function(error){return Promise.reject(error);});//endregion
return sequence;}//**********************************************************************************
/**
	 * Stamping (signing) data using algorithm simular to HMAC
	 * @param {Object} parameters
	 * @return {Promise.<T>|Promise}
	 */},{key:"stampDataWithPassword",value:function stampDataWithPassword(parameters){var _this5=this;//region Check for input parameters
if(parameters instanceof Object===false)return Promise.reject("Parameters must have type \"Object\"");if("password"in parameters===false)return Promise.reject("Absent mandatory parameter \"password\"");if("hashAlgorithm"in parameters===false)return Promise.reject("Absent mandatory parameter \"hashAlgorithm\"");if("salt"in parameters===false)return Promise.reject("Absent mandatory parameter \"iterationCount\"");if("iterationCount"in parameters===false)return Promise.reject("Absent mandatory parameter \"salt\"");if("contentToStamp"in parameters===false)return Promise.reject("Absent mandatory parameter \"contentToStamp\"");//endregion
//region Choose correct length for HMAC key
var length;switch(parameters.hashAlgorithm.toLowerCase()){case"sha-1":length=160;break;case"sha-256":length=256;break;case"sha-384":length=384;break;case"sha-512":length=512;break;default:return Promise.reject("Incorrect \"parameters.hashAlgorithm\" parameter: ".concat(parameters.hashAlgorithm));}//endregion
//region Initial variables
var sequence=Promise.resolve();var hmacAlgorithm={name:"HMAC",length:length,hash:{name:parameters.hashAlgorithm}};//endregion
//region Create PKCS#12 key for integrity checking
sequence=sequence.then(function(){return makePKCS12B2Key(_this5,parameters.hashAlgorithm,length,parameters.password,parameters.salt,parameters.iterationCount);});//endregion
//region Import HMAC key
// noinspection JSCheckFunctionSignatures
sequence=sequence.then(function(result){return _this5.importKey("raw",new Uint8Array(result),hmacAlgorithm,false,["sign"]);});//endregion
//region Make signed HMAC value
sequence=sequence.then(function(result){return _this5.sign(hmacAlgorithm,result,new Uint8Array(parameters.contentToStamp));},function(error){return Promise.reject(error);});//endregion
return sequence;}//**********************************************************************************
},{key:"verifyDataStampedWithPassword",value:function verifyDataStampedWithPassword(parameters){var _this6=this;//region Check for input parameters
if(parameters instanceof Object===false)return Promise.reject("Parameters must have type \"Object\"");if("password"in parameters===false)return Promise.reject("Absent mandatory parameter \"password\"");if("hashAlgorithm"in parameters===false)return Promise.reject("Absent mandatory parameter \"hashAlgorithm\"");if("salt"in parameters===false)return Promise.reject("Absent mandatory parameter \"iterationCount\"");if("iterationCount"in parameters===false)return Promise.reject("Absent mandatory parameter \"salt\"");if("contentToVerify"in parameters===false)return Promise.reject("Absent mandatory parameter \"contentToVerify\"");if("signatureToVerify"in parameters===false)return Promise.reject("Absent mandatory parameter \"signatureToVerify\"");//endregion
//region Choose correct length for HMAC key
var length;switch(parameters.hashAlgorithm.toLowerCase()){case"sha-1":length=160;break;case"sha-256":length=256;break;case"sha-384":length=384;break;case"sha-512":length=512;break;default:return Promise.reject("Incorrect \"parameters.hashAlgorithm\" parameter: ".concat(parameters.hashAlgorithm));}//endregion
//region Initial variables
var sequence=Promise.resolve();var hmacAlgorithm={name:"HMAC",length:length,hash:{name:parameters.hashAlgorithm}};//endregion
//region Create PKCS#12 key for integrity checking
sequence=sequence.then(function(){return makePKCS12B2Key(_this6,parameters.hashAlgorithm,length,parameters.password,parameters.salt,parameters.iterationCount);});//endregion
//region Import HMAC key
// noinspection JSCheckFunctionSignatures
sequence=sequence.then(function(result){return _this6.importKey("raw",new Uint8Array(result),hmacAlgorithm,false,["verify"]);});//endregion
//region Make signed HMAC value
sequence=sequence.then(function(result){return _this6.verify(hmacAlgorithm,result,new Uint8Array(parameters.signatureToVerify),new Uint8Array(parameters.contentToVerify));},function(error){return Promise.reject(error);});//endregion
return sequence;}//**********************************************************************************
/**
	 * Get signature parameters by analyzing private key algorithm
	 * @param {Object} privateKey The private key user would like to use
	 * @param {string} [hashAlgorithm="SHA-1"] Hash algorithm user would like to use
	 * @return {Promise.<T>|Promise}
	 */},{key:"getSignatureParameters",value:function getSignatureParameters(privateKey){var hashAlgorithm=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"SHA-1";//region Check hashing algorithm
var oid=this.getOIDByAlgorithm({name:hashAlgorithm});if(oid==="")return Promise.reject("Unsupported hash algorithm: ".concat(hashAlgorithm));//endregion
//region Initial variables
var signatureAlgorithm=new _AlgorithmIdentifier.default();//endregion
//region Get a "default parameters" for current algorithm
var parameters=this.getAlgorithmParameters(privateKey.algorithm.name,"sign");parameters.algorithm.hash.name=hashAlgorithm;//endregion
//region Fill internal structures base on "privateKey" and "hashAlgorithm"
switch(privateKey.algorithm.name.toUpperCase()){case"RSASSA-PKCS1-V1_5":case"ECDSA":signatureAlgorithm.algorithmId=this.getOIDByAlgorithm(parameters.algorithm);break;case"RSA-PSS":{//region Set "saltLength" as a length (in octets) of hash function result
switch(hashAlgorithm.toUpperCase()){case"SHA-256":parameters.algorithm.saltLength=32;break;case"SHA-384":parameters.algorithm.saltLength=48;break;case"SHA-512":parameters.algorithm.saltLength=64;break;default:}//endregion
//region Fill "RSASSA_PSS_params" object
var paramsObject={};if(hashAlgorithm.toUpperCase()!=="SHA-1"){var hashAlgorithmOID=this.getOIDByAlgorithm({name:hashAlgorithm});if(hashAlgorithmOID==="")return Promise.reject("Unsupported hash algorithm: ".concat(hashAlgorithm));paramsObject.hashAlgorithm=new _AlgorithmIdentifier.default({algorithmId:hashAlgorithmOID,algorithmParams:new asn1js.Null()});paramsObject.maskGenAlgorithm=new _AlgorithmIdentifier.default({algorithmId:"1.2.840.113549.1.1.8",// MGF1
algorithmParams:paramsObject.hashAlgorithm.toSchema()});}if(parameters.algorithm.saltLength!==20)paramsObject.saltLength=parameters.algorithm.saltLength;var pssParameters=new _RSASSAPSSParams.default(paramsObject);//endregion
//region Automatically set signature algorithm
signatureAlgorithm.algorithmId="1.2.840.113549.1.1.10";signatureAlgorithm.algorithmParams=pssParameters.toSchema();//endregion
}break;default:return Promise.reject("Unsupported signature algorithm: ".concat(privateKey.algorithm.name));}//endregion
return Promise.resolve().then(function(){return{signatureAlgorithm:signatureAlgorithm,parameters:parameters};});}//**********************************************************************************
/**
	 * Sign data with pre-defined private key
	 * @param {ArrayBuffer} data Data to be signed
	 * @param {Object} privateKey Private key to use
	 * @param {Object} parameters Parameters for used algorithm
	 * @return {Promise.<T>|Promise}
	 */},{key:"signWithPrivateKey",value:function signWithPrivateKey(data,privateKey,parameters){return this.sign(parameters.algorithm,privateKey,new Uint8Array(data)).then(function(result){//region Special case for ECDSA algorithm
if(parameters.algorithm.name==="ECDSA")result=(0,_common.createCMSECDSASignature)(result);//endregion
return result;},function(error){return Promise.reject("Signing error: ".concat(error));});}//**********************************************************************************
},{key:"fillPublicKeyParameters",value:function fillPublicKeyParameters(publicKeyInfo,signatureAlgorithm){var parameters={};//region Find signer's hashing algorithm
var shaAlgorithm=this.getHashAlgorithm(signatureAlgorithm);if(shaAlgorithm==="")return Promise.reject("Unsupported signature algorithm: ".concat(signatureAlgorithm.algorithmId));//endregion
//region Get information about public key algorithm and default parameters for import
var algorithmId;if(signatureAlgorithm.algorithmId==="1.2.840.113549.1.1.10")algorithmId=signatureAlgorithm.algorithmId;else algorithmId=publicKeyInfo.algorithm.algorithmId;var algorithmObject=this.getAlgorithmByOID(algorithmId);if("name"in algorithmObject==="")return Promise.reject("Unsupported public key algorithm: ".concat(signatureAlgorithm.algorithmId));parameters.algorithm=this.getAlgorithmParameters(algorithmObject.name,"importkey");if("hash"in parameters.algorithm.algorithm)parameters.algorithm.algorithm.hash.name=shaAlgorithm;//region Special case for ECDSA
if(algorithmObject.name==="ECDSA"){//region Get information about named curve
var algorithmParamsChecked=false;if("algorithmParams"in publicKeyInfo.algorithm===true){if("idBlock"in publicKeyInfo.algorithm.algorithmParams){if(publicKeyInfo.algorithm.algorithmParams.idBlock.tagClass===1&&publicKeyInfo.algorithm.algorithmParams.idBlock.tagNumber===6)algorithmParamsChecked=true;}}if(algorithmParamsChecked===false)return Promise.reject("Incorrect type for ECDSA public key parameters");var curveObject=this.getAlgorithmByOID(publicKeyInfo.algorithm.algorithmParams.valueBlock.toString());if("name"in curveObject===false)return Promise.reject("Unsupported named curve algorithm: ".concat(publicKeyInfo.algorithm.algorithmParams.valueBlock.toString()));//endregion
parameters.algorithm.algorithm.namedCurve=curveObject.name;}//endregion
//endregion
return parameters;}//**********************************************************************************
},{key:"getPublicKey",value:function getPublicKey(publicKeyInfo,signatureAlgorithm){var parameters=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(parameters===null)parameters=this.fillPublicKeyParameters(publicKeyInfo,signatureAlgorithm);var publicKeyInfoSchema=publicKeyInfo.toSchema();var publicKeyInfoBuffer=publicKeyInfoSchema.toBER(false);var publicKeyInfoView=new Uint8Array(publicKeyInfoBuffer);return this.importKey("spki",publicKeyInfoView,parameters.algorithm.algorithm,true,parameters.algorithm.usages);}//**********************************************************************************
},{key:"verifyWithPublicKey",value:function verifyWithPublicKey(data,signature,publicKeyInfo,signatureAlgorithm){var _this7=this;var shaAlgorithm=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;//region Initial variables
var sequence=Promise.resolve();//endregion
//region Find signer's hashing algorithm
if(shaAlgorithm===null){shaAlgorithm=this.getHashAlgorithm(signatureAlgorithm);if(shaAlgorithm==="")return Promise.reject("Unsupported signature algorithm: ".concat(signatureAlgorithm.algorithmId));//region Import public key
sequence=sequence.then(function(){return _this7.getPublicKey(publicKeyInfo,signatureAlgorithm);});//endregion
}else{var parameters={};//region Get information about public key algorithm and default parameters for import
var algorithmId;if(signatureAlgorithm.algorithmId==="1.2.840.113549.1.1.10")algorithmId=signatureAlgorithm.algorithmId;else algorithmId=publicKeyInfo.algorithm.algorithmId;var algorithmObject=this.getAlgorithmByOID(algorithmId);if("name"in algorithmObject==="")return Promise.reject("Unsupported public key algorithm: ".concat(signatureAlgorithm.algorithmId));parameters.algorithm=this.getAlgorithmParameters(algorithmObject.name,"importkey");if("hash"in parameters.algorithm.algorithm)parameters.algorithm.algorithm.hash.name=shaAlgorithm;//region Special case for ECDSA
if(algorithmObject.name==="ECDSA"){//region Get information about named curve
var algorithmParamsChecked=false;if("algorithmParams"in publicKeyInfo.algorithm===true){if("idBlock"in publicKeyInfo.algorithm.algorithmParams){if(publicKeyInfo.algorithm.algorithmParams.idBlock.tagClass===1&&publicKeyInfo.algorithm.algorithmParams.idBlock.tagNumber===6)algorithmParamsChecked=true;}}if(algorithmParamsChecked===false)return Promise.reject("Incorrect type for ECDSA public key parameters");var curveObject=this.getAlgorithmByOID(publicKeyInfo.algorithm.algorithmParams.valueBlock.toString());if("name"in curveObject===false)return Promise.reject("Unsupported named curve algorithm: ".concat(publicKeyInfo.algorithm.algorithmParams.valueBlock.toString()));//endregion
parameters.algorithm.algorithm.namedCurve=curveObject.name;}//endregion
//endregion
//region Import public key
sequence=sequence.then(function(){return _this7.getPublicKey(publicKeyInfo,null,parameters);});//endregion
}//endregion
//region Verify signature
sequence=sequence.then(function(publicKey){//region Get default algorithm parameters for verification
var algorithm=_this7.getAlgorithmParameters(publicKey.algorithm.name,"verify");if("hash"in algorithm.algorithm)algorithm.algorithm.hash.name=shaAlgorithm;//endregion
//region Special case for ECDSA signatures
var signatureValue=signature.valueBlock.valueHex;if(publicKey.algorithm.name==="ECDSA"){var asn1=asn1js.fromBER(signatureValue);// noinspection JSCheckFunctionSignatures
signatureValue=(0,_common.createECDSASignatureFromCMS)(asn1.result);}//endregion
//region Special case for RSA-PSS
if(publicKey.algorithm.name==="RSA-PSS"){var pssParameters;try{pssParameters=new _RSASSAPSSParams.default({schema:signatureAlgorithm.algorithmParams});}catch(ex){return Promise.reject(ex);}if("saltLength"in pssParameters)algorithm.algorithm.saltLength=pssParameters.saltLength;else algorithm.algorithm.saltLength=20;var hashAlgo="SHA-1";if("hashAlgorithm"in pssParameters){var hashAlgorithm=_this7.getAlgorithmByOID(pssParameters.hashAlgorithm.algorithmId);if("name"in hashAlgorithm===false)return Promise.reject("Unrecognized hash algorithm: ".concat(pssParameters.hashAlgorithm.algorithmId));hashAlgo=hashAlgorithm.name;}algorithm.algorithm.hash.name=hashAlgo;}//endregion
return _this7.verify(algorithm.algorithm,publicKey,new Uint8Array(signatureValue),new Uint8Array(data));});//endregion
return sequence;}//**********************************************************************************
}]);return CryptoEngine;}();//**************************************************************************************
exports.default=CryptoEngine;
//# sourceMappingURL=CryptoEngine.js.map