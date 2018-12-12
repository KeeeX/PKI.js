"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC3447
 */var DigestInfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for DigestInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function DigestInfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,DigestInfo);//region Internal properties of the object
/**
		 * @type {AlgorithmIdentifier}
		 * @desc digestAlgorithm
		 */this.digestAlgorithm=(0,_pvutils.getParametersValue)(parameters,"digestAlgorithm",DigestInfo.defaultValues("digestAlgorithm"));/**
		 * @type {OctetString}
		 * @desc digest
		 */this.digest=(0,_pvutils.getParametersValue)(parameters,"digest",DigestInfo.defaultValues("digest"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(DigestInfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["digestAlgorithm","digest"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,DigestInfo.schema({names:{digestAlgorithm:{names:{blockName:"digestAlgorithm"}},digest:"digest"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for DigestInfo");//endregion
//region Get internal properties from parsed schema
this.digestAlgorithm=new _AlgorithmIdentifier.default({schema:asn1.result.digestAlgorithm});this.digest=asn1.result.digest;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[this.digestAlgorithm.toSchema(),this.digest]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{digestAlgorithm:this.digestAlgorithm.toJSON(),digest:this.digest.toJSON()};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"digestAlgorithm":return new _AlgorithmIdentifier.default();case"digest":return new asn1js.OctetString();default:throw new Error("Invalid member name for DigestInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"digestAlgorithm":return _AlgorithmIdentifier.default.compareWithDefault("algorithmId",memberValue.algorithmId)&&"algorithmParams"in memberValue===false;case"digest":return memberValue.isEqual(DigestInfo.defaultValues(memberName));default:throw new Error("Invalid member name for DigestInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * DigestInfo ::= SEQUENCE {
	 *    digestAlgorithm DigestAlgorithmIdentifier,
	 *    digest Digest }
	 *
	 * Digest ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [type]
		 * @property {string} [setName]
		 * @property {string} [values]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[_AlgorithmIdentifier.default.schema(names.digestAlgorithm||{names:{blockName:"digestAlgorithm"}}),new asn1js.OctetString({name:names.digest||"digest"})]});}}]);return DigestInfo;}();//**************************************************************************************
exports.default=DigestInfo;
//# sourceMappingURL=DigestInfo.js.map