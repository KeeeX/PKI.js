"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.array.iterator");require("core-js/modules/es6.object.keys");require("core-js/modules/es7.symbol.async-iterator");require("core-js/modules/es6.symbol");require("core-js/modules/web.dom.iterable");require("core-js/modules/es6.function.name");require("core-js/modules/es6.typed.uint8-array");require("core-js/modules/es6.promise");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _common=require("./common.js");var _ContentInfo=_interopRequireDefault(require("./ContentInfo.js"));var _MacData=_interopRequireDefault(require("./MacData.js"));var _DigestInfo=_interopRequireDefault(require("./DigestInfo.js"));var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));var _SignedData=_interopRequireDefault(require("./SignedData.js"));var _EncapsulatedContentInfo=_interopRequireDefault(require("./EncapsulatedContentInfo.js"));var _Attribute=_interopRequireDefault(require("./Attribute.js"));var _SignerInfo=_interopRequireDefault(require("./SignerInfo.js"));var _IssuerAndSerialNumber=_interopRequireDefault(require("./IssuerAndSerialNumber.js"));var _SignedAndUnsignedAttributes=_interopRequireDefault(require("./SignedAndUnsignedAttributes.js"));var _AuthenticatedSafe=_interopRequireDefault(require("./AuthenticatedSafe.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC7292
 */var PFX=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PFX class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PFX(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PFX);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",PFX.defaultValues("version"));/**
		 * @type {ContentInfo}
		 * @desc authSafe
		 */this.authSafe=(0,_pvutils.getParametersValue)(parameters,"authSafe",PFX.defaultValues("authSafe"));if("macData"in parameters)/**
			 * @type {MacData}
			 * @desc macData
			 */this.macData=(0,_pvutils.getParametersValue)(parameters,"macData",PFX.defaultValues("macData"));if("parsedValue"in parameters)/**
			 * @type {*}
			 * @desc parsedValue
			 */this.parsedValue=(0,_pvutils.getParametersValue)(parameters,"parsedValue",PFX.defaultValues("parsedValue"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PFX,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["version","authSafe","macData"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PFX.schema({names:{version:"version",authSafe:{names:{blockName:"authSafe"}},macData:{names:{blockName:"macData"}}}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PFX");//endregion
//region Get internal properties from parsed schema
this.version=asn1.result.version.valueBlock.valueDec;this.authSafe=new _ContentInfo.default({schema:asn1.result.authSafe});if("macData"in asn1.result)this.macData=new _MacData.default({schema:asn1.result.macData});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
var outputArray=[new asn1js.Integer({value:this.version}),this.authSafe.toSchema()];if("macData"in this)outputArray.push(this.macData.toSchema());return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var output={version:this.version,authSafe:this.authSafe.toJSON()};if("macData"in this)output.macData=this.macData.toJSON();return output;}//**********************************************************************************
/**
	 * Making ContentInfo from "parsedValue" object
	 * @param {Object} parameters Parameters, specific to each "integrity mode"
	 */},{key:"makeInternalValues",value:function makeInternalValues(){var _this=this;var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};//region Check mandatory parameter
if(parameters instanceof Object===false)return Promise.reject("The \"parameters\" must has \"Object\" type");if("parsedValue"in this===false)return Promise.reject("Please call \"parseValues\" function first in order to make \"parsedValue\" data");if("integrityMode"in this.parsedValue===false)return Promise.reject("Absent mandatory parameter \"integrityMode\" inside \"parsedValue\"");//endregion
//region Initial variables
var sequence=Promise.resolve();//endregion
//region Get a "crypto" extension
var crypto=(0,_common.getCrypto)();if(typeof crypto==="undefined")return Promise.reject("Unable to create WebCrypto object");//endregion
//region Makes values for each particular integrity mode
//region Check that we do have neccessary fields in "parsedValue" object
if("authenticatedSafe"in this.parsedValue===false)return Promise.reject("Absent mandatory parameter \"authenticatedSafe\" in \"parsedValue\"");//endregion
switch(this.parsedValue.integrityMode){//region HMAC-based integrity
case 0:{//region Check additional mandatory parameters
if("iterations"in parameters===false)return Promise.reject("Absent mandatory parameter \"iterations\"");if("pbkdf2HashAlgorithm"in parameters===false)return Promise.reject("Absent mandatory parameter \"pbkdf2HashAlgorithm\"");if("hmacHashAlgorithm"in parameters===false)return Promise.reject("Absent mandatory parameter \"hmacHashAlgorithm\"");if("password"in parameters===false)return Promise.reject("Absent mandatory parameter \"password\"");//endregion
//region Initial variables
var saltBuffer=new ArrayBuffer(64);var saltView=new Uint8Array(saltBuffer);(0,_common.getRandomValues)(saltView);var data=this.parsedValue.authenticatedSafe.toSchema().toBER(false);this.authSafe=new _ContentInfo.default({contentType:"1.2.840.113549.1.7.1",content:new asn1js.OctetString({valueHex:data})});//endregion
//region Call current crypto engine for making HMAC-based data stamp
var engine=(0,_common.getEngine)();if("stampDataWithPassword"in engine.subtle===false)return Promise.reject("No support for \"stampDataWithPassword\" in current engine \"".concat(engine.name,"\""));sequence=sequence.then(function(){return engine.subtle.stampDataWithPassword({password:parameters.password,hashAlgorithm:parameters.hmacHashAlgorithm,salt:saltBuffer,iterationCount:parameters.iterations,contentToStamp:data});});//endregion
//region Make "MacData" values
sequence=sequence.then(function(result){_this.macData=new _MacData.default({mac:new _DigestInfo.default({digestAlgorithm:new _AlgorithmIdentifier.default({algorithmId:(0,_common.getOIDByAlgorithm)({name:parameters.hmacHashAlgorithm})}),digest:new asn1js.OctetString({valueHex:result})}),macSalt:new asn1js.OctetString({valueHex:saltBuffer}),iterations:parameters.iterations});},function(error){return Promise.reject(error);});//endregion
//endregion
}break;//endregion
//region publicKey-based integrity
case 1:{//region Check additional mandatory parameters
if("signingCertificate"in parameters===false)return Promise.reject("Absent mandatory parameter \"signingCertificate\"");if("privateKey"in parameters===false)return Promise.reject("Absent mandatory parameter \"privateKey\"");if("hashAlgorithm"in parameters===false)return Promise.reject("Absent mandatory parameter \"hashAlgorithm\"");//endregion
//region Making data to be signed
// NOTE: all internal data for "authenticatedSafe" must be already prepared.
// Thus user must call "makeValues" for all internal "SafeContent" value with appropriate parameters.
// Or user can choose to use values from initial parsing of existing PKCS#12 data.
var toBeSigned=this.parsedValue.authenticatedSafe.toSchema().toBER(false);//endregion
//region Initial variables
var cmsSigned=new _SignedData.default({version:1,encapContentInfo:new _EncapsulatedContentInfo.default({eContentType:"1.2.840.113549.1.7.1",// "data" content type
eContent:new asn1js.OctetString({valueHex:toBeSigned})}),certificates:[parameters.signingCertificate]});//endregion
//region Making additional attributes for CMS Signed Data
//region Create a message digest
sequence=sequence.then(function(){return crypto.digest({name:parameters.hashAlgorithm},new Uint8Array(toBeSigned));});//endregion
//region Combine all signed extensions
sequence=sequence.then(function(result){//region Initial variables
var signedAttr=[];//endregion
//region contentType
signedAttr.push(new _Attribute.default({type:"1.2.840.113549.1.9.3",values:[new asn1js.ObjectIdentifier({value:"1.2.840.113549.1.7.1"})]}));//endregion
//region signingTime
signedAttr.push(new _Attribute.default({type:"1.2.840.113549.1.9.5",values:[new asn1js.UTCTime({valueDate:new Date()})]}));//endregion
//region messageDigest
signedAttr.push(new _Attribute.default({type:"1.2.840.113549.1.9.4",values:[new asn1js.OctetString({valueHex:result})]}));//endregion
//region Making final value for "SignerInfo" type
cmsSigned.signerInfos.push(new _SignerInfo.default({version:1,sid:new _IssuerAndSerialNumber.default({issuer:parameters.signingCertificate.issuer,serialNumber:parameters.signingCertificate.serialNumber}),signedAttrs:new _SignedAndUnsignedAttributes.default({type:0,attributes:signedAttr})}));//endregion
},function(error){return Promise.reject("Error during making digest for message: ".concat(error));});//endregion
//endregion
//region Signing CMS Signed Data
sequence=sequence.then(function(){return cmsSigned.sign(parameters.privateKey,0,parameters.hashAlgorithm);});//endregion
//region Making final CMS_CONTENT_INFO type
sequence=sequence.then(function(){_this.authSafe=new _ContentInfo.default({contentType:"1.2.840.113549.1.7.2",content:cmsSigned.toSchema(true)});},function(error){return Promise.reject("Error during making signature: ".concat(error));});//endregion
}break;//endregion
//region default
default:return Promise.reject("Parameter \"integrityMode\" has unknown value: ".concat(parameters.integrityMode));//endregion
}//endregion
return sequence;}//**********************************************************************************
},{key:"parseInternalValues",value:function parseInternalValues(parameters){var _this2=this;//region Check input data from "parameters" 
if(parameters instanceof Object===false)return Promise.reject("The \"parameters\" must has \"Object\" type");if("checkIntegrity"in parameters===false)parameters.checkIntegrity=true;//endregion 
//region Initial variables 
var sequence=Promise.resolve();//endregion 
//region Get a "crypto" extension 
var crypto=(0,_common.getCrypto)();if(typeof crypto==="undefined")return Promise.reject("Unable to create WebCrypto object");//endregion 
//region Create value for "this.parsedValue.authenticatedSafe" and check integrity 
this.parsedValue={};switch(this.authSafe.contentType){//region data 
case"1.2.840.113549.1.7.1":{//region Check additional mandatory parameters
if("password"in parameters===false)return Promise.reject("Absent mandatory parameter \"password\"");//endregion
//region Integrity based on HMAC
this.parsedValue.integrityMode=0;//endregion
//region Check that we do have OCTETSTRING as "content"
if(this.authSafe.content instanceof asn1js.OctetString===false)return Promise.reject("Wrong type of \"this.authSafe.content\"");//endregion
//region Check we have "constructive encoding" for AuthSafe content
var authSafeContent=new ArrayBuffer(0);if(this.authSafe.content.valueBlock.isConstructed){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.authSafe.content.valueBlock.value[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var contentValue=_step.value;authSafeContent=(0,_pvutils.utilConcatBuf)(authSafeContent,contentValue.valueBlock.valueHex);}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}else authSafeContent=this.authSafe.content.valueBlock.valueHex;//endregion
//region Parse internal ASN.1 data
var asn1=asn1js.fromBER(authSafeContent);if(asn1.offset===-1)return Promise.reject("Error during parsing of ASN.1 data inside \"this.authSafe.content\"");//endregion
//region Set "authenticatedSafe" value
this.parsedValue.authenticatedSafe=new _AuthenticatedSafe.default({schema:asn1.result});//endregion
//region Check integrity
if(parameters.checkIntegrity){//region Check that "MacData" exists
if("macData"in this===false)return Promise.reject("Absent \"macData\" value, can not check PKCS#12 data integrity");//endregion
//region Initial variables
var hashAlgorithm=(0,_common.getAlgorithmByOID)(this.macData.mac.digestAlgorithm.algorithmId);if("name"in hashAlgorithm===false)return Promise.reject("Unsupported digest algorithm: ".concat(this.macData.mac.digestAlgorithm.algorithmId));//endregion
//region Call current crypto engine for verifying HMAC-based data stamp
var engine=(0,_common.getEngine)();sequence=sequence.then(function(){return engine.subtle.verifyDataStampedWithPassword({password:parameters.password,hashAlgorithm:hashAlgorithm.name,salt:_this2.macData.macSalt.valueBlock.valueHex,iterationCount:_this2.macData.iterations,contentToVerify:authSafeContent,signatureToVerify:_this2.macData.mac.digest.valueBlock.valueHex});});//endregion
//region Verify HMAC signature
sequence=sequence.then(function(result){if(result===false)return Promise.reject("Integrity for the PKCS#12 data is broken!");return Promise.resolve();},function(error){return Promise.reject(error);});//endregion
}//endregion
}break;//endregion 
//region signedData 
case"1.2.840.113549.1.7.2":{//region Integrity based on signature using public key
this.parsedValue.integrityMode=1;//endregion
//region Parse CMS Signed Data
var cmsSigned=new _SignedData.default({schema:this.authSafe.content});//endregion
//region Check that we do have OCTETSTRING as "content"
if("eContent"in cmsSigned.encapContentInfo===false)return Promise.reject("Absent of attached data in \"cmsSigned.encapContentInfo\"");if(cmsSigned.encapContentInfo.eContent instanceof asn1js.OctetString===false)return Promise.reject("Wrong type of \"cmsSigned.encapContentInfo.eContent\"");//endregion
//region Create correct data block for verification
var data=new ArrayBuffer(0);if(cmsSigned.encapContentInfo.eContent.idBlock.isConstructed===false)data=cmsSigned.encapContentInfo.eContent.valueBlock.valueHex;else{for(var i=0;i<cmsSigned.encapContentInfo.eContent.valueBlock.value.length;i++){data=(0,_pvutils.utilConcatBuf)(data,cmsSigned.encapContentInfo.eContent.valueBlock.value[i].valueBlock.valueHex);}}//endregion
//region Parse internal ASN.1 data
var _asn=asn1js.fromBER(data);if(_asn.offset===-1)return Promise.reject("Error during parsing of ASN.1 data inside \"this.authSafe.content\"");//endregion
//region Set "authenticatedSafe" value
this.parsedValue.authenticatedSafe=new _AuthenticatedSafe.default({schema:_asn.result});//endregion
//region Check integrity
sequence=sequence.then(function(){return cmsSigned.verify({signer:0,checkChain:false});}).then(function(result){if(result===false)return Promise.reject("Integrity for the PKCS#12 data is broken!");return Promise.resolve();},function(error){return Promise.reject("Error during integrity verification: ".concat(error));});//endregion
}break;//endregion   
//region default 
default:return Promise.reject("Incorrect value for \"this.authSafe.contentType\": ".concat(this.authSafe.contentType));//endregion 
}//endregion 
//region Return result of the function 
return sequence.then(function(){return _this2;},function(error){return Promise.reject("Error during parsing: ".concat(error));});//endregion   
}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"version":return 3;case"authSafe":return new _ContentInfo.default();case"macData":return new _MacData.default();case"parsedValue":return{};default:throw new Error("Invalid member name for PFX class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"version":return memberValue===PFX.defaultValues(memberName);case"authSafe":return _ContentInfo.default.compareWithDefault("contentType",memberValue.contentType)&&_ContentInfo.default.compareWithDefault("content",memberValue.content);case"macData":return _MacData.default.compareWithDefault("mac",memberValue.mac)&&_MacData.default.compareWithDefault("macSalt",memberValue.macSalt)&&_MacData.default.compareWithDefault("iterations",memberValue.iterations);case"parsedValue":return memberValue instanceof Object&&Object.keys(memberValue).length===0;default:throw new Error("Invalid member name for PFX class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PFX ::= SEQUENCE {
	 *    version		INTEGER {v3(3)}(v3,...),
	 *    authSafe	ContentInfo,
	 *    macData    	MacData OPTIONAL
	 * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [version]
		 * @property {string} [authSafe]
		 * @property {string} [macData]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Integer({name:names.version||"version"}),_ContentInfo.default.schema(names.authSafe||{names:{blockName:"authSafe"}}),_MacData.default.schema(names.macData||{names:{blockName:"macData",optional:true}})]});}}]);return PFX;}();//**************************************************************************************
exports.default=PFX;
//# sourceMappingURL=PFX.js.map