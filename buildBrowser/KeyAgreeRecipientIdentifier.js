"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _IssuerAndSerialNumber=_interopRequireDefault(require("./IssuerAndSerialNumber.js"));var _RecipientKeyIdentifier=_interopRequireDefault(require("./RecipientKeyIdentifier.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var KeyAgreeRecipientIdentifier=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for KeyAgreeRecipientIdentifier class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function KeyAgreeRecipientIdentifier(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,KeyAgreeRecipientIdentifier);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc variant
		 */this.variant=(0,_pvutils.getParametersValue)(parameters,"variant",KeyAgreeRecipientIdentifier.defaultValues("variant"));/**
		 * @type {*}
		 * @desc values
		 */this.value=(0,_pvutils.getParametersValue)(parameters,"value",KeyAgreeRecipientIdentifier.defaultValues("value"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(KeyAgreeRecipientIdentifier,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["blockName"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,KeyAgreeRecipientIdentifier.schema({names:{blockName:"blockName"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for KeyAgreeRecipientIdentifier");//endregion
//region Get internal properties from parsed schema
if(asn1.result.blockName.idBlock.tagClass===1){this.variant=1;this.value=new _IssuerAndSerialNumber.default({schema:asn1.result.blockName});}else{this.variant=2;this.value=new _RecipientKeyIdentifier.default({schema:new asn1js.Sequence({value:asn1.result.blockName.valueBlock.value})});}//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
switch(this.variant){case 1:return this.value.toSchema();case 2:return new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:this.value.toSchema().valueBlock.value});default:return new asn1js.Any();}//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={variant:this.variant};if(this.variant===1||this.variant===2)_object.value=this.value.toJSON();return _object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"variant":return-1;case"value":return{};default:throw new Error("Invalid member name for KeyAgreeRecipientIdentifier class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"variant":return memberValue===-1;case"value":return Object.keys(memberValue).length===0;default:throw new Error("Invalid member name for KeyAgreeRecipientIdentifier class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * KeyAgreeRecipientIdentifier ::= CHOICE {
	 *    issuerAndSerialNumber IssuerAndSerialNumber,
	 *    rKeyId [0] IMPLICIT RecipientKeyIdentifier }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [issuerAndSerialNumber]
		 * @property {string} [rKeyId]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Choice({value:[_IssuerAndSerialNumber.default.schema(names.issuerAndSerialNumber||{names:{blockName:names.blockName||""}}),new asn1js.Constructed({name:names.blockName||"",idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:_RecipientKeyIdentifier.default.schema(names.rKeyId||{names:{blockName:names.blockName||""}}).valueBlock.value})]});}}]);return KeyAgreeRecipientIdentifier;}();//**************************************************************************************
exports.default=KeyAgreeRecipientIdentifier;
//# sourceMappingURL=KeyAgreeRecipientIdentifier.js.map