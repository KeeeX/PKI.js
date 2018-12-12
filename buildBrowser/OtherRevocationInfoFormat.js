"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.regexp.to-string");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var OtherRevocationInfoFormat=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for OtherRevocationInfoFormat class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function OtherRevocationInfoFormat(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,OtherRevocationInfoFormat);//region Internal properties of the object
/**
		 * @type {string}
		 * @desc otherRevInfoFormat
		 */this.otherRevInfoFormat=(0,_pvutils.getParametersValue)(parameters,"otherRevInfoFormat",OtherRevocationInfoFormat.defaultValues("otherRevInfoFormat"));/**
		 * @type {Any}
		 * @desc otherRevInfo
		 */this.otherRevInfo=(0,_pvutils.getParametersValue)(parameters,"otherRevInfo",OtherRevocationInfoFormat.defaultValues("otherRevInfo"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(OtherRevocationInfoFormat,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["otherRevInfoFormat","otherRevInfo"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,OtherRevocationInfoFormat.schema());if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for OtherRevocationInfoFormat");//endregion
//region Get internal properties from parsed schema
this.otherRevInfoFormat=asn1.result.otherRevInfoFormat.valueBlock.toString();this.otherRevInfo=asn1.result.otherRevInfo;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[new asn1js.ObjectIdentifier({value:this.otherRevInfoFormat}),this.otherRevInfo]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var object={otherRevInfoFormat:this.otherRevInfoFormat};if(!(this.otherRevInfo instanceof asn1js.Any))object.otherRevInfo=this.otherRevInfo.toJSON();return object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"otherRevInfoFormat":return"";case"otherRevInfo":return new asn1js.Any();default:throw new Error("Invalid member name for OtherRevocationInfoFormat class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * OtherCertificateFormat ::= SEQUENCE {
	 *    otherRevInfoFormat OBJECT IDENTIFIER,
	 *    otherRevInfo ANY DEFINED BY otherCertFormat }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [otherRevInfoFormat]
		 * @property {string} [otherRevInfo]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.ObjectIdentifier({name:names.otherRevInfoFormat||"otherRevInfoFormat"}),new asn1js.Any({name:names.otherRevInfo||"otherRevInfo"})]});}}]);return OtherRevocationInfoFormat;}();//**************************************************************************************
exports.default=OtherRevocationInfoFormat;
//# sourceMappingURL=OtherRevocationInfoFormat.js.map