"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.regexp.to-string");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5280
 */var PolicyQualifierInfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PolicyQualifierInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PolicyQualifierInfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PolicyQualifierInfo);//region Internal properties of the object
/**
		 * @type {string}
		 * @desc policyQualifierId
		 */this.policyQualifierId=(0,_pvutils.getParametersValue)(parameters,"policyQualifierId",PolicyQualifierInfo.defaultValues("policyQualifierId"));/**
		 * @type {Object}
		 * @desc qualifier
		 */this.qualifier=(0,_pvutils.getParametersValue)(parameters,"qualifier",PolicyQualifierInfo.defaultValues("qualifier"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PolicyQualifierInfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["policyQualifierId","qualifier"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PolicyQualifierInfo.schema({names:{policyQualifierId:"policyQualifierId",qualifier:"qualifier"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PolicyQualifierInfo");//endregion
//region Get internal properties from parsed schema
this.policyQualifierId=asn1.result.policyQualifierId.valueBlock.toString();this.qualifier=asn1.result.qualifier;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[new asn1js.ObjectIdentifier({value:this.policyQualifierId}),this.qualifier]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{policyQualifierId:this.policyQualifierId,qualifier:this.qualifier.toJSON()};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"policyQualifierId":return"";case"qualifier":return new asn1js.Any();default:throw new Error("Invalid member name for PolicyQualifierInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PolicyQualifierInfo ::= SEQUENCE {
	 *    policyQualifierId  PolicyQualifierId,
	 *    qualifier          ANY DEFINED BY policyQualifierId }
	 *
	 * id-qt          OBJECT IDENTIFIER ::=  { id-pkix 2 }
	 * id-qt-cps      OBJECT IDENTIFIER ::=  { id-qt 1 }
	 * id-qt-unotice  OBJECT IDENTIFIER ::=  { id-qt 2 }
	 *
	 * PolicyQualifierId ::= OBJECT IDENTIFIER ( id-qt-cps | id-qt-unotice )
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [policyQualifierId]
		 * @property {string} [qualifier]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.ObjectIdentifier({name:names.policyQualifierId||""}),new asn1js.Any({name:names.qualifier||""})]});}}]);return PolicyQualifierInfo;}();//**************************************************************************************
exports.default=PolicyQualifierInfo;
//# sourceMappingURL=PolicyQualifierInfo.js.map