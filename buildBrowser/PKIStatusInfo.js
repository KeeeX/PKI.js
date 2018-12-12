"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC3161
 */var PKIStatusInfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PKIStatusInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PKIStatusInfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PKIStatusInfo);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc status
		 */this.status=(0,_pvutils.getParametersValue)(parameters,"status",PKIStatusInfo.defaultValues("status"));if("statusStrings"in parameters)/**
			 * @type {Array.<Utf8String>}
			 * @desc statusStrings
			 */this.statusStrings=(0,_pvutils.getParametersValue)(parameters,"statusStrings",PKIStatusInfo.defaultValues("statusStrings"));if("failInfo"in parameters)/**
			 * @type {BitString}
			 * @desc failInfo
			 */this.failInfo=(0,_pvutils.getParametersValue)(parameters,"failInfo",PKIStatusInfo.defaultValues("failInfo"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PKIStatusInfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["status","statusStrings","failInfo"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PKIStatusInfo.schema({names:{status:"status",statusStrings:"statusStrings",failInfo:"failInfo"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PKIStatusInfo");//endregion
//region Get internal properties from parsed schema
var _status=asn1.result.status;if(_status.valueBlock.isHexOnly===true||_status.valueBlock.valueDec<0||_status.valueBlock.valueDec>5)throw new Error("PKIStatusInfo \"status\" has invalid value");this.status=_status.valueBlock.valueDec;if("statusStrings"in asn1.result)this.statusStrings=asn1.result.statusStrings;if("failInfo"in asn1.result)this.failInfo=asn1.result.failInfo;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array of output sequence
var outputArray=[];outputArray.push(new asn1js.Integer({value:this.status}));if("statusStrings"in this){outputArray.push(new asn1js.Sequence({optional:true,value:this.statusStrings}));}if("failInfo"in this)outputArray.push(this.failInfo);//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={status:this.status};if("statusStrings"in this)_object.statusStrings=Array.from(this.statusStrings,function(element){return element.toJSON();});if("failInfo"in this)_object.failInfo=this.failInfo.toJSON();return _object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"status":return 2;case"statusStrings":return[];case"failInfo":return new asn1js.BitString();default:throw new Error("Invalid member name for PKIStatusInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"status":return memberValue===PKIStatusInfo.defaultValues(memberName);case"statusStrings":return memberValue.length===0;case"failInfo":return memberValue.isEqual(PKIStatusInfo.defaultValues(memberName));default:throw new Error("Invalid member name for PKIStatusInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PKIStatusInfo ::= SEQUENCE {
	 *    status        PKIStatus,
	 *    statusString  PKIFreeText     OPTIONAL,
	 *    failInfo      PKIFailureInfo  OPTIONAL  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [status]
		 * @property {string} [statusStrings]
		 * @property {string} [failInfo]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Integer({name:names.status||""}),new asn1js.Sequence({optional:true,value:[new asn1js.Repeated({name:names.statusStrings||"",value:new asn1js.Utf8String()})]}),new asn1js.BitString({name:names.failInfo||"",optional:true})]});}}]);return PKIStatusInfo;}();//**************************************************************************************
exports.default=PKIStatusInfo;
//# sourceMappingURL=PKIStatusInfo.js.map