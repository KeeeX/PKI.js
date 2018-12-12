"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.regexp.to-string");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var ContentInfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for ContentInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function ContentInfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,ContentInfo);//region Internal properties of the object
/**
		 * @type {string}
		 * @desc contentType
		 */this.contentType=(0,_pvutils.getParametersValue)(parameters,"contentType",ContentInfo.defaultValues("contentType"));/**
		 * @type {Any}
		 * @desc content
		 */this.content=(0,_pvutils.getParametersValue)(parameters,"content",ContentInfo.defaultValues("content"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(ContentInfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["contentType","content"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,ContentInfo.schema());if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for ContentInfo");//endregion
//region Get internal properties from parsed schema
this.contentType=asn1.result.contentType.valueBlock.toString();this.content=asn1.result.content;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[new asn1js.ObjectIdentifier({value:this.contentType}),new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[this.content]// EXPLICIT ANY value
})]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var object={contentType:this.contentType};if(!(this.content instanceof asn1js.Any))object.content=this.content.toJSON();return object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"contentType":return"";case"content":return new asn1js.Any();default:throw new Error("Invalid member name for ContentInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"contentType":return memberValue==="";case"content":return memberValue instanceof asn1js.Any;default:throw new Error("Invalid member name for ContentInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * ContentInfo ::= SEQUENCE {
	 *    contentType ContentType,
	 *    content [0] EXPLICIT ANY DEFINED BY contentType }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [contentType]
		 * @property {string} [content]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});if("optional"in names===false)names.optional=false;return new asn1js.Sequence({name:names.blockName||"ContentInfo",optional:names.optional,value:[new asn1js.ObjectIdentifier({name:names.contentType||"contentType"}),new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[new asn1js.Any({name:names.content||"content"})]// EXPLICIT ANY value
})]});}}]);return ContentInfo;}();//**************************************************************************************
exports.default=ContentInfo;
//# sourceMappingURL=ContentInfo.js.map