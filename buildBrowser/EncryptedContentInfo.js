"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.regexp.to-string");require("core-js/modules/es6.typed.uint8-array");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var EncryptedContentInfo=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for EncryptedContentInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function EncryptedContentInfo(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,EncryptedContentInfo);//region Internal properties of the object
/**
		 * @type {string}
		 * @desc contentType
		 */this.contentType=(0,_pvutils.getParametersValue)(parameters,"contentType",EncryptedContentInfo.defaultValues("contentType"));/**
		 * @type {AlgorithmIdentifier}
		 * @desc contentEncryptionAlgorithm
		 */this.contentEncryptionAlgorithm=(0,_pvutils.getParametersValue)(parameters,"contentEncryptionAlgorithm",EncryptedContentInfo.defaultValues("contentEncryptionAlgorithm"));if("encryptedContent"in parameters){/**
			 * @type {OctetString}
			 * @desc encryptedContent (!!!) could be contructive or primitive value (!!!)
			 */this.encryptedContent=parameters.encryptedContent;if(this.encryptedContent.idBlock.tagClass===1&&this.encryptedContent.idBlock.tagNumber===4){//region Divide OCTETSTRING value down to small pieces
if(this.encryptedContent.idBlock.isConstructed===false){var constrString=new asn1js.OctetString({idBlock:{isConstructed:true},isConstructed:true});var offset=0;var length=this.encryptedContent.valueBlock.valueHex.byteLength;while(length>0){var pieceView=new Uint8Array(this.encryptedContent.valueBlock.valueHex,offset,offset+1024>this.encryptedContent.valueBlock.valueHex.byteLength?this.encryptedContent.valueBlock.valueHex.byteLength-offset:1024);var _array=new ArrayBuffer(pieceView.length);var _view=new Uint8Array(_array);for(var i=0;i<_view.length;i++){_view[i]=pieceView[i];}constrString.valueBlock.value.push(new asn1js.OctetString({valueHex:_array}));length-=pieceView.length;offset+=pieceView.length;}this.encryptedContent=constrString;}//endregion
}}//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(EncryptedContentInfo,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["contentType","contentEncryptionAlgorithm","encryptedContent"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,EncryptedContentInfo.schema({names:{contentType:"contentType",contentEncryptionAlgorithm:{names:{blockName:"contentEncryptionAlgorithm"}},encryptedContent:"encryptedContent"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for EncryptedContentInfo");//endregion
//region Get internal properties from parsed schema
this.contentType=asn1.result.contentType.valueBlock.toString();this.contentEncryptionAlgorithm=new _AlgorithmIdentifier.default({schema:asn1.result.contentEncryptionAlgorithm});if("encryptedContent"in asn1.result){this.encryptedContent=asn1.result.encryptedContent;this.encryptedContent.idBlock.tagClass=1;// UNIVERSAL
this.encryptedContent.idBlock.tagNumber=4;// OCTETSTRING (!!!) The value still has instance of "in_window.org.pkijs.asn1.ASN1_CONSTRUCTED / ASN1_PRIMITIVE"
}//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output sequence
var sequenceLengthBlock={isIndefiniteForm:false};var outputArray=[];outputArray.push(new asn1js.ObjectIdentifier({value:this.contentType}));outputArray.push(this.contentEncryptionAlgorithm.toSchema());if("encryptedContent"in this){sequenceLengthBlock.isIndefiniteForm=this.encryptedContent.idBlock.isConstructed;var encryptedValue=this.encryptedContent;encryptedValue.idBlock.tagClass=3;// CONTEXT-SPECIFIC
encryptedValue.idBlock.tagNumber=0;// [0]
encryptedValue.lenBlock.isIndefiniteForm=this.encryptedContent.idBlock.isConstructed;outputArray.push(encryptedValue);}//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({lenBlock:sequenceLengthBlock,value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var _object={contentType:this.contentType,contentEncryptionAlgorithm:this.contentEncryptionAlgorithm.toJSON()};if("encryptedContent"in this)_object.encryptedContent=this.encryptedContent.toJSON();return _object;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"contentType":return"";case"contentEncryptionAlgorithm":return new _AlgorithmIdentifier.default();case"encryptedContent":return new asn1js.OctetString();default:throw new Error("Invalid member name for EncryptedContentInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"contentType":return memberValue==="";case"contentEncryptionAlgorithm":return memberValue.algorithmId===""&&"algorithmParams"in memberValue===false;case"encryptedContent":return memberValue.isEqual(EncryptedContentInfo.defaultValues(memberName));default:throw new Error("Invalid member name for EncryptedContentInfo class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * EncryptedContentInfo ::= SEQUENCE {
	 *    contentType ContentType,
	 *    contentEncryptionAlgorithm ContentEncryptionAlgorithmIdentifier,
	 *    encryptedContent [0] IMPLICIT EncryptedContent OPTIONAL }
	 *
	 * Comment: Strange, but modern crypto engines create "encryptedContent" as "[0] EXPLICIT EncryptedContent"
	 *
	 * EncryptedContent ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [contentType]
		 * @property {string} [contentEncryptionAlgorithm]
		 * @property {string} [encryptedContent]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"",value:[new asn1js.ObjectIdentifier({name:names.contentType||""}),_AlgorithmIdentifier.default.schema(names.contentEncryptionAlgorithm||{}),// The CHOICE we need because "EncryptedContent" could have either "constructive"
// or "primitive" form of encoding and we need to handle both variants
new asn1js.Choice({value:[new asn1js.Constructed({name:names.encryptedContent||"",idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[new asn1js.Repeated({value:new asn1js.OctetString()})]}),new asn1js.Primitive({name:names.encryptedContent||"",idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
}})]})]});}}]);return EncryptedContentInfo;}();//**************************************************************************************
exports.default=EncryptedContentInfo;
//# sourceMappingURL=EncryptedContentInfo.js.map