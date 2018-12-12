"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _RecipientEncryptedKey=_interopRequireDefault(require("./RecipientEncryptedKey.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var RecipientEncryptedKeys=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for RecipientEncryptedKeys class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function RecipientEncryptedKeys(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,RecipientEncryptedKeys);//region Internal properties of the object
/**
		 * @type {Array.<RecipientEncryptedKey>}
		 * @desc encryptedKeys
		 */this.encryptedKeys=(0,_pvutils.getParametersValue)(parameters,"encryptedKeys",RecipientEncryptedKeys.defaultValues("encryptedKeys"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(RecipientEncryptedKeys,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["RecipientEncryptedKeys"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,RecipientEncryptedKeys.schema({names:{RecipientEncryptedKeys:"RecipientEncryptedKeys"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for RecipientEncryptedKeys");//endregion
//region Get internal properties from parsed schema
this.encryptedKeys=Array.from(asn1.result.RecipientEncryptedKeys,function(element){return new _RecipientEncryptedKey.default({schema:element});});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:Array.from(this.encryptedKeys,function(element){return element.toSchema();})});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{encryptedKeys:Array.from(this.encryptedKeys,function(element){return element.toJSON();})};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"encryptedKeys":return[];default:throw new Error("Invalid member name for RecipientEncryptedKeys class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"encryptedKeys":return memberValue.length===0;default:throw new Error("Invalid member name for RecipientEncryptedKeys class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * RecipientEncryptedKeys ::= SEQUENCE OF RecipientEncryptedKey
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [RecipientEncryptedKeys]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Repeated({name:names.RecipientEncryptedKeys||"",value:_RecipientEncryptedKey.default.schema()})]});}}]);return RecipientEncryptedKeys;}();//**************************************************************************************
exports.default=RecipientEncryptedKeys;
//# sourceMappingURL=RecipientEncryptedKeys.js.map