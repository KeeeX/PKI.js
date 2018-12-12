"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _GeneralName=_interopRequireDefault(require("./GeneralName.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5280
 */var AuthorityKeyIdentifier=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for AuthorityKeyIdentifier class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function AuthorityKeyIdentifier(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,AuthorityKeyIdentifier);//region Internal properties of the object
if("keyIdentifier"in parameters)/**
			 * @type {OctetString}
			 * @desc keyIdentifier
			 */this.keyIdentifier=(0,_pvutils.getParametersValue)(parameters,"keyIdentifier",AuthorityKeyIdentifier.defaultValues("keyIdentifier"));if("authorityCertIssuer"in parameters)/**
			 * @type {Array.<GeneralName>}
			 * @desc authorityCertIssuer
			 */this.authorityCertIssuer=(0,_pvutils.getParametersValue)(parameters,"authorityCertIssuer",AuthorityKeyIdentifier.defaultValues("authorityCertIssuer"));if("authorityCertSerialNumber"in parameters)/**
			 * @type {Integer}
			 * @desc authorityCertIssuer
			 */this.authorityCertSerialNumber=(0,_pvutils.getParametersValue)(parameters,"authorityCertSerialNumber",AuthorityKeyIdentifier.defaultValues("authorityCertSerialNumber"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(AuthorityKeyIdentifier,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["keyIdentifier","authorityCertIssuer","authorityCertSerialNumber"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,AuthorityKeyIdentifier.schema({names:{keyIdentifier:"keyIdentifier",authorityCertIssuer:"authorityCertIssuer",authorityCertSerialNumber:"authorityCertSerialNumber"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for AuthorityKeyIdentifier");//endregion
//region Get internal properties from parsed schema
if("keyIdentifier"in asn1.result)this.keyIdentifier=new asn1js.OctetString({valueHex:asn1.result.keyIdentifier.valueBlock.valueHex});if("authorityCertIssuer"in asn1.result)this.authorityCertIssuer=Array.from(asn1.result.authorityCertIssuer,function(element){return new _GeneralName.default({schema:element});});if("authorityCertSerialNumber"in asn1.result)this.authorityCertSerialNumber=new asn1js.Integer({valueHex:asn1.result.authorityCertSerialNumber.valueBlock.valueHex});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var outputArray=[];if("keyIdentifier"in this){outputArray.push(new asn1js.Primitive({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},valueHex:this.keyIdentifier.valueBlock.valueHex}));}if("authorityCertIssuer"in this){outputArray.push(new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:1// [1]
},value:Array.from(this.authorityCertIssuer,function(element){return element.toSchema();})}));}if("authorityCertSerialNumber"in this){outputArray.push(new asn1js.Primitive({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:2// [2]
},valueHex:this.authorityCertSerialNumber.valueBlock.valueHex}));}//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var object={};if("keyIdentifier"in this)object.keyIdentifier=this.keyIdentifier.toJSON();if("authorityCertIssuer"in this)object.authorityCertIssuer=Array.from(this.authorityCertIssuer,function(element){return element.toJSON();});if("authorityCertSerialNumber"in this)object.authorityCertSerialNumber=this.authorityCertSerialNumber.toJSON();return object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"keyIdentifier":return new asn1js.OctetString();case"authorityCertIssuer":return[];case"authorityCertSerialNumber":return new asn1js.Integer();default:throw new Error("Invalid member name for AuthorityKeyIdentifier class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AuthorityKeyIdentifier OID ::= 2.5.29.35
	 *
	 * AuthorityKeyIdentifier ::= SEQUENCE {
	 *    keyIdentifier             [0] KeyIdentifier           OPTIONAL,
	 *    authorityCertIssuer       [1] GeneralNames            OPTIONAL,
	 *    authorityCertSerialNumber [2] CertificateSerialNumber OPTIONAL  }
	 *
	 * KeyIdentifier ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [keyIdentifier]
		 * @property {string} [authorityCertIssuer]
		 * @property {string} [authorityCertSerialNumber]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.Primitive({name:names.keyIdentifier||"",optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
}}),new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:1// [1]
},value:[new asn1js.Repeated({name:names.authorityCertIssuer||"",value:_GeneralName.default.schema()})]}),new asn1js.Primitive({name:names.authorityCertSerialNumber||"",optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:2// [2]
}})]});}}]);return AuthorityKeyIdentifier;}();//**************************************************************************************
exports.default=AuthorityKeyIdentifier;
//# sourceMappingURL=AuthorityKeyIdentifier.js.map