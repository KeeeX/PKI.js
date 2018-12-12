"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5280
 */var AlgorithmIdentifier=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for AlgorithmIdentifier class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {string} [algorithmId] ObjectIdentifier for algorithm (string representation)
	 */function AlgorithmIdentifier(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,AlgorithmIdentifier);//region Internal properties of the object
/**
		 * @type {string}
		 * @desc ObjectIdentifier for algorithm (string representation)
		 */this.algorithmId=(0,_pvutils.getParametersValue)(parameters,"algorithmId",AlgorithmIdentifier.defaultValues("algorithmId"));if("algorithmParams"in parameters)/**
			 * @type {Object}
			 * @desc Any algorithm parameters
			 */this.algorithmParams=(0,_pvutils.getParametersValue)(parameters,"algorithmParams",AlgorithmIdentifier.defaultValues("algorithmParams"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(AlgorithmIdentifier,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["algorithm","params"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,AlgorithmIdentifier.schema({names:{algorithmIdentifier:"algorithm",algorithmParams:"params"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for AlgorithmIdentifier");//endregion
//region Get internal properties from parsed schema
this.algorithmId=asn1.result.algorithm.valueBlock.toString();if("params"in asn1.result)this.algorithmParams=asn1.result.params;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var outputArray=[];outputArray.push(new asn1js.ObjectIdentifier({value:this.algorithmId}));if("algorithmParams"in this&&this.algorithmParams instanceof asn1js.Any===false)outputArray.push(this.algorithmParams);//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var object={algorithmId:this.algorithmId};if("algorithmParams"in this&&this.algorithmParams instanceof asn1js.Any===false)object.algorithmParams=this.algorithmParams.toJSON();return object;}//**********************************************************************************
/**
	 * Check that two "AlgorithmIdentifiers" are equal
	 * @param {AlgorithmIdentifier} algorithmIdentifier
	 * @returns {boolean}
	 */},{key:"isEqual",value:function isEqual(algorithmIdentifier){//region Check input type
if(algorithmIdentifier instanceof AlgorithmIdentifier===false)return false;//endregion
//region Check "algorithm_id"
if(this.algorithmId!==algorithmIdentifier.algorithmId)return false;//endregion
//region Check "algorithm_params"
if("algorithmParams"in this){if("algorithmParams"in algorithmIdentifier)return JSON.stringify(this.algorithmParams)===JSON.stringify(algorithmIdentifier.algorithmParams);return false;}if("algorithmParams"in algorithmIdentifier)return false;//endregion
return true;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"algorithmId":return"";case"algorithmParams":return new asn1js.Any();default:throw new Error("Invalid member name for AlgorithmIdentifier class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"algorithmId":return memberValue==="";case"algorithmParams":return memberValue instanceof asn1js.Any;default:throw new Error("Invalid member name for AlgorithmIdentifier class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AlgorithmIdentifier  ::=  Sequence  {
	 *    algorithm               OBJECT IDENTIFIER,
	 *    parameters              ANY DEFINED BY algorithm OPTIONAL  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} algorithmIdentifier ObjectIdentifier for the algorithm
		 * @property {string} algorithmParams Any algorithm parameters
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",optional:names.optional||false,value:[new asn1js.ObjectIdentifier({name:names.algorithmIdentifier||""}),new asn1js.Any({name:names.algorithmParams||"",optional:true})]});}}]);return AlgorithmIdentifier;}();//**************************************************************************************
exports.default=AlgorithmIdentifier;
//# sourceMappingURL=AlgorithmIdentifier.js.map