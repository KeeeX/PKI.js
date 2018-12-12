"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _OriginatorIdentifierOrKey=_interopRequireDefault(require("./OriginatorIdentifierOrKey.js"));var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));var _RecipientEncryptedKeys=_interopRequireDefault(require("./RecipientEncryptedKeys.js"));var _Certificate=_interopRequireDefault(require("./Certificate.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var KeyAgreeRecipientInfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for KeyAgreeRecipientInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function KeyAgreeRecipientInfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,KeyAgreeRecipientInfo);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",KeyAgreeRecipientInfo.defaultValues("version"));/**
		 * @type {OriginatorIdentifierOrKey}
		 * @desc originator
		 */this.originator=(0,_pvutils.getParametersValue)(parameters,"originator",KeyAgreeRecipientInfo.defaultValues("originator"));if("ukm"in parameters)/**
			 * @type {OctetString}
			 * @desc ukm
			 */this.ukm=(0,_pvutils.getParametersValue)(parameters,"ukm",KeyAgreeRecipientInfo.defaultValues("ukm"));/**
		 * @type {AlgorithmIdentifier}
		 * @desc keyEncryptionAlgorithm
		 */this.keyEncryptionAlgorithm=(0,_pvutils.getParametersValue)(parameters,"keyEncryptionAlgorithm",KeyAgreeRecipientInfo.defaultValues("keyEncryptionAlgorithm"));/**
		 * @type {RecipientEncryptedKeys}
		 * @desc recipientEncryptedKeys
		 */this.recipientEncryptedKeys=(0,_pvutils.getParametersValue)(parameters,"recipientEncryptedKeys",KeyAgreeRecipientInfo.defaultValues("recipientEncryptedKeys"));/**
		 * @type {Certificate}
		 * @desc recipientCertificate For some reasons we need to store recipient's certificate here
		 */this.recipientCertificate=(0,_pvutils.getParametersValue)(parameters,"recipientCertificate",KeyAgreeRecipientInfo.defaultValues("recipientCertificate"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(KeyAgreeRecipientInfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["version","originator","ukm","keyEncryptionAlgorithm","recipientEncryptedKeys"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,KeyAgreeRecipientInfo.schema({names:{version:"version",originator:{names:{blockName:"originator"}},ukm:"ukm",keyEncryptionAlgorithm:{names:{blockName:"keyEncryptionAlgorithm"}},recipientEncryptedKeys:{names:{blockName:"recipientEncryptedKeys"}}}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for KeyAgreeRecipientInfo");//endregion
//region Get internal properties from parsed schema
this.version=asn1.result.version.valueBlock.valueDec;this.originator=new _OriginatorIdentifierOrKey.default({schema:asn1.result.originator});if("ukm"in asn1.result)this.ukm=asn1.result.ukm;this.keyEncryptionAlgorithm=new _AlgorithmIdentifier.default({schema:asn1.result.keyEncryptionAlgorithm});this.recipientEncryptedKeys=new _RecipientEncryptedKeys.default({schema:asn1.result.recipientEncryptedKeys});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for final sequence
var outputArray=[];outputArray.push(new asn1js.Integer({value:this.version}));outputArray.push(new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[this.originator.toSchema()]}));if("ukm"in this){outputArray.push(new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:1// [1]
},value:[this.ukm]}));}outputArray.push(this.keyEncryptionAlgorithm.toSchema());outputArray.push(this.recipientEncryptedKeys.toSchema());//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={version:this.version,originator:this.originator.toJSON()};if("ukm"in this)_object.ukm=this.ukm.toJSON();_object.keyEncryptionAlgorithm=this.keyEncryptionAlgorithm.toJSON();_object.recipientEncryptedKeys=this.recipientEncryptedKeys.toJSON();return _object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"version":return 0;case"originator":return new _OriginatorIdentifierOrKey.default();case"ukm":return new asn1js.OctetString();case"keyEncryptionAlgorithm":return new _AlgorithmIdentifier.default();case"recipientEncryptedKeys":return new _RecipientEncryptedKeys.default();case"recipientCertificate":return new _Certificate.default();default:throw new Error("Invalid member name for KeyAgreeRecipientInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"version":return memberValue===0;case"originator":return memberValue.variant===-1&&"value"in memberValue===false;case"ukm":return memberValue.isEqual(KeyAgreeRecipientInfo.defaultValues("ukm"));case"keyEncryptionAlgorithm":return memberValue.algorithmId===""&&"algorithmParams"in memberValue===false;case"recipientEncryptedKeys":return memberValue.encryptedKeys.length===0;case"recipientCertificate":return false;// For now leave it as is
default:throw new Error("Invalid member name for KeyAgreeRecipientInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * KeyAgreeRecipientInfo ::= SEQUENCE {
	 *    version CMSVersion,  -- always set to 3
	 *    originator [0] EXPLICIT OriginatorIdentifierOrKey,
	 *    ukm [1] EXPLICIT UserKeyingMaterial OPTIONAL,
	 *    keyEncryptionAlgorithm KeyEncryptionAlgorithmIdentifier,
	 *    recipientEncryptedKeys RecipientEncryptedKeys }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [version]
		 * @property {string} [originator]
		 * @property {string} [ukm]
		 * @property {string} [keyEncryptionAlgorithm]
		 * @property {string} [recipientEncryptedKeys]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Integer({name:names.version||""}),new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[_OriginatorIdentifierOrKey.default.schema(names.originator||{})]}),new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:1// [1]
},value:[new asn1js.OctetString({name:names.ukm||""})]}),_AlgorithmIdentifier.default.schema(names.keyEncryptionAlgorithm||{}),_RecipientEncryptedKeys.default.schema(names.recipientEncryptedKeys||{})]});}}]);return KeyAgreeRecipientInfo;}();//**************************************************************************************
exports.default=KeyAgreeRecipientInfo;
//# sourceMappingURL=KeyAgreeRecipientInfo.js.map