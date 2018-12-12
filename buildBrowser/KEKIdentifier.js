"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _OtherKeyAttribute=_interopRequireDefault(require("./OtherKeyAttribute.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var KEKIdentifier=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for KEKIdentifier class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function KEKIdentifier(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,KEKIdentifier);//region Internal properties of the object
/**
		 * @type {OctetString}
		 * @desc keyIdentifier
		 */this.keyIdentifier=(0,_pvutils.getParametersValue)(parameters,"keyIdentifier",KEKIdentifier.defaultValues("keyIdentifier"));if("date"in parameters)/**
			 * @type {GeneralizedTime}
			 * @desc date
			 */this.date=(0,_pvutils.getParametersValue)(parameters,"date",KEKIdentifier.defaultValues("date"));if("other"in parameters)/**
			 * @type {OtherKeyAttribute}
			 * @desc other
			 */this.other=(0,_pvutils.getParametersValue)(parameters,"other",KEKIdentifier.defaultValues("other"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(KEKIdentifier,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["keyIdentifier","date","other"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,KEKIdentifier.schema({names:{keyIdentifier:"keyIdentifier",date:"date",other:{names:{blockName:"other"}}}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for KEKIdentifier");//endregion
//region Get internal properties from parsed schema
this.keyIdentifier=asn1.result.keyIdentifier;if("date"in asn1.result)this.date=asn1.result.date;if("other"in asn1.result)this.other=new _OtherKeyAttribute.default({schema:asn1.result.other});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var outputArray=[];outputArray.push(this.keyIdentifier);if("date"in this)outputArray.push(this.date);if("other"in this)outputArray.push(this.other.toSchema());//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={keyIdentifier:this.keyIdentifier.toJSON()};if("date"in this)_object.date=this.date;if("other"in this)_object.other=this.other.toJSON();return _object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"keyIdentifier":return new asn1js.OctetString();case"date":return new asn1js.GeneralizedTime();case"other":return new _OtherKeyAttribute.default();default:throw new Error("Invalid member name for KEKIdentifier class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"keyIdentifier":return memberValue.isEqual(KEKIdentifier.defaultValues("keyIdentifier"));case"date":// noinspection OverlyComplexBooleanExpressionJS
return memberValue.year===0&&memberValue.month===0&&memberValue.day===0&&memberValue.hour===0&&memberValue.minute===0&&memberValue.second===0&&memberValue.millisecond===0;case"other":return memberValue.compareWithDefault("keyAttrId",memberValue.keyAttrId)&&"keyAttr"in memberValue===false;default:throw new Error("Invalid member name for KEKIdentifier class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * KEKIdentifier ::= SEQUENCE {
	 *    keyIdentifier OCTET STRING,
	 *    date GeneralizedTime OPTIONAL,
	 *    other OtherKeyAttribute OPTIONAL }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [keyIdentifier]
		 * @property {string} [date]
		 * @property {string} [other]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.OctetString({name:names.keyIdentifier||""}),new asn1js.GeneralizedTime({optional:true,name:names.date||""}),_OtherKeyAttribute.default.schema(names.other||{})]});}}]);return KEKIdentifier;}();//**************************************************************************************
exports.default=KEKIdentifier;
//# sourceMappingURL=KEKIdentifier.js.map