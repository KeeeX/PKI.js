"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _PKIStatusInfo=_interopRequireDefault(require("./PKIStatusInfo.js"));var _ContentInfo=_interopRequireDefault(require("./ContentInfo.js"));var _SignedData=_interopRequireDefault(require("./SignedData.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC3161
 */var TimeStampResp=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for TimeStampResp class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function TimeStampResp(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,TimeStampResp);//region Internal properties of the object
/**
		 * @type {PKIStatusInfo}
		 * @desc status
		 */this.status=(0,_pvutils.getParametersValue)(parameters,"status",TimeStampResp.defaultValues("status"));if("timeStampToken"in parameters)/**
			 * @type {ContentInfo}
			 * @desc timeStampToken
			 */this.timeStampToken=(0,_pvutils.getParametersValue)(parameters,"timeStampToken",TimeStampResp.defaultValues("timeStampToken"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(TimeStampResp,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["TimeStampResp.status","TimeStampResp.timeStampToken"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,TimeStampResp.schema());if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for TimeStampResp");//endregion
//region Get internal properties from parsed schema
this.status=new _PKIStatusInfo.default({schema:asn1.result["TimeStampResp.status"]});if("TimeStampResp.timeStampToken"in asn1.result)this.timeStampToken=new _ContentInfo.default({schema:asn1.result["TimeStampResp.timeStampToken"]});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var outputArray=[];outputArray.push(this.status.toSchema());if("timeStampToken"in this)outputArray.push(this.timeStampToken.toSchema());//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={status:this.status};if("timeStampToken"in this)_object.timeStampToken=this.timeStampToken.toJSON();return _object;}//**********************************************************************************
/**
	 * Sign current TSP Response
	 * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
	 * @param {string} [hashAlgorithm] Hashing algorithm. Default SHA-1
	 * @returns {Promise}
	 */},{key:"sign",value:function sign(privateKey,hashAlgorithm){//region Check that "timeStampToken" exists
if("timeStampToken"in this===false)return Promise.reject("timeStampToken is absent in TSP response");//endregion
//region Check that "timeStampToken" has a right internal format
if(this.timeStampToken.contentType!=="1.2.840.113549.1.7.2")// Must be a CMS signed data
return Promise.reject("Wrong format of timeStampToken: ".concat(this.timeStampToken.contentType));//endregion
//region Sign internal signed data value
var signed=new _ContentInfo.default({schema:this.timeStampToken.content});return signed.sign(privateKey,0,hashAlgorithm);//endregion
}//**********************************************************************************
/**
	 * Verify current TSP Response
	 * @param {Object} verificationParameters Input parameters for verification
	 * @returns {Promise}
	 */},{key:"verify",value:function verify(){var verificationParameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{signer:0,trustedCerts:[],data:new ArrayBuffer(0)};//region Check that "timeStampToken" exists
if("timeStampToken"in this===false)return Promise.reject("timeStampToken is absent in TSP response");//endregion
//region Check that "timeStampToken" has a right internal format
if(this.timeStampToken.contentType!=="1.2.840.113549.1.7.2")// Must be a CMS signed data
return Promise.reject("Wrong format of timeStampToken: ".concat(this.timeStampToken.contentType));//endregion
//region Verify internal signed data value
var signed=new _SignedData.default({schema:this.timeStampToken.content});return signed.verify(verificationParameters);//endregion
}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"status":return new _PKIStatusInfo.default();case"timeStampToken":return new _ContentInfo.default();default:throw new Error("Invalid member name for TimeStampResp class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"status":return _PKIStatusInfo.default.compareWithDefault("status",memberValue.status)&&"statusStrings"in memberValue===false&&"failInfo"in memberValue===false;case"timeStampToken":return memberValue.contentType===""&&memberValue.content instanceof asn1js.Any;default:throw new Error("Invalid member name for TimeStampResp class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * TimeStampResp ::= SEQUENCE  {
	 *    status                  PKIStatusInfo,
	 *    timeStampToken          TimeStampToken     OPTIONAL  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [status]
		 * @property {string} [timeStampToken]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"TimeStampResp",value:[_PKIStatusInfo.default.schema(names.status||{names:{blockName:"TimeStampResp.status"}}),_ContentInfo.default.schema(names.timeStampToken||{names:{blockName:"TimeStampResp.timeStampToken",optional:true}})]});}}]);return TimeStampResp;}();//**************************************************************************************
exports.default=TimeStampResp;
//# sourceMappingURL=TimeStampResp.js.map