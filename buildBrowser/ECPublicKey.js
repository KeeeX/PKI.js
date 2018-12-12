"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
/**
 * Class from RFC5480
 */var ECPublicKey=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for ECCPublicKey class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function ECPublicKey(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,ECPublicKey);//region Internal properties of the object
/**
		 * @type {ArrayBuffer}
		 * @desc type
		 */this.x=(0,_pvutils.getParametersValue)(parameters,"x",ECPublicKey.defaultValues("x"));/**
		 * @type {ArrayBuffer}
		 * @desc values
		 */this.y=(0,_pvutils.getParametersValue)(parameters,"y",ECPublicKey.defaultValues("y"));/**
		 * @type {string}
		 * @desc namedCurve
		 */this.namedCurve=(0,_pvutils.getParametersValue)(parameters,"namedCurve",ECPublicKey.defaultValues("namedCurve"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
//region If input argument array contains "json" for this object
if("json"in parameters)this.fromJSON(parameters.json);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(ECPublicKey,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert ArrayBuffer into current class
	 * @param {!ArrayBuffer} schema Special case: schema is an ArrayBuffer
	 */value:function fromSchema(schema){//region Check the schema is valid
if(schema instanceof ArrayBuffer===false)throw new Error("Object's schema was not verified against input data for ECPublicKey");var view=new Uint8Array(schema);if(view[0]!==0x04)throw new Error("Object's schema was not verified against input data for ECPublicKey");//endregion
//region Get internal properties from parsed schema
var coordinateLength;switch(this.namedCurve){case"1.2.840.10045.3.1.7":// P-256
coordinateLength=32;break;case"1.3.132.0.34":// P-384
coordinateLength=48;break;case"1.3.132.0.35":// P-521
coordinateLength=66;break;default:throw new Error("Incorrect curve OID: ".concat(this.namedCurve));}if(schema.byteLength!==coordinateLength*2+1)throw new Error("Object's schema was not verified against input data for ECPublicKey");this.x=schema.slice(1,coordinateLength+1);this.y=schema.slice(1+coordinateLength,coordinateLength*2+1);//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){return new asn1js.RawData({data:(0,_pvutils.utilConcatBuf)(new Uint8Array([0x04]).buffer,this.x,this.y)});}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var crvName="";switch(this.namedCurve){case"1.2.840.10045.3.1.7":// P-256
crvName="P-256";break;case"1.3.132.0.34":// P-384
crvName="P-384";break;case"1.3.132.0.35":// P-521
crvName="P-521";break;default:}return{crv:crvName,x:(0,_pvutils.toBase64)((0,_pvutils.arrayBufferToString)(this.x),true,true,false),y:(0,_pvutils.toBase64)((0,_pvutils.arrayBufferToString)(this.y),true,true,false)};}//**********************************************************************************
/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */},{key:"fromJSON",value:function fromJSON(json){var coodinateLength=0;if("crv"in json){switch(json.crv.toUpperCase()){case"P-256":this.namedCurve="1.2.840.10045.3.1.7";coodinateLength=32;break;case"P-384":this.namedCurve="1.3.132.0.34";coodinateLength=48;break;case"P-521":this.namedCurve="1.3.132.0.35";coodinateLength=66;break;default:}}else throw new Error("Absent mandatory parameter \"crv\"");if("x"in json){var convertBuffer=(0,_pvutils.stringToArrayBuffer)((0,_pvutils.fromBase64)(json.x,true));if(convertBuffer.byteLength<coodinateLength){this.x=new ArrayBuffer(coodinateLength);var view=new Uint8Array(this.x);var convertBufferView=new Uint8Array(convertBuffer);view.set(convertBufferView,1);}else this.x=convertBuffer.slice(0,coodinateLength);}else throw new Error("Absent mandatory parameter \"x\"");if("y"in json){var _convertBuffer=(0,_pvutils.stringToArrayBuffer)((0,_pvutils.fromBase64)(json.y,true));if(_convertBuffer.byteLength<coodinateLength){this.y=new ArrayBuffer(coodinateLength);var _view=new Uint8Array(this.y);var _convertBufferView=new Uint8Array(_convertBuffer);_view.set(_convertBufferView,1);}else this.y=_convertBuffer.slice(0,coodinateLength);}else throw new Error("Absent mandatory parameter \"y\"");}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"x":case"y":return new ArrayBuffer(0);case"namedCurve":return"";default:throw new Error("Invalid member name for ECCPublicKey class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"x":case"y":return(0,_pvutils.isEqualBuffer)(memberValue,ECPublicKey.defaultValues(memberName));case"namedCurve":return memberValue==="";default:throw new Error("Invalid member name for ECCPublicKey class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return new asn1js.RawData();}}]);return ECPublicKey;}();//**************************************************************************************
exports.default=ECPublicKey;
//# sourceMappingURL=ECPublicKey.js.map