"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/web.dom.iterable");require("core-js/modules/es6.array.iterator");require("core-js/modules/es6.object.keys");require("core-js/modules/es6.regexp.to-string");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _common=require("./common.js");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5280
 */var AttributeTypeAndValue=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for AttributeTypeAndValue class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function AttributeTypeAndValue(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,AttributeTypeAndValue);//region Internal properties of the object
/**
		 * @type {string}
		 * @desc type
		 */this.type=(0,_pvutils.getParametersValue)(parameters,"type",AttributeTypeAndValue.defaultValues("type"));/**
		 * @type {Object}
		 * @desc Value of the AttributeTypeAndValue class
		 */this.value=(0,_pvutils.getParametersValue)(parameters,"value",AttributeTypeAndValue.defaultValues("value"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(AttributeTypeAndValue,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["type","typeValue"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,AttributeTypeAndValue.schema({names:{type:"type",value:"typeValue"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for AttributeTypeAndValue");//endregion
//region Get internal properties from parsed schema
this.type=asn1.result.type.valueBlock.toString();// noinspection JSUnresolvedVariable
this.value=asn1.result.typeValue;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[new asn1js.ObjectIdentifier({value:this.type}),this.value]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={type:this.type};if(Object.keys(this.value).length!==0)_object.value=this.value.toJSON();else _object.value=this.value;return _object;}//**********************************************************************************
/**
	 * Compare two AttributeTypeAndValue values, or AttributeTypeAndValue with ArrayBuffer value
	 * @param {(AttributeTypeAndValue|ArrayBuffer)} compareTo The value compare to current
	 * @returns {boolean}
	 */},{key:"isEqual",value:function isEqual(compareTo){if(compareTo instanceof AttributeTypeAndValue){if(this.type!==compareTo.type)return false;// noinspection OverlyComplexBooleanExpressionJS
if(this.value instanceof asn1js.Utf8String&&compareTo.value instanceof asn1js.Utf8String||this.value instanceof asn1js.BmpString&&compareTo.value instanceof asn1js.BmpString||this.value instanceof asn1js.UniversalString&&compareTo.value instanceof asn1js.UniversalString||this.value instanceof asn1js.NumericString&&compareTo.value instanceof asn1js.NumericString||this.value instanceof asn1js.PrintableString&&compareTo.value instanceof asn1js.PrintableString||this.value instanceof asn1js.TeletexString&&compareTo.value instanceof asn1js.TeletexString||this.value instanceof asn1js.VideotexString&&compareTo.value instanceof asn1js.VideotexString||this.value instanceof asn1js.IA5String&&compareTo.value instanceof asn1js.IA5String||this.value instanceof asn1js.GraphicString&&compareTo.value instanceof asn1js.GraphicString||this.value instanceof asn1js.VisibleString&&compareTo.value instanceof asn1js.VisibleString||this.value instanceof asn1js.GeneralString&&compareTo.value instanceof asn1js.GeneralString||this.value instanceof asn1js.CharacterString&&compareTo.value instanceof asn1js.CharacterString){var value1=(0,_common.stringPrep)(this.value.valueBlock.value);var value2=(0,_common.stringPrep)(compareTo.value.valueBlock.value);if(value1.localeCompare(value2)!==0)return false;}else// Comparing as two ArrayBuffers
{if((0,_pvutils.isEqualBuffer)(this.value.valueBeforeDecode,compareTo.value.valueBeforeDecode)===false)return false;}return true;}if(compareTo instanceof ArrayBuffer)return(0,_pvutils.isEqualBuffer)(this.value.valueBeforeDecode,compareTo);return false;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"type":return"";case"value":return{};default:throw new Error("Invalid member name for AttributeTypeAndValue class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AttributeTypeAndValue ::= Sequence {
	 *    type     AttributeType,
	 *    value    AttributeValue }
	 *
	 * AttributeType ::= OBJECT IDENTIFIER
	 *
	 * AttributeValue ::= ANY -- DEFINED BY AttributeType
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName] Name for entire block
		 * @property {string} [type] Name for "type" element
		 * @property {string} [value] Name for "value" element
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.ObjectIdentifier({name:names.type||""}),new asn1js.Any({name:names.value||""})]});}}]);return AttributeTypeAndValue;}();//**************************************************************************************
exports.default=AttributeTypeAndValue;
//# sourceMappingURL=AttributeTypeAndValue.js.map