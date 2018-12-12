"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.verifySCTsForCertificate=verifySCTsForCertificate;exports.default=exports.SignedCertificateTimestamp=void 0;require("core-js/modules/es6.promise");require("core-js/modules/es6.string.iterator");require("core-js/modules/es6.array.from");require("core-js/modules/es7.symbol.async-iterator");require("core-js/modules/es6.symbol");require("core-js/modules/web.dom.iterable");require("regenerator-runtime/runtime");require("core-js/modules/es6.typed.uint8-array");var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _bytestreamjs=require("bytestreamjs");var _common=require("./common.js");var _PublicKeyInfo=_interopRequireDefault(require("./PublicKeyInfo.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{Promise.resolve(value).then(_next,_throw);}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value);}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err);}_next(undefined);});};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
var SignedCertificateTimestamp=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for SignedCertificateTimestamp class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function SignedCertificateTimestamp(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,SignedCertificateTimestamp);//region Internal properties of the object
/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",SignedCertificateTimestamp.defaultValues("version"));/**
		 * @type {ArrayBuffer}
		 * @desc logID
		 */this.logID=(0,_pvutils.getParametersValue)(parameters,"logID",SignedCertificateTimestamp.defaultValues("logID"));/**
		 * @type {Date}
		 * @desc timestamp
		 */this.timestamp=(0,_pvutils.getParametersValue)(parameters,"timestamp",SignedCertificateTimestamp.defaultValues("timestamp"));/**
		 * @type {ArrayBuffer}
		 * @desc extensions
		 */this.extensions=(0,_pvutils.getParametersValue)(parameters,"extensions",SignedCertificateTimestamp.defaultValues("extensions"));/**
		 * @type {string}
		 * @desc hashAlgorithm
		 */this.hashAlgorithm=(0,_pvutils.getParametersValue)(parameters,"hashAlgorithm",SignedCertificateTimestamp.defaultValues("hashAlgorithm"));/**
		 * @type {string}
		 * @desc signatureAlgorithm
		 */this.signatureAlgorithm=(0,_pvutils.getParametersValue)(parameters,"signatureAlgorithm",SignedCertificateTimestamp.defaultValues("signatureAlgorithm"));/**
		 * @type {Object}
		 * @desc signature
		 */this.signature=(0,_pvutils.getParametersValue)(parameters,"signature",SignedCertificateTimestamp.defaultValues("signature"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
//region If input argument array contains "stream"
if("stream"in parameters)this.fromStream(parameters.stream);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(SignedCertificateTimestamp,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){if(schema instanceof asn1js.RawData===false)throw new Error("Object's schema was not verified against input data for SignedCertificateTimestamp");var seqStream=new _bytestreamjs.SeqStream({stream:new _bytestreamjs.ByteStream({buffer:schema.data})});this.fromStream(seqStream);}//**********************************************************************************
/**
	 * Convert SeqStream data into current class
	 * @param {!SeqStream} stream
	 */},{key:"fromStream",value:function fromStream(stream){var blockLength=stream.getUint16();this.version=stream.getBlock(1)[0];if(this.version===0){this.logID=new Uint8Array(stream.getBlock(32)).buffer.slice(0);this.timestamp=new Date((0,_pvutils.utilFromBase)(new Uint8Array(stream.getBlock(8)),8));//region Extensions
var extensionsLength=stream.getUint16();this.extensions=new Uint8Array(stream.getBlock(extensionsLength)).buffer.slice(0);//endregion
//region Hash algorithm
switch(stream.getBlock(1)[0]){case 0:this.hashAlgorithm="none";break;case 1:this.hashAlgorithm="md5";break;case 2:this.hashAlgorithm="sha1";break;case 3:this.hashAlgorithm="sha224";break;case 4:this.hashAlgorithm="sha256";break;case 5:this.hashAlgorithm="sha384";break;case 6:this.hashAlgorithm="sha512";break;default:throw new Error("Object's stream was not correct for SignedCertificateTimestamp");}//endregion
//region Signature algorithm
switch(stream.getBlock(1)[0]){case 0:this.signatureAlgorithm="anonymous";break;case 1:this.signatureAlgorithm="rsa";break;case 2:this.signatureAlgorithm="dsa";break;case 3:this.signatureAlgorithm="ecdsa";break;default:throw new Error("Object's stream was not correct for SignedCertificateTimestamp");}//endregion
//region Signature
var signatureLength=stream.getUint16();var signatureData=new Uint8Array(stream.getBlock(signatureLength)).buffer.slice(0);var asn1=asn1js.fromBER(signatureData);if(asn1.offset===-1)throw new Error("Object's stream was not correct for SignedCertificateTimestamp");this.signature=asn1.result;//endregion
if(blockLength!==47+extensionsLength+signatureLength)throw new Error("Object's stream was not correct for SignedCertificateTimestamp");}}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){var stream=this.toStream();return new asn1js.RawData({data:stream.stream.buffer});}//**********************************************************************************
/**
	 * Convert current object to SeqStream data
	 * @returns {SeqStream} SeqStream object
	 */},{key:"toStream",value:function toStream(){var stream=new _bytestreamjs.SeqStream();stream.appendUint16(47+this.extensions.byteLength+this.signature.valueBeforeDecode.byteLength);stream.appendChar(this.version);stream.appendView(new Uint8Array(this.logID));var timeBuffer=new ArrayBuffer(8);var timeView=new Uint8Array(timeBuffer);var baseArray=(0,_pvutils.utilToBase)(this.timestamp.valueOf(),8);timeView.set(new Uint8Array(baseArray),8-baseArray.byteLength);stream.appendView(timeView);stream.appendUint16(this.extensions.byteLength);if(this.extensions.byteLength)stream.appendView(new Uint8Array(this.extensions));var _hashAlgorithm;switch(this.hashAlgorithm.toLowerCase()){case"none":_hashAlgorithm=0;break;case"md5":_hashAlgorithm=1;break;case"sha1":_hashAlgorithm=2;break;case"sha224":_hashAlgorithm=3;break;case"sha256":_hashAlgorithm=4;break;case"sha384":_hashAlgorithm=5;break;case"sha512":_hashAlgorithm=6;break;default:throw new Error("Incorrect data for hashAlgorithm: ".concat(this.hashAlgorithm));}stream.appendChar(_hashAlgorithm);var _signatureAlgorithm;switch(this.signatureAlgorithm.toLowerCase()){case"anonymous":_signatureAlgorithm=0;break;case"rsa":_signatureAlgorithm=1;break;case"dsa":_signatureAlgorithm=2;break;case"ecdsa":_signatureAlgorithm=3;break;default:throw new Error("Incorrect data for signatureAlgorithm: ".concat(this.signatureAlgorithm));}stream.appendChar(_signatureAlgorithm);var _signature=this.signature.toBER(false);stream.appendUint16(_signature.byteLength);stream.appendView(new Uint8Array(_signature));return stream;}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{version:this.version,logID:(0,_pvutils.bufferToHexCodes)(this.logID),timestamp:this.timestamp,extensions:(0,_pvutils.bufferToHexCodes)(this.extensions),hashAlgorithm:this.hashAlgorithm,signatureAlgorithm:this.signatureAlgorithm,signature:this.signature.toJSON()};}//**********************************************************************************
