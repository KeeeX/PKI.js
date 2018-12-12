"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");require("core-js/modules/web.dom.iterable");require("core-js/modules/es6.array.iterator");require("core-js/modules/es6.regexp.to-string");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC2986
 */var Attribute=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for Attribute class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function Attribute(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,Attribute);//region Internal properties of the object
/**
		 * @type {string}
		 * @desc ObjectIdentifier for attribute (string representation)
		 */this.type=(0,_pvutils.getParametersValue)(parameters,"type",Attribute.defaultValues("type"));/**
		 * @type {Array}
		 * @desc Any attribute values
		 */this.values=(0,_pvutils.getParametersValue)(parameters,"values",Attribute.defaultValues("values"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(Attribute,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["type","values"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,Attribute.schema({names:{type:"type",values:"values"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for Attribute");//endregion
//region Get internal properties from parsed schema
this.type=asn1.result.type.valueBlock.toString();this.values=asn1.result.values;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[new asn1js.ObjectIdentifier({value:this.type}),new asn1js.Set({value:this.values})]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{type:this.type,values:Array.from(this.values,function(element){return element.toJSON();})};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"type":return"";case"values":return[];default:throw new Error("Invalid member name for Attribute class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"type":return memberValue==="";case"values":return memberValue.length===0;default:throw new Error("Invalid member name for Attribute class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * Attribute { ATTRIBUTE:IOSet } ::= SEQUENCE {
	 *    type   ATTRIBUTE.&id({IOSet}),
	 *    values SET SIZE(1..MAX) OF ATTRIBUTE.&Type({IOSet}{@type})
	 * }
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
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.ObjectIdentifier({name:names.type||""}),new asn1js.Set({name:names.setName||"",value:[new asn1js.Repeated({name:names.values||"",value:new asn1js.Any()})]})]});}}]);return Attribute;}();//**************************************************************************************
exports.default=Attribute;
//# sourceMappingURL=Attribute.js.map