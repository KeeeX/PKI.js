"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));var _EncryptedData=_interopRequireDefault(require("./EncryptedData.js"));var _EncryptedContentInfo=_interopRequireDefault(require("./EncryptedContentInfo.js"));var _PrivateKeyInfo=_interopRequireDefault(require("./PrivateKeyInfo.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC7292
 */var PKCS8ShroudedKeyBag=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PKCS8ShroudedKeyBag class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PKCS8ShroudedKeyBag(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PKCS8ShroudedKeyBag);//region Internal properties of the object
/**
		 * @type {AlgorithmIdentifier}
		 * @desc encryptionAlgorithm
		 */this.encryptionAlgorithm=(0,_pvutils.getParametersValue)(parameters,"encryptionAlgorithm",PKCS8ShroudedKeyBag.defaultValues("encryptionAlgorithm"));/**
		 * @type {OctetString}
		 * @desc encryptedData
		 */this.encryptedData=(0,_pvutils.getParametersValue)(parameters,"encryptedData",PKCS8ShroudedKeyBag.defaultValues("encryptedData"));if("parsedValue"in parameters)/**
			 * @type {*}
			 * @desc parsedValue
			 */this.parsedValue=(0,_pvutils.getParametersValue)(parameters,"parsedValue",PKCS8ShroudedKeyBag.defaultValues("parsedValue"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PKCS8ShroudedKeyBag,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["encryptionAlgorithm","encryptedData"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PKCS8ShroudedKeyBag.schema({names:{encryptionAlgorithm:{names:{blockName:"encryptionAlgorithm"}},encryptedData:"encryptedData"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PKCS8ShroudedKeyBag");//endregion
//region Get internal properties from parsed schema
this.encryptionAlgorithm=new _AlgorithmIdentifier.default({schema:asn1.result.encryptionAlgorithm});this.encryptedData=asn1.result.encryptedData;//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[this.encryptionAlgorithm.toSchema(),this.encryptedData]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{encryptionAlgorithm:this.encryptionAlgorithm.toJSON(),encryptedData:this.encryptedData.toJSON()};}//**********************************************************************************
},{key:"parseInternalValues",value:function parseInternalValues(parameters){var _this=this;//region Initial variables 
var sequence=Promise.resolve();var cmsEncrypted=new _EncryptedData.default({encryptedContentInfo:new _EncryptedContentInfo.default({contentEncryptionAlgorithm:this.encryptionAlgorithm,encryptedContent:this.encryptedData})});//endregion 
//region Decrypt internal data 
sequence=sequence.then(function(){return cmsEncrypted.decrypt(parameters);},function(error){return Promise.reject(error);});//endregion 
//region Initialize "parsedValue" with decrypted PKCS#8 private key 
sequence=sequence.then(/**
			 * @param {ArrayBuffer} result
			 */function(result){var asn1=asn1js.fromBER(result);if(asn1.offset===-1)return Promise.reject("Error during parsing ASN.1 data");_this.parsedValue=new _PrivateKeyInfo.default({schema:asn1.result});return Promise.resolve();},function(error){return Promise.reject(error);});//endregion 
return sequence;}//**********************************************************************************
},{key:"makeInternalValues",value:function makeInternalValues(parameters){var _this2=this;//region Check that we do have "parsedValue" 
if("parsedValue"in this===false)return Promise.reject("Please initialize \"parsedValue\" first");//endregion 
//region Initial variables 
var sequence=Promise.resolve();var cmsEncrypted=new _EncryptedData.default();//endregion 
//region Encrypt internal data 
sequence=sequence.then(function(){parameters.contentToEncrypt=_this2.parsedValue.toSchema().toBER(false);return cmsEncrypted.encrypt(parameters);},function(error){return Promise.reject(error);});//endregion 
//region Initialize internal values 
sequence=sequence.then(function(){_this2.encryptionAlgorithm=cmsEncrypted.encryptedContentInfo.contentEncryptionAlgorithm;_this2.encryptedData=cmsEncrypted.encryptedContentInfo.encryptedContent;});//endregion 
return sequence;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"encryptionAlgorithm":return new _AlgorithmIdentifier.default();case"encryptedData":return new asn1js.OctetString();case"parsedValue":return{};default:throw new Error("Invalid member name for PKCS8ShroudedKeyBag class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"encryptionAlgorithm":return _AlgorithmIdentifier.default.compareWithDefault("algorithmId",memberValue.algorithmId)&&"algorithmParams"in memberValue===false;case"encryptedData":return memberValue.isEqual(PKCS8ShroudedKeyBag.defaultValues(memberName));case"parsedValue":return memberValue instanceof Object&&Object.keys(memberValue).length===0;default:throw new Error("Invalid member name for PKCS8ShroudedKeyBag class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PKCS8ShroudedKeyBag ::= EncryptedPrivateKeyInfo
	 *
	 * EncryptedPrivateKeyInfo ::= SEQUENCE {
	 *    encryptionAlgorithm AlgorithmIdentifier {{KeyEncryptionAlgorithms}},
	 *    encryptedData EncryptedData
	 * }
	 *
	 * EncryptedData ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [encryptionAlgorithm]
		 * @property {string} [encryptedData]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[_AlgorithmIdentifier.default.schema(names.encryptionAlgorithm||{names:{blockName:"encryptionAlgorithm"}}),new asn1js.Choice({value:[new asn1js.OctetString({name:names.encryptedData||"encryptedData"}),new asn1js.OctetString({idBlock:{isConstructed:true},name:names.encryptedData||"encryptedData"})]})]});}}]);return PKCS8ShroudedKeyBag;}();//**************************************************************************************
exports.default=PKCS8ShroudedKeyBag;
//# sourceMappingURL=PKCS8ShroudedKeyBag.js.map