/**
	 * Verify SignedCertificateTimestamp for specific input data
	 * @param {Object[]} logs Array of objects with information about each CT Log (like here: https://ct.grahamedgecombe.com/logs.json)
	 * @param {String} logs.log_id Identifier of the CT Log encoded in BASE-64 format
	 * @param {String} logs.key Public key of the CT Log encoded in BASE-64 format
	 * @param {ArrayBuffer} data Data to verify signature against. Could be encoded Certificate or encoded PreCert
	 * @param {Number} [dataType=0] Type = 0 (data is encoded Certificate), type = 1 (data is encoded PreCert)
	 * @return {Promise<void>}
	 */},{key:"verify",value:function(){var _verify=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(logs,data){var dataType,logId,publicKeyBase64,publicKeyInfo,stream,_iteratorNormalCompletion,_didIteratorError,_iteratorError,_iterator,_step,log,asn1,timeBuffer,timeView,baseArray,_args=arguments;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:dataType=_args.length>2&&_args[2]!==undefined?_args[2]:0;//region Initial variables
logId=(0,_pvutils.toBase64)((0,_pvutils.arrayBufferToString)(this.logID));publicKeyBase64=null;stream=new _bytestreamjs.SeqStream();//endregion
//region Found and init public key
_iteratorNormalCompletion=true;_didIteratorError=false;_iteratorError=undefined;_context.prev=7;_iterator=logs[Symbol.iterator]();case 9:if(_iteratorNormalCompletion=(_step=_iterator.next()).done){_context.next=17;break;}log=_step.value;if(!(log.log_id===logId)){_context.next=14;break;}publicKeyBase64=log.key;return _context.abrupt("break",17);case 14:_iteratorNormalCompletion=true;_context.next=9;break;case 17:_context.next=23;break;case 19:_context.prev=19;_context.t0=_context["catch"](7);_didIteratorError=true;_iteratorError=_context.t0;case 23:_context.prev=23;_context.prev=24;if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}case 26:_context.prev=26;if(!_didIteratorError){_context.next=29;break;}throw _iteratorError;case 29:return _context.finish(26);case 30:return _context.finish(23);case 31:if(!(publicKeyBase64===null)){_context.next=33;break;}throw new Error("Public key not found for CT with logId: ".concat(logId));case 33:asn1=asn1js.fromBER((0,_pvutils.stringToArrayBuffer)((0,_pvutils.fromBase64)(publicKeyBase64)));if(!(asn1.offset===-1)){_context.next=36;break;}throw new Error("Incorrect key value for CT Log with logId: ".concat(logId));case 36:publicKeyInfo=new _PublicKeyInfo.default({schema:asn1.result});//endregion
//region Initialize signed data block
stream.appendChar(0x00);// sct_version
stream.appendChar(0x00);// signature_type = certificate_timestamp
timeBuffer=new ArrayBuffer(8);timeView=new Uint8Array(timeBuffer);baseArray=(0,_pvutils.utilToBase)(this.timestamp.valueOf(),8);timeView.set(new Uint8Array(baseArray),8-baseArray.byteLength);stream.appendView(timeView);stream.appendUint16(dataType);if(dataType===0)stream.appendUint24(data.byteLength);stream.appendView(new Uint8Array(data));stream.appendUint16(this.extensions.byteLength);if(this.extensions.byteLength!==0)stream.appendView(new Uint8Array(this.extensions));//endregion
//region Perform verification
return _context.abrupt("return",(0,_common.getEngine)().subtle.verifyWithPublicKey(stream._stream._buffer.slice(0,stream._length),{valueBlock:{valueHex:this.signature.toBER(false)}},publicKeyInfo,{algorithmId:""},"SHA-256"));case 50:case"end":return _context.stop();}}},_callee,this,[[7,19,23,31],[24,,26,30]]);}));function verify(_x,_x2){return _verify.apply(this,arguments);}return verify;}()//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"version":return 0;case"logID":case"extensions":return new ArrayBuffer(0);case"timestamp":return new Date(0);case"hashAlgorithm":case"signatureAlgorithm":return"";case"signature":return new asn1js.Any();default:throw new Error("Invalid member name for SignedCertificateTimestamp class: ".concat(memberName));}}}]);return SignedCertificateTimestamp;}();//**************************************************************************************
/**
 * Class from RFC6962
 */exports.SignedCertificateTimestamp=SignedCertificateTimestamp;var SignedCertificateTimestampList=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for SignedCertificateTimestampList class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function SignedCertificateTimestampList(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,SignedCertificateTimestampList);//region Internal properties of the object
