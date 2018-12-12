"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _RelativeDistinguishedNames=_interopRequireDefault(require("./RelativeDistinguishedNames.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var IssuerAndSerialNumber=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for IssuerAndSerialNumber class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function IssuerAndSerialNumber(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,IssuerAndSerialNumber);//region Internal properties of the object
/**
		 * @type {RelativeDistinguishedNames}
		 * @desc issuer
		 */this.issuer=(0,_pvutils.getParametersValue)(parameters,"issuer",IssuerAndSerialNumber.defaultValues("issuer"));/**
		 * @type {Integer}
		 * @desc serialNumber
		 */this.serialNumber=(0,_pvutils.getParametersValue)(parameters,"serialNumber",IssuerAndSerialNumber.defaultValues("serialNumber"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(IssuerAndSerialNumber,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["issuer","serialNumber"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,IssuerAndSerialNumber.schema({names:{issuer:{names:{blockName:"issuer"}},serialNumber:"serialNumber"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for IssuerAndSerialNumber");//endregion
//region Get internal properties from parsed schema
this.issuer=new _RelativeDistinguishedNames.default({schema:asn1.result.issuer});this.serialNumber=asn1.result.serialNumber;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[this.issuer.toSchema(),this.serialNumber]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{issuer:this.issuer.toJSON(),serialNumber:this.serialNumber.toJSON()};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"issuer":return new _RelativeDistinguishedNames.default();case"serialNumber":return new asn1js.Integer();default:throw new Error("Invalid member name for IssuerAndSerialNumber class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * IssuerAndSerialNumber ::= SEQUENCE {
	 *    issuer Name,
	 *    serialNumber CertificateSerialNumber }
	 *
	 * CertificateSerialNumber ::= INTEGER
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [issuer]
		 * @property {string} [serialNumber]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[_RelativeDistinguishedNames.default.schema(names.issuer||{}),new asn1js.Integer({name:names.serialNumber||""})]});}}]);return IssuerAndSerialNumber;}();//**************************************************************************************
exports.default=IssuerAndSerialNumber;
//# sourceMappingURL=IssuerAndSerialNumber.js.map