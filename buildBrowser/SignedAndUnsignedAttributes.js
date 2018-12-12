"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");require("core-js/modules/es6.typed.uint8-array");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _Attribute=_interopRequireDefault(require("./Attribute.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var SignedAndUnsignedAttributes=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for SignedAndUnsignedAttributes class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function SignedAndUnsignedAttributes(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,SignedAndUnsignedAttributes);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc type
		 */this.type=(0,_pvutils.getParametersValue)(parameters,"type",SignedAndUnsignedAttributes.defaultValues("type"));/**
		 * @type {Array}
		 * @desc attributes
		 */this.attributes=(0,_pvutils.getParametersValue)(parameters,"attributes",SignedAndUnsignedAttributes.defaultValues("attributes"));/**
		 * @type {ArrayBuffer}
		 * @desc encodedValue Need to have it in order to successfully process with signature verification
		 */this.encodedValue=(0,_pvutils.getParametersValue)(parameters,"encodedValue",SignedAndUnsignedAttributes.defaultValues("encodedValue"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(SignedAndUnsignedAttributes,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["attributes"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,SignedAndUnsignedAttributes.schema({names:{tagNumber:this.type,attributes:"attributes"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for SignedAndUnsignedAttributes");//endregion
//region Get internal properties from parsed schema
this.type=asn1.result.idBlock.tagNumber;this.encodedValue=asn1.result.valueBeforeDecode;//region Change type from "[0]" to "SET" accordingly to standard
var encodedView=new Uint8Array(this.encodedValue);encodedView[0]=0x31;//endregion
if("attributes"in asn1.result===false){if(this.type===0)throw new Error("Wrong structure of SignedUnsignedAttributes");else return;// Not so important in case of "UnsignedAttributes"
}this.attributes=Array.from(asn1.result.attributes,function(element){return new _Attribute.default({schema:element});});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){if(SignedAndUnsignedAttributes.compareWithDefault("type",this.type)||SignedAndUnsignedAttributes.compareWithDefault("attributes",this.attributes))throw new Error("Incorrectly initialized \"SignedAndUnsignedAttributes\" class");//region Construct and return new ASN.1 schema for this object
return new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:this.type// "SignedAttributes" = 0, "UnsignedAttributes" = 1
},value:Array.from(this.attributes,function(element){return element.toSchema();})});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){if(SignedAndUnsignedAttributes.compareWithDefault("type",this.type)||SignedAndUnsignedAttributes.compareWithDefault("attributes",this.attributes))throw new Error("Incorrectly initialized \"SignedAndUnsignedAttributes\" class");return{type:this.type,attributes:Array.from(this.attributes,function(element){return element.toJSON();})};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"type":return-1;case"attributes":return[];case"encodedValue":return new ArrayBuffer(0);default:throw new Error("Invalid member name for SignedAndUnsignedAttributes class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"type":return memberValue===SignedAndUnsignedAttributes.defaultValues("type");case"attributes":return memberValue.length===0;case"encodedValue":return memberValue.byteLength===0;default:throw new Error("Invalid member name for SignedAndUnsignedAttributes class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * SignedAttributes ::= SET SIZE (1..MAX) OF Attribute
	 *
	 * UnsignedAttributes ::= SET SIZE (1..MAX) OF Attribute
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {number} [tagNumber]
		 * @property {string} [attributes]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Constructed({name:names.blockName||"",optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:names.tagNumber// "SignedAttributes" = 0, "UnsignedAttributes" = 1
},value:[new asn1js.Repeated({name:names.attributes||"",value:_Attribute.default.schema()})]});}}]);return SignedAndUnsignedAttributes;}();//**************************************************************************************
exports.default=SignedAndUnsignedAttributes;
//# sourceMappingURL=SignedAndUnsignedAttributes.js.map