/**
		 * @type {Array.<SignedCertificateTimestamp>}
		 * @desc timestamps
		 */this.timestamps=(0,_pvutils.getParametersValue)(parameters,"timestamps",SignedCertificateTimestampList.defaultValues("timestamps"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(SignedCertificateTimestampList,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Check the schema is valid
if(schema instanceof asn1js.OctetString===false)throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");//endregion
//region Get internal properties from parsed schema
var seqStream=new _bytestreamjs.SeqStream({stream:new _bytestreamjs.ByteStream({buffer:schema.valueBlock.valueHex})});var dataLength=seqStream.getUint16();if(dataLength!==seqStream.length)throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");while(seqStream.length){this.timestamps.push(new SignedCertificateTimestamp({stream:seqStream}));}//endregion
}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){//region Initial variables
var stream=new _bytestreamjs.SeqStream();var overallLength=0;var timestampsData=[];//endregion
//region Get overall length
var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=this.timestamps[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var timestamp=_step2.value;var timestampStream=timestamp.toStream();timestampsData.push(timestampStream);overallLength+=timestampStream.stream.buffer.byteLength;}//endregion
}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return!=null){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}stream.appendUint16(overallLength);//region Set data from all timestamps
for(var _i=0;_i<timestampsData.length;_i++){var _timestamp=timestampsData[_i];stream.appendView(_timestamp.stream.view);}//endregion
return new asn1js.OctetString({valueHex:stream.stream.buffer.slice(0)});}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){return{timestamps:Array.from(this.timestamps,function(element){return element.toJSON();})};}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"timestamps":return[];default:throw new Error("Invalid member name for SignedCertificateTimestampList class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */},{key:"compareWithDefault",value:function compareWithDefault(memberName,memberValue){switch(memberName){case"timestamps":return memberValue.length===0;default:throw new Error("Invalid member name for SignedCertificateTimestampList class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * SignedCertificateTimestampList ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [optional]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});if("optional"in names===false)names.optional=false;return new asn1js.OctetString({name:names.blockName||"SignedCertificateTimestampList",optional:names.optional});}}]);return SignedCertificateTimestampList;}();//**************************************************************************************
/**
 * Verify SignedCertificateTimestamp for specific certificate content
 * @param {Certificate} certificate Certificate for which verification would be performed
 * @param {Certificate} issuerCertificate Certificate of the issuer of target certificate
 * @param {Object[]} logs Array of objects with information about each CT Log (like here: https://ct.grahamedgecombe.com/logs.json)
 * @param {String} logs.log_id Identifier of the CT Log encoded in BASE-64 format
 * @param {String} logs.key Public key of the CT Log encoded in BASE-64 format
 * @param {Number} [index=-1] Index of SignedCertificateTimestamp inside SignedCertificateTimestampList (for -1 would verify all)
 * @return {Array} Array of verification results
 */exports.default=SignedCertificateTimestampList;function verifySCTsForCertificate(_x3,_x4,_x5){return _verifySCTsForCertificate.apply(this,arguments);}//**********************************************************************************
