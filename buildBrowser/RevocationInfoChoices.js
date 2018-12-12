"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("core-js/modules/es6.regexp.to-string");require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");require("core-js/modules/es7.symbol.async-iterator");require("core-js/modules/es6.symbol");require("core-js/modules/web.dom.iterable");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _CertificateRevocationList=_interopRequireDefault(require("./CertificateRevocationList.js"));var _OtherRevocationInfoFormat=_interopRequireDefault(require("./OtherRevocationInfoFormat.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5652
 */var RevocationInfoChoices=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for RevocationInfoChoices class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function RevocationInfoChoices(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,RevocationInfoChoices);//region Internal properties of the object
/**
		 * @type {Array.<CertificateRevocationList>}
		 * @desc crls
		 */this.crls=(0,_pvutils.getParametersValue)(parameters,"crls",RevocationInfoChoices.defaultValues("crls"));/**
		 * @type {Array.<OtherRevocationInfoFormat>}
		 * @desc otherRevocationInfos
		 */this.otherRevocationInfos=(0,_pvutils.getParametersValue)(parameters,"otherRevocationInfos",RevocationInfoChoices.defaultValues("otherRevocationInfos"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(RevocationInfoChoices,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["crls"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,RevocationInfoChoices.schema({names:{crls:"crls"}}));if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for RevocationInfoChoices");//endregion
//region Get internal properties from parsed schema
var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=asn1.result.crls[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var element=_step.value;if(element.idBlock.tagClass===1)this.crls.push(new _CertificateRevocationList.default({schema:element}));else this.otherRevocationInfos.push(new _OtherRevocationInfoFormat.default({schema:element}));}//endregion
}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Create array for output set
var outputArray=[];outputArray.push.apply(outputArray,_toConsumableArray(Array.from(this.crls,function(element){return element.toSchema();})));outputArray.push.apply(outputArray,_toConsumableArray(Array.from(this.otherRevocationInfos,function(element){var schema=element.toSchema();schema.idBlock.tagClass=3;schema.idBlock.tagNumber=1;return schema;})));//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Set({value:outputArray});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{crls:Array.from(this.crls,function(element){return element.toJSON();}),otherRevocationInfos:Array.from(this.otherRevocationInfos,function(element){return element.toJSON();})};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"crls":return[];case"otherRevocationInfos":return[];default:throw new Error("Invalid member name for RevocationInfoChoices class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * RevocationInfoChoices ::= SET OF RevocationInfoChoice
	 *
	 * RevocationInfoChoice ::= CHOICE {
	 *    crl CertificateList,
	 *    other [1] IMPLICIT OtherRevocationInfoFormat }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [crls]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Set({name:names.blockName||"",value:[new asn1js.Repeated({name:names.crls||"",value:new asn1js.Choice({value:[_CertificateRevocationList.default.schema(),new asn1js.Constructed({idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:1// [1]
},value:[new asn1js.ObjectIdentifier(),new asn1js.Any()]})]})})]});}}]);return RevocationInfoChoices;}();//**************************************************************************************
exports.default=RevocationInfoChoices;
//# sourceMappingURL=RevocationInfoChoices.js.map