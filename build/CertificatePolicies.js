"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _PolicyInformation=_interopRequireDefault(require("./PolicyInformation.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}//**************************************************************************************
/**
 * Class from RFC5280
 */class CertificatePolicies{//**********************************************************************************
/**
	 * Constructor for CertificatePolicies class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */constructor(parameters={}){//region Internal properties of the object
/**
		 * @type {Array.<PolicyInformation>}
		 * @desc certificatePolicies
		 */this.certificatePolicies=(0,_pvutils.getParametersValue)(parameters,"certificatePolicies",CertificatePolicies.defaultValues("certificatePolicies"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */static defaultValues(memberName){switch(memberName){case"certificatePolicies":return[];default:throw new Error(`Invalid member name for CertificatePolicies class: ${memberName}`);}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * certificatePolicies ::= SEQUENCE SIZE (1..MAX) OF PolicyInformation
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */static schema(parameters={}){/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [certificatePolicies]
		 */const names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Repeated({name:names.certificatePolicies||"",value:_PolicyInformation.default.schema()})]});}//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["certificatePolicies"]);//endregion
//region Check the schema is valid
const asn1=asn1js.compareSchema(schema,schema,CertificatePolicies.schema({names:{certificatePolicies:"certificatePolicies"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for CertificatePolicies");//endregion
//region Get internal properties from parsed schema
this.certificatePolicies=Array.from(asn1.result.certificatePolicies,element=>new _PolicyInformation.default({schema:element}));//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:Array.from(this.certificatePolicies,element=>element.toSchema())});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */toJSON(){return{certificatePolicies:Array.from(this.certificatePolicies,element=>element.toJSON())};}//**********************************************************************************
}//**************************************************************************************
exports.default=CertificatePolicies;
//# sourceMappingURL=CertificatePolicies.js.map