function _verifySCTsForCertificate(){_verifySCTsForCertificate=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2(certificate,issuerCertificate,logs){var index,parsedValue,tbs,issuerId,stream,preCert,crypto,i,verifyArray,_iteratorNormalCompletion3,_didIteratorError3,_iteratorError3,_iterator3,_step3,timestamp,verifyResult,_args2=arguments;return regeneratorRuntime.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:index=_args2.length>3&&_args2[3]!==undefined?_args2[3]:-1;//region Initial variables
parsedValue=null;stream=new _bytestreamjs.SeqStream();//endregion
//region Get a "crypto" extension
crypto=(0,_common.getCrypto)();if(!(typeof crypto==="undefined")){_context2.next=6;break;}return _context2.abrupt("return",Promise.reject("Unable to create WebCrypto object"));case 6:i=0;case 7:if(!(i<certificate.extensions.length)){_context2.next=19;break;}_context2.t0=certificate.extensions[i].extnID;_context2.next=_context2.t0==="1.3.6.1.4.1.11129.2.4.2"?11:16;break;case 11:parsedValue=certificate.extensions[i].parsedValue;if(!(parsedValue.timestamps.length===0)){_context2.next=14;break;}throw new Error("Nothing to verify in the certificate");case 14:certificate.extensions.splice(i,1);return _context2.abrupt("break",16);case 16:i++;_context2.next=7;break;case 19:if(!(parsedValue===null)){_context2.next=21;break;}throw new Error("No SignedCertificateTimestampList extension in the specified certificate");case 21://endregion
//region Prepare modifier TBS value
tbs=certificate.encodeTBS().toBER(false);//endregion
//region Initialize "issuer_key_hash" value
_context2.next=24;return crypto.digest({name:"SHA-256"},new Uint8Array(issuerCertificate.subjectPublicKeyInfo.toSchema().toBER(false)));case 24:issuerId=_context2.sent;//endregion
//region Make final "PreCert" value
stream.appendView(new Uint8Array(issuerId));stream.appendUint24(tbs.byteLength);stream.appendView(new Uint8Array(tbs));preCert=stream._stream._buffer.slice(0,stream._length);//endregion
//region Call verification function for specified index
if(!(index===-1)){_context2.next=60;break;}verifyArray=[];_iteratorNormalCompletion3=true;_didIteratorError3=false;_iteratorError3=undefined;_context2.prev=34;_iterator3=parsedValue.timestamps[Symbol.iterator]();case 36:if(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done){_context2.next=45;break;}timestamp=_step3.value;_context2.next=40;return timestamp.verify(logs,preCert,1);case 40:verifyResult=_context2.sent;verifyArray.push(verifyResult);case 42:_iteratorNormalCompletion3=true;_context2.next=36;break;case 45:_context2.next=51;break;case 47:_context2.prev=47;_context2.t1=_context2["catch"](34);_didIteratorError3=true;_iteratorError3=_context2.t1;case 51:_context2.prev=51;_context2.prev=52;if(!_iteratorNormalCompletion3&&_iterator3.return!=null){_iterator3.return();}case 54:_context2.prev=54;if(!_didIteratorError3){_context2.next=57;break;}throw _iteratorError3;case 57:return _context2.finish(54);case 58:return _context2.finish(51);case 59:return _context2.abrupt("return",verifyArray);case 60:if(index>=parsedValue.timestamps.length)index=parsedValue.timestamps.length-1;_context2.next=63;return parsedValue.timestamps[index].verify(logs,preCert,1);case 63:_context2.t2=_context2.sent;return _context2.abrupt("return",[_context2.t2]);case 65:case"end":return _context2.stop();}}},_callee2,this,[[34,47,51,59],[52,,54,58]]);}));return _verifySCTsForCertificate.apply(this,arguments);}
//# sourceMappingURL=SignedCertificateTimestampList.js.map