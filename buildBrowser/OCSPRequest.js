"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _common=require("./common.js");var _TBSRequest=_interopRequireDefault(require("./TBSRequest.js"));var _Signature=_interopRequireDefault(require("./Signature.js"));var _Request=_interopRequireDefault(require("./Request.js"));var _CertID=_interopRequireDefault(require("./CertID.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC6960
 */var OCSPRequest=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for OCSPRequest class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function OCSPRequest(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,OCSPRequest);//region Internal properties of the object
/**
		 * @type {TBSRequest}
		 * @desc tbsRequest
		 */this.tbsRequest=(0,_pvutils.getParametersValue)(parameters,"tbsRequest",OCSPRequest.defaultValues("tbsRequest"));if("optionalSignature"in parameters)/**
			 * @type {Signature}
			 * @desc optionalSignature
			 */this.optionalSignature=(0,_pvutils.getParametersValue)(parameters,"optionalSignature",OCSPRequest.defaultValues("optionalSignature"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(OCSPRequest,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["tbsRequest","optionalSignature"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,OCSPRequest.schema());if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for OCSPRequest");//endregion
//region Get internal properties from parsed schema
this.tbsRequest=new _TBSRequest.default({schema:asn1.result.tbsRequest});if("optionalSignature"in asn1.result)this.optionalSignature=new _Signature.default({schema:asn1.result.optionalSignature});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @param {boolean} encodeFlag If param equal to false then create TBS schema via decoding stored value. In othe case create TBS schema via assembling from TBS parts.
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){var encodeFlag=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;//region Create array for output sequence
var outputArray=[];outputArray.push(this.tbsRequest.toSchema(encodeFlag));if("optionalSignature"in this)outputArray.push(this.optionalSignature.toSchema());//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={tbsRequest:this.tbsRequest.toJSON()};if("optionalSignature"in this)_object.optionalSignature=this.optionalSignature.toJSON();return _object;}//**********************************************************************************
/**
	 * Making OCSP Request for specific certificate
	 * @param {Certificate} certificate Certificate making OCSP Request for
	 * @param {Object} parameters Additional parameters
	 * @returns {Promise}
	 */},{key:"createForCertificate",value:function createForCertificate(certificate,parameters){var _this=this;//region Initial variables
var sequence=Promise.resolve();var certID=new _CertID.default();//endregion
//region Create OCSP certificate identifier for the certificate
sequence=sequence.then(function(){return certID.createForCertificate(certificate,parameters);});//endregion
//region Make final request data
sequence=sequence.then(function(){_this.tbsRequest=new _TBSRequest.default({requestList:[new _Request.default({reqCert:certID})]});},function(error){return Promise.reject(error);});//endregion
return sequence;}//**********************************************************************************
/**
	 * Make signature for current OCSP Request
	 * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
	 * @param {string} [hashAlgorithm] Hashing algorithm. Default SHA-1
	 * @returns {Promise}
	 */},{key:"sign",value:function sign(privateKey){var _this2=this;var hashAlgorithm=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"SHA-1";//region Initial checking
//region Check private key
if(typeof privateKey==="undefined")return Promise.reject("Need to provide a private key for signing");//endregion
//region Check that "optionalSignature" exists in the current request
if("optionalSignature"in this===false)return Promise.reject("Need to create \"optionalSignature\" field before signing");//endregion
//endregion
//region Initial variables
var sequence=Promise.resolve();var parameters;var tbs;var engine=(0,_common.getEngine)();//endregion
//region Get a "default parameters" for current algorithm and set correct signature algorithm
sequence=sequence.then(function(){return engine.subtle.getSignatureParameters(privateKey,hashAlgorithm);});sequence=sequence.then(function(result){parameters=result.parameters;_this2.optionalSignature.signatureAlgorithm=result.signatureAlgorithm;});//endregion
//region Create TBS data for signing
sequence=sequence.then(function(){tbs=_this2.tbsRequest.toSchema(true).toBER(false);});//endregion
//region Signing TBS data on provided private key
sequence=sequence.then(function(){return engine.subtle.signWithPrivateKey(tbs,privateKey,parameters);});sequence=sequence.then(function(result){_this2.optionalSignature.signature=new asn1js.BitString({valueHex:result});});//endregion
return sequence;}//**********************************************************************************
},{key:"verify",value:function verify(){}// TODO: Create the function
//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"tbsRequest":return new _TBSRequest.default();case"optionalSignature":return new _Signature.default();default:throw new Error("Invalid member name for OCSPRequest class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"tbsRequest":// noinspection OverlyComplexBooleanExpressionJS
return _TBSRequest.default.compareWithDefault("tbs",memberValue.tbs)&&_TBSRequest.default.compareWithDefault("version",memberValue.version)&&_TBSRequest.default.compareWithDefault("requestorName",memberValue.requestorName)&&_TBSRequest.default.compareWithDefault("requestList",memberValue.requestList)&&_TBSRequest.default.compareWithDefault("requestExtensions",memberValue.requestExtensions);case"optionalSignature":return _Signature.default.compareWithDefault("signatureAlgorithm",memberValue.signatureAlgorithm)&&_Signature.default.compareWithDefault("signature",memberValue.signature)&&_Signature.default.compareWithDefault("certs",memberValue.certs);default:throw new Error("Invalid member name for OCSPRequest class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * OCSPRequest     ::=     SEQUENCE {
	 *    tbsRequest                  TBSRequest,
	 *    optionalSignature   [0]     EXPLICIT Signature OPTIONAL }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [tbsRequest]
		 * @property {string} [optionalSignature]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"OCSPRequest",value:[_TBSRequest.default.schema(names.tbsRequest||{names:{blockName:"tbsRequest"}}),new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[_Signature.default.schema(names.optionalSignature||{names:{blockName:"optionalSignature"}})]})]});}}]);return OCSPRequest;}();//**************************************************************************************
exports.default=OCSPRequest;
//# sourceMappingURL=OCSPRequest.js.map