"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC3447
 */var RSAPublicKey=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for RSAPublicKey class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {Integer} [modulus]
	 * @property {Integer} [publicExponent]
	 */function RSAPublicKey(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,RSAPublicKey);//region Internal properties of the object
/**
		 * @type {Integer}
		 * @desc Modulus part of RSA public key
		 */this.modulus=(0,_pvutils.getParametersValue)(parameters,"modulus",RSAPublicKey.defaultValues("modulus"));/**
		 * @type {Integer}
		 * @desc Public exponent of RSA public key
		 */this.publicExponent=(0,_pvutils.getParametersValue)(parameters,"publicExponent",RSAPublicKey.defaultValues("publicExponent"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
//region If input argument array contains "json" for this object
if("json"in parameters)this.fromJSON(parameters.json);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(RSAPublicKey,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["modulus","publicExponent"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,RSAPublicKey.schema({names:{modulus:"modulus",publicExponent:"publicExponent"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for RSAPublicKey");//endregion
//region Get internal properties from parsed schema
this.modulus=asn1.result.modulus.convertFromDER(256);this.publicExponent=asn1.result.publicExponent;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[this.modulus.convertToDER(),this.publicExponent]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{n:(0,_pvutils.toBase64)((0,_pvutils.arrayBufferToString)(this.modulus.valueBlock.valueHex),true,true,true),e:(0,_pvutils.toBase64)((0,_pvutils.arrayBufferToString)(this.publicExponent.valueBlock.valueHex),true,true,true)};}//**********************************************************************************
/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */},{key:"fromJSON",value:function fromJSON(json){if("n"in json){var array=(0,_pvutils.stringToArrayBuffer)((0,_pvutils.fromBase64)(json.n,true));this.modulus=new asn1js.Integer({valueHex:array.slice(0,Math.pow(2,(0,_pvutils.nearestPowerOf2)(array.byteLength)))});}else throw new Error("Absent mandatory parameter \"n\"");if("e"in json)this.publicExponent=new asn1js.Integer({valueHex:(0,_pvutils.stringToArrayBuffer)((0,_pvutils.fromBase64)(json.e,true)).slice(0,3)});else throw new Error("Absent mandatory parameter \"e\"");}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"modulus":return new asn1js.Integer();case"publicExponent":return new asn1js.Integer();default:throw new Error("Invalid member name for RSAPublicKey class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * RSAPublicKey ::= Sequence {
	 *    modulus           Integer,  -- n
	 *    publicExponent    Integer   -- e
	 * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} utcTimeName Name for "utcTimeName" choice
		 * @property {string} generalTimeName Name for "generalTimeName" choice
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Integer({name:names.modulus||""}),new asn1js.Integer({name:names.publicExponent||""})]});}}]);return RSAPublicKey;}();//**************************************************************************************
exports.default=RSAPublicKey;
//# sourceMappingURL=RSAPublicKey.js.map