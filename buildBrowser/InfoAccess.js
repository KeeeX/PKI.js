"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AccessDescription=_interopRequireDefault(require("./AccessDescription.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5280
 */var InfoAccess=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for InfoAccess class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function InfoAccess(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,InfoAccess);//region Internal properties of the object
/**
		 * @type {Array.<AccessDescription>}
		 * @desc accessDescriptions
		 */this.accessDescriptions=(0,_pvutils.getParametersValue)(parameters,"accessDescriptions",InfoAccess.defaultValues("accessDescriptions"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(InfoAccess,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["accessDescriptions"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,InfoAccess.schema({names:{accessDescriptions:"accessDescriptions"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for InfoAccess");//endregion
//region Get internal properties from parsed schema
this.accessDescriptions=Array.from(asn1.result.accessDescriptions,function(element){return new _AccessDescription.default({schema:element});});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:Array.from(this.accessDescriptions,function(element){return element.toSchema();})});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{accessDescriptions:Array.from(this.accessDescriptions,function(element){return element.toJSON();})};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"accessDescriptions":return[];default:throw new Error("Invalid member name for InfoAccess class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AuthorityInfoAccessSyntax  ::=
	 * SEQUENCE SIZE (1..MAX) OF AccessDescription
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [accessDescriptions]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Repeated({name:names.accessDescriptions||"",value:_AccessDescription.default.schema()})]});}}]);return InfoAccess;}();//**************************************************************************************
exports.default=InfoAccess;
//# sourceMappingURL=InfoAccess.js.map