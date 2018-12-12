"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var PasswordRecipientinfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PasswordRecipientinfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PasswordRecipientinfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PasswordRecipientinfo);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",PasswordRecipientinfo.defaultValues("version"));if("keyDerivationAlgorithm"in parameters)/**
			 * @type {AlgorithmIdentifier}
			 * @desc keyDerivationAlgorithm
			 */this.keyDerivationAlgorithm=(0,_pvutils.getParametersValue)(parameters,"keyDerivationAlgorithm",PasswordRecipientinfo.defaultValues("keyDerivationAlgorithm"));/**
		 * @type {AlgorithmIdentifier}
		 * @desc keyEncryptionAlgorithm
		 */this.keyEncryptionAlgorithm=(0,_pvutils.getParametersValue)(parameters,"keyEncryptionAlgorithm",PasswordRecipientinfo.defaultValues("keyEncryptionAlgorithm"));/**
		 * @type {OctetString}
		 * @desc encryptedKey
		 */this.encryptedKey=(0,_pvutils.getParametersValue)(parameters,"encryptedKey",PasswordRecipientinfo.defaultValues("encryptedKey"));/**
		 * @type {ArrayBuffer}
		 * @desc password Password to derive key from
		 */this.password=(0,_pvutils.getParametersValue)(parameters,"password",PasswordRecipientinfo.defaultValues("password"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PasswordRecipientinfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["version","keyDerivationAlgorithm","keyEncryptionAlgorithm","encryptedKey"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PasswordRecipientinfo.schema({names:{version:"version",keyDerivationAlgorithm:"keyDerivationAlgorithm",keyEncryptionAlgorithm:{names:{blockName:"keyEncryptionAlgorithm"}},encryptedKey:"encryptedKey"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PasswordRecipientinfo");//endregion
//region Get internal properties from parsed schema
this.version=asn1.result.version.valueBlock.valueDec;if("keyDerivationAlgorithm"in asn1.result){this.keyDerivationAlgorithm=new _AlgorithmIdentifier.default({schema:new asn1js.Sequence({value:asn1.result.keyDerivationAlgorithm.valueBlock.value})});}this.keyEncryptionAlgorithm=new _AlgorithmIdentifier.default({schema:asn1.result.keyEncryptionAlgorithm});this.encryptedKey=asn1.result.encryptedKey;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create output array for sequence
var outputArray=[];outputArray.push(new asn1js.Integer({value:this.version}));if("keyDerivationAlgorithm"in this){outputArray.push(new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:this.keyDerivationAlgorithm.toSchema().valueBlock.value}));}outputArray.push(this.keyEncryptionAlgorithm.toSchema());outputArray.push(this.encryptedKey);//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{version:this.version,keyDerivationAlgorithm:this.keyDerivationAlgorithm.toJSON(),keyEncryptionAlgorithm:this.keyEncryptionAlgorithm.toJSON(),encryptedKey:this.encryptedKey.toJSON()};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"version":return-1;case"keyDerivationAlgorithm":return new _AlgorithmIdentifier.default();case"keyEncryptionAlgorithm":return new _AlgorithmIdentifier.default();case"encryptedKey":return new asn1js.OctetString();case"password":return new ArrayBuffer(0);default:throw new Error("Invalid member name for PasswordRecipientinfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"version":return memberValue===-1;case"keyDerivationAlgorithm":case"keyEncryptionAlgorithm":return memberValue.algorithmId===""&&"algorithmParams"in memberValue===false;case"encryptedKey":return memberValue.isEqual(PasswordRecipientinfo.defaultValues("encryptedKey"));case"password":return memberValue.byteLength===0;default:throw new Error("Invalid member name for PasswordRecipientinfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PasswordRecipientInfo ::= SEQUENCE {
	 *    version CMSVersion,   -- Always set to 0
	 *    keyDerivationAlgorithm [0] KeyDerivationAlgorithmIdentifier OPTIONAL,
	 *    keyEncryptionAlgorithm KeyEncryptionAlgorithmIdentifier,
	 *    encryptedKey EncryptedKey }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [keyDerivationAlgorithm]
		 * @property {string} [keyEncryptionAlgorithm]
		 * @property {string} [encryptedKey]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Integer({name:names.version||""}),new asn1js.Constructed({name:names.keyDerivationAlgorithm||"",optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:_AlgorithmIdentifier.default.schema().valueBlock.value}),_AlgorithmIdentifier.default.schema(names.keyEncryptionAlgorithm||{}),new asn1js.OctetString({name:names.encryptedKey||""})]});}}]);return PasswordRecipientinfo;}();//**************************************************************************************
exports.default=PasswordRecipientinfo;
//# sourceMappingURL=PasswordRecipientinfo.js.map