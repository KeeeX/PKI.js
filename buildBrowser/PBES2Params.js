"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC2898
 */var PBES2Params=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PBES2Params class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PBES2Params(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PBES2Params);//region Internal properties of the object
/**
		 * @type {AlgorithmIdentifier}
		 * @desc keyDerivationFunc
		 */this.keyDerivationFunc=(0,_pvutils.getParametersValue)(parameters,"keyDerivationFunc",PBES2Params.defaultValues("keyDerivationFunc"));/**
		 * @type {AlgorithmIdentifier}
		 * @desc encryptionScheme
		 */this.encryptionScheme=(0,_pvutils.getParametersValue)(parameters,"encryptionScheme",PBES2Params.defaultValues("encryptionScheme"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PBES2Params,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["keyDerivationFunc","encryptionScheme"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PBES2Params.schema({names:{keyDerivationFunc:{names:{blockName:"keyDerivationFunc"}},encryptionScheme:{names:{blockName:"encryptionScheme"}}}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PBES2Params");//endregion
//region Get internal properties from parsed schema
this.keyDerivationFunc=new _AlgorithmIdentifier.default({schema:asn1.result.keyDerivationFunc});this.encryptionScheme=new _AlgorithmIdentifier.default({schema:asn1.result.encryptionScheme});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[this.keyDerivationFunc.toSchema(),this.encryptionScheme.toSchema()]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{keyDerivationFunc:this.keyDerivationFunc.toJSON(),encryptionScheme:this.encryptionScheme.toJSON()};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"keyDerivationFunc":return new _AlgorithmIdentifier.default();case"encryptionScheme":return new _AlgorithmIdentifier.default();default:throw new Error("Invalid member name for PBES2Params class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PBES2-params ::= SEQUENCE {
	 *    keyDerivationFunc AlgorithmIdentifier {{PBES2-KDFs}},
	 *    encryptionScheme AlgorithmIdentifier {{PBES2-Encs}} }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [keyDerivationFunc]
		 * @property {string} [encryptionScheme]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[_AlgorithmIdentifier.default.schema(names.keyDerivationFunc||{}),_AlgorithmIdentifier.default.schema(names.encryptionScheme||{})]});}}]);return PBES2Params;}();//**************************************************************************************
exports.default=PBES2Params;
//# sourceMappingURL=PBES2Params.js.map