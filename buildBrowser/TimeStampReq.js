"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _MessageImprint=_interopRequireDefault(require("./MessageImprint.js"));var _Extension=_interopRequireDefault(require("./Extension.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC3161
 */var TimeStampReq=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for TimeStampReq class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function TimeStampReq(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,TimeStampReq);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",TimeStampReq.defaultValues("version"));/**
		 * @type {MessageImprint}
		 * @desc messageImprint
		 */this.messageImprint=(0,_pvutils.getParametersValue)(parameters,"messageImprint",TimeStampReq.defaultValues("messageImprint"));if("reqPolicy"in parameters)/**
			 * @type {string}
			 * @desc reqPolicy
			 */this.reqPolicy=(0,_pvutils.getParametersValue)(parameters,"reqPolicy",TimeStampReq.defaultValues("reqPolicy"));if("nonce"in parameters)/**
			 * @type {Integer}
			 * @desc nonce
			 */this.nonce=(0,_pvutils.getParametersValue)(parameters,"nonce",TimeStampReq.defaultValues("nonce"));if("certReq"in parameters)/**
			 * @type {boolean}
			 * @desc certReq
			 */this.certReq=(0,_pvutils.getParametersValue)(parameters,"certReq",TimeStampReq.defaultValues("certReq"));if("extensions"in parameters)/**
			 * @type {Array.<Extension>}
			 * @desc extensions
			 */this.extensions=(0,_pvutils.getParametersValue)(parameters,"extensions",TimeStampReq.defaultValues("extensions"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(TimeStampReq,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["TimeStampReq.version","TimeStampReq.messageImprint","TimeStampReq.reqPolicy","TimeStampReq.nonce","TimeStampReq.certReq","TimeStampReq.extensions"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,TimeStampReq.schema());if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for TimeStampReq");//endregion
//region Get internal properties from parsed schema
this.version=asn1.result["TimeStampReq.version"].valueBlock.valueDec;this.messageImprint=new _MessageImprint.default({schema:asn1.result["TimeStampReq.messageImprint"]});if("TimeStampReq.reqPolicy"in asn1.result)this.reqPolicy=asn1.result["TimeStampReq.reqPolicy"].valueBlock.toString();if("TimeStampReq.nonce"in asn1.result)this.nonce=asn1.result["TimeStampReq.nonce"];if("TimeStampReq.certReq"in asn1.result)this.certReq=asn1.result["TimeStampReq.certReq"].valueBlock.value;if("TimeStampReq.extensions"in asn1.result)this.extensions=Array.from(asn1.result["TimeStampReq.extensions"],function(element){return new _Extension.default({schema:element});});//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var outputArray=[];outputArray.push(new asn1js.Integer({value:this.version}));outputArray.push(this.messageImprint.toSchema());if("reqPolicy"in this)outputArray.push(new asn1js.ObjectIdentifier({value:this.reqPolicy}));if("nonce"in this)outputArray.push(this.nonce);if("certReq"in this&&TimeStampReq.compareWithDefault("certReq",this.certReq)===false)outputArray.push(new asn1js.Boolean({value:this.certReq}));//region Create array of extensions
if("extensions"in this){outputArray.push(new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:Array.from(this.extensions,function(element){return element.toSchema();})}));}//endregion
//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={version:this.version,messageImprint:this.messageImprint.toJSON()};if("reqPolicy"in this)_object.reqPolicy=this.reqPolicy;if("nonce"in this)_object.nonce=this.nonce.toJSON();if("certReq"in this&&TimeStampReq.compareWithDefault("certReq",this.certReq)===false)_object.certReq=this.certReq;if("extensions"in this)_object.extensions=Array.from(this.extensions,function(element){return element.toJSON();});return _object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"version":return 0;case"messageImprint":return new _MessageImprint.default();case"reqPolicy":return"";case"nonce":return new asn1js.Integer();case"certReq":return false;case"extensions":return[];default:throw new Error("Invalid member name for TimeStampReq class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"version":case"reqPolicy":case"certReq":return memberValue===TimeStampReq.defaultValues(memberName);case"messageImprint":return _MessageImprint.default.compareWithDefault("hashAlgorithm",memberValue.hashAlgorithm)&&_MessageImprint.default.compareWithDefault("hashedMessage",memberValue.hashedMessage);case"nonce":return memberValue.isEqual(TimeStampReq.defaultValues(memberName));case"extensions":return memberValue.length===0;default:throw new Error("Invalid member name for TimeStampReq class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * TimeStampReq ::= SEQUENCE  {
	 *    version               INTEGER  { v1(1) },
	 *    messageImprint        MessageImprint,
	 *    reqPolicy             TSAPolicyId              OPTIONAL,
	 *    nonce                 INTEGER                  OPTIONAL,
	 *    certReq               BOOLEAN                  DEFAULT FALSE,
	 *    extensions            [0] IMPLICIT Extensions  OPTIONAL  }
	 *
	 * TSAPolicyId ::= OBJECT IDENTIFIER
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [type]
		 * @property {string} [setName]
		 * @property {string} [values]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"TimeStampReq",value:[new asn1js.Integer({name:names.version||"TimeStampReq.version"}),_MessageImprint.default.schema(names.messageImprint||{names:{blockName:"TimeStampReq.messageImprint"}}),new asn1js.ObjectIdentifier({name:names.reqPolicy||"TimeStampReq.reqPolicy",optional:true}),new asn1js.Integer({name:names.nonce||"TimeStampReq.nonce",optional:true}),new asn1js.Boolean({name:names.certReq||"TimeStampReq.certReq",optional:true}),new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[new asn1js.Repeated({name:names.extensions||"TimeStampReq.extensions",value:_Extension.default.schema()})]})// IMPLICIT SEQUENCE value
]});}}]);return TimeStampReq;}();//**************************************************************************************
exports.default=TimeStampReq;
//# sourceMappingURL=TimeStampReq.js.map