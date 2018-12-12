"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.function.name");require("core-js/modules/es6.promise");require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _common=require("./common.js");var _EncryptedContentInfo=_interopRequireDefault(require("./EncryptedContentInfo.js"));var _Attribute=_interopRequireDefault(require("./Attribute.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var EncryptedData=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for EncryptedData class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function EncryptedData(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,EncryptedData);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",EncryptedData.defaultValues("version"));/**
		 * @type {EncryptedContentInfo}
		 * @desc encryptedContentInfo
		 */this.encryptedContentInfo=(0,_pvutils.getParametersValue)(parameters,"encryptedContentInfo",EncryptedData.defaultValues("encryptedContentInfo"));if("unprotectedAttrs"in parameters)/**
			 * @type {Array.<Attribute>}
			 * @desc unprotectedAttrs
			 */this.unprotectedAttrs=(0,_pvutils.getParametersValue)(parameters,"unprotectedAttrs",EncryptedData.defaultValues("unprotectedAttrs"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(EncryptedData,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["version","encryptedContentInfo","unprotectedAttrs"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,EncryptedData.schema({names:{version:"version",encryptedContentInfo:{names:{blockName:"encryptedContentInfo"}},unprotectedAttrs:"unprotectedAttrs"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for EncryptedData");//endregion
//region Get internal properties from parsed schema
this.version=asn1.result.version.valueBlock.valueDec;this.encryptedContentInfo=new _EncryptedContentInfo.default({schema:asn1.result.encryptedContentInfo});if("unprotectedAttrs"in asn1.result)this.unprotectedAttrs=Array.from(asn1.result.unprotectedAttrs,function(element){return new _Attribute.default({schema:element});});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var outputArray=[];outputArray.push(new asn1js.Integer({value:this.version}));outputArray.push(this.encryptedContentInfo.toSchema());if("unprotectedAttrs"in this){outputArray.push(new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:1// [1]
},value:Array.from(this.unprotectedAttrs,function(element){return element.toSchema();})}));}//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={version:this.version,encryptedContentInfo:this.encryptedContentInfo.toJSON()};if("unprotectedAttrs"in this)_object.unprotectedAttrs=Array.from(this.unprotectedAttrs,function(element){return element.toJSON();});return _object;}//**********************************************************************************
/**
	 * Create a new CMS Encrypted Data content
	 * @param {Object} parameters Parameters neccessary for encryption
	 * @returns {Promise}
	 */},{key:"encrypt",value:function encrypt(parameters){var _this=this;//region Check for input parameters
if(parameters instanceof Object===false)return Promise.reject("Parameters must have type \"Object\"");//endregion
//region Get cryptographic engine
var engine=(0,_common.getEngine)();if(typeof engine==="undefined")return Promise.reject("Unable to initialize cryptographic engine");//endregion
//region Set "contentType" parameter
parameters.contentType="1.2.840.113549.1.7.1";// "data"
//endregion
if("encryptEncryptedContentInfo"in engine.subtle){return engine.subtle.encryptEncryptedContentInfo(parameters).then(function(result){_this.encryptedContentInfo=result;});}return Promise.reject("No support for \"encryptEncryptedContentInfo\" in current crypto engine ".concat(engine.name));}//**********************************************************************************
/**
	 * Create a new CMS Encrypted Data content
	 * @param {Object} parameters Parameters neccessary for encryption
	 */},{key:"decrypt",value:function decrypt(parameters){//region Check for input parameters
if(parameters instanceof Object===false)return Promise.reject("Parameters must have type \"Object\"");//endregion
//region Get cryptographic engine
var engine=(0,_common.getEngine)();if(typeof engine==="undefined")return Promise.reject("Unable to initialize cryptographic engine");//endregion
//region Set "encryptedContentInfo" value
parameters.encryptedContentInfo=this.encryptedContentInfo;//endregion
if("decryptEncryptedContentInfo"in engine.subtle)return engine.subtle.decryptEncryptedContentInfo(parameters);return Promise.reject("No support for \"decryptEncryptedContentInfo\" in current crypto engine ".concat(engine.name));}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"version":return 0;case"encryptedContentInfo":return new _EncryptedContentInfo.default();case"unprotectedAttrs":return[];default:throw new Error("Invalid member name for EncryptedData class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"version":return memberValue===0;case"encryptedContentInfo":return _EncryptedContentInfo.default.compareWithDefault("contentType",memberValue.contentType)&&_EncryptedContentInfo.default.compareWithDefault("contentEncryptionAlgorithm",memberValue.contentEncryptionAlgorithm)&&_EncryptedContentInfo.default.compareWithDefault("encryptedContent",memberValue.encryptedContent);case"unprotectedAttrs":return memberValue.length===0;default:throw new Error("Invalid member name for EncryptedData class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * EncryptedData ::= SEQUENCE {
	 *    version CMSVersion,
	 *    encryptedContentInfo EncryptedContentInfo,
	 *    unprotectedAttrs [1] IMPLICIT UnprotectedAttributes OPTIONAL }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [version]
		 * @property {string} [encryptedContentInfo]
		 * @property {string} [unprotectedAttrs]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Integer({name:names.version||""}),_EncryptedContentInfo.default.schema(names.encryptedContentInfo||{}),new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:1// [1]
},value:[new asn1js.Repeated({name:names.unprotectedAttrs||"",value:_Attribute.default.schema()})]})]});}}]);return EncryptedData;}();//**************************************************************************************
exports.default=EncryptedData;
//# sourceMappingURL=EncryptedData.js.map