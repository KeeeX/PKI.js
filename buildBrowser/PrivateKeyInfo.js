"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));var _Attribute=_interopRequireDefault(require("./Attribute.js"));var _ECPrivateKey=_interopRequireDefault(require("./ECPrivateKey.js"));var _RSAPrivateKey=_interopRequireDefault(require("./RSAPrivateKey.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5208
 */var PrivateKeyInfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for PrivateKeyInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function PrivateKeyInfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,PrivateKeyInfo);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",PrivateKeyInfo.defaultValues("version"));/**
		 * @type {AlgorithmIdentifier}
		 * @desc privateKeyAlgorithm
		 */this.privateKeyAlgorithm=(0,_pvutils.getParametersValue)(parameters,"privateKeyAlgorithm",PrivateKeyInfo.defaultValues("privateKeyAlgorithm"));/**
		 * @type {OctetString}
		 * @desc privateKey
		 */this.privateKey=(0,_pvutils.getParametersValue)(parameters,"privateKey",PrivateKeyInfo.defaultValues("privateKey"));if("attributes"in parameters)/**
			 * @type {Array.<Attribute>}
			 * @desc attributes
			 */this.attributes=(0,_pvutils.getParametersValue)(parameters,"attributes",PrivateKeyInfo.defaultValues("attributes"));if("parsedKey"in parameters)/**
			 * @type {ECPrivateKey|RSAPrivateKey}
			 * @desc Parsed public key value
			 */this.parsedKey=(0,_pvutils.getParametersValue)(parameters,"parsedKey",PrivateKeyInfo.defaultValues("parsedKey"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
//region If input argument array contains "json" for this object
if("json"in parameters)this.fromJSON(parameters.json);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(PrivateKeyInfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["version","privateKeyAlgorithm","privateKey","attributes"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,PrivateKeyInfo.schema({names:{version:"version",privateKeyAlgorithm:{names:{blockName:"privateKeyAlgorithm"}},privateKey:"privateKey",attributes:"attributes"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for PrivateKeyInfo");//endregion
//region Get internal properties from parsed schema
this.version=asn1.result.version.valueBlock.valueDec;this.privateKeyAlgorithm=new _AlgorithmIdentifier.default({schema:asn1.result.privateKeyAlgorithm});this.privateKey=asn1.result.privateKey;if("attributes"in asn1.result)this.attributes=Array.from(asn1.result.attributes,function(element){return new _Attribute.default({schema:element});});switch(this.privateKeyAlgorithm.algorithmId){case"1.2.840.113549.1.1.1":// RSA
{var privateKeyASN1=asn1js.fromBER(this.privateKey.valueBlock.valueHex);if(privateKeyASN1.offset!==-1)this.parsedKey=new _RSAPrivateKey.default({schema:privateKeyASN1.result});}break;case"1.2.840.10045.2.1":// ECDSA
if("algorithmParams"in this.privateKeyAlgorithm){if(this.privateKeyAlgorithm.algorithmParams instanceof asn1js.ObjectIdentifier){var _privateKeyASN=asn1js.fromBER(this.privateKey.valueBlock.valueHex);if(_privateKeyASN.offset!==-1){this.parsedKey=new _ECPrivateKey.default({namedCurve:this.privateKeyAlgorithm.algorithmParams.valueBlock.toString(),schema:_privateKeyASN.result});}}}break;default:}//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var outputArray=[new asn1js.Integer({value:this.version}),this.privateKeyAlgorithm.toSchema(),this.privateKey];if("attributes"in this){outputArray.push(new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:Array.from(this.attributes,function(element){return element.toSchema();})}));}//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){//region Return common value in case we do not have enough info fo making JWK
if("parsedKey"in this===false){var object={version:this.version,privateKeyAlgorithm:this.privateKeyAlgorithm.toJSON(),privateKey:this.privateKey.toJSON()};if("attributes"in this)object.attributes=Array.from(this.attributes,function(element){return element.toJSON();});return object;}//endregion
//region Making JWK
var jwk={};switch(this.privateKeyAlgorithm.algorithmId){case"1.2.840.10045.2.1":// ECDSA
jwk.kty="EC";break;case"1.2.840.113549.1.1.1":// RSA
jwk.kty="RSA";break;default:}var publicKeyJWK=this.parsedKey.toJSON();var _arr=Object.keys(publicKeyJWK);for(var _i=0;_i<_arr.length;_i++){var key=_arr[_i];jwk[key]=publicKeyJWK[key];}return jwk;//endregion
}//**********************************************************************************
/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */},{key:"fromJSON",value:function fromJSON(json){if("kty"in json){switch(json.kty.toUpperCase()){case"EC":this.parsedKey=new _ECPrivateKey.default({json:json});this.privateKeyAlgorithm=new _AlgorithmIdentifier.default({algorithmId:"1.2.840.10045.2.1",algorithmParams:new asn1js.ObjectIdentifier({value:this.parsedKey.namedCurve})});break;case"RSA":this.parsedKey=new _RSAPrivateKey.default({json:json});this.privateKeyAlgorithm=new _AlgorithmIdentifier.default({algorithmId:"1.2.840.113549.1.1.1",algorithmParams:new asn1js.Null()});break;default:throw new Error("Invalid value for \"kty\" parameter: ".concat(json.kty));}this.privateKey=new asn1js.OctetString({valueHex:this.parsedKey.toSchema().toBER(false)});}}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"version":return 0;case"privateKeyAlgorithm":return new _AlgorithmIdentifier.default();case"privateKey":return new asn1js.OctetString();case"attributes":return[];case"parsedKey":return{};default:throw new Error("Invalid member name for PrivateKeyInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PrivateKeyInfo ::= SEQUENCE {
	 *    version Version,
	 *    privateKeyAlgorithm AlgorithmIdentifier {{PrivateKeyAlgorithms}},
	 *    privateKey PrivateKey,
	 *    attributes [0] Attributes OPTIONAL }
	 *
	 * Version ::= INTEGER {v1(0)} (v1,...)
	 *
	 * PrivateKey ::= OCTET STRING
	 *
	 * Attributes ::= SET OF Attribute
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [version]
		 * @property {string} [privateKeyAlgorithm]
		 * @property {string} [privateKey]
		 * @property {string} [attributes]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Integer({name:names.version||""}),_AlgorithmIdentifier.default.schema(names.privateKeyAlgorithm||{}),new asn1js.OctetString({name:names.privateKey||""}),new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[new asn1js.Repeated({name:names.attributes||"",value:_Attribute.default.schema()})]})]});}}]);return PrivateKeyInfo;}();//**************************************************************************************
exports.default=PrivateKeyInfo;
//# sourceMappingURL=PrivateKeyInfo.js.map