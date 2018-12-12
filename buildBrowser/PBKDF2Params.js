"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC2898
 */var PBKDF2Params=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PBKDF2Params class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PBKDF2Params(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PBKDF2Params);//region Internal properties of the object
/**
		 * @type {Object}
		 * @desc salt
		 */this.salt=(0,_pvutils.getParametersValue)(parameters,"salt",PBKDF2Params.defaultValues("salt"));/**
		 * @type {number}
		 * @desc iterationCount
		 */this.iterationCount=(0,_pvutils.getParametersValue)(parameters,"iterationCount",PBKDF2Params.defaultValues("iterationCount"));if("keyLength"in parameters)/**
			 * @type {number}
			 * @desc keyLength
			 */this.keyLength=(0,_pvutils.getParametersValue)(parameters,"keyLength",PBKDF2Params.defaultValues("keyLength"));if("prf"in parameters)/**
			 * @type {AlgorithmIdentifier}
			 * @desc prf
			 */this.prf=(0,_pvutils.getParametersValue)(parameters,"prf",PBKDF2Params.defaultValues("prf"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PBKDF2Params,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["salt","iterationCount","keyLength","prf"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PBKDF2Params.schema({names:{saltPrimitive:"salt",saltConstructed:{names:{blockName:"salt"}},iterationCount:"iterationCount",keyLength:"keyLength",prf:{names:{blockName:"prf",optional:true}}}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PBKDF2Params");//endregion
//region Get internal properties from parsed schema
this.salt=asn1.result.salt;this.iterationCount=asn1.result.iterationCount.valueBlock.valueDec;if("keyLength"in asn1.result)this.keyLength=asn1.result.keyLength.valueBlock.valueDec;if("prf"in asn1.result)this.prf=new _AlgorithmIdentifier.default({schema:asn1.result.prf});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence 
var outputArray=[];outputArray.push(this.salt);outputArray.push(new asn1js.Integer({value:this.iterationCount}));if("keyLength"in this){if(PBKDF2Params.defaultValues("keyLength")!==this.keyLength)outputArray.push(new asn1js.Integer({value:this.keyLength}));}if("prf"in this){if(PBKDF2Params.defaultValues("prf").isEqual(this.prf)===false)outputArray.push(this.prf.toSchema());}//endregion 
//region Construct and return new ASN.1 schema for this object 
return new asn1js.Sequence({value:outputArray});//endregion 
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={salt:this.salt.toJSON(),iterationCount:this.iterationCount};if("keyLength"in this){if(PBKDF2Params.defaultValues("keyLength")!==this.keyLength)_object.keyLength=this.keyLength;}if("prf"in this){if(PBKDF2Params.defaultValues("prf").isEqual(this.prf)===false)_object.prf=this.prf.toJSON();}return _object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"salt":return{};case"iterationCount":return-1;case"keyLength":return 0;case"prf":return new _AlgorithmIdentifier.default({algorithmId:"1.3.14.3.2.26",// SHA-1
algorithmParams:new asn1js.Null()});default:throw new Error("Invalid member name for PBKDF2Params class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PBKDF2-params ::= SEQUENCE {
	 *    salt CHOICE {
	 *        specified OCTET STRING,
	 *        otherSource AlgorithmIdentifier },
	 *  iterationCount INTEGER (1..MAX),
	 *  keyLength INTEGER (1..MAX) OPTIONAL,
	 *  prf AlgorithmIdentifier
	 *    DEFAULT { algorithm hMAC-SHA1, parameters NULL } }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [saltPrimitive]
		 * @property {string} [saltConstructed]
		 * @property {string} [iterationCount]
		 * @property {string} [keyLength]
		 * @property {string} [prf]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Choice({value:[new asn1js.OctetString({name:names.saltPrimitive||""}),_AlgorithmIdentifier.default.schema(names.saltConstructed||{})]}),new asn1js.Integer({name:names.iterationCount||""}),new asn1js.Integer({name:names.keyLength||"",optional:true}),_AlgorithmIdentifier.default.schema(names.prf||{names:{optional:true}})]});}}]);return PBKDF2Params;}();//**************************************************************************************
exports.default=PBKDF2Params;
//# sourceMappingURL=PBKDF2Params.js.map